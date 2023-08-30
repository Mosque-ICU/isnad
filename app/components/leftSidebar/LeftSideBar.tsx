'use client';

import {
  Bars3Icon,
  MegaphoneIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import React from 'react';

function LeftSideBar({ children, setCurrentSelection }: any) {
  const [showMobileSidebar, setShowMobileSidebar] = React.useState(false);
  const router = useRouter();

  //hide sidebar on mobile
  return (
    <>
      <div className=" h-[calc(100vh-53px)] hidden md:flex">
        <div className="w-[400px] card bg-white shadow-sm min-h-full border border-gray-100  mt-[1px] flex flex-row ">
          <div
            className="  w-[60px] border border-gray-100 
            "
          ></div>

          <div className="flex50lex-col w-full p-5 mt-2">
            <p
              className="mb-4 font-semibold text-lg
          "
            >
              Hadith Collections
            </p>
            {hadithData.map((hadith) => (
              <HadithCollection
                key={hadith.id}
                hadith={hadith}
                setCurrentSelection={setCurrentSelection}
                navigate={(slug, bookId) =>
                  router.push(`/${hadith.slug}/${bookId}`)
                }
              />
            ))}
          </div>
        </div>
        {children}
      </div>

      <div className="md:hidden relative  h-[calc(100vh-53px)]">
        {showMobileSidebar ? (
          <div className="absolute top-0 left-0 w-full h-full bg-white shadow-sm z-50 slieLeft">
            <XMarkIcon
              className="absolute top-2 right-2 w-5 h-5 text-gray-600"
              onClick={() => setShowMobileSidebar(false)}
            />

            <div className="w-[400px] card bg-white shadow-sm min-h-full border border-gray-100  mt-[1px] flex flex-row ">
              <div
                className="  w-[60px] border border-gray-100 
            "
              ></div>

              <div className="flex50lex-col w-full p-5 mt-2">
                <p
                  className="mb-4 font-semibold text-lg
          "
                >
                  Hadith Collections
                </p>
                {hadithData.map((hadith) => (
                  <HadithCollection
                    key={hadith.id}
                    hadith={hadith}
                    setCurrentSelection={setCurrentSelection}
                    navigate={(slug, bookId) => {
                      router.push(`/${hadith.slug}/${bookId}`);
                      setShowMobileSidebar(false);
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

const HadithCollection = ({ hadith, navigate }: any) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  return (
    <div
      className="cursor-pointer p-1 rounded-md"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <span className=" text-gray-700 hover:text-blue-500">{hadith.title}</span>
      {isExpanded && (
        <>
          <div className="flex flex-col">
            {hadith.books.map((book: any) => (
              <div
                className="flex flex-row hover:bg-blue-100 p-[2px] px-2 rounded-md hover:shadow-sm text-underlined"
                key={book.id}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(hadith.slug, book.id);
                }}
              >
                <p>{book.title}</p>
                <p className="text-gray-500 ml-2">{book.numberOfHadith}</p>
              </div>
            ))}
          </div>
          <hr className="my-1" />
        </>
      )}
    </div>
  );
};

const hadithData = [
  {
    id: 1,
    title: 'Sahih Bukhari',
    slug: 'sahih-bukhari',
    type: 'collection',
    description:
      "Sahih Bukhari is a collection of sayings and deeds of Prophet Muhammad (pbuh), also known as the Sunnah. The reports of the Prophet's (saw) sayings and deeds are called ahadeeth. Imam Bukhari lived a couple of centuries after the Prophet's (saw) death and worked extremely hard to collect his ahadeeth. Each report in his collection was checked for compatibility with the Qur'an, and the veracity of the chain of reporters had to be painstakingly established. Bukhari's collection is recognized by the overwhelming majority of the Muslim world to be one of the most authentic collections of the Sunnah of the Prophet(pbuh). Bukhari (full name Abu Abdullah Muhammad bin Ismail bin Ibrahim bin al-Mughira al-Ja'fai) was born in 194 A.H. and died in 256 A.H. His collection of hadeeth is considered second to none. He spent sixteen years compiling it, and ended up with 2,602 hadeeth (9,082 with repetition).",

    books: [
      {
        id: 1,
        type: 'book',
        title: 'Revelation',
        title_ar: 'كتاب بدء الوحى',
        description: 'Revelation',
        numberOfHadith: '1 - 7'
      },
      {
        id: 2,
        title: 'Belief',
        title_ar: 'كتاب الإيمان',
        description: 'Belief',
        type: 'book',
        numberOfHadith: '8 - 58'
      },
      {
        id: 3,
        title: 'Knowledge',
        title_ar: 'كتاب العلم',
        description: 'Knowledge',
        type: 'book',
        numberOfHadith: '59 - 134'
      }
    ]
  },
  {
    id: 2,
    title: 'Sahih Muslim',
    slug: 'sahih-muslim',
    books: []
  }
];

export default LeftSideBar;
