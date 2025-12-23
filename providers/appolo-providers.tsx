import client from "@/lib/apollo-client";
import { ApolloProvider } from "@apollo/client/react";

const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
