'use client';
import { Title, Card, Text, Badge } from '@tremor/react';
import { usePathname } from 'next/navigation';

import React, { Suspense } from 'react';
import Search from '../../search';
import UsersTable from '../../table';
import IsnadViewer from '../IsnadViewer/IsnadViewer';
import Loading from './loading';

function HadithView() {
  const path = usePathname();

  const [currentSelection, setCurrentSelection] = React.useState<any>(null);
  const [showIsnadView, setShowIsnadView] = React.useState(false);

  const [currentData, setCurrentData] = React.useState<any>([]) as any;
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!path) return setLoading(false);
    const urlSplit = path.split('/');
    const collectionId = urlSplit[1];
    const bookId = urlSplit[2];
    if (!collectionId && !bookId) return setLoading(false);

    fetch(`/api/hadith?collectionId=${'1'}&bookId=${bookId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) setCurrentData(data);
        setLoading(false);
      });
  }, [path]);

  return (
    <>
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
            <Suspense fallback={<div>Loading...</div>}>
              <IsnadViewer close={() => setShowIsnadView(false)} />
            </Suspense>
          )}
        </div>
        {/* <Card className="mt-6">
          <UsersTable users={[]} />
        </Card> */}
      </main>
    </>
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
      <div className="flex md:flex-row flex-col justify-between mt-3">
        <p
          dangerouslySetInnerHTML={{ __html: hadith.englishTrans }}
          className="text-gray-700"
        ></p>{' '}
        <p
          className="text-gray-700 text-[21px] md:ml-0 ml-3 mt-5 md:mt-0"
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
  [
    {
      label: 'Sahih al-Bukhari 1',
      bookId: '1',
      arabic:
        '<span class="arabic_sanad">حَدَّثَنَا<a href="/narrator/4698" title="عبد الله بن الزبير بن عيسى بن عبيد الله بن أسامة بن عبد الله بن حميد بن زهير بن الحارث بن أسد بن عبد العزى" rel="nofollow"> الْحُمَيْدِيُّ عَبْدُ اللَّهِ بْنُ الزُّبَيْرِ  </a>، قَالَ : حَدَّثَنَا<a href="/narrator/3443" title="سفيان بن عيينة بن ميمون" rel="nofollow"> سُفْيَانُ  </a>، قَالَ : حَدَّثَنَا<a href="/narrator/8272" title="يحيى بن سعيد بن قيس بن عمرو بن سهل بن ثعلبة بن الحارث بن زيد بن ثعلبة بن غنم بن مالك بن النجار" rel="nofollow"> يَحْيَى بْنُ سَعِيدٍ الْأَنْصَارِيُّ  </a>، قَالَ : أَخْبَرَنِي<a href="/narrator/6796" title="محمد بن إبراهيم بن الحارث بن خالد بن صخر بن عامر بن كعب بن سعد بن تيم بن مرة" rel="nofollow"> مُحَمَّدُ بْنُ إِبْرَاهِيمَ التَّيْمِيُّ  </a>، أَنَّهُ سَمِعَ<a href="/narrator/5719" title="علقمة بن وقاص بن محصن بن كلدة بن عبد ياليل" rel="nofollow"> عَلْقَمَةَ بْنَ وَقَّاصٍ اللَّيْثِيَّ  </a>، يَقُولُ : سَمِعْتُ<a href="/narrator/5913" title="عمر بن الخطاب بن نفيل بن عبد العزى بن رياح بن عبد الله بن قرط بن رزاح بن عدي بن كعب" rel="nofollow"> عُمَرَ بْنَ الْخَطَّابِ  </a> رَضِيَ اللَّهُ عَنْهُ عَلَى الْمِنْبَرِ، قَالَ : سَمِعْتُ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، يَقُولُ : "</span>\n<span class="arabic_text_details">إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ "</span>',
      hadithNumber: '1',
      englishTrans:
        '<p>\n\n     I heard Allah\'s Messenger (ﷺ) saying, "The reward of deeds depends upon the \n     intentions and every person will get the reward according to what he \n     has intended. So whoever emigrated for worldly benefits or for a woman\n     to marry, his emigration was for what he emigrated for."\n</p><p></p>',
      primaryNarrator: "Narrated 'Umar bin Al-Khattab:"
    },
    {
      label: 'Sahih al-Bukhari 2',
      bookId: '1',
      arabic:
        '<span class="arabic_sanad arabic">حَدَّثَنَا عَبْدُ اللَّهِ بْنُ يُوسُفَ، قَالَ أَخْبَرَنَا مَالِكٌ، عَنْ هِشَامِ بْنِ عُرْوَةَ، عَنْ أَبِيهِ، عَنْ عَائِشَةَ أُمِّ الْمُؤْمِنِينَ ـ رضى الله عنها ـ أَنَّ الْحَارِثَ بْنَ هِشَامٍ ـ رضى الله عنه ـ سَأَلَ رَسُولَ اللَّهِ صلى الله عليه وسلم فَقَالَ يَا رَسُولَ اللَّهِ كَيْفَ يَأْتِيكَ الْوَحْىُ فَقَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم ‏</span>\n<span class="arabic_text_details arabic">"‏ أَحْيَانًا يَأْتِينِي مِثْلَ صَلْصَلَةِ الْجَرَسِ ـ وَهُوَ أَشَدُّهُ عَلَىَّ ـ فَيُفْصَمُ عَنِّي وَقَدْ وَعَيْتُ عَنْهُ مَا قَالَ، وَأَحْيَانًا يَتَمَثَّلُ لِيَ الْمَلَكُ رَجُلاً فَيُكَلِّمُنِي فَأَعِي مَا يَقُولُ ‏"</span><span class="arabic_sanad arabic">‏‏.‏ قَالَتْ عَائِشَةُ رضى الله عنها وَلَقَدْ رَأَيْتُهُ يَنْزِلُ عَلَيْهِ الْوَحْىُ فِي الْيَوْمِ الشَّدِيدِ الْبَرْدِ، فَيَفْصِمُ عَنْهُ وَإِنَّ جَبِينَهُ لَيَتَفَصَّدُ عَرَقًا‏.‏</span>',
      hadithNumber: '2',
      englishTrans:
        '<p>\n\n     (the mother of the faithful believers) Al-Harith bin Hisham asked Allah\'s Messenger (ﷺ) "O Allah\'s Messenger (ﷺ)! How is the Divine Inspiration revealed to you?" Allah\'s Messenger (ﷺ) replied, "Sometimes it is (revealed) like the ringing of a bell, this form of Inspiration is the hardest of all and then this state passes off after I have grasped what is inspired. Sometimes the Angel comes in the form of a man and talks to me and I grasp whatever he says." \'Aisha added: Verily I saw the Prophet (ﷺ) being inspired divinely on a very cold day and noticed the sweat dropping from his forehead (as the Inspiration was over).\n</p><p></p>',
      primaryNarrator: "\n\n     Narrated 'Aisha:"
    },
    {
      label: 'Sahih al-Bukhari 3',
      bookId: '1',
      arabic:
        '<span class="arabic_sanad arabic"></span>\n<span class="arabic_text_details arabic">حَدَّثَنَا يَحْيَى بْنُ بُكَيْرٍ، قَالَ حَدَّثَنَا اللَّيْثُ، عَنْ عُقَيْلٍ، عَنِ ابْنِ شِهَابٍ، عَنْ عُرْوَةَ بْنِ الزُّبَيْرِ، عَنْ عَائِشَةَ أُمِّ الْمُؤْمِنِينَ، أَنَّهَا قَالَتْ أَوَّلُ مَا بُدِئَ بِهِ رَسُولُ اللَّهِ صلى الله عليه وسلم مِنَ الْوَحْىِ الرُّؤْيَا الصَّالِحَةُ فِي النَّوْمِ، فَكَانَ لاَ يَرَى رُؤْيَا إِلاَّ جَاءَتْ مِثْلَ فَلَقِ الصُّبْحِ، ثُمَّ حُبِّبَ إِلَيْهِ الْخَلاَءُ، وَكَانَ يَخْلُو بِغَارِ حِرَاءٍ فَيَتَحَنَّثُ فِيهِ ـ وَهُوَ التَّعَبُّدُ ـ اللَّيَالِيَ ذَوَاتِ الْعَدَدِ قَبْلَ أَنْ يَنْزِعَ إِلَى أَهْلِهِ، وَيَتَزَوَّدُ لِذَلِكَ، ثُمَّ يَرْجِعُ إِلَى خَدِيجَةَ، فَيَتَزَوَّدُ لِمِثْلِهَا، حَتَّى جَاءَهُ الْحَقُّ وَهُوَ فِي غَارِ حِرَاءٍ، فَجَاءَهُ الْمَلَكُ فَقَالَ اقْرَأْ‏.‏ قَالَ ‏"‏ مَا أَنَا بِقَارِئٍ ‏"‏‏.‏ قَالَ ‏"‏ فَأَخَذَنِي فَغَطَّنِي حَتَّى بَلَغَ مِنِّي الْجَهْدَ، ثُمَّ أَرْسَلَنِي فَقَالَ اقْرَأْ‏.‏ قُلْتُ مَا أَنَا بِقَارِئٍ‏.‏ فَأَخَذَنِي فَغَطَّنِي الثَّانِيَةَ حَتَّى بَلَغَ مِنِّي الْجَهْدَ، ثُمَّ أَرْسَلَنِي فَقَالَ اقْرَأْ‏.‏ فَقُلْتُ مَا أَنَا بِقَارِئٍ‏.‏ فَأَخَذَنِي فَغَطَّنِي الثَّالِثَةَ، ثُمَّ أَرْسَلَنِي فَقَالَ <a id="q2" name="q2" href="javascript:openquran(95,1,3)"><c_q2>‏{‏اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ * خَلَقَ الإِنْسَانَ مِنْ عَلَقٍ * اقْرَأْ وَرَبُّكَ الأَكْرَمُ‏}‏</c_q2></a> ‏"‏‏.‏ فَرَجَعَ بِهَا رَسُولُ اللَّهِ صلى الله عليه وسلم يَرْجُفُ فُؤَادُهُ، فَدَخَلَ عَلَى خَدِيجَةَ بِنْتِ خُوَيْلِدٍ رضى الله عنها فَقَالَ ‏"‏ زَمِّلُونِي زَمِّلُونِي ‏"‏‏.‏ فَزَمَّلُوهُ حَتَّى ذَهَبَ عَنْهُ الرَّوْعُ، فَقَالَ لِخَدِيجَةَ وَأَخْبَرَهَا الْخَبَرَ ‏"‏ لَقَدْ خَشِيتُ عَلَى نَفْسِي ‏"‏‏.‏ فَقَالَتْ خَدِيجَةُ كَلاَّ وَاللَّهِ مَا يُخْزِيكَ اللَّهُ أَبَدًا، إِنَّكَ لَتَصِلُ الرَّحِمَ، وَتَحْمِلُ الْكَلَّ، وَتَكْسِبُ الْمَعْدُومَ، وَتَقْرِي الضَّيْفَ، وَتُعِينُ عَلَى نَوَائِبِ الْحَقِّ‏.‏ فَانْطَلَقَتْ بِهِ خَدِيجَةُ حَتَّى أَتَتْ بِهِ وَرَقَةَ بْنَ نَوْفَلِ بْنِ أَسَدِ بْنِ عَبْدِ الْعُزَّى ابْنَ عَمِّ خَدِيجَةَ ـ وَكَانَ امْرَأً تَنَصَّرَ فِي الْجَاهِلِيَّةِ، وَكَانَ يَكْتُبُ الْكِتَابَ الْعِبْرَانِيَّ، فَيَكْتُبُ مِنَ الإِنْجِيلِ بِالْعِبْرَانِيَّةِ مَا شَاءَ اللَّهُ أَنْ يَكْتُبَ، وَكَانَ شَيْخًا كَبِيرًا قَدْ عَمِيَ ـ فَقَالَتْ لَهُ خَدِيجَةُ يَا ابْنَ عَمِّ اسْمَعْ مِنَ ابْنِ أَخِيكَ‏.‏ فَقَالَ لَهُ وَرَقَةُ يَا ابْنَ أَخِي مَاذَا تَرَى فَأَخْبَرَهُ رَسُولُ اللَّهِ صلى الله عليه وسلم خَبَرَ مَا رَأَى‏.‏ فَقَالَ لَهُ وَرَقَةُ هَذَا النَّامُوسُ الَّذِي نَزَّلَ اللَّهُ عَلَى مُوسَى صلى الله عليه وسلم يَا لَيْتَنِي فِيهَا جَذَعًا، لَيْتَنِي أَكُونُ حَيًّا إِذْ يُخْرِجُكَ قَوْمُكَ‏.‏ فَقَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم ‏"‏ أَوَمُخْرِجِيَّ هُمْ ‏"‏‏.‏ قَالَ نَعَمْ، لَمْ يَأْتِ رَجُلٌ قَطُّ بِمِثْلِ مَا جِئْتَ بِهِ إِلاَّ عُودِيَ، وَإِنْ يُدْرِكْنِي يَوْمُكَ أَنْصُرْكَ نَصْرًا مُؤَزَّرًا‏.‏ ثُمَّ لَمْ يَنْشَبْ وَرَقَةُ أَنْ تُوُفِّيَ وَفَتَرَ الْوَحْىُ‏.‏</span><span class="arabic_sanad arabic"></span>',
      hadithNumber: '3',
      englishTrans:
        'The commencement of the Divine Inspiration to Allah\'s Messenger (ﷺ) was in the form of good dreams which came true like bright daylight, and then the love of seclusion was bestowed upon him. He used to go in seclusion in the cave of Hira where he used to worship (Allah alone) continuously for many days before his desire to see his family. He used to take with him the journey food for the stay and then come back to (his wife) Khadija to take his food likewise again till suddenly the Truth descended upon him while he was in the cave of Hira. The angel came to him and asked him to read. The Prophet (ﷺ) replied, "I do not know how to read." The Prophet (ﷺ) added, "The angel caught me (forcefully) and pressed me so hard that I could not bear it any more. He then released me and again asked me to read and I replied, \'I do not know how to read.\' Thereupon he caught me again and pressed me a second time till I could not bear it any more. He then released me and again asked me to read but again I replied, \'I do not know how to read (or what shall I read)?\' Thereupon he caught me for the third time and pressed me, and then released me and said, \'Read in the name of your Lord, who has created (all that exists), created man from a clot. Read! And your Lord is the Most Generous." (96.1, 96.2, 96.3) Then Allah\'s Messenger (ﷺ) returned with the Inspiration and with his heart beating severely. Then he went to Khadija bint Khuwailid and said, "Cover me! Cover me!" They covered him till his fear was over and after that he told her everything that had happened and said, "I fear that something may happen to me." Khadija replied, "Never! By Allah, Allah will never disgrace you. You keep good relations with your kith and kin, help the poor and the destitute, serve your guests generously and assist the deserving calamity-afflicted ones."  Khadija then accompanied him to her cousin Waraqa bin Naufal bin Asad bin \'Abdul \'Uzza, who, during the pre-Islamic Period became a Christian and used to write the writing with Hebrew letters. He would write from the Gospel in Hebrew as much as Allah wished him to write. He was an old man and had lost his eyesight. Khadija said to Waraqa, "Listen to the story of your nephew, O my cousin!" Waraqa asked, "O my nephew! What have you seen?" Allah\'s Messenger (ﷺ) described whatever he had seen. Waraqa said, "This is the same one who keeps the secrets (angel Gabriel) whom Allah had sent to Moses. I wish I were young and could live up to the time when your people would turn you out." Allah\'s Messenger (ﷺ) asked, "Will they drive me out?" Waraqa replied in the affirmative and said, "Anyone (man) who came with something similar to what you have brought was treated with hostility; and if I should remain alive till the day when you will be turned out then I would support you strongly." But after a few days Waraqa died and the Divine Inspiration was also paused for a while.',
      primaryNarrator: "Narrated 'Aisha (the mother of the faithful believers):"
    },
    {
      label: 'Sahih al-Bukhari 4',
      bookId: '1',
      arabic:
        '<span class="arabic_sanad arabic"></span>\n<span class="arabic_text_details arabic">قَالَ ابْنُ شِهَابٍ وَأَخْبَرَنِي أَبُو سَلَمَةَ بْنُ عَبْدِ الرَّحْمَنِ، أَنَّ جَابِرَ بْنَ عَبْدِ اللَّهِ الأَنْصَارِيَّ، قَالَ ـ وَهُوَ يُحَدِّثُ عَنْ فَتْرَةِ الْوَحْىِ، فَقَالَ ـ فِي حَدِيثِهِ ‏"‏ بَيْنَا أَنَا أَمْشِي، إِذْ سَمِعْتُ صَوْتًا، مِنَ السَّمَاءِ، فَرَفَعْتُ بَصَرِي فَإِذَا الْمَلَكُ الَّذِي جَاءَنِي بِحِرَاءٍ جَالِسٌ عَلَى كُرْسِيٍّ بَيْنَ السَّمَاءِ وَالأَرْضِ، فَرُعِبْتُ مِنْهُ، فَرَجَعْتُ فَقُلْتُ زَمِّلُونِي‏.‏ فَأَنْزَلَ اللَّهُ تَعَالَى <a id="q3" name="q3" href="javascript:openquran(73,1,5)"><c_q3>‏{‏يَا أَيُّهَا الْمُدَّثِّرُ * قُمْ فَأَنْذِرْ‏}‏</c_q3></a> إِلَى قَوْلِهِ <a id="q4" name="q4" href="javascript:openquran(73,5,5)"><c_q4>‏{‏وَالرُّجْزَ فَاهْجُرْ‏}‏</c_q4></a> فَحَمِيَ الْوَحْىُ وَتَتَابَعَ ‏"‏‏.‏ تَابَعَهُ عَبْدُ اللَّهِ بْنُ يُوسُفَ وَأَبُو صَالِحٍ‏.‏ وَتَابَعَهُ هِلاَلُ بْنُ رَدَّادٍ عَنِ الزُّهْرِيِّ‏.‏ وَقَالَ يُونُسُ وَمَعْمَرٌ ‏"‏ بَوَادِرُهُ ‏"‏‏.‏</span><span class="arabic_sanad arabic"></span>',
      hadithNumber: '4',
      englishTrans:
        "\"While I was walking, all of a sudden I heard a voice from the sky. I looked up and saw the same angel who had visited me at the cave of Hira' sitting on a chair between the sky and the earth. I got afraid of him and came back home and said, 'Wrap me (in blankets).' And then Allah revealed the following Holy Verses (of Quran):  'O you (i.e. Muhammad)! wrapped up in garments!' Arise and warn (the people against Allah's Punishment),... up to 'and desert the idols.' (74.1-5) After this the revelation started coming strongly, frequently and regularly.\"",
      primaryNarrator:
        "Narrated Jabir bin 'Abdullah Al-Ansari (while talking about the period of pause in revelation) reporting the speech of the Prophet:"
    },
    {
      label: 'Sahih al-Bukhari 5',
      bookId: '1',
      arabic:
        '<span class="arabic_sanad arabic"></span>\n<span class="arabic_text_details arabic">حَدَّثَنَا مُوسَى بْنُ إِسْمَاعِيلَ، قَالَ حَدَّثَنَا أَبُو عَوَانَةَ، قَالَ حَدَّثَنَا مُوسَى بْنُ أَبِي عَائِشَةَ، قَالَ حَدَّثَنَا سَعِيدُ بْنُ جُبَيْرٍ، عَنِ ابْنِ عَبَّاسٍ، فِي قَوْلِهِ تَعَالَى ‏<a id="q5" name="q5" href="javascript:openquran(74,16,16)"><c_q5>{‏لاَ تُحَرِّكْ بِهِ لِسَانَكَ لِتَعْجَلَ بِهِ‏}</c_q5></a>‏ قَالَ كَانَ رَسُولُ اللَّهِ صلى الله عليه وسلم يُعَالِجُ مِنَ التَّنْزِيلِ شِدَّةً، وَكَانَ مِمَّا يُحَرِّكُ شَفَتَيْهِ ـ فَقَالَ ابْنُ عَبَّاسٍ فَأَنَا أُحَرِّكُهُمَا لَكُمْ كَمَا كَانَ رَسُولُ اللَّهِ صلى الله عليه وسلم يُحَرِّكُهُمَا‏.‏ وَقَالَ سَعِيدٌ أَنَا أُحَرِّكُهُمَا كَمَا رَأَيْتُ ابْنَ عَبَّاسٍ يُحَرِّكُهُمَا‏.‏ فَحَرَّكَ شَفَتَيْهِ ـ فَأَنْزَلَ اللَّهُ تَعَالَى <a id="q6" name="q6" href="javascript:openquran(74,16,17)"><c_q6>‏{‏لاَ تُحَرِّكْ بِهِ لِسَانَكَ لِتَعْجَلَ بِهِ* إِنَّ عَلَيْنَا جَمْعَهُ وَقُرْآنَهُ‏}‏</c_q6></a> قَالَ جَمْعُهُ لَهُ فِي صَدْرِكَ، وَتَقْرَأَهُ ‏<a id="q7" name="q7" href="javascript:openquran(74,18,18)"><c_q7>{‏فَإِذَا قَرَأْنَاهُ فَاتَّبِعْ قُرْآنَهُ‏}</c_q7></a>‏ قَالَ فَاسْتَمِعْ لَهُ وَأَنْصِتْ ‏<a id="q8" name="q8" href="javascript:openquran(74,19,19)"><c_q8>{‏ثُمَّ إِنَّ عَلَيْنَا بَيَانَهُ‏}</c_q8></a>‏ ثُمَّ إِنَّ عَلَيْنَا أَنْ تَقْرَأَهُ‏.‏ فَكَانَ رَسُولُ اللَّهِ صلى الله عليه وسلم بَعْدَ ذَلِكَ إِذَا أَتَاهُ جِبْرِيلُ اسْتَمَعَ، فَإِذَا انْطَلَقَ جِبْرِيلُ قَرَأَهُ النَّبِيُّ صلى الله عليه وسلم كَمَا قَرَأَهُ‏.‏</span><span class="arabic_sanad arabic"></span>',
      hadithNumber: '5',
      englishTrans:
        "<p>\n\n     Ibn 'Abbas in the explanation of the statement of Allah \"Move not your tongue concerning (the Quran) to make haste therewith.\" (75.16) said \"Allah's Messenger (ﷺ) used to bear the revelation with great trouble and used to move his lips (quickly) with the Inspiration.\" Ibn 'Abbas moved his lips saying, \"I am moving my lips in front of you as Allah's Messenger (ﷺ) used to move his.\" Said moved his lips saying: \"I am moving my lips, as I saw Ibn 'Abbas moving his.\" Ibn 'Abbas added, \"So Allah revealed 'Move not your tongue concerning (the Qur'an) to make haste therewith. It is for Us to collect it and to give you (O Muhammad) the ability to recite it (the Quran)' (75.16-17) which means that Allah will make him (the Prophet) remember the portion of the Qur'an which was revealed at that time by heart and recite it. The statement of Allah: 'And when we have recited it to you (O Muhammad through Gabriel) then you follow its (Quran) recital' (75.18) means 'listen to it and be silent.' Then it is for Us (Allah) to make it clear to you' (75.19) means 'Then it is (for Allah) to make you recite it (and its meaning will be clear by itself through your tongue). Afterwards, Allah's Messenger (ﷺ) used to listen to Gabriel whenever he came and after his departure he used to recite it as Gabriel had recited it.\"\n</p><p></p>",
      primaryNarrator: '\n\n     Narrated Said bin Jubair:'
    },
    {
      label: 'Sahih al-Bukhari 6',
      bookId: '1',
      arabic:
        '<span class="arabic_sanad arabic"></span>\n<span class="arabic_text_details arabic">حَدَّثَنَا عَبْدَانُ، قَالَ أَخْبَرَنَا عَبْدُ اللَّهِ، قَالَ أَخْبَرَنَا يُونُسُ، عَنِ الزُّهْرِيِّ، ح وَحَدَّثَنَا بِشْرُ بْنُ مُحَمَّدٍ، قَالَ أَخْبَرَنَا عَبْدُ اللَّهِ، قَالَ أَخْبَرَنَا يُونُسُ، وَمَعْمَرٌ، عَنِ الزُّهْرِيِّ، نَحْوَهُ قَالَ أَخْبَرَنِي عُبَيْدُ اللَّهِ بْنُ عَبْدِ اللَّهِ، عَنِ ابْنِ عَبَّاسٍ، قَالَ كَانَ رَسُولُ اللَّهِ صلى الله عليه وسلم أَجْوَدَ النَّاسِ، وَكَانَ أَجْوَدُ مَا يَكُونُ فِي رَمَضَانَ حِينَ يَلْقَاهُ جِبْرِيلُ، وَكَانَ يَلْقَاهُ فِي كُلِّ لَيْلَةٍ مِنْ رَمَضَانَ فَيُدَارِسُهُ الْقُرْآنَ، فَلَرَسُولُ اللَّهِ صلى الله عليه وسلم أَجْوَدُ بِالْخَيْرِ مِنَ الرِّيحِ الْمُرْسَلَةِ‏.‏</span><span class="arabic_sanad arabic"></span>',
      hadithNumber: '6',
      englishTrans:
        "<p>\n\n     Allah's Messenger (ﷺ) was the most generous of all the people, and he used \n     to reach the peak in generosity in the month of Ramadan when Gabriel \n     met him. Gabriel used to meet him every night of Ramadan to teach him \n     the Qur'an. Allah's Messenger (ﷺ) was the most generous person, even more \n     generous than the strong uncontrollable wind (in readiness and haste \n     to do charitable deeds).\n</p><p></p>",
      primaryNarrator: "\n\n     Narrated Ibn 'Abbas:"
    },
    {
      label: 'Sahih al-Bukhari 7',
      bookId: '1',
      arabic:
        '<span class="arabic_sanad arabic"></span>\n<span class="arabic_text_details arabic">حَدَّثَنَا أَبُو الْيَمَانِ الْحَكَمُ بْنُ نَافِعٍ، قَالَ أَخْبَرَنَا شُعَيْبٌ، عَنِ الزُّهْرِيِّ، قَالَ أَخْبَرَنِي عُبَيْدُ اللَّهِ بْنُ عَبْدِ اللَّهِ بْنِ عُتْبَةَ بْنِ مَسْعُودٍ، أَنَّ عَبْدَ اللَّهِ بْنَ عَبَّاسٍ، أَخْبَرَهُ أَنَّ أَبَا سُفْيَانَ بْنَ حَرْبٍ أَخْبَرَهُ أَنَّ هِرَقْلَ أَرْسَلَ إِلَيْهِ فِي رَكْبٍ مِنْ قُرَيْشٍ ـ وَكَانُوا تُجَّارًا بِالشَّأْمِ ـ فِي الْمُدَّةِ الَّتِي كَانَ رَسُولُ اللَّهِ صلى الله عليه وسلم مَادَّ فِيهَا أَبَا سُفْيَانَ وَكُفَّارَ قُرَيْشٍ، فَأَتَوْهُ وَهُمْ بِإِيلِيَاءَ فَدَعَاهُمْ فِي مَجْلِسِهِ، وَحَوْلَهُ عُظَمَاءُ الرُّومِ ثُمَّ دَعَاهُمْ وَدَعَا بِتَرْجُمَانِهِ فَقَالَ أَيُّكُمْ أَقْرَبُ نَسَبًا بِهَذَا الرَّجُلِ الَّذِي يَزْعُمُ أَنَّهُ نَبِيٌّ فَقَالَ أَبُو سُفْيَانَ فَقُلْتُ أَنَا أَقْرَبُهُمْ نَسَبًا‏.‏ فَقَالَ أَدْنُوهُ مِنِّي، وَقَرِّبُوا أَصْحَابَهُ، فَاجْعَلُوهُمْ عِنْدَ ظَهْرِهِ‏.‏ ثُمَّ قَالَ لِتَرْجُمَانِهِ قُلْ لَهُمْ إِنِّي سَائِلٌ هَذَا عَنْ هَذَا الرَّجُلِ، فَإِنْ كَذَبَنِي فَكَذِّبُوهُ‏.‏ فَوَاللَّهِ لَوْلاَ الْحَيَاءُ مِنْ أَنْ يَأْثِرُوا عَلَىَّ كَذِبًا لَكَذَبْتُ عَنْهُ، ثُمَّ كَانَ أَوَّلَ مَا سَأَلَنِي عَنْهُ أَنْ قَالَ كَيْفَ نَسَبُهُ فِيكُمْ قُلْتُ هُوَ فِينَا ذُو نَسَبٍ‏.‏ قَالَ فَهَلْ قَالَ هَذَا الْقَوْلَ مِنْكُمْ أَحَدٌ قَطُّ قَبْلَهُ قُلْتُ لاَ‏.‏ قَالَ فَهَلْ كَانَ مِنْ آبَائِهِ مِنْ مَلِكٍ قُلْتُ لاَ‏.‏ قَالَ فَأَشْرَافُ النَّاسِ يَتَّبِعُونَهُ أَمْ ضُعَفَاؤُهُمْ فَقُلْتُ بَلْ ضُعَفَاؤُهُمْ‏.‏ قَالَ أَيَزِيدُونَ أَمْ يَنْقُصُونَ قُلْتُ بَلْ يَزِيدُونَ‏.‏ قَالَ فَهَلْ يَرْتَدُّ أَحَدٌ مِنْهُمْ سَخْطَةً لِدِينِهِ بَعْدَ أَنْ يَدْخُلَ فِيهِ قُلْتُ لاَ‏.‏ قَالَ فَهَلْ كُنْتُمْ تَتَّهِمُونَهُ بِالْكَذِبِ قَبْلَ أَنْ يَقُولَ مَا قَالَ قُلْتُ لاَ‏.‏ قَالَ فَهَلْ يَغْدِرُ قُلْتُ لاَ، وَنَحْنُ مِنْهُ فِي مُدَّةٍ لاَ نَدْرِي مَا هُوَ فَاعِلٌ فِيهَا‏.‏ قَالَ وَلَمْ تُمْكِنِّي كَلِمَةٌ أُدْخِلُ فِيهَا شَيْئًا غَيْرُ هَذِهِ الْكَلِمَةِ‏.‏ قَالَ فَهَلْ قَاتَلْتُمُوهُ قُلْتُ نَعَمْ‏.‏ قَالَ فَكَيْفَ كَانَ قِتَالُكُمْ إِيَّاهُ قُلْتُ الْحَرْبُ بَيْنَنَا وَبَيْنَهُ سِجَالٌ، يَنَالُ مِنَّا وَنَنَالُ مِنْهُ‏.‏ قَالَ مَاذَا يَأْمُرُكُمْ قُلْتُ يَقُولُ اعْبُدُوا اللَّهَ وَحْدَهُ، وَلاَ تُشْرِكُوا بِهِ شَيْئًا، وَاتْرُكُوا مَا يَقُولُ آبَاؤُكُمْ، وَيَأْمُرُنَا بِالصَّلاَةِ وَالصِّدْقِ وَالْعَفَافِ وَالصِّلَةِ‏.‏ فَقَالَ لِلتَّرْجُمَانِ قُلْ لَهُ سَأَلْتُكَ عَنْ نَسَبِهِ، فَذَكَرْتَ أَنَّهُ فِيكُمْ ذُو نَسَبٍ، فَكَذَلِكَ الرُّسُلُ تُبْعَثُ فِي نَسَبِ قَوْمِهَا، وَسَأَلْتُكَ هَلْ قَالَ أَحَدٌ مِنْكُمْ هَذَا الْقَوْلَ فَذَكَرْتَ أَنْ لاَ، فَقُلْتُ لَوْ كَانَ أَحَدٌ قَالَ هَذَا الْقَوْلَ قَبْلَهُ لَقُلْتُ رَجُلٌ يَأْتَسِي بِقَوْلٍ قِيلَ قَبْلَهُ، وَسَأَلْتُكَ هَلْ كَانَ مِنْ آبَائِهِ مِنْ مَلِكٍ فَذَكَرْتَ أَنْ لاَ، قُلْتُ فَلَوْ كَانَ مِنْ آبَائِهِ مِنْ مَلِكٍ قُلْتُ رَجُلٌ يَطْلُبُ مُلْكَ أَبِيهِ، وَسَأَلْتُكَ هَلْ كُنْتُمْ تَتَّهِمُونَهُ بِالْكَذِبِ قَبْلَ أَنْ يَقُولَ مَا قَالَ فَذَكَرْتَ أَنْ لاَ، فَقَدْ أَعْرِفُ أَنَّهُ لَمْ يَكُنْ لِيَذَرَ الْكَذِبَ عَلَى النَّاسِ وَيَكْذِبَ عَلَى اللَّهِ، وَسَأَلْتُكَ أَشْرَافُ النَّاسِ اتَّبَعُوهُ أَمْ ضُعَفَاؤُهُمْ فَذَكَرْتَ أَنَّ ضُعَفَاءَهُمُ اتَّبَعُوهُ، وَهُمْ أَتْبَاعُ الرُّسُلِ، وَسَأَلْتُكَ أَيَزِيدُونَ أَمْ يَنْقُصُونَ فَذَكَرْتَ أَنَّهُمْ يَزِيدُونَ، وَكَذَلِكَ أَمْرُ الإِيمَانِ حَتَّى يَتِمَّ، وَسَأَلْتُكَ أَيَرْتَدُّ أَحَدٌ سَخْطَةً لِدِينِهِ بَعْدَ أَنْ يَدْخُلَ فِيهِ فَذَكَرْتَ أَنْ لاَ، وَكَذَلِكَ الإِيمَانُ حِينَ تُخَالِطُ بَشَاشَتُهُ الْقُلُوبَ، وَسَأَلْتُكَ هَلْ يَغْدِرُ فَذَكَرْتَ أَنْ لاَ، وَكَذَلِكَ الرُّسُلُ لاَ تَغْدِرُ، وَسَأَلْتُكَ بِمَا يَأْمُرُكُمْ، فَذَكَرْتَ أَنَّهُ يَأْمُرُكُمْ أَنْ تَعْبُدُوا اللَّهَ، وَلاَ تُشْرِكُوا بِهِ شَيْئًا، وَيَنْهَاكُمْ عَنْ عِبَادَةِ الأَوْثَانِ، وَيَأْمُرُكُمْ بِالصَّلاَةِ وَالصِّدْقِ وَالْعَفَافِ‏.‏ فَإِنْ كَانَ مَا تَقُولُ حَقًّا فَسَيَمْلِكُ مَوْضِعَ قَدَمَىَّ هَاتَيْنِ، وَقَدْ كُنْتُ أَعْلَمُ أَنَّهُ خَارِجٌ، لَمْ أَكُنْ أَظُنُّ أَنَّهُ مِنْكُمْ، فَلَوْ أَنِّي أَعْلَمُ أَنِّي أَخْلُصُ إِلَيْهِ لَتَجَشَّمْتُ لِقَاءَهُ، وَلَوْ كُنْتُ عِنْدَهُ لَغَسَلْتُ عَنْ قَدَمِهِ‏.‏ ثُمَّ دَعَا بِكِتَابِ رَسُولِ اللَّهِ صلى الله عليه وسلم الَّذِي بَعَثَ بِهِ دِحْيَةُ إِلَى عَظِيمِ بُصْرَى، فَدَفَعَهُ إِلَى هِرَقْلَ فَقَرَأَهُ فَإِذَا فِيهِ بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ‏.‏ مِنْ مُحَمَّدٍ عَبْدِ اللَّهِ وَرَسُولِهِ إِلَى هِرَقْلَ عَظِيمِ الرُّومِ‏.‏ سَلاَمٌ عَلَى مَنِ اتَّبَعَ الْهُدَى، أَمَّا بَعْدُ فَإِنِّي أَدْعُوكَ بِدِعَايَةِ الإِسْلاَمِ، أَسْلِمْ تَسْلَمْ، يُؤْتِكَ اللَّهُ أَجْرَكَ مَرَّتَيْنِ، فَإِنْ تَوَلَّيْتَ فَإِنَّ عَلَيْكَ إِثْمَ الأَرِيسِيِّينَ وَ‏{‏يَا أَهْلَ الْكِتَابِ تَعَالَوْا إِلَى كَلِمَةٍ سَوَاءٍ بَيْنَنَا وَبَيْنَكُمْ أَنْ لاَ نَعْبُدَ إِلاَّ اللَّهَ وَلاَ نُشْرِكَ بِهِ شَيْئًا وَلاَ يَتَّخِذَ بَعْضُنَا بَعْضًا أَرْبَابًا مِنْ دُونِ اللَّهِ فَإِنْ تَوَلَّوْا فَقُولُوا اشْهَدُوا بِأَنَّا مُسْلِمُونَ‏}‏ قَالَ أَبُو سُفْيَانَ فَلَمَّا قَالَ مَا قَالَ، وَفَرَغَ مِنْ قِرَاءَةِ الْكِتَابِ كَثُرَ عِنْدَهُ الصَّخَبُ، وَارْتَفَعَتِ الأَصْوَاتُ وَأُخْرِجْنَا، فَقُلْتُ لأَصْحَابِي حِينَ أُخْرِجْنَا لَقَدْ أَمِرَ أَمْرُ ابْنِ أَبِي كَبْشَةَ، إِنَّهُ يَخَافُهُ مَلِكُ بَنِي الأَصْفَرِ‏.‏ فَمَا زِلْتُ مُوقِنًا أَنَّهُ سَيَظْهَرُ حَتَّى أَدْخَلَ اللَّهُ عَلَىَّ الإِسْلاَمَ‏.‏ وَكَانَ ابْنُ النَّاظُورِ صَاحِبُ إِيلِيَاءَ وَهِرَقْلَ سُقُفًّا عَلَى نَصَارَى الشَّأْمِ، يُحَدِّثُ أَنَّ هِرَقْلَ حِينَ قَدِمَ إِيلِيَاءَ أَصْبَحَ يَوْمًا خَبِيثَ النَّفْسِ، فَقَالَ بَعْضُ بَطَارِقَتِهِ قَدِ اسْتَنْكَرْنَا هَيْئَتَكَ‏.‏ قَالَ ابْنُ النَّاظُورِ وَكَانَ هِرَقْلُ حَزَّاءً يَنْظُرُ فِي النُّجُومِ، فَقَالَ لَهُمْ حِينَ سَأَلُوهُ إِنِّي رَأَيْتُ اللَّيْلَةَ حِينَ نَظَرْتُ فِي النُّجُومِ مَلِكَ الْخِتَانِ قَدْ ظَهَرَ، فَمَنْ يَخْتَتِنُ مِنْ هَذِهِ الأُمَّةِ قَالُوا لَيْسَ يَخْتَتِنُ إِلاَّ الْيَهُودُ فَلاَ يُهِمَّنَّكَ شَأْنُهُمْ وَاكْتُبْ إِلَى مَدَايِنِ مُلْكِكَ، فَيَقْتُلُوا مَنْ فِيهِمْ مِنَ الْيَهُودِ‏.‏ فَبَيْنَمَا هُمْ عَلَى أَمْرِهِمْ أُتِيَ هِرَقْلُ بِرَجُلٍ أَرْسَلَ بِهِ مَلِكُ غَسَّانَ، يُخْبِرُ عَنْ خَبَرِ رَسُولِ اللَّهِ صلى الله عليه وسلم فَلَمَّا اسْتَخْبَرَهُ هِرَقْلُ قَالَ اذْهَبُوا فَانْظُرُوا أَمُخْتَتِنٌ هُوَ أَمْ لاَ‏.‏ فَنَظَرُوا إِلَيْهِ، فَحَدَّثُوهُ أَنَّهُ مُخْتَتِنٌ، وَسَأَلَهُ عَنِ الْعَرَبِ فَقَالَ هُمْ يَخْتَتِنُونَ‏.‏ فَقَالَ هِرَقْلُ هَذَا مَلِكُ هَذِهِ الأُمَّةِ قَدْ ظَهَرَ‏.‏ ثُمَّ كَتَبَ هِرَقْلُ إِلَى صَاحِبٍ لَهُ بِرُومِيَةَ، وَكَانَ نَظِيرَهُ فِي الْعِلْمِ، وَسَارَ هِرَقْلُ إِلَى حِمْصَ، فَلَمْ يَرِمْ حِمْصَ حَتَّى أَتَاهُ كِتَابٌ مِنْ صَاحِبِهِ يُوَافِقُ رَأْىَ هِرَقْلَ عَلَى خُرُوجِ النَّبِيِّ صلى الله عليه وسلم وَأَنَّهُ نَبِيٌّ، فَأَذِنَ هِرَقْلُ لِعُظَمَاءِ الرُّومِ فِي دَسْكَرَةٍ لَهُ بِحِمْصَ ثُمَّ أَمَرَ بِأَبْوَابِهَا فَغُلِّقَتْ، ثُمَّ اطَّلَعَ فَقَالَ يَا مَعْشَرَ الرُّومِ، هَلْ لَكُمْ فِي الْفَلاَحِ وَالرُّشْدِ وَأَنْ يَثْبُتَ مُلْكُكُمْ فَتُبَايِعُوا هَذَا النَّبِيَّ، فَحَاصُوا حَيْصَةَ حُمُرِ الْوَحْشِ إِلَى الأَبْوَابِ، فَوَجَدُوهَا قَدْ غُلِّقَتْ، فَلَمَّا رَأَى هِرَقْلُ نَفْرَتَهُمْ، وَأَيِسَ مِنَ الإِيمَانِ قَالَ رُدُّوهُمْ عَلَىَّ‏.‏ وَقَالَ إِنِّي قُلْتُ مَقَالَتِي آنِفًا أَخْتَبِرُ بِهَا شِدَّتَكُمْ عَلَى دِينِكُمْ، فَقَدْ رَأَيْتُ‏.‏ فَسَجَدُوا لَهُ وَرَضُوا عَنْهُ، فَكَانَ ذَلِكَ آخِرَ شَأْنِ هِرَقْلَ‏.‏ رَوَاهُ صَالِحُ بْنُ كَيْسَانَ وَيُونُسُ وَمَعْمَرٌ عَنِ الزُّهْرِيِّ‏.‏</span><span class="arabic_sanad arabic"></span>',
      hadithNumber: '7',
      englishTrans:
        "<p>\n\n     Abu Sufyan bin Harb informed me that Heraclius had sent a messenger to\n     him while he had been accompanying a caravan from Quraish. They were \n     merchants doing business in Sham (Syria, Palestine, Lebanon and \n     Jordan), at the time when Allah's Messenger (ﷺ) had truce with Abu Sufyan \n     and Quraish infidels. So Abu Sufyan and his companions went to \n     Heraclius at Ilya (Jerusalem). Heraclius called them in the court and \n     he had all the senior Roman dignitaries around him. He called for his \n     translator who, translating Heraclius's question said to them, \"Who \n     amongst you is closely related to that man who claims to be a \n     Prophet?\" Abu Sufyan replied, \"I am the nearest relative to him \n     (amongst the group).\"\n</p><p>\n\n     Heraclius said, \"Bring him (Abu Sufyan) close to me and make his \n     companions stand behind him.\" Abu Sufyan added, Heraclius told his \n     translator to tell my companions that he wanted to put some questions \n     to me regarding that man (The Prophet) and that if I told a lie they \n     (my companions) should contradict me.\" Abu Sufyan added, \"By Allah! \n     Had I not been afraid of my companions labeling me a liar, I would not\n     have spoken the truth about the Prophet. The first question he asked \n     me about him was:\n</p><p>\n\n     'What is his family status amongst you?' \n</p><p>\n\n     I replied, 'He belongs to a good (noble) family amongst us.' \n</p><p>\n\n     Heraclius further asked, 'Has anybody amongst you ever claimed the \n     same (i.e. to be a Prophet) before him?'\n</p><p>\n\n     I replied, 'No.'\n</p><p>\n\n     He said, 'Was anybody amongst his ancestors a king?'\n</p><p>\n\n     I replied, 'No.'\n</p><p>\n\n     Heraclius asked, 'Do the nobles or the poor follow him?'\n</p><p>\n\n     I replied, 'It is the poor who follow him.'\n</p><p>\n\n     He said, 'Are his followers increasing decreasing (day by day)?'\n</p><p>\n\n     I replied, 'They are increasing.'\n</p><p>\n\n     He then asked, 'Does anybody amongst those who embrace his religion \n     become displeased and renounce the religion afterwards?'\n</p><p>\n\n     I replied, 'No.'\n</p><p>\n\n     Heraclius said, 'Have you ever accused him of telling lies before his \n     claim (to be a Prophet)?'\n</p><p>\n\n     I replied, 'No. '\n</p><p>\n\n     Heraclius said, 'Does he break his promises?'\n</p><p>\n\n     I replied, 'No. We are at truce with him but we do not know what he \n     will do in it.' I could not find opportunity to say anything against \n     him except that.\n</p><p>\n\n     Heraclius asked, 'Have you ever had a war with him?'\n</p><p>\n\n     I replied, 'Yes.'\n</p><p>\n\n     Then he said, 'What was the outcome of the battles?'\n</p><p>\n\n     I replied, 'Sometimes he was victorious and sometimes we.'\n</p><p>\n\n     Heraclius said, 'What does he order you to do?'\n</p><p>\n\n     I said, 'He tells us to worship Allah and Allah alone and not to \n     worship anything along with Him, and to renounce all that our \n     ancestors had said. He orders us to pray, to speak the truth, to be \n     chaste and to keep good relations with our Kith and kin.'\n</p><p>\n\n     Heraclius asked the translator to convey to me the following, I asked \n     you about his family and your reply was that he belonged to a very \n     noble family. In fact all the Apostles come from noble families \n     amongst their respective peoples. I questioned you whether anybody \n     else amongst you claimed such a thing, your reply was in the negative.\n     If the answer had been in the affirmative, I would have thought that \n     this man was following the previous man's statement. Then I asked you \n     whether anyone of his ancestors was a king. Your reply was in the \n     negative, and if it had been in the affirmative, I would have thought \n     that this man wanted to take back his ancestral kingdom.\n</p><p>\n\n     I further asked whether he was ever accused of telling lies before he \n     said what he said, and your reply was in the negative. So I wondered \n     how a person who does not tell a lie about others could ever tell a \n     lie about Allah. I, then asked you whether the rich people followed \n     him or the poor. You replied that it was the poor who followed him. \n     And in fact all the Apostle have been followed by this very class of \n     people. Then I asked you whether his followers were increasing or \n     decreasing. You replied that they were increasing, and in fact this is\n     the way of true faith, till it is complete in all respects. I further \n     asked you whether there was anybody, who, after embracing his \n     religion, became displeased and discarded his religion. Your reply was\n     in the negative, and in fact this is (the sign of) true faith, when \n     its delight enters the hearts and mixes with them completely. I asked \n     you whether he had ever betrayed. You replied in the negative and \n     likewise the Apostles never betray. Then I asked you what he ordered \n     you to do. You replied that he ordered you to worship Allah and Allah \n     alone and not to worship any thing along with Him and forbade you to \n     worship idols and ordered you to pray, to speak the truth and to be \n     chaste. If what you have said is true, he will very soon occupy this \n     place underneath my feet and I knew it (from the scriptures) that he \n     was going to appear but I did not know that he would be from you, and \n     if I could reach him definitely, I would go immediately to meet him \n     and if I were with him, I would certainly wash his feet.' Heraclius \n     then asked for the letter addressed by Allah's Apostle\n</p><p>\n\n     which was delivered by Dihya to the Governor of Busra, who forwarded \n     it to Heraclius to read. The contents of the letter were as follows: \n     \"In the name of Allah the Beneficent, the Merciful (This letter is) \n     from Muhammad the slave of Allah and His Apostle to Heraclius the \n     ruler of Byzantine. Peace be upon him, who follows the right path. \n     Furthermore I invite you to Islam, and if you become a Muslim you will\n     be safe, and Allah will double your reward, and if you reject this \n     invitation of Islam you will be committing a sin of\n     Arisiyin (tillers, farmers i.e. your people). And  (Allah's Statement:)\n</p><p>\n\n     'O people of the scripture! Come to a word common to you and us that \n     we worship none but Allah and that we associate nothing in worship \n     with Him, and that none of us shall take others as Lords beside Allah.\n     Then, if they turn away, say: Bear witness that we are Muslims (those \n     who have surrendered to Allah).' (3:64).\n</p><p>\n\n     Abu Sufyan then added, \"When Heraclius had finished his speech and had\n     read the letter, there was a great hue and cry in the Royal Court. So \n     we were turned out of the court. I told my companions that the \n     question of Ibn-Abi-Kabsha) (the Prophet (ﷺ) Muhammad) has become so \n     prominent that even the King of Bani Al-Asfar (Byzantine) is afraid of\n     him. Then I started to become sure that he (the Prophet) would be the \n     conqueror in the near future till I embraced Islam (i.e. Allah guided \n     me to it).\"\n</p><p>\n\n     The sub narrator adds, \"Ibn An-Natur was the Governor of llya' \n     (Jerusalem) and Heraclius was the head of the Christians of Sham. Ibn \n     An-Natur narrates that once while Heraclius was visiting ilya' \n     (Jerusalem), he got up in the morning with a sad mood. Some of his \n     priests asked him why he was in that mood? Heraclius was a foreteller \n     and an astrologer. He replied, 'At night when I looked at the stars, I\n     saw that the leader of those who practice circumcision had appeared \n     (become the conqueror). Who are they who practice circumcision?' The \n     people replied, 'Except the Jews nobody practices circumcision, so you\n     should not be afraid of them (Jews).\n</p><p>\n\n     'Just Issue orders to kill every Jew present in the country.'\n</p><p>\n\n     While they were discussing it, a messenger sent by the king of Ghassan\n     to convey the news of Allah's Messenger (ﷺ) to Heraclius was brought in. \n     Having heard the news, he (Heraclius) ordered the people to go and see\n     whether the messenger of Ghassan was circumcised. The people, after \n     seeing him, told Heraclius that he was circumcised. Heraclius then \n     asked him about the Arabs. The messenger replied, 'Arabs also practice\n     circumcision.'\n</p><p>\n\n     (After hearing that) Heraclius remarked that sovereignty of the 'Arabs\n     had appeared. Heraclius then wrote a letter to his friend in Rome who \n     was as good as Heraclius in knowledge. Heraclius then left for Homs. \n     (a town in Syrian and stayed there till he received the reply of his \n     letter from his friend who agreed with him in his opinion about the \n     emergence of the Prophet (ﷺ) and the fact that he was a Prophet. On that \n     Heraclius invited all the heads of the Byzantines to assemble in his \n     palace at Homs. When they assembled, he ordered that all the doors of \n     his palace be closed. Then he came out and said, 'O Byzantines! If \n     success is your desire and if you seek right guidance and want your \n     empire to remain then give a pledge of allegiance to this Prophet \n     (i.e. embrace Islam).'\n</p><p>\n\n     (On hearing the views of Heraclius) the people ran towards the gates \n     of the palace like onagers but found the doors closed. Heraclius \n     realized their hatred towards Islam and when he lost the hope of their\n     embracing Islam, he ordered that they should be brought back in \n     audience.\n</p><p>\n\n     (When they returned) he said, 'What already said was just to test the \n     strength of your conviction and I have seen it.' The people prostrated\n     before him and became pleased with him, and this was the end of \n     Heraclius's story (in connection with his faith).\n</p><p></p>",
      primaryNarrator: "\n\n     Narrated 'Abdullah bin 'Abbas:"
    }
  ]
];

export default HadithView;
