'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const portrait = '/zhanglongyu-avatar-transparent.png';

const marqueeImages = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

const aboutObjects = [
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
    alt: 'Chrome moon sculpture',
    className: 'top-[4%] left-[1%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]',
    delay: 0.1,
    x: -80,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
    alt: 'Abstract chrome sculpture',
    className:
      'bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]',
    delay: 0.25,
    x: -80,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
    alt: 'Glossy block sculpture',
    className: 'top-[4%] right-[1%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]',
    delay: 0.15,
    x: 80,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
    alt: 'Colorful 3D forms',
    className:
      'bottom-[8%] right-[3%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]',
    delay: 0.3,
    x: 80,
  },
];

const services = [
  {
    name: '3D Modeling',
    description:
      'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.',
  },
  {
    name: 'Rendering',
    description:
      'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.',
  },
  {
    name: 'Motion Design',
    description:
      'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.',
  },
  {
    name: 'Branding',
    description:
      'Crafting cohesive visual identities—from logos to full brand systems—that communicate a clear and memorable presence.',
  },
  {
    name: 'Web Design',
    description:
      'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
  },
];

type Project = {
  name: string;
  category: string;
  images: string[];
  video?: string;
  poster?: string;
};

const projects: Project[] = [
  {
    name: 'TVC Advertising',
    category: 'Personal',
    video: '/tvc-advertisement.mp4',
    poster: '/tvc-advertisement-poster.jpg',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    ],
  },
  {
    name: 'Midea Garment Steamer',
    category: 'Personal',
    video: '/midea-garment-steamer-commercial.mp4',
    poster: '/midea-garment-steamer-commercial-poster.jpg',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    ],
  },
  {
    name: 'Solaris Digital',
    category: 'Client',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    ],
  },
];

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: ElementType;
};

function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = 'div',
}: FadeInProps) {
  const Component = motion.create(as);

  return (
    <Component
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </Component>
  );
}

function ContactButton({ className = '' }: { className?: string }) {
  return (
    <a
      href="mailto:hello@jack3d.com?subject=Let%27s%20create%20something"
      className={`contact-button ${className}`}
    >
      Contact Me
      <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
    </a>
  );
}

