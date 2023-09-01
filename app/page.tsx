import HadithView from './components/hadithView/HadithView';

export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  return <HadithView />;
}
