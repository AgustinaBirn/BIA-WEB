import type {
  DiagnosticAnswers,
  DiagnosticResult,
} from "@/lib/diagnostic-evaluator";

type SaveDiagnosticSubmissionParams = {
  answers: DiagnosticAnswers;
  result: DiagnosticResult;
  emailMode: "test" | "production";
  ownerEmailSent: boolean;
  userEmailSent: boolean;
  emailError?: string;
};

export async function saveDiagnosticSubmission({
  answers,
  result,
  emailMode,
  ownerEmailSent,
  userEmailSent,
  emailError,
}: SaveDiagnosticSubmissionParams) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.warn("[DIAGNOSTIC_SUPABASE_SKIPPED]", {
      reason: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY",
    });

    return {
      saved: false,
      id: null,
    };
  }

  const payload = {
    name: answers.name,
    email: answers.email,
    whatsapp: answers.whatsapp,
    brand_name: answers.brandName || null,

    project_stage: answers.projectStage || null,
    has_branding: answers.hasBranding || null,
    has_website: answers.hasWebsite || null,
    website_status: answers.websiteStatus || null,
    main_goal: answers.mainGoal || null,
    service_interest: answers.serviceInterest || null,
    content_ready: answers.contentReady || null,
    visual_assets: answers.visualAssets || null,
    urgency: answers.urgency || null,
    budget: answers.budget || null,
    notes: answers.notes || null,

    recommended_service: result.recommendedService,
    recommended_pack: result.recommendedPack,
    priority: result.priority,
    result_title: result.title,
    result_summary: result.summary,
    suggested_add_ons: result.suggestedAddOns,
    whatsapp_intro: result.whatsappIntro,

    answers,
    result,

    email_mode: emailMode,
    owner_email_sent: ownerEmailSent,
    user_email_sent: userEmailSent,
    email_error: emailError || null,
    source: "contact_diagnostic_form",
  };

  const response = await fetch(
    `${supabaseUrl}/rest/v1/diagnostic_submissions`,
    {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(payload),
    },
  );

  const responseText = await response.text();

  if (!response.ok) {
    console.error("[DIAGNOSTIC_SUPABASE_ERROR]", {
      status: response.status,
      body: responseText,
    });

    return {
      saved: false,
      id: null,
    };
  }

  const data = responseText ? JSON.parse(responseText) : [];

  console.info("[DIAGNOSTIC_SUPABASE_SAVED]", {
    id: data?.[0]?.id ?? null,
    emailMode,
    ownerEmailSent,
    userEmailSent,
  });

  return {
    saved: true,
    id: data?.[0]?.id ?? null,
  };
}
