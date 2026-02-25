import { RefComponent } from '@/libs/@types';

import Base, { BaseProps, BaseInputRef } from '@/components/common/Input/Base';
import Label, { LabelProps } from '@/components/common/Input/Label';

export type * from '@/components/common/Input/Base';
export type * from '@/components/common/Input/Label';

type InputComposition = {
    Label: RefComponent<LabelProps, BaseInputRef>;
};

export default Object.assign<RefComponent<BaseProps, BaseInputRef>, InputComposition>(Base, { Label });
