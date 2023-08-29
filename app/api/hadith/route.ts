import { NextResponse } from 'next/server';

const mysql = require('mysql2/promise');
const conn = mysql.createConnection(process.env.DATABASE_URL);

export const GET = async (req: Request, res: Response) => {
  try {
    // get site query param
    const searchParams = new URL(req.url).searchParams;

    const collectionId = searchParams.get('collectionId');
    const bookId = searchParams.get('bookId');

    if (!collectionId || !bookId)
      return NextResponse.json({ errors: 'incorrect params' }, { status: 400 });

    //Get Hadith

    const [hadith] = await (
      await conn
    ).query(
      `SELECT * FROM hadith WHERE collectionId = "${collectionId}" AND bookId = "${bookId}"`
    );

    return NextResponse.json(hadith);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ errors: 'Server Error' }, { status: 500 });
  }
};
