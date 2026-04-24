import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Quote, Star, ArrowLeft, GraduationCap, MessageCircle, PhoneCall, Zap } from "lucide-react"
import testimonialsData from "@/data/testimonials.json"
import { CollegeEnquiryForm } from "@/components/ui/CollegeEnquiryForm"

type Params = Promise<{ slug: string }>

interface Testimonial {
  id: number
  name: string
  slug?: string
  role: string
  message: string
  avatarUrl: string
  fullStory?: {
    headline: string
    college: string
    branch: string
    year: string
    examScore: string
    body: string[]
  }
}

const testimonials = testimonialsData as Testimonial[]

export async function generateStaticParams() {
  return testimonials
    .filter((t) => t.slug)
    .map((t) => ({ slug: t.slug! }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const testimonial = testimonials.find((t) => t.slug === slug)

  if (!testimonial || !testimonial.fullStory) {
    return { title: "Story Not Found" }
  }

  return {
    title: `${testimonial.name}'s Story — ${testimonial.fullStory.headline} | Direct2Campus`,
    description: `Read how ${testimonial.name} secured admission at ${testimonial.fullStory.college} through Direct2Campus.`,
  }
}

export default async function StoryPage({ params }: { params: Params }) {
  const { slug } = await params
  const testimonial = testimonials.find((t) => t.slug === slug)

  if (!testimonial || !testimonial.fullStory) {
    notFound()
  }

  const story = testimonial.fullStory

  return (
    <div className="pb-6 lg:pb-12 min-h-screen bg-[#faf8ff]">
      <div className="relative overflow-hidden bg-[#0B1120]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,76,192,0.3),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(96,165,250,0.08),transparent_50%)]" />
        <div className="absolute bottom-0 left-0 right-0 border-b border-white/[0.12] shadow-[0_4px_12px_rgba(0,0,0,0.1)]" />

        <div className="content-boundary relative z-10 pt-28 pb-16 md:pt-32 md:pb-20">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm mb-10">
            <Link href="/" className="text-white/40 hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/20" />
            <span className="text-white/40">Success Stories</span>
            <ChevronRight className="w-3.5 h-3.5 text-white/20" />
            <span className="text-[#f6c804]/80 font-medium truncate">{testimonial.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
            {/* Avatar */}
            <div className="relative group shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#3B4CC0]/40 to-[#f6c804]/20 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white/10 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.4)]">
                <img
                  src={testimonial.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=3B4CC0&color=fff&size=128`}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              {/* Name & Role */}
              <div className="flex flex-wrap gap-2.5 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#22c55e]/10 text-[#22c55e] rounded-lg text-[11px] font-bold tracking-[0.08em] uppercase border border-[#22c55e]/20">
                  <GraduationCap className="w-3 h-3" />
                  {story.branch}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#f6c804]/[0.08] text-[#f6c804] rounded-lg text-[11px] font-bold tracking-[0.08em] uppercase border border-[#f6c804]/[0.12]">
                  Batch {story.year}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-sora font-bold text-white leading-[1.15] tracking-[-0.02em] mb-4">
                {story.headline}
              </h1>

              <p className="text-lg text-[#60A5FA] font-medium mb-2">
                {testimonial.name} — {testimonial.role}
              </p>
              <p className="text-sm text-white/40">
                {story.examScore} • {story.college}
              </p>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative z-10 pb-12">
          <div className="content-boundary">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.06] backdrop-blur-xl">
              <div className="flex flex-col items-center justify-center py-6 px-4 bg-[#0B1120]/60 backdrop-blur-sm text-center">
                <p className="text-2xl font-bold font-sora text-[#f6c804] mb-1">{story.college.split(" ")[0]}</p>
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/40">College</p>
              </div>
              <div className="flex flex-col items-center justify-center py-6 px-4 bg-[#0B1120]/60 backdrop-blur-sm text-center">
                <p className="text-2xl font-bold font-sora text-[#22c55e] mb-1">{story.branch}</p>
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/40">Branch Secured</p>
              </div>
              <div className="flex flex-col items-center justify-center py-6 px-4 bg-[#0B1120]/60 backdrop-blur-sm text-center">
                <p className="text-2xl font-bold font-sora text-white mb-1">{story.examScore}</p>
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/40">Exam Score</p>
              </div>
              <div className="flex flex-col items-center justify-center py-6 px-4 bg-[#0B1120]/60 backdrop-blur-sm text-center">
                <p className="text-2xl font-bold font-sora text-[#60A5FA] mb-1">{story.year}</p>
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/40">Admission Year</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          MOBILE ENQUIRY (Visible only on mobile)
      ═══════════════════════════════════════════ */}
      <div className="content-boundary mt-6 lg:hidden">
        <div className="bg-[#0B1120] rounded-[1.25rem] p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,76,192,0.1),transparent_60%)]" />
          <div className="relative z-10">
            <h3 className="text-xl font-sora font-bold text-white mb-6">Want a Similar Story?</h3>
            <CollegeEnquiryForm collegeName={story.college} />
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          MAIN CONTENT — Tonal Layered Layout
      ═══════════════════════════════════════════ */}
      <div className="content-boundary mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* ── Main Content Column ── */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            <section id="story">
              <div className="bg-white rounded-[1.25rem] p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                {/* Pull quote */}
                <div className="relative mb-12 px-2">
                  <Quote className="absolute -top-4 -left-4 w-16 h-16 text-[#3B4CC0]/10" />
                  <blockquote className="relative z-10 text-xl md:text-2xl font-sora font-bold text-[#131b2e] leading-snug italic pl-8 border-l-4 border-[#f6c804]">
                    &ldquo;{testimonial.message}&rdquo;
                  </blockquote>
                  <div className="flex gap-1 mt-4 pl-8">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#f6c804] text-[#f6c804]" />
                    ))}
                  </div>
                </div>

                {/* Story paragraphs */}
                <article className="prose prose-lg max-w-none">
                  {story.body.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-[#45464d] text-[1.1rem] leading-[1.9] mb-8 font-inter"
                    >
                      {paragraph}
                    </p>
                  ))}
                </article>
              </div>
            </section>

            {/* ── CTA Block ── */}
            <div className="bg-[#0B1120] rounded-[1.25rem] p-8 md:p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,76,192,0.15),transparent_60%)]" />
              <div className="relative z-10 text-center">
                <h3 className="text-2xl md:text-3xl font-sora font-bold text-white mb-3">
                  Want a Similar Success Story?
                </h3>
                <p className="text-white/50 text-base mb-8 max-w-lg mx-auto">
                  Our expert counselors have helped hundreds of students get into their dream colleges. Your turn is next.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="https://wa.me/916200325137"
                    target="_blank"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold rounded-xl transition-all duration-300 shadow-[0_12px_24px_-6px_rgba(37,211,102,0.3)] hover:-translate-y-0.5"
                  >
                    <MessageCircle className="w-5 h-5 fill-white" />
                    WhatsApp Now
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/[0.06] hover:bg-white/[0.1] text-white font-semibold rounded-xl border border-white/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Request Free Counselling
                  </Link>
                </div>
              </div>
            </div>

            {/* Back link */}
            <div className="pb-8">
              <Link
                href="/#testimonials"
                className="inline-flex items-center gap-2 text-[#3B4CC0] font-semibold hover:text-[#253285] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all stories
              </Link>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="lg:col-span-4 h-full">
            <div className="hidden lg:block sticky top-24 pb-8 space-y-5 mb-8">
              {/* Enquiry Form — Premium Glassmorphic */}
              <div id="enquiry-form" className="bg-[#0B1120] rounded-[1.25rem] p-6 relative overflow-hidden shadow-[0_24px_48px_-12px_rgba(11,17,32,0.5)]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(246,200,4,0.06),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,76,192,0.1),transparent_50%)]" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#f6c804]/30 to-transparent" />
                
                <div className="relative z-10">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#22c55e]/10 text-[#22c55e] rounded-lg text-[10px] font-bold tracking-[0.1em] uppercase border border-[#22c55e]/20 mb-3">
                    <Zap className="w-3 h-3" /> Admission Open
                  </span>
                  <h3 className="text-lg font-sora font-bold text-white mb-1.5">Want a Similar Story?</h3>
                  <p className="text-white/30 text-xs mb-5 leading-relaxed">
                    Enter your details. Our admission counselor will reach out within 24 hours.
                  </p>
                  <CollegeEnquiryForm collegeName={story.college} />
                  
                  <div className="mt-5 pt-5 border-t border-white/[0.06] flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                      <PhoneCall className="w-4 h-4 text-[#f6c804]" />
                    </div>
                    <div>
                      <p className="text-[9px] text-white/30 uppercase tracking-[0.1em] font-bold">Urgent?</p>
                      <Link href="tel:+916200325137" className="text-sm font-bold text-white hover:text-[#f6c804] transition-colors">
                        +91 62003 25137
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  )
}
