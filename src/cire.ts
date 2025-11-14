/**
 * # Static site generator: [cire](https://www.github.com/Eric-Song-Nop/cire)
 *
 * Cire is a static site generator inspired by
 * - [aya's literate mode](https://blog.kiva.moe/posts/intro-literate-aya.html)
 * - [agda literate markdown](https://jesper.sikanda.be/posts/literate-agda.html)
 * - [lean's verso](https://github.com/leanprover/verso).
 * In usage, it might be most similar to verso, while cire is different from all of them.
 *
 * The final goal of cire is to provide a nice abstraction for all programming languages' literate programming.
 * I hope they can have full ide support when writing documents, with all info embedded into final product.
 */

/**
 * Try to hover on the interface to see doc.
 * ok, the doc is just this text.
 */
interface TryHover {
	msg: string;
	range?: {
		start: number;
		end: number;
	};
	letsTakeMoreLinesToMakeTheJumpingMoreClear?: {
		dummy: string;
		alsoDummy: string;
		maybeEnough?: boolean;
		maybeNot?: boolean;
		okThatsIt: string;
	};
}

/** Try to click the `TryHover` type below, it will bring you to the definition above with a highlight */
const clickme: TryHover = {
	msg: "Click me!",
};

/**
 * For that final goal, it is bad to create a new .{lang}.md format, which breaks all ides when writing.
 * And we have to find a nice static way to get all language info from source code, scip or lsif are two just ok options.
 * The best is to use a language server protocol (LSP) to get all necessary information at runtime, but that would be too heavy for any website, and dangerous.
 */

/**
 * ## Highlight
 *
 * Oh my gosh, I almost forgot about highlight.
 *
 * As we have to do so much on the final doc generation, why I don't implement the syntax highlighting myself.
 * I mean, maybe I have no other choice either.
 */

/** You are right, I use Tree-Sitter with custom highlighing solution */
import Parser = require("tree-sitter");
const parser = new Parser();
/** For now the only language we are supporting is TypeScript, but with treesiter's language injection method: */
import TypeScriptLangs from "tree-sitter-typescript";
parser.setLanguage(TypeScriptLangs.typescript as Parser.Language)
/** We will be able to support any languages. */
