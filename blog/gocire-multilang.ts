// ---
// title: Gocire generate docs with ide features does work for multiple languages
// authors: ericoolen
// tags:
//   - cire
// ---
/**
 * Gocire supports multiple programming languages, yes.
 */
class GoCire {
    constructor(parameters) {
    }
}

/**
 * In fact, we should be able to support all programming languages with support by [Tree-Sitter](https://tree-sitter.github.io/) with [LSP](https://microsoft.github.io/language-server-protocol/) or [SCIP](https://github.com/sourcegraph/scip/).
 *
 * This is super helpful for programming languages with inference or gradual typing.
 * For example, the monad language, Haskell, some people(me) really rely on editor's inlay hint
 * or hover documentation to understand what's going on with types, and yes gocire supports Haskell with hls.
 *
 * While for now, we cannot have multiple source code of multiple languages in one file, as we are using the source code itself as doc source, thus I have to demonstrate how it works on haskell in another file.
 */