function Magnet({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('translate3d(0, 0, 0)');
  const [active, setActive] = useState(false);

  const updatePosition = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    const distanceX = event.clientX - centerX;
    const distanceY = event.clientY - centerY;
    const withinPadding =
      Math.abs(distanceX) <= bounds.width / 2 + 150 &&
      Math.abs(distanceY) <= bounds.height / 2 + 150;

    if (withinPadding) {
      setActive(true);
      setTransform(`translate3d(${distanceX / 3}px, ${distanceY / 3}px, 0)`);
    }
  };

  return (
    <div
      ref={ref}
      onMouseMove={updatePosition}
      onMouseLeave={() => {
        setActive(false);
        setTransform('translate3d(0, 0, 0)');
      }}
      style={{
        transform,
        transition: active ? 'transform 0.3s ease-out' : 'transform 0.6s ease-in-out',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}

function HeroSection() {
  return (
    <section className="hero-panel relative flex h-screen min-h-[620px] flex-col overflow-x-clip" aria-labelledby="hero-heading">
      <FadeIn y={-20}>
        <nav
          aria-label="Primary navigation"
          className="relative z-30 flex justify-between px-6 pt-6 text-sm font-semibold uppercase tracking-wider text-[#151515] md:px-10 md:pt-8 md:text-lg lg:text-[1.15rem]"
        >
          <a className="nav-link" href="#about">About</a>
          <a className="nav-link" href="#services">Price</a>
          <a className="nav-link" href="#projects">Projects</a>
          <a className="nav-link" href="#contact">Contact</a>
        </nav>
      </FadeIn>

      <FadeIn delay={0.15} y={40} className="hero-title-wrap relative z-0 mt-8 overflow-visible sm:mt-6 md:mt-3">
        <h1
          id="hero-heading"
          className="hero-heading hero-title w-full text-center font-black leading-none tracking-tight uppercase"
        >
          <span className="hero-intro">Hi, i&apos;m</span>
          <span className="hero-name">ZHANGLONGYU</span>
        </h1>
      </FadeIn>

      <FadeIn
        delay={0.6}
        y={30}
        className="pointer-events-none absolute top-1/2 left-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:bottom-0 sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]"
      >
        <div className="pointer-events-auto">
          <Magnet>
            <img
              src={portrait}
              alt="ZHANGLONGYU, 3D creator"
              className="block h-auto w-full select-none"
              draggable={false}
            />
          </Magnet>
        </div>
      </FadeIn>

      <div className="relative z-20 mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p className="max-w-[160px] text-[clamp(0.75rem,1.4vw,1.5rem)] font-medium leading-snug tracking-wide text-[#151515] uppercase sm:max-w-[220px] md:max-w-[260px]">
            A 3D creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}

function MarqueeRow({ images, direction }: { images: string[]; direction: 'left' | 'right' }) {
  const [offset, setOffset] = useState(0);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      if (!rowRef.current) return;
      const section = rowRef.current.closest('section');
      if (!section) return;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const translate = direction === 'right' ? offset - 200 : -(offset - 200);
  const repeated = [...images, ...images, ...images];

  return (
    <div className="marquee-viewport">
      <div
        ref={rowRef}
        className="flex w-max gap-3"
        style={{ transform: `translate3d(${translate}px, 0, 0)`, willChange: 'transform' }}
      >
        {repeated.map((src, index) => (
          <img
            key={`${src}-${index}`}
            src={src}
            alt=""
            loading="lazy"
            className="marquee-tile h-[270px] w-[420px] shrink-0 object-cover"
          />
        ))}
      </div>
    </div>
  );
}

function MarqueeSection() {
  return (
    <section className="marquee-panel overflow-hidden bg-white pt-24 pb-10 sm:pt-32 md:pt-40" aria-label="Selected motion work">
      <div className="flex flex-col gap-3">
        <MarqueeRow images={marqueeImages.slice(0, 11)} direction="right" />
        <MarqueeRow images={marqueeImages.slice(11)} direction="left" />
      </div>
    </section>
  );
}

function AnimatedCharacter({ character, progress, range }: { character: string; progress: ReturnType<typeof useScroll>['scrollYProgress']; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block" aria-hidden="true">
      <span className="invisible">{character}</span>
      <motion.span className="absolute inset-0" style={{ opacity }}>
        {character}
      </motion.span>
    </span>
  );
}

function AnimatedText({ children }: { children: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });

  return (
    <p
      ref={ref}
      className="relative max-w-[560px] text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-[#D7E2EA]"
      aria-label={children}
    >
      {children.split('').map((character, index) => {
        const start = index / children.length;
        const end = Math.min(1, start + 1 / children.length);
        return (
          <AnimatedCharacter
            key={`${character}-${index}`}
            character={character === ' ' ? '\u00A0' : character}
            progress={scrollYProgress}
            range={[start, end]}
          />
        );
      })}
    </p>
  );
}

function AboutSection() {
  const aboutCopy =
    "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!";

  return (
    <section
      id="about"
      className="about-panel relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-20 sm:px-8 md:px-10"
      aria-labelledby="about-heading"
    >
      {aboutObjects.map((object) => (
        <FadeIn
          key={object.src}
          delay={object.delay}
          duration={0.9}
          x={object.x}
          y={0}
          className={`pointer-events-none absolute z-0 ${object.className}`}
        >
          <img src={object.src} alt={object.alt} className="h-auto w-full" loading="lazy" />
        </FadeIn>
      ))}

      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn y={40}>
          <h2
            id="about-heading"
            className="hero-heading text-center text-[clamp(3rem,12vw,160px)] font-black leading-none tracking-tight uppercase"
          >
            About me
          </h2>
        </FadeIn>
        <div className="flex flex-col items-center gap-16 px-7 sm:gap-20 md:gap-24">
          <AnimatedText>{aboutCopy}</AnimatedText>
          <ContactButton />
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section
      id="services"
      className="services-panel rounded-t-[40px] bg-white px-5 py-20 text-[#151515] sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
      aria-labelledby="services-heading"
    >
      <h2
        id="services-heading"
        className="editorial-heading mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black leading-none tracking-tight text-[#F06FB6] uppercase sm:mb-20 md:mb-28"
      >
        Services
      </h2>
      <ol className="mx-auto max-w-5xl border-t border-[rgba(12,12,12,0.15)]">
        {services.map((service, index) => (
          <FadeIn key={service.name} delay={index * 0.1} as="li" className="border-b border-[rgba(12,12,12,0.15)]">
            <div className="grid grid-cols-[0.32fr_0.68fr] items-center gap-5 py-8 sm:gap-10 sm:py-10 md:py-12">
              <span className="service-number text-[clamp(3rem,10vw,140px)] font-black leading-none text-[#F06FB6]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-bold uppercase">{service.name}</h3>
                <p className="mt-3 max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] font-light leading-relaxed opacity-60">
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </ol>
    </section>
  );
}

function LiveProjectButton() {
  return (
    <a
      href="#contact"
      className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-[#F06FB6] px-8 py-3 text-sm font-semibold tracking-widest text-[#F06FB6] uppercase transition-colors hover:bg-[#F06FB6] hover:text-[#151515] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F06FB6] sm:px-10 sm:py-3.5 sm:text-base"
    >
      Live Project
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ['start end', 'start start'] });
  const targetScale = 1 - (projects.length - 1) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  const cardStyle = { '--card-offset': `${index * 28}px` } as CSSProperties;

  return (
    <div ref={container} className="relative h-[85vh] min-h-[620px]">
      <motion.article
        style={{ ...cardStyle, scale }}
        className="project-card sticky overflow-hidden rounded-[18px] border-2 border-[#F8F5F2] bg-[#171717] p-4 text-[#F8F5F2] sm:rounded-[22px] sm:p-6 md:rounded-[26px] md:p-8"
        aria-labelledby={`project-${index}`}
      >
        <div className="mb-5 grid grid-cols-[auto_1fr] items-end gap-x-5 gap-y-4 sm:mb-6 md:grid-cols-[auto_0.45fr_1fr_auto] md:gap-x-8">
          <span className="project-number text-[clamp(3rem,8vw,120px)] font-black leading-[0.75] text-[#F06FB6]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <p className="self-center text-sm font-light tracking-[0.18em] uppercase opacity-60 sm:text-base">
            {project.category}
          </p>
          <h3
            id={`project-${index}`}
            className="col-span-2 text-[clamp(1.4rem,3vw,3.5rem)] font-semibold leading-none text-[#F06FB6] uppercase md:col-span-1"
          >
            {project.name}
          </h3>
          <div className="col-span-2 md:col-span-1">
            <LiveProjectButton />
          </div>
        </div>

        {project.video ? (
          <video
            className="project-video"
            controls
            playsInline
            preload="metadata"
            poster={project.poster}
            aria-label={`${project.name} video`}
          >
            <source src={project.video} type="video/mp4" />
            Your browser does not support video playback.
          </video>
        ) : (
          <div className="grid grid-cols-[0.4fr_0.6fr] gap-3">
            <div className="grid gap-3">
              <img
                src={project.images[0]}
                alt={`${project.name} detail view`}
                loading="lazy"
                className="h-[clamp(130px,16vw,230px)] w-full rounded-[12px] object-cover sm:rounded-[16px] md:rounded-[20px]"
              />
              <img
                src={project.images[1]}
                alt={`${project.name} material study`}
                loading="lazy"
                className="h-[clamp(160px,22vw,340px)] w-full rounded-[12px] object-cover sm:rounded-[16px] md:rounded-[20px]"
              />
            </div>
            <img
              src={project.images[2]}
              alt={`${project.name} hero artwork`}
              loading="lazy"
              className="h-full min-h-0 w-full rounded-[12px] object-cover sm:rounded-[16px] md:rounded-[20px]"
            />
          </div>
        )}
      </motion.article>
    </div>
  );
}

function ProjectsSection() {
  return (
    <section
      id="projects"
      className="projects-panel relative z-10 -mt-10 rounded-t-[40px] bg-[#171717] px-5 pt-20 pb-32 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32"
      aria-labelledby="projects-heading"
    >
      <FadeIn y={40}>
        <h2
          id="projects-heading"
          className="hero-heading mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black leading-none tracking-tight uppercase sm:mb-20"
        >
          Project
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-[1500px]">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>

      <footer id="contact" className="flex flex-col items-center gap-8 pt-16 text-center sm:pt-24">
        <p className="text-sm font-medium tracking-[0.28em] text-[#F8F5F2]/60 uppercase">Available for selected projects</p>
        <ContactButton />
        <p className="text-sm text-[#F8F5F2]/40">© 2026 Jack — 3D Creator</p>
      </footer>
    </section>
  );
}

export default function Home() {
  return (
    <main className="site-shell min-h-screen overflow-x-clip bg-[#F3A7D2]">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </main>
  );
}
