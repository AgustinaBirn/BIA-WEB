import { NextResponse } from "next/server";
import { Resend } from "resend";

import {
  buildDiagnosticResult,
  buildOwnerEmailHtml,
  buildUserEmailHtml,
  type DiagnosticAnswers,
} from "@/lib/diagnostic-evaluator";
import { saveDiagnosticSubmission } from "@/lib/save-diagnostic-submission";

function createResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return null;
  }

  return new Resend(apiKey);
}

type DiagnosticRequestPayload = DiagnosticAnswers & {
  honeypot?: string;
  startedAt?: number;
};

const requiredFields: (keyof DiagnosticAnswers)[] = [
  "name",
  "email",
  "whatsapp",
  "brandName",
  "projectStage",
  "hasBranding",
  "hasWebsite",
  "websiteStatus",
  "mainGoal",
  "serviceInterest",
  "urgency",
  "budget",
  "contentReady",
  "visualAssets",
];

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isRealisticName(value: string) {
  const normalizedValue = value.trim().replace(/\s+/g, " ");
  const nameParts = normalizedValue.split(" ");

  if (nameParts.length < 2) return false;

  return nameParts.every((part) => {
    return part.length >= 3 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ'-]+$/.test(part);
  });
}

function isRealisticPhone(value: string) {
  const digits = value.replace(/\D/g, "");

  if (digits.length < 8 || digits.length > 15) return false;

  const allDigitsAreEqual = /^(\d)\1+$/.test(digits);

  if (allDigitsAreEqual) return false;

  return /^[+]?[\d\s().-]+$/.test(value.trim());
}

function normalizeAnswers(answers: DiagnosticAnswers): DiagnosticAnswers {
  return {
    name: answers.name?.trim() ?? "",
    email: answers.email?.trim().toLowerCase() ?? "",
    whatsapp: answers.whatsapp?.trim() ?? "",
    brandName: answers.brandName?.trim() ?? "",
    projectStage: answers.projectStage?.trim() ?? "",
    hasBranding: answers.hasBranding?.trim() ?? "",
    hasWebsite: answers.hasWebsite?.trim() ?? "",
    websiteStatus: answers.websiteStatus?.trim() ?? "",
    mainGoal: answers.mainGoal?.trim() ?? "",
    serviceInterest: answers.serviceInterest?.trim() ?? "",
    contentReady: answers.contentReady?.trim() ?? "",
    visualAssets: answers.visualAssets?.trim() ?? "",
    urgency: answers.urgency?.trim() ?? "",
    budget: answers.budget?.trim() ?? "",
    notes: answers.notes?.trim() ?? "",
  };
}

function getMissingFields(answers: DiagnosticAnswers) {
  return requiredFields.filter((field) => !answers[field]?.trim());
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as DiagnosticRequestPayload;

    const { honeypot, startedAt, ...rawAnswers } = payload;
    const answers = normalizeAnswers(rawAnswers);

    const elapsedTime =
      typeof startedAt === "number" ? Date.now() - startedAt : 0;

    if (elapsedTime > 0 && elapsedTime < 3500) {
      return NextResponse.json(
        {
          error: "Completá el formulario antes de enviarlo.",
        },
        {
          status: 400,
        },
      );
    }

    if (honeypot?.trim()) {
      return NextResponse.json(
        {
          error: "Solicitud inválida.",
        },
        {
          status: 400,
        },
      );
    }

    const missingFields = getMissingFields(answers);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: "Faltan datos obligatorios.",
          missingFields,
        },
        {
          status: 400,
        },
      );
    }

    if (!isRealisticName(answers.name)) {
      return NextResponse.json(
        {
          error:
            "Ingresá nombre y apellido válidos. Cada uno debe tener al menos 3 caracteres.",
        },
        {
          status: 400,
        },
      );
    }

    if (!isValidEmail(answers.email)) {
      return NextResponse.json(
        {
          error: "El email ingresado no es válido.",
        },
        {
          status: 400,
        },
      );
    }

    if (!isRealisticPhone(answers.whatsapp)) {
      return NextResponse.json(
        {
          error: "El WhatsApp ingresado no es válido.",
        },
        {
          status: 400,
        },
      );
    }

    const resend = createResendClient();

    if (!resend) {
      return Response.json(
        {
          ok: false,
          error: "Resend API key is not configured.",
        },
        {
          status: 500,
        },
      );
    }

    const from = process.env.RESEND_FROM_EMAIL;
    const ownerEmail = process.env.BIA_OWNER_EMAIL;
    const isTestMode = process.env.RESEND_TEST_MODE === "true";

    if (!from || !ownerEmail) {
      return NextResponse.json(
        {
          error: "Faltan variables de entorno de email.",
        },
        {
          status: 500,
        },
      );
    }

    const result = buildDiagnosticResult(answers);
    const emailMode = isTestMode ? "test" : "production";

    let ownerEmailSent = false;
    let userEmailSent = false;
    let emailError = "";

    try {
      await resend.emails.send({
        from,
        to: ownerEmail,
        subject: isTestMode
          ? `[TEST] Nuevo análisis gratuito — ${answers.name}`
          : `Nuevo análisis gratuito — ${answers.name}`,
        html: buildOwnerEmailHtml(answers, result),
      });
      if (!resend || !from || !ownerEmail) {
        throw new Error(
          "Email service is not fully configured. Check RESEND_API_KEY, RESEND_FROM_EMAIL and BIA_OWNER_EMAIL.",
        );
      }
      ownerEmailSent = true;

      if (isTestMode) {
        await resend.emails.send({
          from,
          to: ownerEmail,
          subject: `[TEST] Email que recibiría el usuario — ${answers.name}`,
          html: buildUserEmailHtml(answers, result),
        });
      } else {
        await resend.emails.send({
          from,
          to: answers.email,
          subject: "Tu análisis gratuito de BIA",
          html: buildUserEmailHtml(answers, result),
        });
      }

      userEmailSent = true;
    } catch (error) {
      console.error("[CONTACT_DIAGNOSTIC_EMAIL_ERROR]", error);

      emailError =
        error instanceof Error
          ? error.message
          : "No se pudo enviar uno o más emails.";
    }

    const savedSubmission = await saveDiagnosticSubmission({
      answers,
      result,
      emailMode,
      ownerEmailSent,
      userEmailSent,
      emailError,
    });

    return NextResponse.json({
      ok: true,
      mode: emailMode,
      result,
      savedSubmission,
      emailStatus: {
        ownerEmailSent,
        userEmailSent,
        emailError,
      },
    });
  } catch (error) {
    console.error("[CONTACT_DIAGNOSTIC_ERROR]", error);

    return NextResponse.json(
      {
        error: "No se pudo procesar el diagnóstico.",
      },
      {
        status: 500,
      },
    );
  }
}
