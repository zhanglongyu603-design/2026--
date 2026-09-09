'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

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

const contents = [
  'TVC香水广告',
  '电商广告——美的手持挂烫机',
  'AI短剧——失忆后，我的死对头超会演',
  '自媒体——仿喜鹊谋杀案剪辑',
  '数字人训练',
];

type Project = {
  name: string;
  category: string;
  images: string[];
  video?: string;
  poster?: string;
  actionHref?: string;
  actionLabel?: string;
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
    name: 'AI Short Drama',
    category: 'Personal',
    video: '/ai-short-drama.mp4',
    poster: '/ai-short-drama-poster.jpg',
    actionHref: '/ai-short-drama-process',
    actionLabel: '制作过程',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    ],
  },
  {
    name: 'Douyin Video',
    category: 'Personal',
    video: '/douyin-video.mp4',
    poster: '/douyin-video-poster.jpg',
    images: [],
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

      <div className="hero-title-wrap absolute inset-x-0 z-20 overflow-visible">
        <h1
          id="hero-heading"
          className="hero-title font-black uppercase"
        >
          <span className="hero-title-line">Hello</span>
          <span className="hero-title-line">I’m</span>
          <span className="hero-title-line hero-title-name">Zhanglongyu</span>
        </h1>
      </div>

      <FadeIn
        delay={0.6}
        y={0}
        className="hero-video-wrap pointer-events-none absolute inset-0 z-0"
      >
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/hero-intro-poster.jpg"
          aria-hidden="true"
        >
          <source src="/hero-intro.mp4" type="video/mp4" />
        </video>
      </FadeIn>

      <div className="hero-footer relative z-30 mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
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

function AboutSection() {
  const experience = [
    {
      company: '博拉网络有限公司',
      role: '视觉设计师',
      period: '2026.01–2026.04',
      description:
        '负责甲方品牌小红书账号的全链路视觉设计工作，输出契合品牌调性与平台生态的视觉解决方案。',
    },
    {
      company: '武汉火花思维教育科技有限公司',
      role: '视觉设计师',
      period: '2025.06–2025.09',
      description:
        '核心参与线上视频课件的视觉设计，通过创意素材快速产出、细节优化与版式调整，平衡视觉吸引力与信息传达效率，保障课件视觉连贯性与知识呈现清晰度。',
    },
  ];

  return (
    <section
      id="about"
      className="about-panel about-profile relative min-h-screen overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="about-wireframe pointer-events-none absolute inset-0" aria-hidden="true">
        <svg viewBox="0 0 1600 900" preserveAspectRatio="none">
          <g className="about-wire about-wire--one">
            <ellipse cx="175" cy="455" rx="170" ry="448" />
          </g>
          <g className="about-wire about-wire--two">
            <ellipse cx="540" cy="455" rx="245" ry="448" />
          </g>
          <g className="about-wire about-wire--three">
            <ellipse cx="930" cy="455" rx="118" ry="448" />
          </g>
          <g className="about-wire about-wire--four">
            <ellipse cx="1165" cy="455" rx="126" ry="448" />
          </g>
          <g className="about-wire about-wire--five">
            <ellipse cx="1455" cy="455" rx="138" ry="448" />
          </g>
          <path className="about-axis" d="M44 265 H1556" />
          <g className="about-perspective">
            <path d="M565 265 L1600 168" />
            <path d="M565 265 L1600 360" />
            <path d="M565 265 L1600 265" />
          </g>
          <g className="about-gridlines">
            {Array.from({ length: 12 }).map((_, index) => (
              <path key={index} d={`M${720 + index * 42} ${225 - index * 2} V${305 + index * 2}`} />
            ))}
          </g>
          <rect className="about-marker" x="555" y="261" width="18" height="8" rx="2" />
        </svg>
      </div>

      <div className="about-profile__content relative z-10">
        <FadeIn y={-18} className="about-profile__masthead">
          <div className="about-profile__heading">
            <h2 id="about-heading">个人介绍</h2>
            <p>INTRODUCE MYSELF</p>
          </div>
          <p className="about-profile__edition">PORTFOLIO / 2026</p>
          <a className="about-profile__meta" href="tel:+8613997679986">
            <span>PHONE</span>
            +86 139 9767 9986
          </a>
          <a className="about-profile__meta" href="mailto:2942981556@qq.com">
            <span>EMAIL</span>
            2942981556@qq.com
          </a>
        </FadeIn>

        <div className="about-profile__body">
          <div className="about-profile__resume">
            <FadeIn x={-28} y={0} className="about-profile__identity about-profile__row">
              <p className="about-profile__label">关于我</p>
              <div>
                <p className="about-profile__name">张龙煜 <span>/ ZHANG LONGYU</span></p>
                <dl className="about-profile__facts">
                  <div><dt>性别</dt><dd>女</dd></div>
                  <div><dt>年龄</dt><dd>22岁</dd></div>
                  <div><dt>方向</dt><dd>AIGC·广告·视频制作·视觉设计</dd></div>
                </dl>
              </div>
            </FadeIn>

            <div className="about-profile__row about-profile__experience">
              <p className="about-profile__label">工作经历</p>
              <div className="about-profile__jobs">
                {experience.map((job, index) => (
                  <FadeIn key={job.company} delay={0.12 + index * 0.12} y={24} as="article" className="about-profile__job">
                    <div className="about-profile__job-head">
                      <h3>{job.company}</h3>
                      <span>{job.period}</span>
                    </div>
                    <p className="about-profile__role">{job.role}</p>
                    <p className="about-profile__description">{job.description}</p>
                  </FadeIn>
                ))}
              </div>
            </div>

            <FadeIn delay={0.22} y={24} className="about-profile__row about-profile__education">
              <p className="about-profile__label">教育经历</p>
              <div>
                <div className="about-profile__job-head">
                  <h3>武汉科技大学</h3>
                  <span>2022–2026</span>
                </div>
                <p className="about-profile__role">视觉传达设计 · 本科</p>
              </div>
            </FadeIn>
          </div>

          <div className="about-profile__showcase">
            <FadeIn x={36} y={0} className="about-profile__discipline">
              <span>VISUAL DESIGNER</span>
            </FadeIn>
            <FadeIn delay={0.12} x={40} y={0}>
              <p className="about-profile__display-name" aria-hidden="true">
                ZHANG<br />LONGYU
              </p>
            </FadeIn>
            <motion.figure
              className="about-profile__portrait"
              initial={{ opacity: 0.72, x: 24, scale: 0.985 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src="/about-zhanglongyu.jpg" alt="张龙煜个人照片" loading="eager" />
              <figcaption>VISUAL COMMUNICATION / 2022–2026</figcaption>
            </motion.figure>
          </div>
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
      aria-labelledby="contents-heading"
    >
      <h2
        id="contents-heading"
        className="editorial-heading mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black leading-none tracking-tight text-[#F06FB6] uppercase sm:mb-20 md:mb-28"
      >
        Contents
      </h2>
      <ol
        className="border-t border-[rgba(12,12,12,0.15)]"
        style={{ width: 'min(100%, 72rem)', marginInline: 'auto' }}
      >
        {contents.map((title, index) => (
          <FadeIn key={title} delay={index * 0.1} as="li" className="border-b border-[rgba(12,12,12,0.15)]">
            <div className="grid grid-cols-[0.28fr_0.72fr] items-center gap-5 py-8 sm:gap-10 sm:py-10 md:py-12">
              <span className="service-number text-center text-[clamp(3rem,10vw,140px)] font-black leading-none text-[#F06FB6]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-left text-[clamp(1rem,2.2vw,2.1rem)] font-bold">{title}</h3>
            </div>
          </FadeIn>
        ))}
      </ol>
    </section>
  );
}

function LiveProjectButton({
  href = '#contact',
  label = 'Live Project',
  prominent = false,
}: {
  href?: string;
  label?: string;
  prominent?: boolean;
}) {
  return (
    <a
      href={href}
      className={`inline-flex shrink-0 items-center rounded-full border-2 border-[#F06FB6] font-semibold text-[#F06FB6] uppercase transition-colors hover:bg-[#F06FB6] hover:text-[#151515] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F06FB6] ${
        prominent
          ? 'gap-3 px-8 py-4 text-lg tracking-[0.08em] sm:px-12 sm:py-5 sm:text-2xl'
          : 'gap-2 px-8 py-3 text-sm tracking-widest sm:px-10 sm:py-3.5 sm:text-base'
      }`}
    >
      {label}
      <ArrowUpRight className={prominent ? 'h-6 w-6 sm:h-7 sm:w-7' : 'h-4 w-4'} aria-hidden="true" />
    </a>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ['start end', 'start start'] });
  const targetScale = 0.94;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  const cardStyle = { '--card-offset': `${index * 28}px` } as CSSProperties;

  return (
    <div
      ref={container}
      id={`project-card-${String(index + 1).padStart(2, '0')}`}
      className="relative h-[85vh] min-h-[620px] scroll-mt-4"
    >
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
            <LiveProjectButton
              href={project.actionHref}
              label={project.actionLabel}
              prominent={project.name === 'AI Short Drama'}
            />
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
