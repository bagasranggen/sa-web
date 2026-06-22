'use client';

import React, { createContext, PropsWithChildren, useEffect, useState } from 'react';

export type LayoutState = {
    headerHeight: number;
    setHeaderHeight: React.Dispatch<React.SetStateAction<LayoutState['headerHeight']>>;
};

export const LayoutStateContext = createContext<LayoutState>({
    headerHeight: 0,
    setHeaderHeight: () => {},
});

export const LayoutStateContextProvider = ({ children }: PropsWithChildren) => {
    const [headerHeight, setHeaderHeight] = useState<LayoutState['headerHeight']>(0);

    useEffect(() => {
        const body = document.body;

        if (!body) return;
        if (headerHeight === 0) return;

        body.style.setProperty('--header-height', `${headerHeight}px`);
    }, [headerHeight]);

    const defaultContext = { headerHeight, setHeaderHeight };

    return <LayoutStateContext.Provider value={defaultContext}>{children}</LayoutStateContext.Provider>;
};
