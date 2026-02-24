import React from 'react';

import { useLayoutStateContext } from '@/store/context';

import { Drawer, DrawerProps, DrawerContent, DrawerTitle, DrawerDescription } from '@/components/shadcn/Drawer';

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
                style={{ '--header-height': `${headerHeight}px` } as React.CSSProperties}>
                <DrawerTitle hidden>Navigation Mobile Links</DrawerTitle>
                <DrawerDescription hidden>Mobile Links</DrawerDescription>
                {children}
            </DrawerContent>
        </Drawer>
    );
};

export default HeaderModal;
