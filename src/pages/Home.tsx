
import { HeroSection } from "@/components/landing/HeroSection";
import { ProductFocusSection } from "@/components/landing/ProductFocusSection";
import { StorySection } from "@/components/landing/StorySection";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { BrandStatement } from "@/components/landing/BrandStatement";
import { CTASection } from "@/components/landing/CTASection";



export default function HomePage() {
  return (
    <div className="bg-background">
      <HeroSection />
      <ProductFocusSection />
      <StorySection />
      <ProductShowcase />
      <BrandStatement />
      <CTASection />
    </div>
  );
}
