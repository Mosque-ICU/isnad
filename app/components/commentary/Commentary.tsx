import React from 'react';
import { Badge } from '@tremor/react';
import Loader from '../Loader/Loader';
import { CommentaryOptions, Hadith } from '../hadithView/HadithView';

type CommentaryProps = {
  hadith: Hadith;
  CommentaryOptions?: CommentaryOptions[];
};

function Commentary({ hadith, CommentaryOptions }: CommentaryProps) {
  const [commentary, setCommentary] = React.useState(null) as any;
  const [commentaryId, setCommentaryId] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (CommentaryOptions) {
      fetchCommentary(CommentaryOptions[0].id);
      setCommentaryId(CommentaryOptions[0].id);
    }
  }, []);

  const fetchCommentary = async (id: number) => {
    setLoading(true);
    const request = await fetch(
      '/api/commentary?hadithId=' + hadith.hadithNumber + '&commentaryId=' + id
    );
    setLoading(false);
    const data = await request.json();
    if (data) setCommentary(data[0]);
  };

  return (
    <div className="slideInDown">
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
        <div
          className="w-full h-[50vh]  border border-gray-200 mt-3 overflow-y-auto p-3 text-sm"
          dangerouslySetInnerHTML={{
            __html: commentary?.englishText || 'Placeholder'
          }}
        ></div>
      )}
    </div>
  );
}

export default Commentary;
