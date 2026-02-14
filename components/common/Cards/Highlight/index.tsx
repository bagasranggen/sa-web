import React from 'react';

import { ArrayStringProps, ClassnameProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

import Columns from '@/components/common/Columns';
import HighlightItem, { HighlightItemProps } from '@/components/common/Cards/Highlight/HighlightItem';

export type HighlightProps = {
    items: HighlightItemProps[];
} & ClassnameProps;

const Highlight = ({ className, items }: HighlightProps): React.ReactElement | null => {
    if (!items || items.length === 0) return null;

    let cardsClass: ArrayStringProps = ['cards cards--highlight'];
    if (className) cardsClass.push(className);
    cardsClass = joinArrayString(cardsClass);

    return (
        <div className={cardsClass}>
            {items.map((item: HighlightItemProps, i: number) => {
                const isOdd = i % 2 === 0;

                let cardsItemClass: ArrayStringProps = ['cards__item'];
                if (!isOdd) cardsItemClass.push('cards__item--even');
                cardsItemClass = joinArrayString(cardsItemClass);

                return (
                    <Columns key={i}>
                        <Columns.Column
                            offset={{
                                md: !isOdd ? 2 : undefined,
                                lg: !isOdd ? 3 : 1,
                                xl: !isOdd ? 4 : 1,
                            }}
                            md={10}
                            lg={8}
                            xl={7}>
                            <HighlightItem
                                className={cardsItemClass}
                                {...item}
                            />
                        </Columns.Column>
                    </Columns>
                );
            })}
        </div>
    );
};

export default Highlight;
