export type ConvertSearchParamsToObjectProps = Record<string, string>;

export const convertSearchParamsToObject = (params: ConvertSearchParamsToObjectProps) => {
    let length: number = 0;
    let data: Record<string, string[]> = {};
    let arr: [string, string][] | undefined = undefined;

    if (params) {
        const paramsArr = Object.entries(params);

        if (paramsArr.length > 0) {
            arr = paramsArr;
            length = paramsArr.length;

            paramsArr.forEach(([key, value]) => {
                if (value) data = Object.assign(data, { [key]: value.split(',') });
            });
        }
    }

    return {
        params: data,
        paramsArr: arr,
        paramsLength: length,
    };
};
