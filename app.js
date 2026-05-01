const templates = [
  {
    title: "痛点开场",
    visual: "把传统文字大纲和视觉分镜并排对比，突出信息拥挤与画面缺失",
    copy: "传统 AI PPT 往往先生成文字，再把文字塞进页面，导致视觉叙事弱、风格不稳定。",
    tags: ["pain point", "comparison"]
  },
  {
    title: "视觉优先流程",
    visual: "用四段横向流程展示主题、分镜、图像提示词、页面成稿",
    copy: "先确定每页的视觉锚点，再补充标题、论据和图像提示词，让内容围绕画面组织。",
    tags: ["workflow", "agent"]
  },
  {
    title: "Agent 协作方式",
    visual: "展示 Codex 在需求拆解、组件实现、截图检查和文档生成之间循环",
    copy: "Codex 参与需求澄清、代码实现、样式调整和导出文档，形成可复用的创作链路。",
    tags: ["codex", "iteration"]
  },
  {
    title: "可验证成果",
    visual: "展示本工具的分镜卡片、Markdown 导出和 JSON 数据结构",
    copy: "项目产出不是单次对话，而是可运行工具、可截图页面、可提交仓库和可复用材料。",
    tags: ["evidence", "output"]
  },
  {
    title: "为什么需要大额度",
    visual: "用多文件上下文、截图反馈、长文档和多轮重构组成 token 消耗地图",
    copy: "长上下文能支持跨文件改造、视觉方案比较和持续迭代，减少重复解释与上下文丢失。",
    tags: ["token plan", "scale"]
  },
  {
    title: "下一步计划",
    visual: "展示从本地原型到 GitHub、在线演示、模板库和真实 API 接入的路线",
    copy: "后续会加入真实模型调用、模板库、导出 PPTX 和自动化截图检查。",
    tags: ["roadmap", "github"]
  },
  {
    title: "使用场景",
    visual: "三个场景卡片：项目申请、课程汇报、产品介绍",
    copy: "工具适合需要快速表达清楚项目价值的人，把想法转化为能展示的页面结构。",
    tags: ["use case", "presentation"]
  },
  {
    title: "评估方式",
    visual: "用检查清单展示主题一致性、画面可读性、导出质量和迭代速度",
    copy: "每次生成后都可以检查页面主题、视觉锚点、文案密度和素材提示词是否一致。",
    tags: ["quality", "review"]
  }
];

const styleMap = {
  "clean-tech": "clean technology editorial layout, precise spacing, calm background, sharp product framing",
  editorial: "magazine editorial layout, strong photo crop, documentary tone, balanced text blocks",
  product: "product launch presentation, bold object focus, crisp studio lighting, confident composition",
  research: "research report visual, data-informed layout, annotated diagram, restrained professional style"
};

const topicInput = document.querySelector("#topicInput");
const audienceInput = document.querySelector("#audienceInput");
const countInput = document.querySelector("#countInput");
const styleInput = document.querySelector("#styleInput");
const generateBtn = document.querySelector("#generateBtn");
const copyBtn = document.querySelector("#copyBtn");
const jsonBtn = document.querySelector("#jsonBtn");
const slidesGrid = document.querySelector("#slidesGrid");
const markdownPreview = document.querySelector("#markdownPreview");
const deckTitle = document.querySelector("#deckTitle");
const statusText = document.querySelector("#statusText");

let currentDeck = [];

function summarizeTopic(topic) {
  const normalized = topic.trim().replace(/\s+/g, " ");
  if (!normalized) return "未命名演示";
  return normalized.length > 24 ? `${normalized.slice(0, 24)}...` : normalized;
}

function buildDeck() {
  const count = Math.max(3, Math.min(8, Number(countInput.value) || 5));
  const topic = topicInput.value.trim();
  const audience = audienceInput.value;
  const style = styleInput.value;
  const base = templates.slice(0, count);

  currentDeck = base.map((item, index) => ({
    page: index + 1,
    title: item.title,
    audience,
    visual: item.visual,
    copy: item.copy,
    imagePrompt: `${styleMap[style]}, topic: ${topic || "AI presentation project"}, page goal: ${item.visual}, no tiny text, high readability`,
    tags: item.tags
  }));

  renderDeck();
}

function renderDeck() {
  const title = summarizeTopic(topicInput.value);
  deckTitle.textContent = title;
  statusText.textContent = `${currentDeck.length} pages ready`;

  slidesGrid.innerHTML = "";
  currentDeck.forEach((slide) => {
    const card = document.createElement("article");
    card.className = "slide-card";
    card.innerHTML = `
      <div class="slide-visual">
        <div class="slide-number">${String(slide.page).padStart(2, "0")}</div>
      </div>
      <div class="slide-body">
        <div class="tag-row">
          ${slide.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
        <h3>${slide.title}</h3>
        <p>${slide.copy}</p>
        <div class="prompt-box">${slide.imagePrompt}</div>
      </div>
    `;
    slidesGrid.appendChild(card);
  });

  markdownPreview.textContent = toMarkdown();
}

function toMarkdown() {
  const topic = topicInput.value.trim() || "未命名演示";
  const lines = [
    `# ${topic}`,
    "",
    `目标听众：${audienceInput.value}`,
    `视觉风格：${styleInput.options[styleInput.selectedIndex].text}`,
    "",
    "## 分镜"
  ];

  currentDeck.forEach((slide) => {
    lines.push(
      "",
      `### ${slide.page}. ${slide.title}`,
      `- 页面文案：${slide.copy}`,
      `- 视觉锚点：${slide.visual}`,
      `- 图片提示词：${slide.imagePrompt}`,
      `- 标签：${slide.tags.join(", ")}`
    );
  });

  lines.push(
    "",
    "## 申请表可用摘要",
    "我使用 Codex 构建了一个视觉优先的 PPT 分镜工具。它把主题拆解为页面目标、视觉锚点、文案和图片提示词，帮助我从项目申请、课程汇报到产品介绍快速生成可迭代的演示稿结构。这个项目需要长上下文支持，因为每次迭代都要同时参考代码、截图、页面目标和导出文档。"
  );

  return lines.join("\n");
}

async function copyMarkdown() {
  const markdown = toMarkdown();
  try {
    await navigator.clipboard.writeText(markdown);
    copyBtn.textContent = "已复制";
    setTimeout(() => {
      copyBtn.textContent = "复制 Markdown";
    }, 1200);
  } catch {
    markdownPreview.focus();
  }
}

function downloadJson() {
  const payload = {
    topic: topicInput.value.trim(),
    audience: audienceInput.value,
    style: styleInput.value,
    slides: currentDeck
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "ppt-image-first-deck.json";
  link.click();
  URL.revokeObjectURL(url);
}

generateBtn.addEventListener("click", buildDeck);
copyBtn.addEventListener("click", copyMarkdown);
jsonBtn.addEventListener("click", downloadJson);

buildDeck();
