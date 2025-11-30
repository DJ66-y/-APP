import React, { useEffect, useState } from 'react';
import { DrawingStep } from '../types';
import { Play, RotateCcw, Check, Pause, MousePointerClick } from 'lucide-react';

interface DrawingCanvasProps {
  steps: DrawingStep[];
}

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ steps }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Reset when steps change (e.g. switching scenarios)
  useEffect(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [steps]);

  // Auto-play effect
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (isPlaying && currentStepIndex < steps.length - 1) {
      timeout = setTimeout(() => {
        setCurrentStepIndex((prev) => prev + 1);
      }, 2500); // Slower for better observation
    } else if (currentStepIndex === steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, currentStepIndex, steps.length]);

  const reset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const handleStepClick = (index: number) => {
    setIsPlaying(false);
    setCurrentStepIndex(index);
  };

  if (steps.length === 0) return <div className="flex items-center justify-center h-full text-slate-400">无演示数据</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      {/* Canvas Area */}
      <div className="flex-grow bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] bg-slate-50 relative flex items-center justify-center p-4 min-h-[300px] overflow-hidden">
        <div className="absolute top-4 right-4 flex items-center gap-1 text-xs text-slate-400 bg-white/80 px-2 py-1 rounded-full pointer-events-none z-10">
            <MousePointerClick className="w-3 h-3" />
            <span>点击图形查看步骤</span>
        </div>

        {/* ViewBox adapted to provide margin (-20 -20 440 440) for the 400x400 content */}
        <svg viewBox="-20 -20 440 440" className="w-full h-full max-w-[500px] max-h-[500px] select-none">
           {/* Render all steps */}
           {steps.map((step, index) => (
             <g 
                key={step.id} 
                onClick={(e) => {
                    e.stopPropagation();
                    handleStepClick(index);
                }}
                className={`transition-all duration-500 ease-in-out cursor-pointer hover:opacity-100 group`}
                style={{ 
                    // Future steps are faint (opacity 0.15), past/current steps are visible (1)
                    // Ensure Step 0 (Base lines) is always visible if it's the current or past step
                    opacity: index <= currentStepIndex ? 1 : 0.15, 
                    // Allow clicking on future steps to jump ahead
                    pointerEvents: 'auto',
                    filter: index === currentStepIndex && index > 0 ? 'drop-shadow(0 0 2px rgba(59, 130, 246, 0.5))' : 'none'
                }}
             >
               {step.svgElement}
             </g>
           ))}
        </svg>
        
        {/* Step Indicator */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm text-xs font-semibold text-slate-600 border border-slate-200 z-10">
           步骤 {currentStepIndex + 1} / {steps.length}
        </div>
      </div>

      {/* Controls & Description */}
      <div className="p-6 bg-white border-t border-slate-100">
        <div className="flex items-start gap-4 justify-between">
            <div className="flex-1">
                <h3 className="font-bold text-slate-800 text-lg mb-1 flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">
                        {currentStepIndex + 1}
                    </span>
                    图解说明
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed min-h-[3rem] transition-all">
                    {steps[currentStepIndex]?.description}
                </p>
            </div>
            <div className="flex gap-2 shrink-0">
                <button 
                    onClick={reset}
                    className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
                    title="重置 (Reset)"
                >
                    <RotateCcw className="w-5 h-5" />
                </button>
                <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentStepIndex === steps.length - 1
                        ? 'bg-emerald-100 text-emerald-700 cursor-default'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                    disabled={currentStepIndex === steps.length - 1}
                >
                    {currentStepIndex === steps.length - 1 ? (
                        <>
                           <Check className="w-4 h-4" />
                           演示结束
                        </>
                    ) : isPlaying ? (
                        <>
                            <Pause className="w-4 h-4" />
                            暂停
                        </>
                    ) : (
                        <>
                           <Play className="w-4 h-4" />
                           自动播放
                        </>
                    )}
                </button>
            </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const pct = x / rect.width;
            const idx = Math.min(Math.floor(pct * steps.length), steps.length - 1);
            handleStepClick(idx);
        }}>
            <div 
                className="h-full bg-blue-500 transition-all duration-500 ease-out"
                style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
            />
        </div>
      </div>
    </div>
  );
};