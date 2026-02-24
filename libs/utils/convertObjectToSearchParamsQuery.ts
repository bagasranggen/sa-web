import { ArrayStringProps } from '@/libs/@types';
import { joinArrayString } from './joinArrayString';

export type ConvertObjectToSearchParamsQueryProps = {
    obj: object;
    removeParams?: string[];
};

export const convertObjectToSearchParamsQuery = (props?: ConvertObjectToSearchParamsQueryProps): any => {
    let data = undefined;

    const searchParams = new URLSearchParams(window.location.search);

    if (props?.obj) {
        Object.entries(props.obj).forEach(([key, value]) => {
            const checkParams = searchParams.get(key);

            let valueIsValid = true;
            if (value && Array.isArray(value) && value.length === 0) valueIsValid = false;

            if (checkParams && !valueIsValid) searchParams.delete(key);

            if (valueIsValid) {
                let val: ArrayStringProps = [];
                if (value && Array.isArray(value)) val = value;
                if (value && !Array.isArray(value)) val.push(value);
                val = joinArrayString(val, ',');

                if (val) searchParams.set(key, val);
            }
        });

        if (props?.removeParams && props.removeParams.length > 0) {
            props.removeParams.forEach((item) => {
                const checkParams = searchParams.get(item);

                if (checkParams) searchParams.delete(item);
            });
        }

        const tmpSearchParams = searchParams.toString();

        if (tmpSearchParams) data = `?${tmpSearchParams}`;
    }

    return data;
};
