// # Go Cire：生成带有 IDE 功能的站点
//
// [Gocire](https://www.github.com/Eric-Song-Nop/gocire) 是一个静态文档生成器，可以把源代码转换成文档。
// 它受到 Lean 4 Verso、Aya 的文学编程模式和 TypeScript twoslash 的启发，
// 但仍然把源文件本身作为文档来源。
//
// 本站点由 Astro 后端生成，并使用语言服务器提供悬浮提示、跳转到定义链接和内联提示。
// 你可以把托管在 <https://www.github.com/Eric-Song-Nop/Eric-Song-Nop.github.io>
// 的这个项目看作一份教程，了解如何用 gocire 生成带有 IDE 功能的博客站点。
package blogs

// ## IDE 功能
//
// 目前 gocire 支持本地文件中的悬浮提示和跳转到定义。

// ZhTokenInfo 是用于展示悬浮文档的示例源码。
//
// 你可以尝试把鼠标悬停在结构体名称上查看文档。
type ZhTokenInfo struct {
	Symbol   string
	Document []string
	Span     ZhRange
}

// ZhPosition 表示 token 的行列位置。
type ZhPosition struct {
	Line   int
	Column int
}

// ZhRange 描述 token 从起点到终点的跨度。
//
// 和大多数编译器一样，它包含左端点，不包含右端点：`[Start, End)`。
// 悬浮信息兼容 CommonMark，并支持 KaTeX。
// 试着悬停在 `ZhRange` 上：$\alpha + \beta$
type ZhRange struct {
	Start ZhPosition
	End   ZhPosition
}

// 语言服务器会提供定义、悬浮文档和内联提示等语义信息。
// 这意味着生成后的站点可以保留类似 IDE 的行为，而不需要读者打开编辑器。

// ## 高亮
//
// 语法高亮直接由 Tree-sitter 查询处理。
//
// 注释中的代码块由 Markdown 渲染器处理，而真实代码仍然绑定到生成它的源码跨度。
