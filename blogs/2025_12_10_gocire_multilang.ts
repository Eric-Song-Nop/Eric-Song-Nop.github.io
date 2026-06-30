/**
 * # Gocire works across languages
 *
 * Gocire supports multiple programming languages through Tree-sitter and the
 * Language Server Protocol.
 */
class GoCire {
  constructor(private readonly name = "gocire") {}

  title() {
    return `${this.name} generated this TypeScript page`;
  }
}

/**
 * A source file can be the article and the executable example at the same time.
 *
 * The generated page keeps syntax highlighting and LSP-backed IDE features
 * attached to the real code instead of a copied Markdown snippet.
 */
const generator = new GoCire();
console.log(generator.title());
