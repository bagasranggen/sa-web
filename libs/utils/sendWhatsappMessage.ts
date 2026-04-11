import { getEnv } from '@/libs/utils/getEnv';

import { LinkProps } from '@/components/common/Link';

export type SendWhatsappMessageProps = {
    message: string;
} & Partial<Pick<LinkProps, 'target'>>;

export const sendWhatsappMessage = ({ message, target }: SendWhatsappMessageProps) => {
    const { contactPerson: number } = getEnv();

    if (typeof window === 'undefined') return;
    if (!number) return;

    window.open(`https://wa.me/${number}?text=${message}`, target);
};
