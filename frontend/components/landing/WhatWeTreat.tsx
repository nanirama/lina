/**
 * Shows list of conditions treated.
 * unused?
 */
import React from "react";

interface Props { }

const Checkmark = () => {
  return (
    <svg
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ml-4 md:ml-0 mr-4 flex-shrink-0 text-darkGray"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.84799 13.1968L15.6924 1.51835L14.0627 0.28418L6.44555 10.3421L1.93885 7.13624L0.753906 8.80196L6.84799 13.1968Z"
        fill="#374146"
      />
    </svg>
  );
};

const TreatmentItem: React.FC = ({ children }) => {
  return (
    <li className="flex items-center">
      <Checkmark />
      {children}
    </li>
  );
};

const WhatWeTreat: React.FC<Props> = ({ heading, subText, data }) => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/3">
        <h1 className="text-3xl md:text-4xl text-center md:text-left mb-8">
          {heading ? heading : 'Anxiety and depression come in many forms'} 
        </h1>
        <div className="text-center md:text-left">
          {subText ? subText : 'That&apos;s why we specialize in treating the full spectrum of related conditions with personalized treatment plans that are right for you.'} 
        </div>
      </div>
      <ul className="mt-8 md:mt-0 grid grid-cols-2 mx-auto gap-x-4 gap-y-4 text-sm md:text-md">
      { data && data.map(({fields}, index)=>{
          return(
            <TreatmentItem>{fields.depressionItem}</TreatmentItem>
          )
        })}  
      </ul>
    </div>
  );
};

export default WhatWeTreat;
