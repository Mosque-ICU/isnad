import React from 'react';

import { ParsedUrlQuery } from 'querystring';
import { connect } from '@planetscale/database';

import HadithContent from '../../components/hadithView/HadithContent';
const conn = connect({
  url: process.env.DATABASE_URL
});

const fetchHadith = async (
  id?: string,
  collectionId?: string,
  number?: string
) => {
  // if (!id && !collectionId)
  //   return NextResponse.json({ errors: 'incorrect params' }, { status: 400 });

  //Get Hadith

  let hadith = [] as any;
  if (collectionId && number) {
    hadith = await conn.execute(
      `SELECT id, collectionId, bookId, isnad, hadithNumber, label , arabic, englishTrans, narratorPrefix, narratorPostfix, englisNarratorPrefix, englishNarratorPostfix, chapterId, orderInBook, comments
        FROM hadith WHERE collectionId = ? AND hadithNumber = ?`,
      [collectionId, number]
    );
  } else {
    hadith = await conn.execute(
      `SELECT id, collectionId, bookId, isnad, hadithNumber, label , arabic, englishTrans, narratorPrefix, narratorPostfix, englisNarratorPrefix, englishNarratorPostfix, chapterId, orderInBook, comments
      FROM hadith WHERE id = ?`,
      [id]
    );
  }

  if (!hadith?.rows) {
    return null;
  }

  return hadith.rows[0];
};

interface SearchParams extends ParsedUrlQuery {
  id?: string;
  collectionId?: string;
  number?: string;
}

async function page({ searchParams }: { searchParams: SearchParams }) {
  const hadith = await fetchHadith(
    searchParams.id,
    searchParams.collectionId,
    searchParams.number
  );

  if (!hadith)
    return (
      <div id="index-loader">
        <div className="loader"></div>
      </div>
    );
  return (
    <div className="m-4 w-full h-fit my-8 ">
      <HadithContent hadith={hadith} />
    </div>
  );
}

export default page;
