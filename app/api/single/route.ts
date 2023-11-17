import { NextResponse } from 'next/server';
import { connect } from '@planetscale/database';

// const mysql = require('mysql2/promise');
// const conn = mysql.createConnection(process.env.DATABASE_URL);
const conn = connect({
  url: process.env.DATABASE_URL
});
export const GET = async (req: Request, res: Response) => {
  try {
    // get site query param
    const searchParams = new URL(req.url).searchParams;

    const id = searchParams.get('id');
    const collectionId = searchParams.get('collectionId');
    const number = searchParams.get('number');

    // if (!id && !collectionId)
    //   return NextResponse.json({ errors: 'incorrect params' }, { status: 400 });

    //Get Hadith

    let hadith;
    if (collectionId && number) {
      hadith = await conn.execute(
        `SELECT id, collectionId, bookId, hadithNumber, label , isnad,  arabic, englishTrans, narratorPrefix, narratorPostfix, englisNarratorPrefix, englishNarratorPostfix, chapterId, orderInBook, comments
        FROM hadith WHERE collectionId = ? AND hadithNumber = ?`,
        [collectionId, number]
      );
    } else {
      hadith = await conn.execute(
        `SELECT id, collectionId, bookId, hadithNumber, label , arabic, isnad,  englishTrans, narratorPrefix, narratorPostfix, englisNarratorPrefix, englishNarratorPostfix, chapterId, orderInBook, comments
      FROM hadith WHERE id = ?`,
        [id]
      );
    }

    return NextResponse.json(hadith?.rows[0] || null);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ errors: 'Server Error' }, { status: 500 });
  }
};
