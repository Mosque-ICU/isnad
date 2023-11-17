'use client';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import React from 'react';
//@ts-expect-error
import collectionsList from 'public/json/collectionsList.json';
import HadithBooks from './HadithBooks';

export type Collection = {
  id: number;
  slug: string;
  title: string;
  books: {
    id: number;
    title: string;
  }[];
};

type LeftSideBarProps = {
  children?: React.ReactNode;
};

function LeftSideBar({ children }: LeftSideBarProps) {
  const [showSidebar, setShowSidebar] = React.useState(true);
  const [showMobileSidebar, setShowMobileSidebar] = React.useState(false);
  const [currentBook, setCurrentBook] = React.useState<any>(null);
  const router = useRouter();

  //hide sidebar on mobile
  return (
    <>
      <div className=" h-[calc(100vh-53px)] hidden md:flex">
        <div
          className="w-[410px] card bg-white shadow-sm min-h-full border border-gray-100  mt-[1px] flex flex-row relative slideLeft overflow-y-scroll"
          style={{ display: showSidebar ? 'flex' : 'none' }}
        >
          <Bars3Icon
            className="absolute top-2 right-2 w-5 h-5 text-gray-600 cursor-pointer z-50"
            onClick={() => setShowSidebar(false)}
          />
          {/* <div
            className="  w-[50px] border border-gray-100 
            "
          ></div> */}

          <div className="flex flex-col w-full p-3 mt-2">
            <p
              className="mb-4  text-lg  text-underline
          "
            >
              Hadith Collections
            </p>
            {collectionsList.map((data: Collection) => (
              <HadithBooks
                key={data.id}
                data={data}
                currentBook={currentBook}
                navigate={(slug: any, bookId: any) => {
                  router.push(`/${data.slug}/${bookId}`);
                  setCurrentBook(data.id + bookId);
                }}
              />
            ))}
          </div>
        </div>
        {!showSidebar && (
          <Bars3Icon
            className="fixed top-[50px] left-2 w-5 h-5 text-gray-600 z-50 cursor-pointer "
            onClick={() => setShowSidebar(true)}
          />
        )}
        {children}
      </div>

      <div className="md:hidden relative  h-[calc(100vh-53px)]">
        {showMobileSidebar ? (
          <div className="absolute top-0 left-0 w-full h-full bg-white shadow-sm z-50 slieLeft">
            <XMarkIcon
              className="absolute top-2 right-2 w-5 h-5 text-gray-600"
              onClick={() => setShowSidebar(false)}
            />

            <div className="w-[400px] card bg-white shadow-sm min-h-full border border-gray-100  mt-[1px] flex flex-row  ">
              <div
                className="  w-[60px] border border-gray-100 
            "
              ></div>

              <div className="flex flex-col max-w-[100%]  mt-2 overflow-y-scroll p-3">
                <p
                  className="mb-4 font-semibold text-lg
          "
                >
                  Hadith Collections
                </p>
                {collectionsList.map((data: Collection) => (
                  <HadithBooks
                    key={data.id}
                    data={data}
                    currentBook={currentBook}
                    navigate={(slug: any, bookId: any) => {
                      router.push(`/${data.slug}/${bookId}`);
                      setShowMobileSidebar(false);
                      setCurrentBook(data.id + bookId);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Bars3Icon
            className="fixed top-[50px] left-2 w-5 h-5 text-gray-600 z-50"
            onClick={() => setShowMobileSidebar(true)}
          />
        )}

        {children}
      </div>
    </>
  );
}

export default LeftSideBar;
