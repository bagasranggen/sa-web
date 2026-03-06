import { Link } from '@/libs/@types';
import { BaseAnchorProps } from '@/components/common/Button';

// import { createWhatsappMessage } from './createWhatsappMessage';
// import { createMessageText } from './createMessageText';

export const createLinkItem = (item?: Link) => {
    let status = true;
    if (!item) status = false;

    let link: Pick<BaseAnchorProps, 'target' | 'children' | 'href'> | undefined = undefined;

    switch (item?.source) {
        case 'products':
            const product = item?.product && typeof item.product !== 'number' ? item.product : undefined;

            link = Object.assign({
                href: product?.url,
                children: item?.label || product?.title,
            });
            break;

        case 'categories':
            const category = item?.category && typeof item.category !== 'number' ? item.category : undefined;

            link = Object.assign({
                href: category?.url,
                children: item?.label || category?.title,
            });
            break;

        case 'pages':
            const page = item?.page && typeof item.page !== 'number' ? item.page : undefined;

            link = Object.assign({
                href: page?.url,
                children: item?.label || page?.title,
            });
            break;

        case 'mail':
            link = Object.assign({
                href: item?.mail ? `mailto:${item?.mail}` : undefined,
                children: item?.mail || item?.label,
            });
            break;

        // case 'whatsapp':
        //     let whatsappHref = undefined;
        //     if (item?.whatsappNumber) {
        //         whatsappHref = createWhatsappMessage({
        //             number: item.whatsappNumber,
        //             message: createMessageText({
        //                 type: 'custom',
        //                 isEncoded: true,
        //                 message: item?.whatsappMessage ?? '',
        //             }),
        //         });
        //     }
        //
        //     link = Object.assign({
        //         href: whatsappHref,
        //         label: item?.label || 'Send Message',
        //     });
        //     break;

        default:
            link = Object.assign({
                href: item?.custom,
                children: item?.label,
            });
            break;
    }

    if (link && item?.target) {
        link = Object.assign({ ...link, target: '_blank' });
    }

    if (!link || !link?.href || !item?.source) status = false;

    return { linkIsValid: status, link };
};
