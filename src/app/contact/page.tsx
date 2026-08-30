import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CinematicPageHero } from "@/components/hero/CinematicPageHero";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact | Meer Alam Builders",
  description:
    "Start a conversation with Meer Alam Builders. Enquire about architectural projects, construction services, or interior design.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />

      <main>
        {/* 01. Cinematic Hero — compact variant */}
        <CinematicPageHero
          eyebrow="Contact"
          title="Start a Conversation."
          image="/images/img-11.png"
          imageAlt="Architectural planning sketch over a residential interior concept"
          variant="compact"
        />

        {/* 02. Contact form + details */}
        <section
          className="relative bg-[#0d0e12] py-24 sm:py-32 lg:py-40 border-t border-[#1f1f1f]"
          aria-label="Contact details and enquiry form"
        >
          <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">
            <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:items-start">

              {/* Contact info column */}
              <ScrollReveal className="space-y-10">
                <div className="space-y-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9a227]">
                    Reach Out
                  </p>
                  <h2 className="font-display text-4xl sm:text-5xl leading-tight text-[#f5f2ea]">
                    Let&apos;s discuss your vision.
                  </h2>
                </div>

                <div className="space-y-6 border-t border-[#1f1f1f] pt-8">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9a227] mb-1">
                      Phone
                    </p>
                    <p className="text-base text-[#d9d1c5]">
                      [CLIENT PHONE REQUIRED]
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9a227] mb-1">
                      Email
                    </p>
                    <p className="text-base text-[#d9d1c5]">
                      [CLIENT EMAIL REQUIRED]
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9a227] mb-1">
                      Location
                    </p>
                    <p className="text-base text-[#d9d1c5]">
                      [CLIENT LOCATION REQUIRED]
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Form column */}
              <ScrollReveal delay={0.15} className="space-y-6">
                <form className="space-y-5" aria-label="Project enquiry form">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c9a227]"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      autoComplete="name"
                      className="w-full border-b border-[#2a2a2a] bg-transparent pb-3 pt-1 text-base text-[#f5f2ea] placeholder:text-[#4a4a4a] outline-none transition focus:border-[#c9a227]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c9a227]"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      autoComplete="email"
                      className="w-full border-b border-[#2a2a2a] bg-transparent pb-3 pt-1 text-base text-[#f5f2ea] placeholder:text-[#4a4a4a] outline-none transition focus:border-[#c9a227]"
                    />
                  </div>

                  <div className="pt-2">
                    <label
                      htmlFor="message"
                      className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c9a227]"
                    >
                      Project Brief
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell us about your vision."
                      className="w-full border-b border-[#2a2a2a] bg-transparent pb-3 pt-1 text-base text-[#f5f2ea] placeholder:text-[#4a4a4a] outline-none transition focus:border-[#c9a227] resize-none"
                    />
                  </div>

                  <div className="pt-4">
                    <Button type="button">Send enquiry</Button>
                  </div>
                </form>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
