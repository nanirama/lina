/**
 * Component to display pricing on the landing page
 */
import Image from "next/image";
import React from "react";
import CTAButton from "./CTAButton";

interface Props { }

const Checkmark = () => {
  return (
    <svg
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ml-4 md:ml-0 mr-4 flex-shrink-0"
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

const Pricing: React.FC<Props> = ({data}) => {
  const {
    affordablePlansHeading,
    startingAsLowHeadingText,
    startingAsLowBelowText,
    pringHeightPoints,
    insuranceAcceptedText,
    insuranceAcceptedBelowText
  } = data
  return (
    <div className="grid grid-cols-1 md:py-12">
      <div className="relative">
        <div className="md:hidden z-10 absolute t-0 h-full w-full bg-black opacity-30" />
        <h1
          className="z-30 block md:hidden absolute t-0 h-full w-full text-center text-white text-3xl md:text-4xl mb-12"
          style={{ top: "45%", bottom: "50%" }}
        >
          It&apos;s time to be yourself again.
        </h1>
        <div className="h-96 md:hidden">
          <Image src="/images/pricing_image_3.jpeg" layout="fill" />
        </div>
      </div>
      <div className="px-4 md:px-10 py-12 md:py-4 md:max-w-xl flex flex-col justify-center mx-auto">
        {/* <h1 className="hidden lg:block text-3xl md:text-4xl mb-8">
          Affordable plans to help you feel better
        </h1> */}
        <h1 className="text-center text-3xl md:text-4xl mb-8">
          {affordablePlansHeading ? affordablePlansHeading : 'Affordable plans to help you feel better'}
        </h1>
        <div className="text-2xl text-center mb-2 font-bold">
          {startingAsLowHeadingText ? startingAsLowHeadingText : 'Starting as low as <s>$95</s> $5 for your first month.'}
        </div>
        <div className="text-center text-sm mb-10">
          {startingAsLowBelowText ? startingAsLowBelowText : 'Just $95 a month after that.'}
        </div>

        <ul className="flex flex-col gap-y-2 mb-8 w-full mx-auto md:w-4/5">
        { pringHeightPoints && pringHeightPoints.map(({fields}, index)=>{
            return(
              <li className="flex items-center">
                <Checkmark />
                {fields.item}
              </li> 
            ) 
          })}
          {/* <li className="flex items-center">
            <Checkmark />
            Unlimited video consultations with your provider
          </li>
          <li className="flex items-center">
            <Checkmark />
            Unlimited messaging with your provider
          </li>
          <li className="flex items-center">
            <Checkmark />
            Free medication delivery to your door
          </li>
          <li className="flex items-center">
            <Checkmark />
            Regular progress tracking
          </li> */}
        </ul>
        <CTAButton className="w-72 md:w-full mx-auto">
          Start free assessment
        </CTAButton>
        <div className="mt-8 font-bold text-center">
          {insuranceAcceptedText ? insuranceAcceptedText : 'Insurance accepted, but not needed.'}
        </div>
        <div className="text-xs text-center">
          {insuranceAcceptedBelowText ? insuranceAcceptedBelowText : 'Easy out of network claims. HSA/FSA eligible. Medications eligible for insurance coverage are billed separately.'}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
