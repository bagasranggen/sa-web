import { PAGES_HANDLES } from '@/components/pages/handles';

import { ProductDetailData } from '@/components/pages/ProductDetailIndex/data';
import { ProductListingData } from '@/components/pages/ProductListingIndex/data';
import { StaticPageData } from '@/components/pages/StaticPageIndex/data';

export const PAGES_DATA_HANDLES = {
    [PAGES_HANDLES.PRODUCT_DETAIL]: ProductDetailData,
    [PAGES_HANDLES.PRODUCT_LISTING]: ProductListingData,
    [PAGES_HANDLES.STATIC_PAGES]: StaticPageData,
};
