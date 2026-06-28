import PriceText from "@/components/ui/price-text";
import PremiumCard from "@/components/ui/premium-card";
import { addOns } from "@/lib/services";

type AddOn = (typeof addOns)[number];

type AddOnCardProps = {
    addOn: AddOn;
};

export default function AddOnCard({
    addOn,
}: AddOnCardProps) {
    return (
        <PremiumCard className="rounded-[24px] p-5">
            <h3 className="text-[1.2rem] font-medium tracking-[-0.035em] text-white">
                {addOn.name}
            </h3>

            <p className="mt-3 text-sm leading-7 text-white/[0.62]">
                {addOn.description}
            </p>

            <p className="mt-5 font-ui text-sm font-medium">
                <PriceText variant="compact">
                    {addOn.price}
                </PriceText>
            </p>
        </PremiumCard>
    );
}