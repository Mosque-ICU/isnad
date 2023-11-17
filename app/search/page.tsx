import React from 'react';
import { connect } from '@planetscale/database';
import HadithView, { Hadith } from '../components/hadithView/HadithView';
import { ParsedUrlQuery } from 'querystring';

const conn = connect({
  url: process.env.DATABASE_URL
});

const fetchHadith = async (query: string) => {
  if (!query) return null;

  const hadith = await conn.execute(
    `SELECT id, collectionId, bookId, hadithNumber, label , arabic, englishTrans, narratorPrefix, narratorPostfix, englisNarratorPrefix, englishNarratorPostfix, chapterId, orderInBook, comments
      FROM hadith WHERE arabic LIKE ? OR englishTrans LIKE ? LIMIT 200`,
    [`%${query}%`, `%${query}%`]
  );
  return hadith?.rows;
};

interface SearchParams extends ParsedUrlQuery {
  q: string;
}

async function page({ searchParams }: { searchParams: SearchParams }) {
  const hadithData = (await fetchHadith(searchParams.q)) as Hadith[];

  if (!hadithData)
    return (
      <div id="index-loader">
        <div className="loader"></div>
      </div>
    );

  return (
    <HadithView hadithData={hadithData} searchTerm={searchParams.q} isSearch />
  );
}

export default page;
