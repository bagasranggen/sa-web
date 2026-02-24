'use client';

import React, { createContext, PropsWithChildren, useEffect, useState } from 'react';

export type NavigationState = {
    activeDropdown: React.ReactNode | string | undefined;
    setActiveDropdown: React.Dispatch<React.SetStateAction<NavigationState['activeDropdown']>>;
    navigationModalIsOpen: boolean;
    setNavigationModalIsOpen: React.Dispatch<React.SetStateAction<NavigationState['navigationModalIsOpen']>>;
};

export const NavigationStateContext = createContext<NavigationState>({
    activeDropdown: undefined,
    setActiveDropdown: () => {},
    navigationModalIsOpen: false,
    setNavigationModalIsOpen: () => {},
});

export const NavigationStateContextProvider = ({ children }: PropsWithChildren) => {
    const [activeDropdown, setActiveDropdown] = useState<NavigationState['activeDropdown']>();
    const [navigationModalIsOpen, setNavigationModalIsOpen] = useState<NavigationState['navigationModalIsOpen']>(false);

    // lock window scroll on modal open
    useEffect(() => {
        const body = document.body;
        const windowScrollLock = 'overflow-hidden';

        if (!body) return;

        if (navigationModalIsOpen) body.classList.add(windowScrollLock);
        if (!navigationModalIsOpen) body.classList.remove(windowScrollLock);
    }, [navigationModalIsOpen]);

    const defaultContext = { activeDropdown, setActiveDropdown, navigationModalIsOpen, setNavigationModalIsOpen };

    return <NavigationStateContext.Provider value={defaultContext}>{children}</NavigationStateContext.Provider>;
};
