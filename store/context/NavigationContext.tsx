'use client';

import React, { createContext, PropsWithChildren, useEffect, useState } from 'react';

export type NavigationState = {
    activeDropdown: React.ReactNode | string | undefined;
    setActiveDropdown: React.Dispatch<React.SetStateAction<NavigationState['activeDropdown']>>;
    navigationModalIsOpen: boolean;
    setNavigationModalIsOpen: React.Dispatch<React.SetStateAction<NavigationState['navigationModalIsOpen']>>;
    searchModalIsOpen: boolean;
    setSearchModalIsOpen: React.Dispatch<React.SetStateAction<NavigationState['searchModalIsOpen']>>;
};

export const NavigationStateContext = createContext<NavigationState>({
    activeDropdown: undefined,
    setActiveDropdown: () => {},
    navigationModalIsOpen: false,
    setNavigationModalIsOpen: () => {},
    searchModalIsOpen: false,
    setSearchModalIsOpen: () => {},
});

export const NavigationStateContextProvider = ({ children }: PropsWithChildren) => {
    const [activeDropdown, setActiveDropdown] = useState<NavigationState['activeDropdown']>();
    const [navigationModalIsOpen, setNavigationModalIsOpen] = useState<NavigationState['navigationModalIsOpen']>(false);
    const [searchModalIsOpen, setSearchModalIsOpen] = useState<NavigationState['searchModalIsOpen']>(false);

    // lock window scroll on modal open
    useEffect(() => {
        const body = document.body;
        const windowScrollLock = 'overflow-hidden';

        if (!body) return;

        if (navigationModalIsOpen) body.classList.add(windowScrollLock);
        if (!navigationModalIsOpen) body.classList.remove(windowScrollLock);
    }, [navigationModalIsOpen]);

    const defaultContext = {
        activeDropdown,
        setActiveDropdown,
        navigationModalIsOpen,
        setNavigationModalIsOpen,
        searchModalIsOpen,
        setSearchModalIsOpen,
    };

    return <NavigationStateContext.Provider value={defaultContext}>{children}</NavigationStateContext.Provider>;
};
