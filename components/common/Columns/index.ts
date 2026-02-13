import { Component } from '@/libs/@types';

import Base, { BaseProps } from '@/components/common/Columns/Base';
import Column, { ColumnProps } from '@/components/common/Columns/Column';

export type * from '@/components/common/Columns/Base';
export type * from '@/components/common/Columns/Column';

export type ColumnsComposition = {
    Column: Component<ColumnProps>;
};

export default Object.assign<Component<BaseProps>, ColumnsComposition>(Base, { Column });
