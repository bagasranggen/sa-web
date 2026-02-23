import React from 'react';

import { useLayoutStateContext } from '@/store/context';

import { Drawer, DrawerProps, DrawerContent } from '@/components/shadcn/Drawer';

export type HeaderModalProps = Pick<DrawerProps, 'open' | 'onClose' | 'children'>;

const HeaderModal = ({ open, onClose, children }: HeaderModalProps): React.ReactElement => {
    const { headerHeight } = useLayoutStateContext();

    return (
        <Drawer
            open={open}
            onClose={onClose}
            direction="bottom">
            <DrawerContent
                overlay={false}
                className="h-[calc(100dvh-var(--header-height))] mt-0! max-h-[unset] border-0! radius-0!"
                style={{ '--header-height': headerHeight + 'px' } as React.CSSProperties}

                // className="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]"
            >
                {children}

                {/*<div className="no-scrollbar overflow-y-auto p-2">*/}
                {/*<p>*/}
                {/*    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae blanditiis consectetur,*/}
                {/*    consequuntur culpa deserunt dignissimos dolor enim error fuga magni molestias, nam nihil*/}
                {/*    nostrum nulla odit reiciendis temporibus voluptatibus! Tempora.*/}
                {/*</p>*/}
                {/*</div>*/}
            </DrawerContent>
        </Drawer>
    );
};

export default HeaderModal;
