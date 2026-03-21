'use client';

import React, { PropsWithChildren } from 'react';

import { apolloClient } from '@/libs/fetchers';

import { ApolloProvider } from '@apollo/client/react';

export type ApolloProps = PropsWithChildren;

const Apollo = ({ children }: ApolloProps): React.ReactElement => {
    return <ApolloProvider client={apolloClient({ isServer: false })}>{children}</ApolloProvider>;
};

export default Apollo;
