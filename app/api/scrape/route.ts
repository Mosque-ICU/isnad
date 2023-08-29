import { NextResponse } from 'next/server';

var cheerio = require('cheerio');

export const GET = async (req: Request, res: Response) => {
  // get site query param
  const searchParams = new URL(req.url).searchParams;
  const site = searchParams.get('site');
  const currentBook = searchParams.get('currentBook');

  if (!site || !currentBook)
    return NextResponse.json({ error: 'No site provided' }, { status: 400 });

  // fetch site html
  const html = await fetch(site).then((res) => res.text());

  // load html into cheerio
  const $ = cheerio.load(html);

  let data = [] as any;

  //get label

  $('.hadith_reference_sticky').each(function (i: number, elem: any) {
    data[i] = { ...data[i], label: $(this).text() };
    data[i] = { ...data[i], bookId: currentBook };
  });

  // get arabic hadith
  $('.arabic_hadith_full').each(function (i: number, elem: any) {
    data[i] = { ...data[i], arabic: $(this).html() };
    data[i] = {
      ...data[i],
      hadithNumber: data[i].label[data[i].label.length - 1]
    };
  });

  // get english translation
  $('.text_details').each(function (i: number, elem: any) {
    data[i] = { ...data[i], englishTrans: $(this).html() };
  });

  //get narrator
  $('.hadith_narrated').each(function (i: number, elem: any) {
    data[i] = { ...data[i], primaryNarrator: $(this).text() };
  });

  return NextResponse.json(data);
};
