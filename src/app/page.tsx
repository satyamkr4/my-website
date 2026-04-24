import dynamic from "next/dynamic"
import { Metadata } from "next"
import { HeroSection } from "@/components/home/HeroSection"
import { TrustFeatures } from "@/components/home/TrustFeatures"
import { BannerSection } from "@/components/home/BannerSection"
import { MidPageContact } from "@/components/home/MidPageContact"

// Low priority / Heavy components - loaded only when scroll approaches
const AdmissionProcedure3D = dynamic(() => import("@/components/home/AdmissionProcedure3D").then(mod => mod.AdmissionProcedure3D), {
  loading: () => <div className="h-96 bg-neutral-50 animate-pulse rounded-3xl m-8" />
})

const FeaturedColleges = dynamic(() => import("@/components/home/FeaturedColleges").then(mod => mod.FeaturedColleges), {
  loading: () => <div className="h-96 bg-white animate-pulse rounded-3xl m-8" />
})

const TestimonialsSection = dynamic(() => import("@/components/home/TestimonialsSection").then(mod => mod.TestimonialsSection), {
  loading: () => <div className="h-80 bg-neutral-50 animate-pulse rounded-3xl m-8" />
})

const CTASection = dynamic(() => import("@/components/home/CTASection").then(mod => mod.CTASection), {
  loading: () => <div className="h-40 bg-d2c-navy animate-pulse rounded-3xl m-8" />
})

export const metadata: Metadata = {
  title: "Direct2Campus – Your Shortcut to the Right Campus",
  description:
    "India's most trusted educational consultancy. Get direct admission guidance for B.Tech, MBBS, MBA & BDS. Compare 150+ partner colleges and secure your seat with expert counselling.",
  alternates: { canonical: "https://direct2campus.com" },
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <TrustFeatures />
      <BannerSection />
      <AdmissionProcedure3D />

      <FeaturedColleges />
      <MidPageContact />
      <TestimonialsSection />
      <CTASection />
    </main>
  )
}
