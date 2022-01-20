import React from "react";
import { NextPage } from "next";

import BasePatientPortalView from "../../components/patient_portal/BasePatientPortalView";
import FAQ from "../../components/landing/FAQ";

const FAQPage: NextPage = () => (
  <BasePatientPortalView>
    <FAQ showButton={false} />
  </BasePatientPortalView>
);

export default FAQPage;
