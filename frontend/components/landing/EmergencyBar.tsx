/**
 * Shows numbers to call/dial in case of an emergency for landing
 */
import React from "react";

interface Props { }

const EmergencyBar: React.FC<Props> = ({data}) => {
  const {
    phoneNumberText,
    phoneNumberBelowText,
    tollFreeNumber,
    tollFreeNumberBelowText
  } = data
  return (
    <div className="grid grid-cols-1 space-y-8 md:grid-cols-2 md:space-y-0">
      <div className="flex">
        <img src="/images/distress.svg" className="" />
        <div className="ml-4 max-w-xs">
          <div className="text-3xl mb-6">{phoneNumberText ? phoneNumberText : '741-741'}</div>
          <div>
            {phoneNumberBelowText ? phoneNumberBelowText : 'If you&apos;re in emotional distress, text HOME to connect with a counselor immediately.'}            
          </div>
        </div>
      </div>
      <div className="flex">
        <img src="/images/emergency.svg" className="" />
        <div className="ml-4 max-w-xs">
          <div className="text-3xl mb-6">{tollFreeNumber ? tollFreeNumber : '911'}</div>
          <div>
            {tollFreeNumberBelowText ? tollFreeNumberBelowText : 'If you&apos;re having a medical or mental health emergency, call 911 or go to your local ER.'}            
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyBar;
