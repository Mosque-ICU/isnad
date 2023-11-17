import React from 'react';
import { connect } from '@planetscale/database';
import HadithView, { Hadith } from '../../components/hadithView/HadithView';

const conn = connect({
  url: process.env.DATABASE_URL
});

const fetchHadith = async (bookId: string) => {
  if (!bookId) return null;
  const hadith = await conn.execute(
    `SELECT id, collectionId, bookId, hadithNumber, label , isnad, arabic, englishTrans, narratorPrefix, narratorPostfix, englisNarratorPrefix, englishNarratorPostfix, chapterId, orderInBook, comments
      FROM hadith WHERE collectionId = 130 AND bookId = ?`,
    [bookId]
  );
  return hadith?.rows;
};

async function page({ params }: any) {
  const { slug } = params;
  const hadithData = (await fetchHadith(slug[0])) as Hadith[];

  if (!hadithData)
    return (
      <div id="index-loader">
        <div className="loader"></div>
      </div>
    );

  return <HadithView hadithData={hadithData} currentBook={slug[0]} />;
}

export default page;
