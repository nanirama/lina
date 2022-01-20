/**
 * Landing page
 */
import React from "react";
import CTAButton from "../components/landing/CTAButton";
import { createClient } from 'contentful'
import LandingTemplate from "../components/landing/LandingTemplate";

interface Props { }

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

const HomeIndex: React.FC<Props> = (props) => {
  const { page } = props
  const { fields } = page
  const {
    heroSectionHeading,
    heroSectionContent,
    heroSectionButtonBelowText
  } = fields
  return (
    <LandingTemplate data={props}>
      <h1 className="text-3xl md:text-4xl mb-4 md:mb-8">
        {heroSectionHeading ? heroSectionHeading : 'Mental healthcare without the wait. Finally.'}
      </h1>
      <div className="font-light leading-relaxed mb-4 md:mb-8">
        {heroSectionContent ? heroSectionContent : 'Online psychiatry and medication for depression and anxiety. Prescribed responsibly, provided affordably, with support from a team of providers.'}        
      </div>
      <CTAButton>Start free assessment</CTAButton>
      <div className="text-sm mt-2 text-center font-light">
        {heroSectionButtonBelowText ? heroSectionButtonBelowText : 'Book online in 10 minutes.'}
      </div>
    </LandingTemplate>
  );
};

export async function getStaticProps() {
 const res = await client.getEntries({ content_type: "faq", order: 'sys.createdAt' })

 const { items } = await client.getEntries({
    content_type: 'home',
    'fields.slug': 'home'
  })
  return {
    props: {
      faq: res.items,
      page: items[0]
    },
    revalidate: 1
  }
}

export default HomeIndex;
