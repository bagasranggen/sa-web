import { ApolloClient, InMemoryCache, HttpLink, OperationVariables } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';

const API_URL = process.env.NEXT_PUBLIC_GQL_URL;
const GQL_SERVER_TOKEN = process.env.GQL_TOKEN;
const GQL_CLIENT_TOKEN = process.env.NEXT_PUBLIC_GQL_CLIENT_TOKEN;
const VERCEL_BYPASS_SECRET = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

const httpLink = new HttpLink({
    uri: API_URL,
    credentials: 'include',
});

const authLink = (isServer: boolean = true) => {
    let authToken = 'tokens API-Key ';
    if (isServer) authToken += GQL_SERVER_TOKEN;
    if (!isServer) authToken += GQL_CLIENT_TOKEN;

    return new SetContextLink(({ headers }) => ({
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: authToken,
            'x-vercel-protection-bypass': VERCEL_BYPASS_SECRET,
        },
    }));
};

export const apolloClient = (props?: { isServer: boolean }) => {
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: authLink(props?.isServer).concat(httpLink),
        defaultOptions: {
            query: {
                fetchPolicy: 'network-only',
            },
        },
    });
};

export type { OperationVariables };

if (process.env.NODE_ENV !== 'production') {
    loadDevMessages();
    loadErrorMessages();
}
