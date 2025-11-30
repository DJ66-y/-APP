import { ChatMessage } from "../types";

// DeepSeek API Configuration
const API_URL = "https://api.deepseek.com/chat/completions";
// 注意：在实际生产环境中，请勿将 API 密钥硬编码在前端代码中，建议通过后端转发。
const API_KEY = "sk-99679e0e6e424901a6eef53a6a50767f"; 
const MODEL_NAME = "deepseek-chat";

class DeepSeekService {
  private apiKey: string;

  constructor() {
    this.apiKey = API_KEY;
  }

  async sendMessage(
    currentMessage: string, 
    history: ChatMessage[]
  ): Promise<string> {
    if (!this.apiKey) {
      throw new Error("API Key is missing.");
    }

    // 1. 构建系统提示词 (System Prompt) - 针对中职学生优化
    const systemInstruction = {
      role: "system",
      content: `你现在的身份是“机械制图大师兄”，专门辅导中职（职业高中）的学弟学妹们学习机械制图。
      
      你的目标用户特点：
      1. 动手能力强，但理论基础相对薄弱。
      2. 讨厌枯燥的定义，喜欢直观、简单的解释。
      3. 需要鼓励，希望能快速解决作业中的绘图难题。

      回答原则（必须严格遵守）：
      1. **拒绝掉书袋**：严禁直接复制粘贴教科书上的长难句定义。要用“大白话”解释。例如，把“投影”比作“灯光下的影子”。
      2. **手把手教学**：遇到“怎么画”的问题，必须用 1、2、3 这样的步骤列表，每一步都要简短清晰。
      3. **语气亲切**：多用“别担心”、“其实很简单”、“你试试看”等鼓励性语言。
      4. **强调规范**：虽然语言通俗，但对线型（粗实线、细虚线）、尺寸标注等国家标准（GB）必须严格准确，不能误导。
      5. **重点突出**：关键的参数、线型名称，请用Markdown **加粗** 显示。

      核心知识库：
      - 三视图（长对正、高平齐、宽相等）
      - 圆弧连接（找圆心是关键）
      - 尺寸标注（数字不能被线穿过）
      
      语言：简体中文，风格幽默、接地气。`
    };

    // 2. 转换历史消息格式
    const contextMessages = history.map(msg => ({
      role: msg.role === 'model' ? 'assistant' : 'user',
      content: msg.text
    }));

    // 3. 组合最终发送的消息列表
    const messages = [
      systemInstruction,
      ...contextMessages,
      { role: "user", content: currentMessage }
    ];

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: MODEL_NAME,
          messages: messages,
          temperature: 0.8, // 稍微提高一点创造性，让语气更自然
          stream: false
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("DeepSeek API Error Details:", errorData);
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || "抱歉，大师兄稍微有点卡壳，你再问一遍试试？";

    } catch (error) {
      console.error("DeepSeek Service Error:", error);
      throw error;
    }
  }
}

export const geminiService = new DeepSeekService();