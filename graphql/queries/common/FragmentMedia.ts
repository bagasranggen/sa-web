import { gql } from '@apollo/client';

export type FragmentMediaProps = {
    on: 'Media' | 'MediaProduct';
    name?: string;
    sizesHandles?: string[];
};

export const BASE_FRAGMENT_MEDIA = `
    url
    filename
    width
    height
    mimeType
`;

export const FRAGMENT_MEDIA = (props?: FragmentMediaProps) => {
    let sizes = '';
    if (props?.sizesHandles && props.sizesHandles.length > 0) {
        props.sizesHandles.forEach((handle) => {
            sizes += ' ';
            sizes += `
                ${handle} {
                    ${BASE_FRAGMENT_MEDIA}
                }
            `;
        });
    }

    let fragmentName = 'media';
    if (props?.name) fragmentName = `${props?.name}`;

    let assetVolume = 'Media';
    if (props?.on) assetVolume = props.on;

    return gql`
        ${`
            fragment ${fragmentName} on ${assetVolume} {
                ${BASE_FRAGMENT_MEDIA}
                alt
                
                ${sizes ? `sizes {${sizes}}` : ''}
            }
        `}
    `;
};
