import {
  AtSign,
  ArrowRight,
  BriefcaseBusiness,
  Camera,
  Globe2,
  Music2,
  Play,
  type LucideIcon,
} from 'lucide-react';

const heroVideo =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260419_064822_f120e48a-d545-45dd-a02d-facb07829888.mp4';

const lessons = [
  'Learn how to spot AI opportunities that boost productivity across roles and deliver visible results.',
  'Build structures that support your team so AI efficiencies multiply across the organization.',
  'Gain the skills to drive culture change like securing buy-in and reducing resistance.',
  'Get frameworks to deliver AI pilots that prove impact fast and build credibility with measurable results.',
];

const socials: { label: string; Icon: LucideIcon }[] = [
  { label: 'Facebook', Icon: Globe2 },
  { label: 'Twitter', Icon: AtSign },
  { label: 'Instagram', Icon: Camera },
  { label: 'YouTube', Icon: Play },
  { label: 'LinkedIn', Icon: BriefcaseBusiness },
  { label: 'TikTok', Icon: Music2 },
];

function Step({ number, children }: { number: number; children: React.ReactNode }) {
  return (
    <li className="mb-6 flex items-start gap-5 last:mb-0">
      <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#DCFF00] text-xs font-bold text-[#0A0A0A]">
        {number}
      </span>
      <p className="text-[17px] leading-[1.55] text-[#E8E8E8]">{children}</p>
    </li>
  );
}

function Divider() {
  return (
    <div className="flex justify-center py-8" aria-hidden="true">
      <span className="h-px w-24 bg-white/20" />
    </div>
  );
}

