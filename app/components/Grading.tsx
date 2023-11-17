import { Badge } from '@tremor/react';
import React from 'react';

function Grading() {
  return (
    <div className="slideInDown">
      <hr className="my-2" />
      <div className="flex flex-row">
        <Badge className="mr-2 cursor-pointer hover:shadow-sm" color="blue">
          Sahih
        </Badge>
      </div>
    </div>
  );
}

export default Grading;
