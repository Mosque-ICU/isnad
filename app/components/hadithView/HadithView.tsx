'use client';
import { Title, Card, Text, Badge } from '@tremor/react';

import React from 'react';
import Search from '../../search';
import UsersTable from '../../table';
import LeftSideBar from '../leftSidebar/LeftSideBar';
import IsnadViewer from '../IsnadViewer/IsnadViewer';
import Loading from './loading';

function HadithView() {
  const [currentSelection, setCurrentSelection] = React.useState<any>(null);
  const [showIsnadView, setShowIsnadView] = React.useState(false);

  const [currentData, setCurrentData] = React.useState<any>([]) as any;
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (currentSelection) {
      setLoading(true);
      fetch(
        `http://localhost:3000/api/scrape?site=https://sunnah.com/bukhari/1&currentBook=1`
      ).then((res) => {
        setLoading(false);

        res.json().then((data) => {
          setCurrentData(data);
        });
      });
    }
  }, [currentSelection]);

  return (
    <LeftSideBar setCurrentSelection={setCurrentSelection}>
      {loading && <Loading />}
      <main className="mx-auto w-full ">
        <div className="flex flex-row w-full">
          <div className=" p-5 w-full overflow-y-auto max-h-[calc(100vh-50px)]">
            {currentData && currentData.length !== 0 && (
              <Title className="mb-4 font-semibold">
                (1)باب كَيْفَ كَانَ بَدْءُ الْوَحْىِ إِلَى رَسُولِ اللَّهِ صلى
                الله عليه وسلم
              </Title>
            )}
            {currentData.map((hadith) => (
              <HadithContent
                hadith={hadith}
                setShowIsnadView={setShowIsnadView}
                key={hadith.hadithNumber}
              />
            ))}
          </div>
          {showIsnadView && (
            <IsnadViewer close={() => setShowIsnadView(false)} />
          )}
        </div>
        {/* <Card className="mt-6">
          <UsersTable users={[]} />
        </Card> */}
      </main>
    </LeftSideBar>
  );
}

const HadithContent = ({ hadith, setShowIsnadView }: any) => {
  const [showCommentaries, setShowCommentaries] = React.useState(false);
  return (
    <Card
      key={hadith.id}
      className="w-full mb-5"
      // onClick={() => setShowIsnadView(!showIsnadView)}
    >
      <p>
        {hadith.primaryNarrator} ( {hadith?.primaryNarratorEn} )
        {/* narrates: */}
      </p>
      <div className="flex flex-row justify-between mt-3">
        <p
          dangerouslySetInnerHTML={{ __html: hadith.englishTrans }}
          className="text-gray-700"
        ></p>{' '}
        <p
          className="text-gray-700 text-[21px] ml-3"
          dir="rtl"
          dangerouslySetInnerHTML={{ __html: hadith.arabic }}
        ></p>
      </div>

      <div className="flex flex-row  mt-2">
        <div>
          <p className="text-gray-700   text-sm">
            Hadith{' '}
            <span className="text-blue-500 cursor-pointer hover:underline">
              {hadith.hadithNumber}
            </span>
          </p>
          <p className="text-gray-700  mt-1 text-sm">
            Book{' '}
            <span className="text-blue-500 cursor-pointer hover:underline">
              {hadith.bookId} : {hadith.hadithNumber}
            </span>
          </p>
        </div>
        <div className="ml-12 flex flex-row mt-5">
          <p
            className="text-gray-700   text-sm hover:text-blue-500 cursor-pointer hover:shadow-sm rounded-md p-1"
            onClick={() => setShowIsnadView((prev) => !prev)}
          >
            Explore Isnad{' '}
          </p>
          <p
            onClick={() => setShowCommentaries(!showCommentaries)}
            className="text-gray-700  ml-3  text-sm hover:text-blue-500 cursor-pointer hover:shadow-sm rounded-md p-1"
          >
            Commentaries
          </p>

          <p
            title="Placeholder for grading of hadith. Only show for hadith not in Sahih Bukhari or muslim with multiple grading"
            className="text-gray-700  ml-3  text-sm hover:text-blue-500 cursor-pointer hover:shadow-sm rounded-md p-1"
          >
            Gradings
          </p>
        </div>
      </div>
      {showCommentaries && (
        <div className="slideInDown">
          <hr className="my-2" />

          <div className="flex flex-row">
            <Badge className="mr-2 cursor-pointer hover:shadow-sm" color="blue">
              Fathul Bari
            </Badge>
          </div>

          <div className="w-full h-[300px] flex justify-center items-center border border-gray-200 mt-3">
            Placeholder for commentary
          </div>
        </div>
      )}
    </Card>
  );
};

const narrators = [
  {
    id: 1,
    nameAr: 'رسول الله صلى الله عليه وسلم',
    nameEn: 'Rasulullah (ﷺ)'
  },
  {
    id: 2,
    nameAr: 'عمر بن الخطاب',
    nameEn: 'Umar bin Al-Khattab'
  },
  {
    id: 3,
    nameAr: 'عبد الله بن عمر',
    nameEn: 'Abdullah bin Umar'
  }
];

