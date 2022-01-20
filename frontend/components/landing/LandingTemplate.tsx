/**
 * Wrapper component used to provide template for the landing page.
 * Use this to create multiple variations of the landing page with
 * the same structure.
 */
import { NextPage } from "next";
import React from "react";
import { useOffer } from "../../lib/hooks/offer";
import { useUtm } from "../../lib/hooks/utm";
import EmergencyBar from "./EmergencyBar";
import FAQ from "./FAQ";
import Footer from "./Footer";
import Header from "./Header";
import MedicalTeam from "./MedicalTeam";
import NewCareProcess from "./NewCareProcess";
import Pricing from "./Pricing";
import Section from "./Section";
import Testimonials from "./Testimonials";
import WhatWeTreat from "./WhatWeTreat";

interface Props { }

const LandingTemplate: NextPage<Props> = ({ data, children }) => {
  console.log('All data', data)
  const { faq, page } = data
  const { fields } = page
  const {
    careProcessHeading,
    careProcess,
    testimonialsHeading,
    testimonials,
    anxietyAndDepressionHeading,
    anxietyAndDepressionShortDescription,
    depressionListItems,
    teamHeading,
    teamList,
    heroSectionImage
  } = fields
  console.log('Titlte', careProcessHeading)
  useUtm();
  const { offerText } = useOffer();

  return (
    <div className="">
      <Header title="Lina" startOffer={offerText} />
      <Section id="desc" className="flex justify-center bg-seashell relative">
        <div className="container grid grid-cols-1 md:grid-cols-2">
          <div>{children}</div>
          <div className="relative mt-8 md:mt-0">
            <img
              src="/images/ctabg.svg"
              width="400"
              className="ml-auto"
              style={{ right: "4px" }}
            />
            <img
              width="340"
              src={heroSectionImage.fields.file.url}
              className="heroimage rounded-full absolute top-0"
            />
          </div>
        </div>
      </Section>
      <Section id="care_process" className="flex justify-center">
        <div className="container">
          <NewCareProcess heading={careProcessHeading} data={careProcess} />
        </div>
      </Section>

      <Section id="testimonials" className="flex justify-center bg-seashell">
        <div className="container">
          <Testimonials heading={testimonialsHeading} data={testimonials} />
        </div>
      </Section>

      <Section id="what_we_treat" className="flex justify-center bg-seashell">
        <div className="container">
          <WhatWeTreat heading={anxietyAndDepressionHeading} subText={anxietyAndDepressionShortDescription} data={depressionListItems}/>
        </div>
      </Section>

      <Section id="medical_team">
        <MedicalTeam heading={teamHeading} data={teamList} />
      </Section>

      <Section id="pricing" className="bg-seashell" noPadding>
        <Pricing data={fields} />
      </Section>

      <Section id="faq" className="flex justify-center">
        <div className="container">
          <FAQ faq={faq} />
        </div>
      </Section>
      <Section
        id="emergency"
        className="flex justify-center"
        style={{ backgroundColor: "rgba(244, 218, 213, 0.6)" }}
      >
        <div className="container">
          <EmergencyBar data={fields} />
        </div>
      </Section>
      <Footer />
    </div>
  );
};

export default LandingTemplate;
