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

const centeredPageWidth = {
  width: 'min(calc(100% - 32px), 1600px)',
  marginInline: 'auto',
} as const;

export default function AiShortDramaProcessPage() {
  return (
    <main id="top" className="min-h-screen bg-[#171717] text-[#FFFDF8]">
      <header className="sticky top-0 z-20 border-b border-white/15 bg-[#171717]/95 backdrop-blur-md">
        <div
          className="grid grid-cols-[1fr_auto] items-center gap-4 py-4 sm:grid-cols-[1fr_auto_1fr] sm:py-5"
          style={centeredPageWidth}
        >
          <a
            href="/#project-card-03"
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

      <section className="py-6 sm:py-10" style={centeredPageWidth} aria-label="AI 短剧制作过程">
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
              <div className="relative">
                <img
                  src={`/ai-short-drama-process/page-${index + 1}.jpg`}
                  alt={page.alt}
                  width={1920}
                  height={1080}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  className="block h-auto w-full border border-white/15 bg-white"
                />
                {index === 0 ? (
                  <a
                    href="https://acnd2cprlmfq.feishu.cn/wiki/BDMAww7SHiKuy7kOIqYcgz83ntb"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="打开飞书项目链接（新标签页）"
                    title="打开飞书链接"
                    className="absolute top-[18.25%] left-[3.9%] h-[6.6%] w-[14.95%] cursor-pointer rounded-full transition-all hover:bg-white/10 hover:ring-4 hover:ring-[#F06FB6]/70 focus-visible:bg-white/10 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#F06FB6]"
                  >
                    <span className="sr-only">打开飞书链接</span>
                  </a>
                ) : null}
              </div>
            </figure>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/15 py-8 sm:py-10">
        <div
          className="flex flex-col items-stretch justify-between gap-5 sm:flex-row sm:items-center"
          style={centeredPageWidth}
        >
          <a
            className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full border-2 border-[#F06FB6] bg-[#F06FB6] px-6 text-base font-bold text-[#171717] shadow-[4px_4px_0_#FFFDF8] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F06FB6] sm:min-h-16 sm:w-auto sm:px-10 sm:text-xl"
            href="/#project-card-03"
          >
            <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
            返回作品集
          </a>
          <a
            href="#top"
            className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full border-2 border-[#FFFDF8] px-6 text-base font-bold text-[#FFFDF8] transition-colors hover:border-[#F06FB6] hover:bg-[#F06FB6] hover:text-[#171717] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F06FB6] sm:min-h-16 sm:w-auto sm:px-10 sm:text-xl"
          >
            回到顶部
            <ArrowUp className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
          </a>
        </div>
      </footer>
    </main>
  );
}
