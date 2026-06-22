import { PAGES_HANDLES } from '@/components/pages/handles';

import HomepageIndex from '@/components/pages/HomepageIndex';
import OrderIndex from '@/components/pages/OrderIndex';
import ProductDetailIndex from '@/components/pages/ProductDetailIndex';
import ProductListingIndex from '@/components/pages/ProductListingIndex';
import StaticPageIndex from '@/components/pages/StaticPageIndex';

export const PAGES_INDEX_HANDLES = {
    [PAGES_HANDLES.HOMEPAGE]: HomepageIndex,
    [PAGES_HANDLES.ORDERS]: OrderIndex,
    [PAGES_HANDLES.PRODUCT_DETAIL]: ProductDetailIndex,
    [PAGES_HANDLES.PRODUCT_LISTING]: ProductListingIndex,
    [PAGES_HANDLES.PRODUCT_CATEGORIES]: ProductListingIndex,
    [PAGES_HANDLES.STATIC_PAGES]: StaticPageIndex,
};
