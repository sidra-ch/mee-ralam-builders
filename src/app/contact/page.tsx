import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export default function ContactPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <Section className="border-b border-[#1f1f1f] bg-[#111111]">
          <Container>
            <p className="eyebrow">Contact</p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl text-[#f5f2ea] sm:text-6xl">
              Start the conversation.
            </h1>
          </Container>
        </Section>

        <Section>
          <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-6 rounded-[2rem] border border-[#1f1f1f] bg-[#171717] p-8">
              <SectionHeading
                eyebrow="Reach out"
                title="Client inquiry details pending."
                description="This form and contact section is purposefully placeholder-driven until final business information is provided."
              />

              <ul className="space-y-3 text-[#d9d1c5]">
                <li>Phone: [CLIENT PHONE REQUIRED]</li>
                <li>Email: [CLIENT EMAIL REQUIRED]</li>
                <li>Location: [CLIENT LOCATION REQUIRED]</li>
              </ul>
            </div>

            <div className="rounded-[2rem] border border-[#2a2a2a] bg-[#111111] p-8">
              <form className="space-y-5">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm uppercase tracking-[0.2em] text-[#c9a227]">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-xl border border-[#2a2a2a] bg-[#171717] px-4 py-3 text-[#f5f2ea] outline-none transition focus:border-[#c9a227]"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm uppercase tracking-[0.2em] text-[#c9a227]">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="w-full rounded-xl border border-[#2a2a2a] bg-[#171717] px-4 py-3 text-[#f5f2ea] outline-none transition focus:border-[#c9a227]"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm uppercase tracking-[0.2em] text-[#c9a227]">
                    Project brief
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us about your vision."
                    className="w-full rounded-xl border border-[#2a2a2a] bg-[#171717] px-4 py-3 text-[#f5f2ea] outline-none transition focus:border-[#c9a227]"
                  />
                </div>

                <Button type="button">Send enquiry</Button>
              </form>
            </div>
          </Container>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
