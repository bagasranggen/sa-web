import { usePathname } from 'next/navigation';
import { BaseAnchorProps } from '@/components/common/Button';

export const useCheckSamePath = () => {
    const pathname = usePathname();

    const isSamePath = ({ href }: Pick<BaseAnchorProps, 'href'>) => {
        let itemPathname = null;

        if (href) {
            try {
                const { pathname } = new URL(href as string);

                if (pathname) itemPathname = pathname;
            } catch {
                itemPathname = pathname;
            }
        }

        return itemPathname === pathname;
    };

    return { isSamePath };
};
