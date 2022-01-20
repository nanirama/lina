import { NextPage } from "next";
import Head from "next/head";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "savvy-smart-form": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "savvy-flow": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLInputElement>,
        HTMLElement
      >;
    }
  }
}

const SavvyTest: NextPage = () => {
  return (
    <>
      <Head>
        <title>Lina - Onboarding</title>
      </Head>
      <script async src="https://cdn.heysavvy.com/wc/savvy.min.js"></script>
      <savvy-smart-form id="VtcYAJUXZFBNMBUmi8bA"></savvy-smart-form>
      <script
        async
        src="https://flows.trysavvy.com/flows/savvy-flow.min.js"
      ></script>
      <savvy-flow id="oXrJG5EABAqe3at8RL8W"></savvy-flow>
    </>
  );
};

export default SavvyTest;
