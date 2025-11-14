/**
 * # Language Info Indexing Techniques
 *
 * The dev of this [cire](https://www.github.com/Eric-Song-Nop/cire)
 * would be much harder without the language service indexing format, lsif and its successor scip.
 * With them, I embeded documentation and definition info into the generated htmls.
 *
 * [lsif](https://microsoft.github.io/language-server-protocol/specifications/lsif/0.6.0/specification/#lsif) is the format that defines how lsps can dump their info into a static file,
 * while sourcegraph takes it and proposed [https://github.com/sourcegraph/scip] which makes it smaller and faster.
 */

/**
 * ## SCIP
 */

// Let's first import the scip package.
import { scip } from "@sourcegraph/scip/bindings/typescript/scip.js";

/**
 * In short scip is lsif but with only the most basic info stored and passed with protobuf.
 * This is for sourcegraph's need to index large amount of code base and querying the indexs faster.
 * This makes scip generator easier to implement than lsif and has a better support from a real company.
 * TBH, I don't think Microsoft cares about lsif.
 *
 * Well the SCIP protocol is simple enough, the typescript binding for it is even poorer,
 * it is barely a wrapper around the protobuf types.
 */

const document = new scip.Document();
const symbol = new scip.Symbol();
const symbolInfo = new scip.SymbolInformation();
/** An occurrence is a symbol token in a document, with role, symbol and range info. */
const occurrences = document.occurrences;
const occurrence = occurrences[0]!;
/** This symbol: string is a url to a symbol which show's its package, and name */
const occ_symbol = occurrence.symbol;
/** We can check an occurrence defines a symbol with its role and a bit and. */
const is_definition =
	(occurrence.symbol_roles & scip.SymbolRole.Definition) > 0;

/**
 * You might find that hover on `scip.Symbol` does not provide any useful info, that's not cire's fault,
 * the scip package simply does not provide any documentation comments.
 */
