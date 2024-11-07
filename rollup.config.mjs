import typescript from "@rollup/plugin-typescript";
import { del } from '@kineticcafe/rollup-plugin-delete'

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: "src/index.ts",
  output: {
    format: "esm",
    sourcemap: true,
    dir: "dist",
  },
  plugins: [
    typescript({
      exclude: ["**/test/**"],
    }),
    del({ targets: 'dist/typeguards.d.ts', hook: 'writeBundle' }),
  ],
  external: ["react"],
};

export default config;
