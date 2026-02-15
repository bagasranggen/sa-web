import React from 'react';

import { createPicsumImage } from '@/libs/factory';

import Columns from '@/components/common/Columns';
import Heading, { BaseProps } from '@/components/common/Heading';
import Button from '@/components/common/Button';
import Picture from '@/components/common/Picture';
import DetailInfo, { DetailInfoProps } from '@/components/common/Banner/Detail/DetailInfo';

export type DetailProps = {
    info?: DetailInfoProps[];
    price?: BaseProps['children'];
    children: BaseProps['children'];
};

const Detail = ({ price, children, info }: DetailProps): React.ReactElement => {
    return (
        <Columns>
            <Columns.Column md={7}>
                <Columns gutterX={1}>
                    <Columns.Column md={3}>
                        <div className="flex flex-col gap-y-1">
                            <Picture items={[createPicsumImage({ width: 400, height: 560 })]} />
                            <Picture items={[createPicsumImage({ width: 400, height: 560 })]} />
                            <Picture items={[createPicsumImage({ width: 400, height: 560 })]} />
                        </div>
                    </Columns.Column>
                    <Columns.Column md={9}>
                        <Picture items={[createPicsumImage({ width: 1000, height: 1400 })]} />
                    </Columns.Column>
                </Columns>
            </Columns.Column>

            <Columns.Column md={5}>
                <Heading
                    as="h1"
                    variant="page"
                    className="mt-3">
                    {children}
                    {/*Gema black - B026*/}
                </Heading>

                {price && (
                    <Heading
                        as="h2"
                        className="mt-1.5 font-bold text-[2.2rem] uppercase tracking-[.35rem]">
                        {price}
                        {/*Rp130,000/3day(s)*/}
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
                {/*<DetailInfo*/}
                {/*    className="mt-3"*/}
                {/*    title="Size"*/}
                {/*    list={[{ label: 'Bust', value: '85-90cm' }]}*/}
                {/*/>*/}

                {/*<DetailInfo*/}
                {/*    className="mt-3"*/}
                {/*    title="Size"*/}
                {/*    list={[{ label: 'Bust', value: '85-90cm' }]}*/}
                {/*/>*/}

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
