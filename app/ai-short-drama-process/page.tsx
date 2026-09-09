import type { Metadata } from 'next';
import { ArrowLeft, ArrowUp } from 'lucide-react';

export const metadata: Metadata = {
  title: '制作过程 | AI Short Drama',
  description: '张龙煜 AI 短剧作品的创作与制作过程。',
};

const pages = [
  { number: '01', alt: 'AI 短剧制作过程封面' },
  { number: '02', alt: '项目制作流程与脚本生成说明' },
  { number: '03', alt: '主要角色资产设定' },
  { number: '04', alt: '医院、餐厅与道路场景道具资产' },
  { number: '05', alt: '小云雀自由画布和提示词生成视频流程' },
  { number: '06', alt: '人物光源方向问题与分镜图解决方案' },
  { number: '07', alt: '画面穿帮问题与更换镜头解决方案' },
  { number: '08', alt: '从粗剪、精剪到字幕、音效与配乐的剪辑流程' },
];

export default function AiShortDramaProcessPage() {
  return (
    <main id="top" className="min-h-screen bg-[#171717] text-[#FFFDF8]">
      <header className="sticky top-0 z-20 border-b border-white/15 bg-[#171717]/95 backdrop-blur-md">
        <div className="mx-auto grid w-[min(calc(100%_-_32px),1600px)] grid-cols-[1fr_auto] items-center gap-4 py-4 sm:grid-cols-[1fr_auto_1fr] sm:py-5">
          <a
            href="/"
            className="inline-flex w-fit items-center gap-2 text-xs font-semibold tracking-[0.12em] uppercase transition-colors hover:text-[#F06FB6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F06FB6] sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            返回作品集
          </a>
          <h1 className="hidden text-center text-sm font-semibold tracking-[0.12em] text-[#F06FB6] uppercase sm:block sm:text-lg">
            AI Short Drama · 制作过程
          </h1>
          <span className="justify-self-end text-xs tracking-[0.18em] text-white/55 uppercase sm:text-sm">08 Pages</span>
        </div>
      </header>

      <section className="mx-auto w-[min(calc(100%_-_32px),1600px)] py-6 sm:py-10" aria-label="AI 短剧制作过程">
        <div className="mb-7 flex items-end justify-between gap-6 sm:mb-10">
          <div>
            <p className="mb-2 text-xs font-medium tracking-[0.18em] text-[#F06FB6] uppercase sm:text-sm">Project 03</p>
            <h2 className="text-[clamp(2rem,6vw,5.5rem)] font-bold leading-none uppercase">AI Short Drama</h2>
          </div>
          <p className="hidden max-w-sm text-right text-sm leading-relaxed text-white/55 md:block">
            从剧本分镜、角色与场景资产，到视频生成和后期剪辑的完整制作记录。
          </p>
        </div>

        <div className="space-y-6 sm:space-y-10">
          {pages.map((page, index) => (
            <figure key={page.number} id={`page-${page.number}`} className="scroll-mt-24">
              <figcaption className="mb-2 flex items-center gap-3 text-xs tracking-[0.16em] text-white/45 uppercase sm:mb-3 sm:text-sm">
                <span className="text-[#F06FB6]">{page.number}</span>
                <span className="h-px flex-1 bg-white/15" />
              </figcaption>
              <img
                src={`/ai-short-drama-process/page-${index + 1}.jpg`}
                alt={page.alt}
                width={1920}
                height={1080}
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                className="block h-auto w-full border border-white/15 bg-white"
              />
            </figure>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/15 py-8 sm:py-10">
        <div className="mx-auto flex w-[min(calc(100%_-_32px),1600px)] items-center justify-between gap-6">
          <a className="text-sm font-semibold transition-colors hover:text-[#F06FB6]" href="/">
            ← 返回作品集
          </a>
          <a
            href="#top"
            className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-[#F06FB6]"
          >
            回到顶部
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </footer>
    </main>
  );
}
