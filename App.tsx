import React, { useState, useEffect } from 'react';
import { ViewState } from './types';
import { DEMO_MODULES } from './constants';
import { DrawingCanvas } from './components/DrawingCanvas';
import { AIAssistant } from './components/AIAssistant';
import { PitchDeck } from './components/PitchDeck';
import { 
  Layout, 
  MessageSquare, 
  BookOpen, 
  ChevronRight, 
  PenTool, 
  GraduationCap 
} from 'lucide-react';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.HOME);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const selectedModule = DEMO_MODULES.find(m => m.id === selectedModuleId);
  
  // Set default scenario when a module is selected
  useEffect(() => {
    if (selectedModule?.scenarios && selectedModule.scenarios.length > 0) {
        setSelectedScenarioId(selectedModule.scenarios[0].id);
    } else {
        setSelectedScenarioId(null);
    }
  }, [selectedModuleId, selectedModule]);

  const activeScenario = selectedModule?.scenarios?.find(s => s.id === selectedScenarioId);
  const activeSteps = activeScenario ? activeScenario.steps : selectedModule?.steps || [];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800 flex items-center gap-2">
          <PenTool className="text-blue-500 w-6 h-6" />
          <h1 className="text-white font-bold text-lg tracking-tight">机械制图助手</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => { setViewState(ViewState.HOME); setSelectedModuleId(null); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${viewState === ViewState.HOME ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}
          >
            <Layout className="w-5 h-5" />
            <span>教学演示 (Demo)</span>
          </button>
          
          <button 
            onClick={() => setViewState(ViewState.DOCS)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${viewState === ViewState.DOCS ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}
          >
            <BookOpen className="w-5 h-5" />
            <span>使用说明 (Manual)</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800 rounded-xl p-4">
             <div className="flex items-center gap-2 text-white mb-2">
                <GraduationCap className="w-5 h-5" />
                <span className="font-semibold text-sm">教师演示版</span>
             </div>
             <p className="text-xs text-slate-400">
               Version 1.0 <br/>
               智能体竞赛专用
             </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <h2 className="font-semibold text-slate-800 text-lg flex items-center gap-2">
            {viewState === ViewState.HOME && !selectedModule && "课程演示模块"}
            {viewState === ViewState.HOME && selectedModule && (
                <>
                    <button onClick={() => setSelectedModuleId(null)} className="text-slate-400 hover:text-blue-600">目录</button>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                    <span className="text-slate-800">{selectedModule.title}</span>
                    {activeScenario && (
                        <>
                           <ChevronRight className="w-4 h-4 text-slate-300" />
                           <span className="text-blue-600 font-medium">{activeScenario.title}</span>
                        </>
                    )}
                </>
            )}
            {viewState === ViewState.DOCS && "APP 使用说明书"}
          </h2>

          <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`md:hidden p-2 rounded-full ${isChatOpen ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'}`}
          >
            <MessageSquare className="w-5 h-5" />
          </button>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6 relative">
          
          {viewState === ViewState.HOME && !selectedModule && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DEMO_MODULES.map(module => (
                <div 
                    key={module.id} 
                    onClick={() => setSelectedModuleId(module.id)}
                    className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {module.icon}
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mb-2">{module.title}</h3>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-2">{module.description}</p>
                  <div className="text-xs font-medium text-emerald-700 bg-emerald-50 inline-block px-2 py-1 rounded">
                    知识点：{module.knowledgePoint}
                  </div>
                </div>
              ))}
            </div>
          )}

          {viewState === ViewState.HOME && selectedModule && (
            <div className="h-full max-h-[calc(100vh-8rem)] flex flex-col">
              
              {/* Scenario Selector (Tabs) */}
              {selectedModule.scenarios && (
                  <div className="flex gap-2 mb-4 overflow-x-auto pb-2 shrink-0">
                      {selectedModule.scenarios.map(sc => (
                          <button
                            key={sc.id}
                            onClick={() => setSelectedScenarioId(sc.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors border ${
                                selectedScenarioId === sc.id
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                              {sc.title}
                          </button>
                      ))}
                  </div>
              )}

              <div className="flex-1 min-h-0">
                 <DrawingCanvas key={selectedScenarioId || selectedModule.id} steps={activeSteps} />
              </div>
            </div>
          )}

          {viewState === ViewState.DOCS && (
            <PitchDeck />
          )}

          {/* Floating Chat Button (Desktop) */}
          <div className="fixed bottom-8 right-8 hidden md:block z-50">
             {!isChatOpen && (
                <button 
                    onClick={() => setIsChatOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-full shadow-lg transition-transform hover:scale-105"
                >
                    <MessageSquare className="w-5 h-5" />
                    <span className="font-semibold">AI 提问</span>
                </button>
             )}
          </div>

          {/* Chat Modal/Popover */}
          {isChatOpen && (
            <div className="fixed bottom-4 right-4 md:bottom-24 md:right-8 z-50 w-full md:w-auto px-4 md:px-0">
               <div className="relative">
                   <button 
                     onClick={() => setIsChatOpen(false)}
                     className="absolute -top-3 -right-3 bg-white text-slate-500 hover:text-red-500 rounded-full p-1 shadow-md border border-slate-200 z-10"
                   >
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                   </button>
                   <AIAssistant />
               </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default App;