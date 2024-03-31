import type { UserConfigExport } from "@tarojs/cli";
export default {
  env: {
    NODE_ENV: '"development"'
  },
  logger: {
    quiet: false,
    stats: true
  },
  mini: {},
  h5: {}
} satisfies UserConfigExport
