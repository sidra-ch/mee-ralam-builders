import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CinematicPageHero } from "@/components/hero/CinematicPageHero";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CinematicHeading } from "@/components/motion/CinematicHeading";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl } from "@/lib/constants";

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
        {/* 01. Cinematic Hero — refined editorial variant */}
        <CinematicPageHero
          eyebrow="Contact / Let's Talk"
          title="Start a Conversation."
          description="Start a conversation with Meer Alam Builders about your architectural vision."
          image="/images/img-11.png"
          imageAlt="Architectural planning sketch over a residential interior concept"
        />

        {/* 02. Contact form + details */}
        <section
          className="relative bg-[#0d0e12] py-20 sm:py-28 lg:py-36 border-t border-[#1f1f1f]"
          aria-label="Contact details and enquiry form"
        >
          <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">

              {/* Contact info column */}
              <div className="space-y-10">
                <CinematicHeading
                  eyebrow="Reach Out"
                  lines="Let's discuss your vision."
                  className="font-display text-3xl sm:text-4xl leading-tight text-[#f5f2ea]"
                  mode="masked-line"
                />

                <ScrollReveal delay={0.12} className="space-y-4 border-t border-[#1f1f1f] pt-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9a227] mb-1">
                      Phone
                    </p>
                    <p className="text-base text-[#d9d1c5]">
                      +92 300 8680599
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
                </ScrollReveal>

                {/* WhatsApp CTA */}
                <ScrollReveal delay={0.18} className="border-t border-[#1f1f1f] pt-6">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contact Meer Alam Builders on WhatsApp"
                    className="group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#c9a227] transition-all duration-300 hover:gap-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#25D366"
                      className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp Us
                  </a>
                </ScrollReveal>
              </div>

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
