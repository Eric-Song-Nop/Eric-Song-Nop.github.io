// ---
// title: Mobvibe：在任何设备上连接本地 AI Agent
// authors: ericoolen
// slug: /mobvibe
// tags:
//   - mobvibe
//   - acp
//   - agent
// ---
/**
 * Mobvibe 是一个面向本地 AI Agent 工作流的分布式 ACP WebUI。
 * 它把浏览器、桌面端或移动端界面和你本机上的 Agent CLI 连接起来，
 * 让你可以在任何设备上继续同一个会话，而不需要自己折腾反向代理或复杂网络配置。
 *
 * 这篇页面继续沿用这个博客的写法：先写一份源码稿，再通过 `gocire` 转成真正的文档页面。
 * 也就是说，这个 TypeScript 文件本身就是文章源文件。
 *
 * 如果你只想尽快上手，最短路径是：
 *
 * ```bash
 * npx @mobvibe/cli login
 * npx @mobvibe/cli start
 * ```
 */
// {/* truncate */}

export const quickStartCommands = [
	"npx @mobvibe/cli login",
	"npx @mobvibe/cli start",
] as const;

/**
 * ## Mobvibe 是什么
 *
 * 从仓库现状看，Mobvibe 的定位非常明确：
 *
 * - `WebUI` 负责跨设备交互体验
 * - `Gateway` 负责在云端或自托管环境中转连接
 * - `CLI Daemon` 常驻在你的本地机器上，真正持有工作区与 Agent 进程
 * - `ACP Agents` 是 Claude Code、OpenCode、Gemini CLI 等兼容 ACP 的后端
 *
 * 这让 Mobvibe 不只是“给某一个 Agent 套个网页皮肤”，而是把 ACP 生态串成一个统一入口。
 */

export type RuntimeTarget = "web" | "desktop" | "mobile";

export type MobvibeRole =
	| "webui"
	| "gateway"
	| "cli-daemon"
	| "acp-agent";

export interface MobvibeProjectSummary {
	name: "Mobvibe";
	runtimeTargets: readonly RuntimeTarget[];
	protocol: "ACP";
	supportedExperience: readonly string[];
}

export const mobvibeProjectSummary: MobvibeProjectSummary = {
	name: "Mobvibe",
	runtimeTargets: ["web", "desktop", "mobile"],
	protocol: "ACP",
	supportedExperience: [
		"多 Agent 会话",
		"实时流式聊天",
		"端到端加密",
		"文件浏览器与 @ 提及",
	],
};

/**
 * ## 为什么这个项目值得单独写一页
 *
 * `mobvibe` 仓库本身已经是一个 monorepo：
 *
 * - `apps/website` 提供营销站和产品介绍
 * - `apps/gateway` 负责 HTTP / WebSocket 中继
 * - `apps/mobvibe-cli` 提供登录、守护进程、密钥和本地 Agent 管理
 * - `apps/webui` 提供真正的用户界面，并通过 Tauri 跑到桌面与移动端
 *
 * 因此这篇文章不去机械复制某个真实生产文件，而是提炼一份更适合阅读的源码化总览，
 * 把最重要的概念压缩到一个文件里，再交给 `gocire` 生成文档。
 */

export interface MobvibeModule {
	role: MobvibeRole;
	ownedBy: string;
	responsibility: string;
}

export const mobvibeModules: readonly MobvibeModule[] = [
	{
		role: "webui",
		ownedBy: "apps/webui",
		responsibility: "渲染会话、订阅实时事件，并在浏览器或 Tauri 中承载 UI。",
	},
	{
		role: "gateway",
		ownedBy: "apps/gateway",
		responsibility: "校验连接来源、维护 Socket 通道，并把 WebUI 与本地 CLI 连接起来。",
	},
	{
		role: "cli-daemon",
		ownedBy: "apps/mobvibe-cli",
		responsibility: "常驻本机，管理 Agent 生命周期、工作区、日志与加密上下文。",
	},
	{
		role: "acp-agent",
		ownedBy: "本机已安装的 ACP Agent",
		responsibility: "真正执行编码与对话任务，例如 Claude Code、OpenCode、Gemini CLI。",
	},
] as const;

