import React, { PropsWithChildren } from 'react';

import { GlobalStateContextProvider } from '@/store/context/GlobalContext';
import { HistoryStateContextProvider } from '@/store/context/HistoryContext';
import { LayoutStateContextProvider } from '@/store/context/LayoutContext';
import { NavigationStateContextProvider } from '@/store/context/NavigationContext';

export type ContextProviderProps = PropsWithChildren;

const ContextProvider = ({ children }: ContextProviderProps): React.ReactElement => (
    <GlobalStateContextProvider>
        <HistoryStateContextProvider>
            <LayoutStateContextProvider>
                <NavigationStateContextProvider>{children}</NavigationStateContextProvider>
            </LayoutStateContextProvider>
        </HistoryStateContextProvider>
    </GlobalStateContextProvider>
);

export default ContextProvider;
export * from './root';
