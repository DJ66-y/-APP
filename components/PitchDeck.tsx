import React from 'react';
import { BookOpen, Award, Cpu, Lightbulb, MonitorPlay, MousePointer, ArrowRight, MessageCircle, CheckCircle } from 'lucide-react';

export const PitchDeck: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-2xl my-8 border border-slate-200">
      <div className="text-center mb-10 pb-6 border-b border-slate-100">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">机械制图助手 (MechDraw Tutor)</h1>
        <p className="text-lg text-slate-500">教师演示版 v1.0 | 智能体竞赛专用</p>
      </div>

      {/* Part 1: Design Specification */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Award className="text-blue-600 w-7 h-7" />
          <h2 className="text-2xl font-bold text-slate-800">一、设计说明</h2>
        </div>
        
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 space-y-6">
            <div>
                <h3 className="font-bold text-slate-700 mb-2 text-lg">1. 设计思路 (Design Philosophy)</h3>
                <p className="text-slate-600 leading-relaxed">
                    针对《机械制图》课程中“原理抽象、绘图步骤繁琐、规范要求高”的特点，本作品采用“可视化引导 + AI 智能辅助”的双核设计模式。
                    通过动态 SVG 演示还原绘图全过程，结合 DeepSeek 大模型实现即时知识问答，旨在构建一个“教、学、练”一体化的智能辅助平台。
                </p>
            </div>

            <div>
                <h3 className="font-bold text-slate-700 mb-2 text-lg">2. 解决的教育场景问题 (Problems Solved)</h3>
                <ul className="list-disc list-inside text-slate-600 space-y-2 ml-2">
                    <li><strong>空间想象难：</strong> 学生难以建立三视图与立体图的对应关系，通过 <span className="text-blue-600 font-medium">动画演示</span> 直观呈现投影规律。</li>
                    <li><strong>作图步骤乱：</strong> 圆弧连接等几何作图辅助线复杂，初学者易遗漏，分步演示功能精准拆解每一步骤。</li>
                    <li><strong>个性化辅导缺位：</strong> 传统课堂教师无法同时回应所有学生疑问，内置 <span className="text-blue-600 font-medium">AI 助手</span> 充当 24小时 助教，解答国标规范与概念问题。</li>
                </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="font-bold text-slate-700 mb-2 text-lg flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-indigo-500" /> 技术路径
                    </h3>
                    <p className="text-slate-600 text-sm">
                        前端采用 React + TailwindCSS 搭建响应式界面；
                        绘图引擎基于 SVG 实现高保真矢量动画；
                        智能核心接入 DeepSeek API，定制“制图大师兄”人设，保障回复接地气且准确。
                    </p>
                </div>
                <div>
                    <h3 className="font-bold text-slate-700 mb-2 text-lg flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-amber-500" /> 核心创新点
                    </h3>
                    <p className="text-slate-600 text-sm">
                        将静态的教材图例转化为动态的可交互代码；
                        AI Prompt 经过针对性优化，专注于机械国标 (GB/T) 解释，避免通用模型的幻觉问题。
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* Part 2: User Manual */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="text-emerald-600 w-7 h-7" />
          <h2 className="text-2xl font-bold text-slate-800">二、APP 使用说明书</h2>
        </div>

        <div className="space-y-6">
            <div className="flex gap-4 items-start">
                <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600 shrink-0 mt-1">
                    <MonitorPlay className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800 text-lg">教学演示功能</h3>
                    <p className="text-slate-600 mt-1">
                        在首页选择对应模块（如“圆弧连接”）。进入后点击下方的 <span className="font-mono bg-slate-100 px-1 rounded text-sm">播放 (Play)</span> 按钮，
                        系统将自动演示作图步骤；也可手动点击“下一步”进行讲解。
                    </p>
                </div>
            </div>

            <div className="flex gap-4 items-start">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600 shrink-0 mt-1">
                    <Cpu className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800 text-lg">AI 智能助教</h3>
                    <p className="text-slate-600 mt-1">
                        点击右下角的 <span className="font-mono bg-slate-100 px-1 rounded text-sm">AI 提问</span> 悬浮窗，
                        按住麦克风或输入文字（如：“M20螺纹孔怎么画？”），AI 将即时返回符合国家标准的解答。
                    </p>
                </div>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mt-6">
                <h4 className="font-bold text-orange-800 text-sm mb-1">注意事项</h4>
                <p className="text-orange-700 text-xs">
                    1. 本版本为演示版，部分高级复杂模型（如装配图爆炸视图）尚未实装。<br/>
                    2. AI 回答仅供参考，生产实践中请严格查阅最新 GB/T 国家标准手册。
                </p>
            </div>
        </div>
      </section>

      {/* Part 3: Workflow */}
      <section>
        <div className="flex items-center gap-3 mb-8">
            <MonitorPlay className="text-purple-600 w-7 h-7" />
            <h2 className="text-2xl font-bold text-slate-800">三、工作流程展示 (Workflow)</h2>
        </div>

        <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-10 right-10 h-1 bg-slate-100 -z-10"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Step 1 */}
                <div className="flex flex-col items-center text-center group">
                    <div className="w-24 h-24 bg-white border-2 border-slate-100 rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:border-purple-400 group-hover:shadow-md transition-all">
                        <MousePointer className="w-8 h-8 text-slate-400 group-hover:text-purple-500" />
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2">1. 选择模块</h3>
                    <p className="text-xs text-slate-500 px-2">用户在首页选择需要学习的知识点（如圆弧连接、三视图）。</p>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center text-center group">
                    <div className="w-24 h-24 bg-white border-2 border-slate-100 rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:border-blue-400 group-hover:shadow-md transition-all">
                        <MonitorPlay className="w-8 h-8 text-slate-400 group-hover:text-blue-500" />
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2">2. 观看演示</h3>
                    <p className="text-xs text-slate-500 px-2">系统逐步渲染矢量动画，清晰展示作图辅助线与结果。</p>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center text-center group">
                    <div className="w-24 h-24 bg-white border-2 border-slate-100 rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:border-emerald-400 group-hover:shadow-md transition-all">
                        <MessageCircle className="w-8 h-8 text-slate-400 group-hover:text-emerald-500" />
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2">3. 智能提问</h3>
                    <p className="text-xs text-slate-500 px-2">通过语音或文字唤起 DeepSeek 助手，解决疑惑。</p>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col items-center text-center group">
                    <div className="w-24 h-24 bg-white border-2 border-slate-100 rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:border-amber-400 group-hover:shadow-md transition-all">
                        <CheckCircle className="w-8 h-8 text-slate-400 group-hover:text-amber-500" />
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2">4. 掌握知识</h3>
                    <p className="text-xs text-slate-500 px-2">通过“看、问、练”闭环，高效掌握机械制图规范。</p>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};