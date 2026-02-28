import React from 'react';

import { ClassnameProps } from '@/libs/@types';

export type CheckProps = {} & ClassnameProps;

const Check = ({ className }: CheckProps): React.ReactElement => {
    return (
        <svg
            {...(className ? { className: className } : {})}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="9.2461"
            height="7.1518"
            viewBox="0 0 9.2461 7.1518">
            <path
                transform="matrix(1 0 0 1 -0.331787 -0.453796)"
                d="M9.22535 0.774646C8.79753 0.34682 8.10388 0.346822 7.67606 0.774648L4.89066 3.56005C4.55485 3.89585 4.0994 4.08451 3.6245 4.08451C3.28031 4.08451 2.94503 3.98579 2.65621 3.80012L1.97264 3.36068C1.49781 3.05544 0.868244 3.17249 0.536175 3.62896C0.22704 4.05402 0.272951 4.63915 0.643548 5.00974L2.80635 7.17255C3.08365 7.44985 3.45882 7.60563 3.85098 7.60563C4.26911 7.60563 4.66689 7.42939 4.94717 7.12037L9.26401 2.36077C9.67616 1.90635 9.70149 1.16151 9.22536 0.77465L9.22535 0.774646Z"
                fillRule="nonzero"
                fill="rgb(255, 255, 255)"
                // fill="#f7f5f2"
            />
        </svg>
    );
};

export default Check;