const hadithData = [
  {
    id: 1,
    textAr: `حَدَّثَنَا الْحُمَيْدِيُّ عَبْدُ اللَّهِ بْنُ الزُّبَيْرِ ، قَالَ : حَدَّثَنَا سُفْيَانُ ، قَالَ : حَدَّثَنَا يَحْيَى بْنُ سَعِيدٍ الْأَنْصَارِيُّ ، قَالَ : أَخْبَرَنِي مُحَمَّدُ بْنُ إِبْرَاهِيمَ التَّيْمِيُّ ، أَنَّهُ سَمِعَ عَلْقَمَةَ بْنَ وَقَّاصٍ اللَّيْثِيَّ ، يَقُولُ : سَمِعْتُ عُمَرَ بْنَ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُ عَلَى الْمِنْبَرِ، قَالَ : سَمِعْتُ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، يَقُولُ : " إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ "
    `,
    textEn: `I heard Allah's Messenger (ﷺ) saying, "The reward of deeds depends upon the intentions and every person will get the reward according to what he has intended. So whoever emigrated for worldly benefits or for a woman to marry, his emigration was for what he emigrated for."`,
    primaryNarratorEn: 'Umar bin Al-Khattab',
    primaryNarratorAr: 'عمر بن الخطاب'
  },
  {
    id: 1,
    textAr: `حَدَّثَنَا الْحُمَيْدِيُّ عَبْدُ اللَّهِ بْنُ الزُّبَيْرِ ، قَالَ : حَدَّثَنَا سُفْيَانُ ، قَالَ : حَدَّثَنَا يَحْيَى بْنُ سَعِيدٍ الْأَنْصَارِيُّ ، قَالَ : أَخْبَرَنِي مُحَمَّدُ بْنُ إِبْرَاهِيمَ التَّيْمِيُّ ، أَنَّهُ سَمِعَ عَلْقَمَةَ بْنَ وَقَّاصٍ اللَّيْثِيَّ ، يَقُولُ : سَمِعْتُ عُمَرَ بْنَ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُ عَلَى الْمِنْبَرِ، قَالَ : سَمِعْتُ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، يَقُولُ : " إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ "
    `,
    textEn: `I heard Allah's Messenger (ﷺ) saying, "The reward of deeds depends upon the intentions and every person will get the reward according to what he has intended. So whoever emigrated for worldly benefits or for a woman to marry, his emigration was for what he emigrated for."`,
    primaryNarratorEn: 'Umar bin Al-Khattab',
    primaryNarratorAr: 'عمر بن الخطاب'
  },
  {
    id: 1,
    textAr: `حَدَّثَنَا الْحُمَيْدِيُّ عَبْدُ اللَّهِ بْنُ الزُّبَيْرِ ، قَالَ : حَدَّثَنَا سُفْيَانُ ، قَالَ : حَدَّثَنَا يَحْيَى بْنُ سَعِيدٍ الْأَنْصَارِيُّ ، قَالَ : أَخْبَرَنِي مُحَمَّدُ بْنُ إِبْرَاهِيمَ التَّيْمِيُّ ، أَنَّهُ سَمِعَ عَلْقَمَةَ بْنَ وَقَّاصٍ اللَّيْثِيَّ ، يَقُولُ : سَمِعْتُ عُمَرَ بْنَ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُ عَلَى الْمِنْبَرِ، قَالَ : سَمِعْتُ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، يَقُولُ : " إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ "
    `,
    textEn: `I heard Allah's Messenger (ﷺ) saying, "The reward of deeds depends upon the intentions and every person will get the reward according to what he has intended. So whoever emigrated for worldly benefits or for a woman to marry, his emigration was for what he emigrated for."`,
    primaryNarratorEn: 'Umar bin Al-Khattab',
    primaryNarratorAr: 'عمر بن الخطاب'
  },
  {
    id: 1,
    textAr: `حَدَّثَنَا الْحُمَيْدِيُّ عَبْدُ اللَّهِ بْنُ الزُّبَيْرِ ، قَالَ : حَدَّثَنَا سُفْيَانُ ، قَالَ : حَدَّثَنَا يَحْيَى بْنُ سَعِيدٍ الْأَنْصَارِيُّ ، قَالَ : أَخْبَرَنِي مُحَمَّدُ بْنُ إِبْرَاهِيمَ التَّيْمِيُّ ، أَنَّهُ سَمِعَ عَلْقَمَةَ بْنَ وَقَّاصٍ اللَّيْثِيَّ ، يَقُولُ : سَمِعْتُ عُمَرَ بْنَ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُ عَلَى الْمِنْبَرِ، قَالَ : سَمِعْتُ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، يَقُولُ : " إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ "
    `,
    textEn: `I heard Allah's Messenger (ﷺ) saying, "The reward of deeds depends upon the intentions and every person will get the reward according to what he has intended. So whoever emigrated for worldly benefits or for a woman to marry, his emigration was for what he emigrated for."`,
    primaryNarratorEn: 'Umar bin Al-Khattab',
    primaryNarratorAr: 'عمر بن الخطاب'
  },
  {
    id: 1,
    textAr: `حَدَّثَنَا الْحُمَيْدِيُّ عَبْدُ اللَّهِ بْنُ الزُّبَيْرِ ، قَالَ : حَدَّثَنَا سُفْيَانُ ، قَالَ : حَدَّثَنَا يَحْيَى بْنُ سَعِيدٍ الْأَنْصَارِيُّ ، قَالَ : أَخْبَرَنِي مُحَمَّدُ بْنُ إِبْرَاهِيمَ التَّيْمِيُّ ، أَنَّهُ سَمِعَ عَلْقَمَةَ بْنَ وَقَّاصٍ اللَّيْثِيَّ ، يَقُولُ : سَمِعْتُ عُمَرَ بْنَ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُ عَلَى الْمِنْبَرِ، قَالَ : سَمِعْتُ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، يَقُولُ : " إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ "
    `,
    textEn: `I heard Allah's Messenger (ﷺ) saying, "The reward of deeds depends upon the intentions and every person will get the reward according to what he has intended. So whoever emigrated for worldly benefits or for a woman to marry, his emigration was for what he emigrated for."`,
    primaryNarratorEn: 'Umar bin Al-Khattab',
    primaryNarratorAr: 'عمر بن الخطاب'
  }
];

export default HadithView;
