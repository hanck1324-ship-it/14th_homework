
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://main-practice.codebootcamp.co.kr/graphql",

  documents: ["src/components/**/*.ts", "!src/commons/graphql/**"],

  generates: {
    "src/commons/graphql/": {
      preset: "client",
    }
  }
};

export default config;