// # Go Cire generate docs with IDE features
//
// Gocire is a static document generator that turns source code into documents.
// It is inspired by Lean 4 Verso, Aya's literate programming mode, and
// TypeScript twoslash, but it keeps the source file as the document source.
//
// This site is generated with the Astro backend and uses language servers for
// hover cards, jump-to-definition links, and inlay hints.
package blogs

// ## IDE features
//
// For now gocire supports hover and jump to definition in local file.

// TokenInfo is example source for hover documentation.
//
// You can try to hover on struct names for documentation.
type TokenInfo struct {
	Symbol   string
	Document []string
	Span     Range
}

// Position is the line and column position of a token.
type Position struct {
	Line   int
	Column int
}

// Range describes a token span from start to end.
//
// The same as most compilers, it includes left, not end: `[Start, End)`.
// The hover info is CommonMark compatible and supports KaTeX.
// Try hover on `Range`: $\alpha + \beta$
type Range struct {
	Start Position
	End   Position
}

// Language servers provide semantic information such as definitions, hover
// documentation, and inlay hints. That means the generated site can keep IDE-like
// behavior without requiring readers to open an editor.

// ## Highlighting
//
// Syntax highlighting is handled directly with Tree-sitter queries.
//
// Code blocks in comments are handled by the Markdown renderer, while real code
// stays tied to the source spans that produced it.
