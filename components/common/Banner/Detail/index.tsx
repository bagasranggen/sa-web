import React from 'react';

import Columns from '@/components/common/Columns';
import Heading, { BaseProps } from '@/components/common/Heading';
import Button from '@/components/common/Button';
import DetailInfo, { DetailInfoProps } from '@/components/common/Banner/Detail/DetailInfo';
import DetailMedia, { DetailMediaProps } from '@/components/common/Banner/Detail/DetailMedia';

export type DetailProps = {
    info?: DetailInfoProps[];
    price?: BaseProps['children'];
    children: BaseProps['children'];
    carousel?: DetailMediaProps;
};

const Detail = ({ price, children, info, carousel }: DetailProps): React.ReactElement => {
    return (
        <Columns
            gutterY={3}
            className="banner banner--detail">
            <Columns.Column md={7}>{carousel && <DetailMedia {...carousel} />}</Columns.Column>

            <Columns.Column md={5}>
                <Heading
                    as="h1"
                    variant="page"
                    className="md:mt-3">
                    {children}
                </Heading>

                {price && (
                    <Heading
                        as="h2"
                        className="mt-1.5 font-bold text-[2.2rem] uppercase tracking-[.35rem]">
                        {price}
                    </Heading>
                )}

                {info && info.length > 0 && (
                    <>
                        {info.map((item, i) => {
                            return (
                                <DetailInfo
                                    key={i}
                                    className="mt-3"
                                    title={item.title}
                                    list={item.list}>
                                    {item.children}
                                </DetailInfo>
                            );
                        })}
                    </>
                )}

                <Button.Container className="mt-4">
                    <Button.Block
                        as="button"
                        size="lg"
                        className="w-full">
                        RENT
                    </Button.Block>
                </Button.Container>
            </Columns.Column>
        </Columns>
    );
};

export default Detail;
