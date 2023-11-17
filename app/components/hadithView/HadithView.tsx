import { Title } from '@tremor/react';
import React from 'react';
import HadithContent from './HadithContent';

export type Hadith = {
  id: number;
  hadithNumber: string;
  collectionId: number;
  bookId: string;
  label: string;
  isnad?: number[];
  arabic: string;
  englishTrans: string;
  narratorPrefix?: string;
  narratorPostfix?: string;
  englisNarratorPrefix?: string;
  englishNarratorPostfix?: string;
  chapterId?: string;
  orderInBook?: string;
  comments?: string;
};

export type CommentaryOptions = {
  id: number;
  name: string;
};

type HadithViewProps = {
  isSearch?: boolean;
  hadithData: Hadith[];
  searchTerm?: string;
  currentBook?: string;
  CommentaryOptions?: CommentaryOptions[];
};

function HadithView({
  isSearch = false,
  hadithData,
  searchTerm,
  currentBook,
  CommentaryOptions
}: HadithViewProps) {
  return (
    <>
      <main className="mx-auto w-full ">
        <div className="flex flex-row w-full">
          <div className=" p-5 w-full overflow-y-auto max-h-[calc(100vh-50px)]">
            {hadithData && (
              <Title className="mb-4 font-semibold">
                {' '}
                (
                {isSearch
                  ? hadithData.length +
                    ' search results for "' +
                    searchTerm +
                    '"'
                  : currentBook}
                )
              </Title>
            )}
            {hadithData.map((hadith: Hadith) => (
              <HadithContent
                hadith={hadith}
                key={hadith.id}
                highlight={isSearch ? searchTerm : ''}
                CommentaryOptions={CommentaryOptions}
              />
            ))}
          </div>
        </div>
        {/* <Card className="mt-6">
          <UsersTable users={[]} />
        </Card> */}
      </main>
    </>
  );
}

export default HadithView;
