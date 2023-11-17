import React from 'react';
import { Badge } from '@tremor/react';
import Loader from '../Loader/Loader';
import { CommentaryOptions, Hadith } from '../hadithView/HadithView';
import { addCacheValue, getCacheValue } from '../../_lib/cache';

type CommentaryProps = {
  hadith: Hadith;
  CommentaryOptions?: CommentaryOptions[];
  close: () => void;
};

function Commentary({ hadith, CommentaryOptions, close }: CommentaryProps) {
  const [commentary, setCommentary] = React.useState(null) as any;
  const [commentaryId, setCommentaryId] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [showEnglish, setShowEnglish] = React.useState(false);

  React.useEffect(() => {
    if (CommentaryOptions) {
      fetchCommentary(CommentaryOptions[0].id);
      setCommentaryId(CommentaryOptions[0].id);
    }
  }, []);

  const fetchCommentary = async (id: number) => {
    const cachedValue = await getCacheValue(
      '/api/commentary?hadithId=' + hadith.hadithNumber + '&commentaryId=' + id
    );
    if (cachedValue) {
      return setCommentary(cachedValue[0]);
    }

    setLoading(true);
    const request = await fetch(
      '/api/commentary?hadithId=' + hadith.hadithNumber + '&commentaryId=' + id
    );
    setLoading(false);
    const data = await request.json();
    addCacheValue(
      data,
      '/api/commentary?hadithId=' + hadith.hadithNumber + '&commentaryId=' + id
    );

    if (data) {
      setCommentary(data[0]);
    }
  };

  return (
    <div className="slideInDown relative">
      <p
        className="absolute top-[10px] right-4 cursor-pointer z-50"
        onClick={close}
      >
        X
      </p>
      <hr className="my-2" />

      <div className="flex flex-row">
        {CommentaryOptions &&
          CommentaryOptions.map((c: CommentaryOptions) => (
            <Badge
              key={c.id}
              className={`mr-2 cursor-pointer hover:shadow-sm ${
                commentaryId === c.id ? 'border border-blue-500' : ''
              }`}
              color="blue"
              onClick={() => commentaryId !== c.id && fetchCommentary(c.id)}
            >
              {c.name}
            </Badge>
          ))}
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="flex flex-row my-2">
            <Badge
              className={`mr-2 cursor-pointer hover:shadow-sm ${
                !showEnglish ? 'border border-blue-500' : ''
              }`}
              color="blue"
              onClick={() => setShowEnglish(false)}
            >
              Arabic
            </Badge>

            {commentary?.englishText && (
              <Badge
                className={`mr-2 cursor-pointer hover:shadow-sm ${
                  showEnglish ? 'border border-blue-500' : ''
                }`}
                color="blue"
                onClick={() => setShowEnglish(true)}
              >
                English
              </Badge>
            )}
          </div>

          {showEnglish ? (
            <div
              className="w-full h-[50vh]  border border-gray-200 mt-3 overflow-y-auto p-3 text-sm"
              dangerouslySetInnerHTML={{
                __html: commentary?.englishText || 'Placeholder'
              }}
            ></div>
          ) : (
            <div className="w-full h-[800px]  border border-gray-200 mt-3 overflow-y-auto p-3 text-sm flex flex-col items-center">
              <object
                data={`data:application/pdf;base64,${commentary?.arabicText}`}
                type="application/pdf"
                width="800px"
                height="100%"
                className="w-full h-full"
              >
                <embed
                  src={`data:application/pdf;base64,${commentary?.arabicText}`}
                  type="application/pdf"
                  width="100%"
                  height="100%"
                />
              </object>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Commentary;
