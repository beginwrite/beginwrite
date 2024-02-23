import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "schemas/**/*.graphql",
  documents: ["schemas/**/*.graphql"],
  generates: {
    "./dist/index.ts": {
      plugins: [
        'typescript',
        'typescript-operations',
        '@graphql-codegen/typescript-msw',
         {
          'graphql-codegen-typescript-mock-data': {
            prefix: 'mock',
         },
       },
      ],
      config: {
        enumsAsTypes: true,
        withComponent: true,
        enumPrefix: false,
        typesPrefix: 'I',
        declarationKind: 'interface',
      }
    },
    "./dist/schema.graphql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
      },
    },
    "./dist/schema.json": {
      plugins: ["introspection"],
    },
    "./dist/fragment.json": {
      plugins: ["fragment-matcher"],
    },
  },
  ignoreNoDocuments: true,
  overwrite: true,
};

export default config;
