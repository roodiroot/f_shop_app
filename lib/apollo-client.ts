import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.EXPO_PUBLIC_GRAPHQL_URL }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products_connection: {
            keyArgs: ["filters", "sort"],
            merge(existing, incoming) {
              if (!incoming) return existing;

              const incomingPage = incoming?.pageInfo?.page;

              if (incomingPage === 1) {
                return incoming;
              }

              const existingNodes = existing?.nodes ?? [];
              const incomingNodes = incoming?.nodes ?? [];

              const seen = new Set(existingNodes.map((n: any) => n.documentId));
              const mergedNodes = [
                ...existingNodes,
                ...incomingNodes.filter((n: any) => !seen.has(n.documentId)),
              ];

              return {
                ...incoming,
                nodes: mergedNodes,
              };
            },
          },
        },
      },
    },
  }),
});

export default client;
