'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';

const marqueeTopImages = [
  '/marquee-top-04.png',
  '/marquee-top-02.png',
  '/marquee-top-03.png',
  '/marquee-top-01.png',
];

const marqueeBottomImages = [
  '/marquee-bottom-01.png',
  '/marquee-bottom-02.png',
  '/marquee-bottom-03.png',
  '/marquee-bottom-04.png',
];

const contents = [
  { name: 'TVC香水广告', english: 'TVC Perfume Commercial' },
  { name: '电商广告——美的手持挂烫机', english: 'E-commerce Commercial — Midea Handheld Garment Steamer' },
  {
    name: 'AI短剧——失忆后，我的死对头超会演',
    english: 'AI Short Drama — After I Lost My Memory, My Archrival Became Surprisingly Good at Acting',
  },
  { name: '自媒体——仿喜鹊谋杀案剪辑', english: 'Social Media — Magpie Murders-Inspired Editing' },
  { name: '数字人训练', english: 'Digital Human Training' },
];

type Project = {
  name: string;
  category: string;
  images: string[];
  video?: string;
  poster?: string;
  documentCover?: string;
  documentDetails?: string;
  actionHref?: string;
  actionLabel?: string;
  actionProminent?: boolean;
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
    actionProminent: true,
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
    actionHref: 'https://acnd2cprlmfq.feishu.cn/wiki/HyPxwQ1wCiMQhGkxizPc3JV1nae',
    actionLabel: '飞书链接',
    actionProminent: true,
    images: [],
  },
  {
    name: 'Digital Human Training',
    category: 'Personal',
    images: [],
    documentCover: '/project-05-cover.jpg',
    documentDetails: '/project-05-details.jpg',
    actionLabel: '查看项目',
    actionProminent: true,
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

function ContactButton({
  className = '',
  onClick,
}: {
  className?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`contact-button ${className}`}
      aria-haspopup="dialog"
    >
      Contact Me
      <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
    </button>
  );
}

function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#151515]/75 p-4 backdrop-blur-sm sm:p-8"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="微信联系二维码"
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-[min(88vw,430px)] overflow-hidden rounded-[24px] border-2 border-[#151515] bg-white shadow-[10px_10px_0_#F06FB6]"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="关闭联系二维码弹窗"
          className="absolute top-3 right-3 z-10 grid h-11 w-11 place-items-center rounded-full border-2 border-[#151515] bg-[#F06FB6] text-[#151515] transition-transform hover:rotate-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:top-4 sm:right-4"
        >
          <X className="h-6 w-6" aria-hidden="true" />
        </button>
        <img
          src="/contact-wechat.jpg"
          alt="张龙煜的微信二维码，昵称 ZikL.，湖北宜昌"
          className="block max-h-[86svh] w-full object-contain"
        />
      </motion.div>
    </div>
  );
}

function HeroSection({ onContact }: { onContact: () => void }) {
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

      <div className="hero-footer relative z-30 mt-auto flex items-end justify-between pb-7 sm:pb-8 md:pb-10">
        <FadeIn delay={0.35} y={20} className="min-w-0 flex-1">
          <p className="w-full max-w-[760px] text-[clamp(0.72rem,1.15vw,1.25rem)] font-medium leading-snug tracking-wide text-[#151515] uppercase">
            <span className="block md:whitespace-nowrap">Driven by visual storytelling,</span>
            <span className="block md:whitespace-nowrap">I deliver end-to-end creative services with AIGC,</span>
            <span className="block md:whitespace-nowrap">producing memorable live commercial projects</span>
            <span className="block md:whitespace-nowrap">and personal short-form video works</span>
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton onClick={onContact} />
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
            className="marquee-tile aspect-video h-auto w-[420px] shrink-0 object-cover"
          />
        ))}
      </div>
    </div>
  );
}

