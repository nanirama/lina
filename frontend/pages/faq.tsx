/**
 * FAQ Page
 */
import React, { useState } from "react";
import Link from "next/link";
import { createClient } from 'contentful'
import Footer from "../components/landing/Footer";
import Header from "../components/landing/Header";
import Button from "../components/core/Button";
import FAQ from "../components/landing/FAQ";

interface Props { }
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

const Faq: React.FC<Props> = (props) => {
  const { faq } = props
  return (
    <div className="">
      <Header title="Lina" startColor="bg-white" />
      <div className="grid grid-cols-1 space-y-8 pt-16 px-8">
        <FAQ title="Frequently asked questions" showButton={false} faq={faq}  />
      </div>
      <p className="p-8">
        <div className="mb-4 text-center">
          Have additional questions? Feel free to message our support team.
        </div>
        <Link href="/onboarding/intro/start?discountCode=50OFF">
          <Button asLink={true} className="p-4 text-lg mx-auto max-w-md">
            Start your free assessment
          </Button>
        </Link>
      </p>
      <Footer />
    </div>
  );
};
export async function getStaticProps() {
  const res = await client.getEntries({ content_type: "faq", order: 'sys.createdAt' })
   return {
     props: {
       faq: res.items,
     },
     revalidate: 1
   }
 }
 
export default Faq;
