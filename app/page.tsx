'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { WaterRippleImage } from '@/components/ui/water-ripple-image';

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
    actionHref: 'https://acnd2cprlmfq.feishu.cn/wiki/VktQwYwIxiq4RWk1SUTceKcxnue',
    actionLabel: '飞书链接',
    actionProminent: true,
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
    actionHref: 'https://acnd2cprlmfq.feishu.cn/wiki/MwC4wivGsih05EkxfMzcHQDgnNf',
    actionLabel: '飞书链接',
    actionProminent: true,
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

const showcaseSlides = [
  {
    image: '/showcase-ai-short-drama.png',
    label: 'AI短剧',
    video: '/showcase-video-ai-short-drama.mp4',
  },
  {
    image: '/showcase-douyin-sketch.png',
    label: '抖音段子',
    video: '/showcase-video-douyin-sketch.mp4',
  },
  {
    image: '/showcase-seeding-video.png',
    label: '种草视频',
    video: '/showcase-video-seeding.mp4',
  },
  {
    image: '/showcase-ecommerce-ad.png',
    label: '电商广告',
    video: '/showcase-video-ecommerce.mp4',
  },
];

type ShowcaseSlide = (typeof showcaseSlides)[number];

const projectPosterSlides = [
  { image: '/project-05-poster-spring.png', alt: '春天花会开电商海报' },
  { image: '/project-05-poster-travel.png', alt: '去看更大的世界旅行海报' },
  { image: '/project-05-poster-office.png', alt: '元气办公主题海报' },
];