function PrimaryButton({ label, href = '#enroll' }: { label: string; href?: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-3 rounded-lg bg-[#DCFF00] px-6 py-3 font-bold text-[#0A0A0A] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#c9ea00] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#DCFF00]"
    >
      {label}
      <ArrowRight className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
    </a>
  );
}

function SolidButton({ label, href = '#enroll' }: { label: string; href?: string }) {
  return (
    <a
      href={href}
      className="inline-block rounded-lg bg-white px-8 py-3 font-bold text-[#0A0A0A] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E8E8E8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      {label}
    </a>
  );
}

function VideoCard({ src, label }: { src: string; label: string }) {
  return (
    <a
      href="#enroll"
      aria-label={label}
      className="group block overflow-hidden rounded-[14px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#DCFF00]"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="h-[370px] w-full rounded-[14px] object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
      >
        <source src={src} type="video/mp4" />
      </video>
    </a>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] px-4 py-10 font-sans">
      <article className="mx-auto max-w-[640px] overflow-hidden bg-[#111111] text-[#F2F2F2] shadow-2xl ring-1 ring-white/5">
        <section
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: '640 / 820' }}
          aria-labelledby="hero-title"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden="true"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(17,17,17,0) 45%, rgba(17,17,17,0.45) 68%, rgba(17,17,17,0.9) 88%, rgba(17,17,17,1) 100%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex h-full flex-col items-center px-6 pb-10 pt-12 text-center">
            <div className="text-white">
              <p
                className="text-[28px] leading-[0.95] tracking-tight"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Design Rocket
              </p>
              <p className="mt-1 text-[13px] font-medium tracking-[0.22em]">AIGC</p>
            </div>

            <p className="mt-40 text-[13px] font-semibold tracking-[0.28em] text-white">
              NOW AVAILABLE
            </p>

            <div className="flex-1" />

            <h1
              id="hero-title"
              className="max-w-[560px] text-[58px] leading-[1.02] tracking-tight text-white"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Learn to lead AI
              <br />
              and unlock new value
            </h1>
            <a
              href="#enroll"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#D8F90A] px-8 py-4 font-semibold text-[#1E1E1E] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#c9ea00] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Enroll Now
              <ArrowRight className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section aria-label="Course introduction">
          <div className="px-[78px] pb-8 pt-4 text-center max-sm:px-8">
            <p className="text-[18px] leading-[1.55]">
              Built in collaboration with Microsoft, this certificate course gives you the toolkit to
              lead AI transformation across your organization. Learn to spot opportunities, launch AI
              pilots, and scale adoption grounded in responsible practices and proven frameworks.
            </p>
          </div>
          <div className="flex justify-center pb-14">
            <PrimaryButton label="Get Started" href="#curriculum" />
          </div>
        </section>

        <Divider />

        <section id="curriculum" aria-labelledby="lead-heading">
          <div className="px-9 pb-8">
            <h2
              id="lead-heading"
              className="text-center text-[46px] leading-[1.05] tracking-tight"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Transform how you lead with AI
            </h2>
          </div>
          <div className="px-[42px] pb-10 max-sm:px-6">
            <VideoCard
              label="Explore the AI leadership certificate"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260419_065931_e3ca7b53-d32e-4ad5-81de-dc9d6fcfda6d.mp4"
            />
          </div>
          <ol className="mx-auto max-w-[489px] px-[76px] pb-10 max-sm:px-8">
            {lessons.map((lesson, index) => (
              <Step key={lesson} number={index + 1}>
                {lesson}
              </Step>
            ))}
          </ol>
          <div className="flex justify-center pb-14">
            <SolidButton label="Enroll Now" />
          </div>
        </section>

        <Divider />

        <section aria-labelledby="roadmap-heading">
          <div className="px-9 pb-7">
            <h2
              id="roadmap-heading"
              className="text-center text-[46px] leading-[1.05] tracking-tight"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Build your AI
              <br />
              transformation roadmap
            </h2>
          </div>
          <div className="px-[42px] pb-10 max-sm:px-6">
            <VideoCard
              label="Learn about the AI transformation roadmap"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260417_110451_9f82b157-dc92-4a9f-a341-c25594ec20e1.mp4"
            />
          </div>
          <div className="px-[78px] pb-8 text-center max-sm:px-8">
            <p className="text-[18px] leading-[1.55]">
              You&apos;ll finish this hands-on course with a personal AI Transformation Plan: your
              playbook for pilot proposals, data strategy and governance. Use it to help secure buy-in,
              guide rollout, and scale adoption responsibly.
            </p>
          </div>
          <div className="flex justify-center pb-14">
            <SolidButton label="Learn More" href="#curriculum" />
          </div>
        </section>

        <section id="enroll" className="px-14 pb-12 max-sm:px-6" aria-labelledby="enroll-heading">
          <div className="rounded-[10px] bg-[#D8F90A] px-8 py-12 text-center">
            <h2
              id="enroll-heading"
              className="mb-3 text-[52px] leading-[1.02] tracking-tight text-[#1E1E1E]"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Ready to lead AI
              <br />
              at work?
            </h2>
            <p className="mb-8 px-4 text-[18px] leading-[1.5] text-[#1E1E1E]">
              Enroll now and be the leader your team has been waiting for.
            </p>
            <div className="flex justify-center">
              <PrimaryButton label="Enroll Now" href="mailto:hello@designrocket.com?subject=Design%20Rocket%20Certificates" />
            </div>
          </div>
        </section>

        <footer className="border-t border-white/5 bg-[#080808] px-10 pt-12 text-center text-white max-sm:px-6">
          <div className="flex justify-center pb-8">
            <a
              href="#hero-title"
              className="text-[30px] font-bold tracking-tight text-white transition-colors hover:text-[#DCFF00]"
            >
              Design Rocket
            </a>
          </div>
          <p className="pb-8 text-[12px] leading-[1.5] text-[#83837D]">
            Microsoft is a collaborator on this specific course. Microsoft does not endorse
            <br className="max-sm:hidden" /> Design Rocket generally or other Design Rocket products.
          </p>
          <div className="flex justify-center pb-8" aria-hidden="true">
            <span className="h-px w-24 bg-white/20" />
          </div>
          <div className="flex justify-center gap-5 pb-5 max-sm:gap-2.5">
            {socials.map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-white hover:bg-white hover:text-[#1E1E1E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DCFF00]"
              >
                <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="pb-4 text-[10px] leading-[1.6] text-[#83837D]">
            If you no longer want to receive updates on Design Rocket Certificates,
            <br className="max-sm:hidden" /> you can unsubscribe at any time by clicking
            &quot;unsubscribe&quot; below.
          </p>
          <nav className="space-x-2 pb-3 text-[12px]" aria-label="Footer links">
            {['Support', 'Privacy', 'Terms', 'Unsubscribe'].map((label, index) => (
              <span key={label}>
                {index > 0 && <span className="mr-2 text-[#8F8E88]">|</span>}
                <a href="#" className="hover:underline">
                  {label}
                </a>
              </span>
            ))}
          </nav>
          <a href="#" className="inline-block text-[12px] text-white/80 hover:text-white">
            ©2026 Design Rocket, 660 4th Street #443, San Francisco, CA 94107 USA
          </a>
          <div className="pb-10" />
        </footer>
      </article>
    </main>
  );
}
