import React from 'react';
import { DemoModule } from './types';
import { Ruler, Box, Combine, Circle, Minus, Orbit } from 'lucide-react';

// Styles for drawing elements
const STYLES = {
  baseLine: { stroke: "#1e293b", strokeWidth: "3", strokeLinecap: "round" as const }, // Dark Slate
  auxLine: { stroke: "#3b82f6", strokeWidth: "2", strokeDasharray: "6 3" }, // Blue
  resultLine: { stroke: "#dc2626", strokeWidth: "4", strokeLinecap: "round" as const, fill: "none" }, // Red
  point: { fill: "#dc2626", r: "5" },
  pointLabel: { className: "text-sm font-bold fill-red-600" },
  textBase: { className: "text-xs font-medium fill-slate-500" },
  textDim: { className: "text-xs fill-slate-400" },
  axis: { stroke: "#64748b", strokeWidth: "1" },
  phantom: { opacity: 0.3 }
};

export const DEMO_MODULES: DemoModule[] = [
  {
    id: 'projection-basics',
    title: '三面投影基础 (Projections)',
    category: 'Basic Theory',
    description: '学习点、线、面在三投影面体系（V, H, W）中的投影规律。',
    knowledgePoint: '点：长对正、高平齐、宽相等；线：实长、积聚、类似性。',
    icon: <Orbit className="w-6 h-6" />,
    scenarios: [
        {
            id: 'point-projection',
            title: '点的投影 (Point)',
            steps: [
                {
                    id: 1,
                    description: "1. 建立三投影面体系：V面(正立)、H面(水平)、W面(侧立)。O为原点。",
                    svgElement: (
                        <g>
                            {/* Axes */}
                            <line x1="20" y1="200" x2="380" y2="200" {...STYLES.axis} /> {/* X Axis */}
                            <line x1="200" y1="20" x2="200" y2="380" {...STYLES.axis} /> {/* Z Axis & Y Axis vertical */}
                            
                            {/* Labels */}
                            <text x="370" y="190" className="text-xs font-bold">X</text>
                            <text x="210" y="30" className="text-xs font-bold">Z</text>
                            <text x="210" y="370" className="text-xs font-bold">Yw</text>
                            
                            {/* 45 degree line for W projection */}
                            <line x1="200" y1="200" x2="340" y2="340" stroke="#cbd5e1" strokeDasharray="4 2" />
                            <text x="185" y="215" className="text-xs font-bold">O</text>
                            <text x="30" y="190" className="text-xs fill-slate-400">V (Front)</text>
                            <text x="30" y="220" className="text-xs fill-slate-400">H (Top)</text>
                            <text x="210" y="190" className="text-xs fill-slate-400">W (Left)</text>
                        </g>
                    )
                },
                {
                    id: 2,
                    description: "2. 正面投影 a'：反映点的 x, z 坐标（距离W面和H面的距离）。",
                    svgElement: (
                        <g>
                            <circle cx="120" cy="100" {...STYLES.point} />
                            <text x="110" y="90" {...STYLES.pointLabel}>a'</text>
                            {/* Projectors */}
                            <line x1="120" y1="100" x2="120" y2="200" stroke="#94a3b8" strokeDasharray="2 2" />
                        </g>
                    )
                },
                {
                    id: 3,
                    description: "3. 水平投影 a：反映点的 x, y 坐标。符合“长对正”(与 a' 在同一垂直线上)。",
                    svgElement: (
                        <g>
                            <circle cx="120" cy="280" {...STYLES.point} />
                            <text x="110" y="300" {...STYLES.pointLabel}>a</text>
                            {/* Projectors */}
                            <line x1="120" y1="200" x2="120" y2="280" stroke="#94a3b8" strokeDasharray="2 2" />
                            <line x1="120" y1="280" x2="200" y2="280" stroke="#94a3b8" strokeDasharray="2 2" />
                        </g>
                    )
                },
                {
                    id: 4,
                    description: "4. 侧面投影 a\"：反映点的 y, z 坐标。符合“高平齐”(与 a' 等高)、“宽相等”。",
                    svgElement: (
                        <g>
                             {/* Calculate Yw from a: Y distance is 80 (280-200). 
                                 Map to 45 deg line: x = 200+80 = 280, y = 200+80 = 280.
                                 Then project UP to Z=100.
                             */}
                             <line x1="200" y1="280" x2="280" y2="280" stroke="#cbd5e1" strokeDasharray="2 2" />
                             <line x1="280" y1="280" x2="280" y2="100" stroke="#cbd5e1" strokeDasharray="2 2" />
                             <line x1="120" y1="100" x2="280" y2="100" stroke="#94a3b8" strokeDasharray="2 2" />

                             <circle cx="280" cy="100" {...STYLES.point} />
                             <text x="290" y="90" {...STYLES.pointLabel}>a"</text>
                        </g>
                    )
                }
            ]
        },
        {
            id: 'line-projection',
            title: '直线的投影 (Line)',
            steps: [
                {
                    id: 1,
                    description: "1. 一般位置直线：三个投影都不反映实长，且都倾斜于投影轴。",
                    svgElement: (
                         <g>
                             {/* Axes */}
                            <line x1="20" y1="200" x2="380" y2="200" {...STYLES.axis} /> 
                            <line x1="200" y1="20" x2="200" y2="380" {...STYLES.axis} />
                            <line x1="200" y1="200" x2="340" y2="340" stroke="#cbd5e1" strokeDasharray="4 2" />
                            
                            <text x="30" y="190" className="text-xs fill-slate-400">V</text>
                            <text x="30" y="220" className="text-xs fill-slate-400">H</text>
                            <text x="210" y="190" className="text-xs fill-slate-400">W</text>
                         </g>
                    )
                },
                {
                    id: 2,
                    description: "2. 作出两端点 A, B 的正面投影 a'b'。",
                    svgElement: (
                        <g>
                            {/* a'(100, 80), b'(160, 140) */}
                            <line x1="100" y1="80" x2="160" y2="140" stroke="#1e293b" strokeWidth="3" />
                            <text x="90" y="70" {...STYLES.textBase}>a'</text>
                            <text x="170" y="140" {...STYLES.textBase}>b'</text>
                            <line x1="100" y1="80" x2="100" y2="200" stroke="#94a3b8" strokeDasharray="2 2" />
                            <line x1="160" y1="140" x2="160" y2="200" stroke="#94a3b8" strokeDasharray="2 2" />
                        </g>
                    )
                },
                {
                    id: 3,
                    description: "3. 作出水平投影 ab 和侧面投影 a\"b\"。",
                    svgElement: (
                        <g>
                            {/* Top View: a(100, 260), b(160, 320) */}
                            <line x1="100" y1="260" x2="160" y2="320" stroke="#1e293b" strokeWidth="3" />
                            <text x="90" y="270" {...STYLES.textBase}>a</text>
                            <text x="170" y="330" {...STYLES.textBase}>b</text>
                            
                            {/* Projectors */}
                            <line x1="100" y1="200" x2="100" y2="260" stroke="#94a3b8" strokeDasharray="2 2" />
                            <line x1="160" y1="200" x2="160" y2="320" stroke="#94a3b8" strokeDasharray="2 2" />

                            {/* W View Calculations: 
                                a_y_depth = 60 -> x=260 on 45deg -> up to z=80. a"(260, 80)
                                b_y_depth = 120 -> x=320 on 45deg -> up to z=140. b"(320, 140)
                            */}
                            <line x1="260" y1="80" x2="320" y2="140" stroke="#1e293b" strokeWidth="3" />
                            <text x="260" y="70" {...STYLES.textBase}>a"</text>
                            <text x="330" y="140" {...STYLES.textBase}>b"</text>

                            {/* Aux lines */}
                            <path d="M100 260 L200 260 L260 320 L260 80" fill="none" stroke="#e2e8f0" strokeDasharray="2 2" />
                        </g>
                    )
                }
            ]
        }
    ]
  },
  {
    id: 'arc-tangency',
    title: '圆弧连接综合 (Arc Tangency)',
    category: 'Basic Geometry',
    description: '包含直线与直线、直线与圆、圆与圆的多种连接方式（内切/外切）。',
    knowledgePoint: '核心口诀：外切相加 (R+r)，内切相减 (R-r)，直线画平行。',
    icon: <Combine className="w-6 h-6" />,
    scenarios: [
        {
            id: 'lines-lines',
            title: '两直线 (Lines)',
            steps: [
                {
                    id: 1,
                    description: "1. 已知：两条相交直线 L1, L2，夹角为锐角 (45°)，连接半径 R=50。",
                    svgElement: (
                    <g>
                        <line x1="40" y1="300" x2="360" y2="300" {...STYLES.baseLine} />
                        <line x1="100" y1="300" x2="350" y2="50" {...STYLES.baseLine} />
                        <text x="370" y="305" {...STYLES.textBase} fontSize="14">L1</text>
                        <text x="360" y="50" {...STYLES.textBase} fontSize="14">L2</text>
                    </g>
                    )
                },
                {
                    id: 2,
                    description: "2. 辅助线：分别作距离 L1, L2 为 R (50) 的平行线。",
                    svgElement: (
                    <g>
                        <line x1="40" y1="250" x2="360" y2="250" {...STYLES.auxLine} />
                        <line x1="160" y1="310.7" x2="280" y2="190.7" {...STYLES.auxLine} />
                        <text x="370" y="255" className="text-xs fill-blue-500 font-bold">L1'</text>
                    </g>
                    )
                },
                {
                    id: 3,
                    description: "3. 定圆心：两平行线交点 O 即为圆心。",
                    svgElement: (
                    <g>
                        <circle cx="220.7" cy="250" {...STYLES.point} />
                        <text x="235" y="250" {...STYLES.pointLabel}>O</text>
                    </g>
                    )
                },
                {
                    id: 4,
                    description: "4. 定切点：过 O 分别向 L1, L2 作垂线，垂足 T1, T2 即为切点。",
                    svgElement: (
                    <g>
                        <line x1="220.7" y1="250" x2="220.7" y2="300" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
                        <circle cx="220.7" cy="300" r="4" fill="#1e293b" />
                        <text x="225" y="325" className="text-xs font-bold fill-slate-700">T1</text>

                        <line x1="220.7" y1="250" x2="185.35" y2="214.65" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
                        <circle cx="185.35" cy="214.65" r="4" fill="#1e293b" />
                        <text x="165" y="210" className="text-xs font-bold fill-slate-700">T2</text>
                    </g>
                    )
                },
                {
                    id: 5,
                    description: "5. 画弧：以 O 为圆心，R 为半径，从 T2 到 T1 画圆弧。",
                    svgElement: (
                    <g>
                        <path d="M 185.35 214.65 A 50 50 0 0 0 220.7 300" {...STYLES.resultLine} />
                    </g>
                    )
                }
            ]
        },
        {
            id: 'line-circle',
            title: '线与圆 (Line & Circle)',
            steps: [
                {
                    id: 1,
                    description: "1. 已知：直线 L, 圆 O1 (r=30)，连接半径 R=80。",
                    svgElement: (
                      <g>
                        <line x1="40" y1="350" x2="360" y2="350" {...STYLES.baseLine} />
                        <circle cx="100" cy="200" r="30" {...STYLES.baseLine} fill="none" />
                        <text x="370" y="355" {...STYLES.textBase} fontSize="14">L</text>
                        <text x="90" y="205" {...STYLES.textBase}>O1</text>
                      </g>
                    )
                },
                {
                    id: 2,
                    description: "2. 辅助线 I：作直线 L 的平行线，距离为 R (80)。",
                    svgElement: (
                       <g>
                         <line x1="40" y1="270" x2="360" y2="270" {...STYLES.auxLine} />
                         <text x="370" y="275" className="text-xs fill-blue-500 font-bold">L'</text>
                       </g>
                    )
                },
                {
                    id: 3,
                    description: "3. 辅助线 II：以 O1 为圆心，R+r (110) 为半径画圆弧。",
                    svgElement: (
                        <path d="M 210 200 A 110 110 0 0 1 155 295" {...STYLES.auxLine} fill="none" />
                    )
                },
                {
                    id: 4,
                    description: "4. 定圆心：交点 O 即为圆心。",
                    svgElement: (
                        <g>
                           <circle cx="184.85" cy="270" {...STYLES.point} />
                           <text x="195" y="260" {...STYLES.pointLabel}>O</text>
                        </g>
                    )
                },
                {
                     id: 5,
                     description: "5. 定切点并画弧：连接 O1O 交圆于 T1，过 O 作 L 垂线得 T2。",
                     svgElement: (
                         <g>
                            <line x1="184.85" y1="270" x2="184.85" y2="350" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2"/>
                            <circle cx="184.85" cy="350" r="4" fill="#1e293b" />
                            <text x="190" y="370" className="text-xs font-bold fill-slate-700">T2</text>
            
                            <line x1="100" y1="200" x2="184.85" y2="270" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
                            <circle cx="123.14" cy="219.09" r="4" fill="#1e293b" />
                            <text x="110" y="215" className="text-xs font-bold fill-slate-700">T1</text>
            
                            <path d="M 123.14 219.09 A 80 80 0 0 0 184.85 350" {...STYLES.resultLine} />
                         </g>
                     )
                }
            ]
        },
        {
            id: 'two-circles-ext',
            title: '两圆外切 (Two Circles Ext)',
            steps: [
                {
                    id: 1,
                    description: "1. 已知：圆 O1(r1=30), 圆 O2(r2=30) 及连接半径 R=80。",
                    svgElement: (
                      <g>
                         <circle cx="100" cy="250" r="30" {...STYLES.baseLine} fill="none"/>
                         <circle cx="300" cy="250" r="30" {...STYLES.baseLine} fill="none"/>
                         <text x="95" y="255" {...STYLES.textBase}>O1</text>
                         <text x="295" y="255" {...STYLES.textBase}>O2</text>
                      </g>
                    )
                },
                {
                    id: 2,
                    description: "2. 找圆心：R+r1 (110) 和 R+r2 (110) 为半径画辅助弧。",
                    svgElement: (
                       <g>
                          <path d="M 170 170 A 110 110 0 0 1 210 220" {...STYLES.auxLine} fill="none" />
                          <path d="M 230 170 A 110 110 0 0 0 190 220" {...STYLES.auxLine} fill="none" />
                       </g>
                    )
                },
                {
                    id: 3,
                    description: "3. 确定交点 O 并连接圆心以求切点。",
                    svgElement: (
                       <g>
                          <circle cx="200" cy="204.2" {...STYLES.point} />
                          <text x="200" y="195" {...STYLES.pointLabel}>O</text>
                          <line x1="100" y1="250" x2="200" y2="204.2" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2"/>
                          <line x1="300" y1="250" x2="200" y2="204.2" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2"/>
                       </g>
                    )
                },
                {
                    id: 4,
                    description: "4. 画连接弧：以 O 为圆心，R 为半径绘图。",
                    svgElement: (
                       <g>
                           <circle cx="127.27" cy="237.5" r="4" fill="#1e293b" />
                           <circle cx="272.73" cy="237.5" r="4" fill="#1e293b" />
                           <path d="M 127.27 237.5 A 80 80 0 0 0 272.73 237.5" {...STYLES.resultLine} />
                       </g>
                    )
                }
            ]
        },
        {
            id: 'two-circles-int',
            title: '两圆内切 (Two Circles Int)',
            steps: [
                {
                    id: 1,
                    description: "1. 已知：圆 O1(r1=30), 圆 O2(r2=20), 距离 100。连接半径 R=100 (包住两圆)。",
                    svgElement: (
                      <g>
                         <circle cx="100" cy="250" r="30" {...STYLES.baseLine} fill="none"/>
                         <circle cx="200" cy="250" r="20" {...STYLES.baseLine} fill="none"/>
                         <text x="90" y="255" {...STYLES.textBase}>O1</text>
                         <text x="190" y="255" {...STYLES.textBase}>O2</text>
                      </g>
                    )
                },
                {
                    id: 2,
                    description: "2. 找圆心：内切相减。分别以 R-r1 (70) 和 R-r2 (80) 为半径画辅助弧。",
                    svgElement: (
                       <g>
                          {/* O1 (100,250), R-r1=70.
                              O2 (200,250), R-r2=80.
                              Intersection calculation:
                              x = 132.5, y = 190.5 (Approx)
                              d(132.5,190.5 to 100,250) = sqrt(32.5^2 + 59.5^2) = sqrt(1056+3540) = 67.7 (close to 70)
                              Exact: Triangle 100-70-80.
                              Let O = (x, y). 
                              (x-100)^2 + y^2 = 70^2
                              (x-200)^2 + y^2 = 80^2
                              Subtract: (x-100)^2 - (x-200)^2 = 4900 - 6400 = -1500
                              x^2 - 200x + 10000 - (x^2 - 400x + 40000) = -1500
                              200x - 30000 = -1500 -> 200x = 28500 -> x = 142.5
                              y^2 = 4900 - 42.5^2 = 4900 - 1806.25 = 3093.75 -> y = 55.6
                              So y_svg = 250 - 55.6 = 194.4.
                              Center O(142.5, 194.4).
                           */}
                          <path d="M 60 190 A 70 70 0 0 1 170 250" {...STYLES.auxLine} strokeDasharray="4 2" fill="none" />
                          <path d="M 160 180 A 80 80 0 0 0 240 250" {...STYLES.auxLine} strokeDasharray="4 2" fill="none" />
                       </g>
                    )
                },
                {
                    id: 3,
                    description: "3. 定圆心：辅助弧交点 O 即为圆心。",
                    svgElement: (
                        <g>
                            <circle cx="142.5" cy="194.4" {...STYLES.point} />
                            <text x="145" y="185" {...STYLES.pointLabel}>O</text>
                            {/* Connect lines extended to find tangent points on the far side */}
                            {/* Line O(142.5, 194.4) through O1(100, 250) distance 100 */}
                            <line x1="142.5" y1="194.4" x2="81.8" y2="273.8" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 2" />
                            {/* Line O through O2(200, 250) distance 100 */}
                            <line x1="142.5" y1="194.4" x2="228.8" y2="277.8" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 2" />
                        </g>
                    )
                },
                {
                    id: 4,
                    description: "4. 画内切弧：以 O 为圆心，R(100) 为半径画大弧包围两圆。",
                    svgElement: (
                        <g>
                            <circle cx="81.8" cy="273.8" r="4" fill="#1e293b" />
                            <text x="65" y="280" className="text-xs font-bold">T1</text>
                            <circle cx="228.8" cy="277.8" r="4" fill="#1e293b" />
                            <text x="235" y="285" className="text-xs font-bold">T2</text>
                            {/* Arc from T1 to T2 centered at 142.5, 194.4 */}
                            <path d="M 81.8 273.8 A 100 100 0 0 0 228.8 277.8" {...STYLES.resultLine} />
                        </g>
                    )
                }
            ]
        }
    ]
  },
  {
    id: 'three-view',
    title: '三视图判断 (Three-View)',
    category: 'Projection',
    description: '理解主视图、俯视图、左视图的投影关系。',
    knowledgePoint: '“长对正、高平齐、宽相等”是画三视图的核心法则。',
    icon: <Box className="w-6 h-6" />,
    steps: [
      {
        id: 1,
        description: "1. 布局：建立视图区域。左上为主视图，左下为俯视图，右上为左视图。",
        svgElement: (
          <g>
            <line x1="20" y1="200" x2="380" y2="200" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="200" y1="20" x2="200" y2="380" stroke="#cbd5e1" strokeWidth="1" />
            <text x="30" y="190" className="text-xs fill-slate-500">主 (Front)</text>
            <text x="30" y="220" className="text-xs fill-slate-500">俯 (Top)</text>
            <text x="210" y="190" className="text-xs fill-slate-500">左 (Left)</text>
          </g>
        )
      },
      {
        id: 2,
        description: "2. 主视图 (Front)：反映物体长和高。L形物体（缺口在右上）。",
        svgElement: (
          <g>
             <path d="M 80 80 L 120 80 L 120 120 L 160 120 L 160 160 L 80 160 Z" fill="#94a3b8" stroke="#1e293b" strokeWidth="3" />
          </g>
        )
      },
      {
        id: 3,
        description: "3. 俯视图 (Top)：长对正。位于主视图正下方，可见两个平面。",
        svgElement: (
          <g>
             <rect x="80" y="240" width="40" height="40" fill="#cbd5e1" stroke="#1e293b" strokeWidth="3" />
             <rect x="120" y="240" width="40" height="40" fill="#cbd5e1" stroke="#1e293b" strokeWidth="3" />
             <line x1="80" y1="160" x2="80" y2="240" stroke="#94a3b8" strokeDasharray="4 2" />
             <line x1="160" y1="160" x2="160" y2="240" stroke="#94a3b8" strokeDasharray="4 2" />
             <line x1="120" y1="160" x2="120" y2="240" stroke="#94a3b8" strokeDasharray="4 2" />
          </g>
        )
      },
      {
        id: 4,
        description: "4. 左视图 (Left)：高平齐、宽相等。位于主视图右侧，看到左侧面（矩形）。",
        svgElement: (
          <g>
             <rect x="240" y="80" width="40" height="80" fill="#64748b" stroke="#1e293b" strokeWidth="3" />
             <line x1="160" y1="80" x2="240" y2="80" stroke="#94a3b8" strokeDasharray="4 2" />
             <line x1="160" y1="160" x2="240" y2="160" stroke="#94a3b8" strokeDasharray="4 2" />
             <line x1="200" y1="200" x2="280" y2="280" stroke="#cbd5e1" strokeDasharray="4 2" />
             <path d="M 80 280 L 240 280 L 240 160" stroke="#cbd5e1" strokeWidth="1" fill="none" strokeDasharray="2 2" />
             <path d="M 120 280 L 280 280 L 280 160" stroke="#cbd5e1" strokeWidth="1" fill="none" strokeDasharray="2 2" />
          </g>
        )
      },
      {
         id: 5,
         description: "5. 立体示意图 (Isometric)：辅助理解空间形状（L型底座）。",
         svgElement: (
             <g transform="translate(320, 340)">
                 <path d="M0 0 L-15 -10 L-15 -90 L0 -80 Z" fill="#64748b" stroke="white" strokeWidth="1" />
                 <path d="M30 -55 L60 -70 L45 -80 L15 -65 Z" fill="#e2e8f0" stroke="white" strokeWidth="1" />
                 <path d="M0 -80 L30 -95 L15 -105 L-15 -90 Z" fill="#e2e8f0" stroke="white" strokeWidth="1" />
                 <path d="M0 0 L60 -30 L60 -70 L30 -55 L30 -95 L0 -80 Z" fill="#94a3b8" stroke="white" strokeWidth="1" />
                 <text x="-30" y="20" className="text-[10px] fill-slate-400">立体图 (Isometric)</text>
             </g>
         )
      }
    ]
  },
  {
    id: 'dimensions',
    title: '尺寸标注 (Dimensioning)',
    category: 'Standards',
    description: '学习正确的尺寸界线、尺寸线及数字标注规则。',
    knowledgePoint: '尺寸数字不可被任何图线穿过，且必须写在尺寸线上方。',
    icon: <Ruler className="w-6 h-6" />,
    steps: [
      {
        id: 1,
        description: "基本要素：尺寸界线、尺寸线、箭头、尺寸数字。",
        svgElement: (
           <g transform="translate(50, 50)">
              <rect x="50" y="50" width="200" height="100" stroke="#1e293b" strokeWidth="3" fill="none"/>
           </g>
        )
      },
      {
        id: 2,
        description: "尺寸界线：由图形轮廓引出，超出尺寸线 2-3mm。",
        svgElement: (
          <g transform="translate(50, 50)">
             <line x1="50" y1="150" x2="50" y2="180" stroke="#1e293b" strokeWidth="1" />
             <line x1="250" y1="150" x2="250" y2="180" stroke="#1e293b" strokeWidth="1" />
          </g>
        )
      },
      {
        id: 3,
        description: "尺寸线：与被标注线段平行。箭头需细长。",
        svgElement: (
          <g transform="translate(50, 50)">
             <line x1="50" y1="170" x2="250" y2="170" stroke="#1e293b" strokeWidth="1" />
             <path d="M50 170 L60 167 L60 173 Z" fill="#1e293b" />
             <path d="M250 170 L240 167 L240 173 Z" fill="#1e293b" />
          </g>
        )
      },
      {
        id: 4,
        description: "尺寸数字：写在尺寸线上方，字头向上。",
        svgElement: (
          <g transform="translate(50, 50)">
             <text x="150" y="165" textAnchor="middle" className="font-sans text-lg font-bold fill-slate-800">200</text>
          </g>
        )
      }
    ]
  }
];