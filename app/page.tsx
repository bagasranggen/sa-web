import HomepageIndex from '@/components/pages/HomepageIndex';
import { HomepageData } from '@/components/pages/HomepageIndex/data';

export default async function Page() {
    const { entries } = await HomepageData();

    return <HomepageIndex entries={entries} />;
}