/**
 * ## 核心链路
 *
 * `mobvibe` 的基本链路可以概括成下面这几步：
 *
 * 1. 用户在 WebUI 发起或恢复一个会话
 * 2. Gateway 负责保持连接、鉴权和事件中转
 * 3. 本地 CLI Daemon 与 Gateway 建立连接，并持有真实工作区访问权
 * 4. CLI Daemon 通过 ACP 与具体 Agent 交互
 * 5. 会话事件再被推回 WebUI，以便在任意设备继续阅读和操作
 *
 * 这里最关键的一点是：真正接触本地代码仓库和 Agent 进程的，是你自己机器上的守护进程，不是 Gateway。
 */

export interface SessionHop {
	from: MobvibeRole;
	to: MobvibeRole;
	transport: "http" | "websocket" | "stdio";
	payload: string;
}

export const sessionFlow: readonly SessionHop[] = [
	{
		from: "webui",
		to: "gateway",
		transport: "websocket",
		payload: "会话订阅、输入事件、实时输出",
	},
	{
		from: "gateway",
		to: "cli-daemon",
		transport: "websocket",
		payload: "鉴权后的会话事件与设备连接状态",
	},
	{
		from: "cli-daemon",
		to: "acp-agent",
		transport: "stdio",
		payload: "ACP 请求、工具调用、流式响应",
	},
] as const;

/**
 * ## 快速开始背后到底发生了什么
 *
 * `mobvibe login` 这一步负责认证并生成端到端加密所需的主密钥。
 * `mobvibe start` 则会启动本地守护进程，并在首次运行时让你选择要启用的 Agent。
 *
 * 这也是为什么 README 给出的最小命令集只有两行：它已经覆盖了“登录 + 启动守护进程”两件核心动作。
 */

export interface QuickStartStep {
	command: (typeof quickStartCommands)[number];
	effect: string;
}

export const quickStartSteps: readonly QuickStartStep[] = [
	{
		command: "npx @mobvibe/cli login",
		effect: "完成认证，并为后续 WebUI 配对准备主密钥。",
	},
	{
		command: "npx @mobvibe/cli start",
		effect: "启动本地守护进程，扫描可用 ACP Agent，并把本机接入 Gateway。",
	},
] as const;

/**
 * ## 这套架构为什么适合本地 AI Agent
 *
 * 我认为 Mobvibe 的价值主要有四点：
 *
 * - **多 Agent**：它面向 ACP，而不是单一供应商
 * - **跨设备**：浏览器、桌面端、移动端共享同一套交互模型
 * - **E2EE**：会话内容在 CLI 侧加密，Gateway 负责路由而不是读取正文
 * - **本地优先**：真正持有工作区的是本地守护进程，不是远程服务器
 *
 * 如果你的目标是“在沙发上用手机继续看本机 Agent 跑出来的结果”，
 * 或者“在办公室电脑和家里电脑之间延续同一个本地开发流”，这套模型就很顺手。
 */

export interface Capability {
	name: string;
	whyItMatters: string;
}

export const capabilities: readonly Capability[] = [
	{
		name: "多 Agent 支持",
		whyItMatters: "可以把不同 ACP Agent 纳入同一个交互入口，而不是为每个工具单独建一套远程方案。",
	},
	{
		name: "端到端加密",
		whyItMatters: "Gateway 负责中转，不负责读取会话正文，适合把敏感上下文留在自己的设备侧。",
	},
	{
		name: "跨平台",
		whyItMatters: "同一套 WebUI 可以跑在浏览器、桌面和移动端，减少重复建设。",
	},
	{
		name: "文件浏览器与 @ 提及",
		whyItMatters: "远程继续会话时，仍然可以围绕代码树组织上下文，而不是退化成纯聊天窗口。",
	},
] as const;

/**
 * ## 总结
 *
 * 如果用一句话概括，我会把 Mobvibe 描述为：
 *
 * “一个把本地 ACP Agent 工作流延伸到任意设备上的分布式入口。”
 *
 * 它不替代本地 Agent，也不试图把代码执行搬到云端；
 * 它做的是把已经存在于你本机上的 Agent 能力，变成更连续、更适合跨设备使用的产品体验。
 */
