/**
 * UNUSED
 */
import React from "react";
import Head from "next/head";

interface Props { }

const CalendlySchedule: React.FC<Props> = () => {
  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="https://assets.calendly.com/assets/external/widget.js"
          async
        ></script>
      </Head>
      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/neilgrigg/lina-care-coordinator-call?hide_landing_page_details=1"
        // data-url="https://calendly.com/sambarani?hide_landing_page_details=1"
        style={{ minWidth: "320px", height: "630px" }}
      ></div>
    </>
  );
};

export default CalendlySchedule;
