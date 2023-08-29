const { bukhari1 } = require('./books/bukhari1.ts');
const { bukhari2 } = require('./books/bukhari2.ts');
const { bukhari3 } = require('./books/bukhari3.ts');

const generateBukhariSeed = () => {
  const hadith = [...bukhari1, ...bukhari2, ...bukhari3];

  let sql = `INSERT INTO hadith (label, bookId, arabic, hadithNumber, englishTrans, primaryNarrator, collectionId ) VALUES `;
  hadith.forEach((h) => {
    sql += `("${h.label}", "${h.bookId}", "${h.arabic}", "${h.hadithNumber}", "${h.englishTrans}", "${h.primaryNarrator}" , "${h.collectionId}"),`;
  });
  sql = sql.slice(0, -1);

  return sql;
};

module.exports = generateBukhariSeed;
