import React from 'react';
import Button from './Button';

interface Props {
  number: number;
  title: string;
}

const SuggestionField: React.FC<Props> = ({ title, number }) => {
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex gap-[15px] items-center wishes-md:flex-wrap">
        <div className="bg-accentGreen w-[30px] h-[30px] rounded-full text-blue7 font-bold text-[13px] flex items-center justify-center">
          {number}
        </div>

        <h4 className="flex-1">{title}</h4>

        <Button className="wishes-md:w-full" type="card">
          suggestions
        </Button>
      </div>

      <div className="challenges-card-bg p-[2px] rounded-[15px]">
        <textarea
          placeholder="Your wish..."
          className="p-[40px] w-full h-full block rounded-[15px] resize-none bg-cardCombined min-h-[200px] outline-none text-[16px] text-white placeholder:text-white/50 wishes-md:p-[15px] wishes-md:min-h-[100px]"
        ></textarea>
      </div>
    </div>
  );
};

export default SuggestionField;
