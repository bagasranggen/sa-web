export const getElementDimension = (target?: Element | null) => {
    let dimension = {
        width: target?.clientWidth ?? 0,
        height: target?.clientHeight ?? 0,
        outerWidth: target?.clientWidth ?? 0,
        outerHeight: target?.clientHeight ?? 0,
    };

    const computedStyle = target ? getComputedStyle(target) : undefined;

    if (computedStyle) {
        let tmpWidth = {
            width: parseInt(computedStyle?.marginLeft) + parseInt(computedStyle?.marginRight),
            height: parseInt(computedStyle?.marginTop) + parseInt(computedStyle?.marginBottom),
        };

        dimension = Object.assign(dimension, {
            outerWidth: dimension.outerWidth + tmpWidth.width,
            outerHeight: dimension.outerHeight + tmpWidth.height,
        });
    }

    return dimension;
};
