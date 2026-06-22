'use client';

import React, { createContext, PropsWithChildren } from 'react';

// import { getEnvFeature } from '@/libs/utils';

export type GlobalState = {
    // isDev: boolean;
    // isMultiLanguage: boolean;
    // isThemeToggle: boolean;
};

export const GlobalStateContext = createContext<GlobalState>({
    // isDev: false,
    // isMultiLanguage: false,
    // isThemeToggle: false,
});

export const GlobalStateContextProvider = ({ children }: PropsWithChildren) => {
    // const { isDev, isMultiLanguage, isThemeToggle } = getEnvFeature();

    const defaultContext = {
        // isDev, isMultiLanguage, isThemeToggle
    };

    return <GlobalStateContext.Provider value={defaultContext}>{children}</GlobalStateContext.Provider>;
};