function ProjectPosterMarquee() {
  return (
    <div
      className="project-poster-stage relative h-full w-full overflow-hidden bg-[#222]"
      role="region"
      aria-label="三张数字人海报自动横向滚动展示"
    >
      <div className="project-poster-track flex h-full w-max items-center">
        {[0, 1].map((groupIndex) => (
          <div
            key={groupIndex}
            className="project-poster-group flex h-full shrink-0 items-center"
            aria-hidden={groupIndex === 1}
          >
            {projectPosterSlides.map((poster) => (
              <figure
                key={`${groupIndex}-${poster.image}`}
                className="project-poster-item h-[90%] shrink-0 overflow-hidden rounded-[8px] border border-white/12 bg-[#191919] shadow-[0_18px_45px_rgba(0,0,0,0.38)] sm:rounded-[14px]"
              >
                <img
                  src={poster.image}
                  alt={groupIndex === 0 ? poster.alt : ''}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </figure>
            ))}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[7%] bg-gradient-to-r from-[#222] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[7%] bg-gradient-to-l from-[#222] to-transparent" />
    </div>
  );
}

type ShowcaseConfig = {
  xMultiplier: number;
  yMultiplier: number;
  rotationMultiplier: number;
  scaleReduction: number;
};

function getShowcaseConfig(width: number): ShowcaseConfig {
  if (width < 640) {
    return {
      xMultiplier: 82,
      yMultiplier: 14,
      rotationMultiplier: 7,
      scaleReduction: 0.06,
    };
  }

  if (width < 1024) {
    return {
      xMultiplier: 132,
      yMultiplier: 24,
      rotationMultiplier: 9,
      scaleReduction: 0.08,
    };
  }

  return {
    xMultiplier: 205,
    yMultiplier: 34,
    rotationMultiplier: 11,
    scaleReduction: 0.1,
  };
}

function ShowcaseCard({
  image,
  label,
  index,
  progress,
  config,
  isHovered,
  onBringToFront,
  onRelease,
  onOpen,
}: {
  image: string;
  label: string;
  index: number;
  progress: MotionValue<number>;
  config: ShowcaseConfig;
  isHovered: boolean;
  onBringToFront: () => void;
  onRelease: () => void;
  onOpen: () => void;
}) {
  const total = showcaseSlides.length;
  const offset = useTransform(progress, (value) => {
    let difference = (index - value) % total;
    if (difference > total / 2) difference -= total;
    if (difference < -total / 2) difference += total;
    return difference;
  });
  const x = useTransform(offset, (value) => value * config.xMultiplier);
  const y = useTransform(offset, (value) => Math.abs(value) * config.yMultiplier);
  const rotate = useTransform(offset, (value) => (Math.abs(value) < 0.05 ? 0 : value * config.rotationMultiplier));
  const scale = useTransform(offset, (value) => 1 - Math.abs(value) * config.scaleReduction);
  const opacity = useTransform(offset, [-2, -1.5, 0, 1.5, 2], [0.35, 0.78, 1, 0.78, 0.35]);
  const zIndex = useTransform(offset, (value) => Math.round(80 - Math.abs(value) * 10));

  return (
    <motion.figure
      style={{ x, y, rotate, scale, opacity, zIndex: isHovered ? 120 : zIndex }}
      animate={{ filter: isHovered ? 'brightness(1.07)' : 'brightness(1)' }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      onMouseEnter={onBringToFront}
      onMouseLeave={onRelease}
      onFocusCapture={onBringToFront}
      onBlurCapture={onRelease}
      className={`absolute aspect-[9/16] w-[clamp(104px,18vw,310px)] overflow-hidden rounded-[10px] border bg-[#181818] transition-[border-color,box-shadow] duration-200 sm:rounded-[16px] ${
        isHovered
          ? 'border-[#F06FB6] shadow-[0_28px_75px_rgba(0,0,0,0.62)]'
          : 'border-[#F06FB6]/65 shadow-[0_18px_50px_rgba(0,0,0,0.45)]'
      }`}
    >
      <img src={image} alt={label} className="pointer-events-none h-full w-full border-0 object-cover" draggable={false} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/28 via-transparent to-black/12" />
      <button
        type="button"
        onClick={onOpen}
        className="pointer-events-auto absolute top-2 right-2 cursor-pointer rounded-full border border-[#F06FB6] bg-[#171717]/88 px-2.5 py-1 text-[clamp(0.58rem,1.2vw,1.15rem)] font-semibold tracking-[0.06em] text-[#F06FB6] backdrop-blur-sm transition duration-200 hover:scale-105 hover:bg-[#F06FB6] hover:text-[#171717] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F06FB6] sm:top-4 sm:right-4 sm:px-4 sm:py-2"
        aria-label={`播放${label}视频`}
      >
        {label}
      </button>
    </motion.figure>
  );
}

function ShowcaseVideoDialog({
  slide,
  onClose,
}: {
  slide: ShowcaseSlide | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={Boolean(slide)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="w-[min(94vw,1100px)] max-w-none gap-0 overflow-hidden rounded-[18px] border border-[#F06FB6]/70 bg-[#101010] p-0 text-white shadow-[0_30px_100px_rgba(0,0,0,0.72)]"
      >
        <DialogTitle className="sr-only">{slide ? `正在播放：${slide.label}` : '作品视频'}</DialogTitle>
        <DialogClose
          className="absolute top-3 right-3 z-10 grid size-11 cursor-pointer place-items-center rounded-full border border-white/55 bg-black/60 text-white backdrop-blur-md transition hover:scale-105 hover:border-[#F06FB6] hover:bg-[#F06FB6] hover:text-[#171717] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F06FB6]"
          aria-label="关闭视频"
        >
          <X className="size-6" aria-hidden="true" />
        </DialogClose>
        {slide && (
          <video
            key={slide.video}
            src={slide.video}
            controls
            autoPlay
            playsInline
            preload="metadata"
            className="max-h-[84vh] w-full bg-black object-contain"
          >
            您的浏览器暂不支持视频播放。
          </video>
        )}
      </DialogContent>
    </Dialog>
  );
}

function ProjectShowcaseCarousel() {
  const pointerProgress = useMotionValue(0);
  const progress = useSpring(pointerProgress, { stiffness: 150, damping: 24, mass: 0.72 });
  const [windowWidth, setWindowWidth] = useState(1280);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState<ShowcaseSlide | null>(null);
  const config = getShowcaseConfig(windowWidth);

  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#222] select-none"
      role="region"
      aria-label="左右移动鼠标可控制四张海报围绕中心轮换"
      onPointerMove={(event) => {
        if (event.pointerType === 'touch' || activeSlide) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        const relativeX = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
        pointerProgress.set((relativeX - 0.5) * showcaseSlides.length);
      }}
      onPointerLeave={() => {
        pointerProgress.set(0);
        setHoveredIndex(null);
      }}
    >
      {showcaseSlides.map((slide, index) => (
        <ShowcaseCard
          key={slide.label}
          image={slide.image}
          label={slide.label}
          index={index}
          progress={progress}
          config={config}
          isHovered={hoveredIndex === index}
          onBringToFront={() => setHoveredIndex(index)}
          onRelease={() => setHoveredIndex(null)}
          onOpen={() => setActiveSlide(slide)}
        />
      ))}

      <p className="pointer-events-none absolute right-4 bottom-3 text-[clamp(0.55rem,0.9vw,0.8rem)] tracking-[0.16em] text-white/42 uppercase sm:right-8 sm:bottom-5">
        Move cursor · hover to focus
      </p>

      <ShowcaseVideoDialog slide={activeSlide} onClose={() => setActiveSlide(null)} />
    </div>
  );
}

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

function useMagneticMotion(strength = 0.16) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.5 });

  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * strength);
    y.set((event.clientY - bounds.top - bounds.height / 2) * strength);
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { style: { x: springX, y: springY }, onPointerMove, onPointerLeave };
}

function CursorHalo() {
  const x = useMotionValue(-80);
  const y = useMotionValue(-80);
  const smoothX = useSpring(x, { stiffness: 520, damping: 36, mass: 0.32 });
  const smoothY = useSpring(y, { stiffness: 520, damping: 36, mass: 0.32 });
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!finePointer.matches) return;

    let hasMoved = false;
    let wasInteractive = false;
    const handlePointerMove = (event: PointerEvent) => {
      x.set(event.clientX - 18);
      y.set(event.clientY - 18);
      if (!hasMoved) {
        hasMoved = true;
        setVisible(true);
      }

      const target = event.target instanceof Element ? event.target : null;
      const isInteractive = Boolean(target?.closest('a, button, video, [data-cursor-interactive]'));
      if (isInteractive !== wasInteractive) {
        wasInteractive = isInteractive;
        setInteractive(isInteractive);
      }
    };
    const handlePointerOut = (event: MouseEvent) => {
      if (!event.relatedTarget) setVisible(false);
    };
    const handleWindowBlur = () => setVisible(false);

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('mouseout', handlePointerOut);
    window.addEventListener('blur', handleWindowBlur);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mouseout', handlePointerOut);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [x, y]);

  return (
    <motion.div
      className="custom-cursor-halo"
      style={{ x: smoothX, y: smoothY }}
      animate={{ opacity: visible ? 1 : 0, scale: interactive ? 1.65 : 1 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      aria-hidden="true"
    />
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 150, damping: 30, restDelta: 0.001 });

  return <motion.div className="site-scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

function ContactButton({
  className = '',
  onClick,
}: {
  className?: string;
  onClick: () => void;
}) {
  const magnetic = useMagneticMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      {...magnetic}
      className={`contact-button ${className}`}
      aria-haspopup="dialog"
    >
      Contact Me
      <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
    </motion.button>
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
        <div className="about-profile__masthead">
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
        </div>

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
            <figure className="about-profile__portrait">
              <img src="/about-zhanglongyu-camera.jpg" alt="张龙煜手持相机的个人照片" loading="eager" />
              <figcaption>VISUAL COMMUNICATION / 2022–2026</figcaption>
            </figure>
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
            <a
              href={`#project-card-${String(index + 1).padStart(2, '0')}`}
              className="group grid grid-cols-[0.28fr_0.72fr] items-center gap-5 px-2 py-8 transition-colors duration-300 hover:bg-[#F06FB6]/8 focus-visible:bg-[#F06FB6]/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F06FB6] sm:gap-10 sm:px-4 sm:py-10 md:py-12"
              aria-label={`跳转到项目${index + 1}：${item.name}`}
            >
              <span className="service-number text-center text-[clamp(3rem,10vw,140px)] font-black leading-none text-[#F06FB6] transition-transform duration-300 group-hover:translate-x-2 group-focus-visible:translate-x-2">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0 text-left">
                <h3 className="text-[clamp(1.2rem,2.6vw,2.6rem)] font-bold leading-tight transition-colors duration-300 group-hover:text-[#F06FB6] group-focus-visible:text-[#F06FB6]">
                  {item.name}
                </h3>
                <p className="mt-2 text-[clamp(0.8rem,1.2vw,1rem)] font-medium leading-snug tracking-[0.04em] text-[#151515]/45 sm:mt-3">
                  {item.english}
                </p>
              </div>
            </a>
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
  const magnetic = useMagneticMotion();
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
      <motion.button
        type="button"
        className={className}
        onClick={onClick}
        {...magnetic}
        aria-expanded={expanded}
        aria-controls={controls}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <motion.a href={href} className={className} {...magnetic}>
      {content}
    </motion.a>
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
                  <div className="relative">
                    <img
                      src={project.documentDetails}
                      alt="Digital Human Training project details"
                      loading="lazy"
                      className="project-document-image block h-auto w-full"
                    />
                    <div className="absolute inset-x-0 overflow-hidden" style={{ top: '25.35%', height: '6.2%' }}>
                      <WaterRippleImage
                        src="/ripple-jewelry-banner.png"
                        alt="Daisy Doll Jewelry Syrup Gloss 广告"
                        strength={0.84}
                        protectedArea={{ centerX: 0.42, centerY: 0.52, radiusX: 0.31, radiusY: 0.62 }}
                      />
                    </div>
                    <div className="absolute inset-x-0 overflow-hidden" style={{ top: '31.55%', height: '6.2%' }}>
                      <WaterRippleImage
                        src="/ripple-rio-banner.png"
                        alt="RIO 微醺果冻酒广告"
                        strength={0.78}
                        protectedArea={{ centerX: 0.61, centerY: 0.52, radiusX: 0.29, radiusY: 0.62 }}
                      />
                    </div>
                    <div
                      className="absolute inset-x-0 overflow-hidden bg-[#222]"
                      style={{ top: '37.75%', height: '7.01%' }}
                    >
                      <ProjectPosterMarquee />
                    </div>
                    <div
                      className="absolute inset-x-0 overflow-hidden bg-[#222]"
                      style={{ top: '44.76%', height: '6.2%' }}
                    >
                      <ProjectShowcaseCarousel />
                    </div>
                  </div>
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
      <h2
        id="projects-heading"
        className="hero-heading mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black leading-none tracking-tight uppercase sm:mb-20"
      >
        Project
      </h2>

      <div className="mx-auto max-w-[1500px]">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>

      <footer id="contact" className="project-contact-footer flex flex-col items-center gap-8 text-center">
        <motion.div
          className="contact-avatar-wrap relative"
          data-cursor-interactive
          initial={{ opacity: 0, y: 36, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.72, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="contact-heart contact-heart--left" aria-hidden="true">♥</span>
          <span className="contact-heart contact-heart--right" aria-hidden="true">♥</span>
          <img
            src="/contact-avatar.png"
            alt="双手托腮、身旁带爱心的卡通女孩表情"
            loading="lazy"
            className="contact-avatar h-auto w-[clamp(10rem,18vw,15rem)]"
          />
        </motion.div>
        <p className="text-sm font-medium tracking-[0.28em] text-[#F8F5F2]/60 uppercase">Available for selected projects</p>
        <ContactButton onClick={onContact} />
        <p className="text-sm text-[#F8F5F2]/40">2026--zhanglongyu</p>
      </footer>
    </section>
  );
}

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <ScrollProgress />
      <CursorHalo />
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
