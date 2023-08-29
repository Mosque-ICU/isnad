import { Title, Text } from '@tremor/react';

export default async function Loading() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Text className="text-3xl font-bold text-center">
        Loading web scraping data (db would be mush faster)
      </Text>
    </main>
  );
}
