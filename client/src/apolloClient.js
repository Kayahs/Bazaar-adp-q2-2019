import { onError } from "apollo-link-error";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { withClientState } from "apollo-link-state";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

let apolloClient = null;

const appCache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: "http://localhost:8080/graphql",
  credentials: "include"
});

const stateLink = withClientState({
  cache: appCache
});

apolloClient = new ApolloClient({
  link: ApolloLink.from([stateLink, httpLink]),
  cache: appCache
});

export default apolloClient;
