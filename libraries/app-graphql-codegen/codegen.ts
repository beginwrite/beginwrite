import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "schemas/**/*.graphql",
  documents: ["schemas/**/*.graphql"],
  generates: {
    "./dist/index.ts": {
      plugins: ["typescript"],
      config: {
        enumsAsTypes: true,
        withComponent: true,
        enumPrefix: false,
        typesPrefix: 'I',
        declarationKind: 'interface'
      }
    },
    "./dist/schema.graphql": {
      plugins: ["schema-ast"],
    },
    "./dist/schema.json": {
      plugins: ["introspection"],
    },
    "./dist/fragment.json": {
      plugins: ["fragment-matcher"],
    },
  },
  ignoreNoDocuments: true,
};

export default config;
