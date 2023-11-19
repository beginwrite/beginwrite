import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "schemas/**/*.gql",
  documents: ["schemas/**/*.gql"],
  generates: {
    "./dist/clinet": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
    "./dist/server/resolvers-types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
  ignoreNoDocuments: true,
};

export default config;
