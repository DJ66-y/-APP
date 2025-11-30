import React from 'react';

export enum ViewState {
  HOME = 'HOME',
  DEMO = 'DEMO',
  DOCS = 'DOCS',
}

export interface DrawingStep {
  id: number;
  description: string;
  svgElement: React.ReactNode;
  delay?: number;
}

export interface DemoScenario {
  id: string;
  title: string;
  steps: DrawingStep[];
}

export interface DemoModule {
  id: string;
  title: string;
  category: string;
  description: string;
  knowledgePoint: string; 
  icon: React.ReactNode;
  steps?: DrawingStep[]; // Optional now, used for simple modules
  scenarios?: DemoScenario[]; // Used for complex modules with tabs
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}