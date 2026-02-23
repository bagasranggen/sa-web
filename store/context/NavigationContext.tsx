'use client';

import React, { createContext, PropsWithChildren, useState } from 'react';

export type NavigationState = {
    activeDropdown: string | undefined;
    setActiveDropdown: React.Dispatch<React.SetStateAction<NavigationState['activeDropdown']>>;
};

export const NavigationStateContext = createContext<NavigationState>({
    activeDropdown: undefined,
    setActiveDropdown: () => {},
});

export const NavigationStateContextProvider = ({ children }: PropsWithChildren) => {
    const [activeDropdown, setActiveDropdown] = useState<NavigationState['activeDropdown']>();

    const defaultContext = { activeDropdown, setActiveDropdown };

    return <NavigationStateContext.Provider value={defaultContext}>{children}</NavigationStateContext.Provider>;
};
