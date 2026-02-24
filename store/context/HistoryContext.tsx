'use client';

import React, { createContext, PropsWithChildren, Suspense, useState } from 'react';

// import { NavigationEvents } from '@/libs/hooks';

export type HistoryState = {
    routeLength: number;
    routeCurrent: string | null;
    routePrevious: string | null;
};

export const HistoryStateContext = createContext<HistoryState>({
    routeLength: 0,
    routeCurrent: null,
    routePrevious: null,
});

export const HistoryStateContextProvider = ({ children }: PropsWithChildren) => {
    const [routeLength, setRouteLength] = useState<HistoryState['routeLength']>(0);
    const [routeCurrent, setRouteCurrent] = useState<HistoryState['routeCurrent']>(null);
    const [routePrevious, setRoutePrevious] = useState<HistoryState['routePrevious']>(null);

    const defaultContext = { routeLength, routeCurrent, routePrevious };

    return (
        <>
            {/*<Suspense fallback={null}>*/}
            {/*    <NavigationEvents*/}
            {/*        endHandler={(navigation) => {*/}
            {/*            let url = navigation?.pathname;*/}
            {/*            if (navigation?.searchParams && navigation?.searchParams.size > 0) {*/}
            {/*                url += `?${navigation.searchParams}`;*/}
            {/*            }*/}

            {/*            setRoutePrevious(routeCurrent);*/}
            {/*            if (url) setRouteCurrent(url);*/}
            {/*        }}*/}
            {/*    />*/}
            {/*    <NavigationEvents*/}
            {/*        endHandler={() => {*/}
            {/*            setRouteLength((prevState) => prevState + 1);*/}
            {/*        }}*/}
            {/*    />*/}
            {/*</Suspense>*/}

            <HistoryStateContext.Provider value={defaultContext}>{children}</HistoryStateContext.Provider>
        </>
    );
};