function MarqueeSection() {
  return (
    <section className="marquee-panel overflow-hidden bg-white pt-24 pb-10 sm:pt-32 md:pt-40" aria-label="Selected visual work">
      <div className="flex flex-col gap-3">
        <MarqueeRow images={marqueeTopImages} direction="right" />
        <MarqueeRow images={marqueeBottomImages} direction="left" />
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
        {contents.map((item, index) => (
          <FadeIn key={item.name} delay={index * 0.1} as="li" className="border-b border-[rgba(12,12,12,0.15)]">
            <div className="grid grid-cols-[0.28fr_0.72fr] items-center gap-5 py-8 sm:gap-10 sm:py-10 md:py-12">
              <span className="service-number text-center text-[clamp(3rem,10vw,140px)] font-black leading-none text-[#F06FB6]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0 text-left">
                <h3 className="text-[clamp(1.2rem,2.6vw,2.6rem)] font-bold leading-tight">{item.name}</h3>
                <p className="mt-2 text-[clamp(0.8rem,1.2vw,1rem)] font-medium leading-snug tracking-[0.04em] text-[#151515]/45 sm:mt-3">
                  {item.english}
                </p>
              </div>
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
  onClick,
  expanded,
  controls,
}: {
  href?: string;
  label?: string;
  prominent?: boolean;
  onClick?: () => void;
  expanded?: boolean;
  controls?: string;
}) {
  const className = `inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-[#F06FB6] font-semibold text-[#F06FB6] uppercase transition-colors hover:bg-[#F06FB6] hover:text-[#151515] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F06FB6] ${
    prominent
      ? 'gap-3 px-8 py-4 text-lg tracking-[0.08em] sm:px-12 sm:py-5 sm:text-2xl'
      : 'gap-2 px-8 py-3 text-sm tracking-widest sm:px-10 sm:py-3.5 sm:text-base'
  }`;
  const content = (
    <>
      {label}
      <ArrowUpRight
        className={`${prominent ? 'h-6 w-6 sm:h-7 sm:w-7' : 'h-4 w-4'} transition-transform ${expanded ? 'rotate-90' : ''}`}
        aria-hidden="true"
      />
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        className={className}
        onClick={onClick}
        aria-expanded={expanded}
        aria-controls={controls}
      >
        {content}
      </button>
    );
  }

  return (
    <a href={href} className={className}>
      {content}
    </a>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const container = useRef<HTMLDivElement>(null);
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);
  const { scrollYProgress } = useScroll({ target: container, offset: ['start end', 'start start'] });
  const targetScale = 0.94;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const isDocumentProject = Boolean(project.documentCover && project.documentDetails);
  const isExpandedDocument = isDocumentProject && isDocumentOpen;

  const collapseDocument = () => {
    setIsDocumentOpen(false);
    window.setTimeout(() => {
      container.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const cardStyle = { '--card-offset': `${index * 28}px` } as CSSProperties;

  return (
    <div
      ref={container}
      id={`project-card-${String(index + 1).padStart(2, '0')}`}
      className={`relative w-full scroll-mt-4 ${
        isExpandedDocument ? 'pb-16 sm:pb-24' : 'h-[85vh] min-h-[620px]'
      }`}
    >
      <motion.article
        style={{ ...cardStyle, scale }}
        className={`project-card w-full overflow-hidden rounded-[18px] border-2 border-[#F8F5F2] bg-[#171717] p-4 text-[#F8F5F2] sm:rounded-[22px] sm:p-6 md:rounded-[26px] md:p-8 ${
          isExpandedDocument ? 'relative' : 'sticky'
        }`}
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
              label={isDocumentProject ? (isDocumentOpen ? '收起项目' : '查看项目') : project.actionLabel}
              prominent={project.actionProminent}
              onClick={isDocumentProject ? () => setIsDocumentOpen((open) => !open) : undefined}
              expanded={isDocumentProject ? isDocumentOpen : undefined}
              controls={isDocumentProject ? 'project-05-details' : undefined}
            />
          </div>
        </div>

        {project.documentCover && project.documentDetails ? (
          <div className="overflow-hidden rounded-[12px] border border-[#F8F5F2]/70 bg-[#101010] sm:rounded-[16px] md:rounded-[20px]">
            <img
              src={project.documentCover}
              alt="Digital Human Training project cover"
              loading="lazy"
              className="project-document-image block aspect-video h-auto w-full object-cover"
            />
            <AnimatePresence initial={false}>
              {isDocumentOpen ? (
                <motion.div
                  id="project-05-details"
                  key="project-05-details"
                  initial={{ opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
                  className="-mt-px"
                >
                  <img
                    src={project.documentDetails}
                    alt="Digital Human Training project details"
                    loading="lazy"
                    className="project-document-image block h-auto w-full"
                  />
                  <div className="flex justify-end bg-[#171717] px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
                    <LiveProjectButton
                      label="收起项目"
                      prominent={project.actionProminent}
                      onClick={collapseDocument}
                      expanded
                      controls="project-05-details"
                    />
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        ) : project.video ? (
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

function ProjectsSection({ onContact }: { onContact: () => void }) {
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
        <ContactButton onClick={onContact} />
        <p className="text-sm text-[#F8F5F2]/40">© 2026 Jack — 3D Creator</p>
      </footer>
    </section>
  );
}

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <main className="site-shell min-h-screen overflow-x-clip bg-[#F3A7D2]">
        <HeroSection onContact={() => setIsContactOpen(true)} />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection onContact={() => setIsContactOpen(true)} />
      </main>
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
