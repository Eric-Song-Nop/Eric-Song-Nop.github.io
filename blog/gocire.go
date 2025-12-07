// ---
// title: Go Cire generate docs with ide features
// slug: /
// ---
//
// Gocire is a static document generator that turns your source code into documents directly.
// It's highly inspired by Lean4 verso, Aya's literate programming mode and TypeScript's twoslash package.
// However compare to them, we turn the comment into document, and equip source code powerful IDE-like features,
// moreover, we support multiple programming languages, in fact, all languages supported by both [Tree-Sitter](https://tree-sitter.github.io/) and [SCIP](https://github.com/sourcegraph/scip/).
// {/* truncate */}
package blog

// ## IDE features
//
// For now gocire supports hover and jump to definition in local file.

// For example, this is struct definition for a token in defined in goscip
//
// You can try to hover on struct names for documentation.
type TokenInfo struct {
	Symbol   string
	Document []string
	Span     Range
}

// Position line column position of a token
type Position struct {
	Line   int
	Column int
}

// Range from start to end position
//
// The same as most compilers, it includes left, not end `[Start, End)`
// The hover info is CommonMark compatible and supports `KaTex`
// Try hover on `Range`: $\alpha + \beta$
type Range struct {
	Start Position
	End   Position
}

// We did this with the help of [SCIP](https://github.com/sourcegraph/scip/), which is a language index format that works for a few programming languages.

// ## Highlighting
//
// You might have noticed, yes, we did all code syntax highlighting ourselves with [Tree-Sitter](https://tree-sitter.github.io/).
// I don't want to cover this a lot, as we just follow the standard query based method for highlighting.
//
// We haven't implemented highlight queries for all languages, but it should work for most languages supported by SCIP now.
//
// While for code blocks in comment, they are handled by your markdown renderer.
