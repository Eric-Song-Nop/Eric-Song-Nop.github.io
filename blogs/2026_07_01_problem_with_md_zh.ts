/**
 * # Markdown is just bad。
 *
 * 最近做了两个无人在意的和 Markdown 直接相关的开源工具
 * - [gocire](https://github.com/Eric-Song-Nop/gocire/): 一个静态网站生成器，
 *   它的一个后端会生成可以被 [docusaurus](https://docusaurus.io/) 消费的 `MDX` 文档。
 * - [codemirror-treesitter](https://github.com/Eric-Song-Nop/codemirror-treesitter):
 *   一个让 [codemirror](https://codemirror.net/) 可以直接消费 [treesitter](https://tree-sitter.github.io/tree-sitter/)
 *   语法的库，同时包括了一个立即渲染的 Markdown 编辑器。
 *
 * 我认为可以说，Markdown 不管从序列化还是反序列化考虑，都是一坨大的。
 *
 * > 这里当我们讨论 Markdown 时，我们一般指广义 Markdown，一个没有人知道具体语法是什么的标记语言，
 * > 包括但不局限于 CommonMark，GHM，MDX 等Markdown 规范或者实现。
 *
 * > 网络上还有很多优秀的*讨论*文章：
 * > - [Why are we still using markdown](https://bgslabs.org/blog/why-are-we-using-markdown/#more-chaos): 对 Markdown 混乱语法的批评。
 * > - [The future of Markdown](https://news.ycombinator.com/item?id=4700160): 对原始 Markdown 实现的抨击。
 *
 * ## 序列化生成 Markdown 是简单的，吗？
 *
 * 假设我们有一个 Markdown 功能子集的语言要生成 Markdown 文档：
 */

type MdNode =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "tooltip"; text: string };

const doc: MdNode[] = [
  { type: "heading", level: 1, text: "一个简单的文档" },
  { type: "paragraph", text: "这是第一段。" },
  {
    type: "list",
    items: ["第一项", "第二项", "第三项"],
  },
];

/**
 * 这个序列化的实现是非常简单的，当我们试图突破标准 Markdown 语法的时候怎么办呢？
 * 比如我们刚才的`MdNode` 中的 `tooltip` 节点，它是一个 Markdown 语法中没有的节点。
 * 众所周知，Markdown 的语法支持内联 HTML，我们可以自然的尝试直接在 Markdown 中使用 HTML 来实现这个功能，
 * 或者用 MDX 和 JSX 来实现这个功能。
 * 那我们考虑这几段 MDX 文档看看哪个可以正确生成呢？
 *
 * ```html
 * <div style={{backgroundColor: 'violet', padding: '1rem'}}>
 *     Try and change the background color to `tomato`.
 * </div>
 *
 * <pre><code class="language-ts">function hi() \{
 *   console.log(1);
 * \}</code></pre>
 *
 * <pre><code class="language-ts">
 * function hi() \{
 *   console.log(1);
 * \}
 * </code></pre>
 *
 * <pre><code class="language-ts">function hi() {
 *   console.log(1);
 * }</code></pre>
 * ```
 * 答案是只有第一个 `div` 和 第一个 `pre` `code` 可以跑过 MDX parser。
 */
