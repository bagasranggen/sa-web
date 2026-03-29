import React from 'react';

import { DialogProps } from '@radix-ui/react-dialog';

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/shadcn/Dialog';
import Form, { SearchProps } from '@/components/common/Form';

export type HeaderSearchProps = {
    form?: Pick<SearchProps, 'onFormSubmit'>;
} & Pick<DialogProps, 'open' | 'onOpenChange'>;

const HeaderSearch = ({ open, onOpenChange, form }: HeaderSearchProps): React.ReactElement => {
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={false}
                className="lg:max-w-[60vw]">
                <DialogTitle hidden>Modal Search</DialogTitle>
                <DialogDescription hidden>Modal Search</DialogDescription>

                <Form.Search {...form} />
            </DialogContent>
        </Dialog>
    );
};

export default HeaderSearch;
