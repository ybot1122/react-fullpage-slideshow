import typescript from "@rollup/plugin-typescript";

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
  plugins: [typescript()],
  external: ['react']
};

export default config;