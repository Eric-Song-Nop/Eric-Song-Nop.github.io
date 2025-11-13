/**
 * 主入口文件
 *
 * 这是一个基础的 TypeScript 项目模板
 * 使用 pnpm 作为包管理器，Biome 作为代码格式化工具
 */

function greet(name: string): string {
	return `Hello, ${name}!`;
}

const message = greet("TypeScript World");
console.log(message);

export { greet };
