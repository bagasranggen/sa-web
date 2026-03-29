import React from 'react';

import { useForm } from 'react-hook-form';

import Input from '@/components/common/Input';

export const SEARCH_FORM_HANDLE = {
    SEARCH: 'search',
} as const;

export type SearchFormFields = {
    [SEARCH_FORM_HANDLE.SEARCH]: string;
};

export type SearchProps = {
    onFormSubmit?: (data: SearchFormFields) => void;
};

const Search = ({ onFormSubmit }: SearchProps): React.ReactElement => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SearchFormFields>({ mode: 'onChange' });

    return (
        <form
            onSubmit={handleSubmit((data) => {
                if (onFormSubmit) onFormSubmit(data);
            })}>
            <Input.Label
                type="search"
                id={SEARCH_FORM_HANDLE.SEARCH}
                label="Find Your Dream Dress"
                hook={{
                    register,
                    name: SEARCH_FORM_HANDLE.SEARCH,
                    // required: true,
                }}
                error={errors?.[SEARCH_FORM_HANDLE.SEARCH]?.message}
            />
        </form>
    );
};

export default Search;
