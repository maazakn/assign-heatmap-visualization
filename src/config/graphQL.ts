import { GraphQLClient } from 'graphql-request';

const githubToken = process.env.GITHUB_TOKEN;
const endpoint = 'https://api.github.com/graphql';

export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${githubToken}`,
  },
});