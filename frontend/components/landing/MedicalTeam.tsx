/**
 * Component displaying Dr. Patel and Dr. Patil
 * TODO: Can include more people + a link to everyone
 */
import React from "react";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
interface Props { }

const PractitionerCard: React.FC<{
  title: string;
  name: string;
  imageUrl: string;
}> = ({ title, name, imageUrl, children }) => {
  return (
    <div className="bg-white border solid shadow-lg rounded-lg p-8 max-w-md md:max-w-lg">
      <div className="flex mb-4">
        <div className="h-16 w-16 mr-4">
          <img className="rounded-full border b-2" src={imageUrl} />
        </div>
        <div>
          <h3 className="font-bold text-xl">{name}</h3>
          <h6 className="text-blue-400">{title}</h6>
        </div>
      </div>
      <p className="">{children}</p>
    </div>
  );
};

const MedicalTeam: React.FC<Props> = ({ heading, data }) => {
  return (
    <div className="flex flex-col">
      <div className="w-full">
        <h2 className="text-3xl md:text-4xl text-center mb-8">
          {heading ? heading : 'Your medical team'}          
        </h2>
      </div>
      <div className="w-full flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-8">
        { data && data.map(({fields}, index)=>{
            return(
              <PractitionerCard
                name={fields.name}
                title={fields.title}
                imageUrl={fields.profileImage.fields.file.url}
              >
                {documentToReactComponents(fields.description)}
              </PractitionerCard>
            ) 
          })}
      </div>
    </div>
  );
};

export default MedicalTeam;
