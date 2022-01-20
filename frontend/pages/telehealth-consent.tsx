/**
 * Telehealth consent page
 */
import React from "react";
import Header from "../components/landing/Header";

interface Props { }

const TelehealthConsent: React.FC<Props> = () => {
  return (
    <>
      <Header title="Lina - Terms of Service" />
      <div className="mt-10 px-8 container flex flex-col space-y-4 mx-auto text-blueGray-800">
        <p>
          YOU UNDERSTAND THAT BY CHECKING THE “AGREE” BOX FOR THESE TERMS OF USE
          AND/OR ANY OTHER SUCH FORM OF THE SAME PRESENTED TO YOU FROM TIME TO
          TIME ON THE SITE YOU ARE AGREEING TO THESE TERMS OF USE AND THAT SUCH
          ON-GOING ACTIONS IN USING THE SITE CONSTITUTE A LEGAL SIGNATURE AND
          ON-GOING AGREEMENT TO THESE TERMS OF USE (IN WHATEVER FORM).
        </p>
        <p>
          For avoidance of any doubt, the terms “Lina“, “we“, “us“, or “our”
          refer to B&amp;G Innovations, Inc. (the legal owner of Lina.net) and
          the terms “you” and “yours” refer to the person using the Service.
        </p>
        <p>
          Telehealth is a way to visit with healthcare providers, such as your
          doctor or nurse practitioner. You can talk to your provider from any
          place, including your home. You don’t go to a clinic or hospital. In
          this case, you will talk to your provider by phone, computer, or
          tablet via a video consultation.
        </p>
        <p>
          Your telehealth visit will be private. We use telehealth technology
          that is designed to protect your privacy. We will not record visits
          with your provider. If people are close to you, they may hear
          something you did not want them to know. You should be in a private
          place, so other people cannot hear you.
        </p>
        <p>
          Telemedicine could be beneficial in many ways:
          <ul>
            <li>
              You don’t have to go to a clinic or hospital to see your provider.
              For some people this option may be more convenient for any number
              of reasons.
            </li>
            <li>
              You won’t risk getting sick from other people by seeing a doctor
              in person.
            </li>
          </ul>
        </p>
        <p>
          Telemedicine also involves risks that you should be aware of:
          <ul>
            <li>
              You and your provider won’t be in the same room, so it may feel
              different than an office visit.
            </li>
            <li>
              Your provider may make a mistake because they cannot examine you
              as closely as at an office visit.
            </li>
            <li>Your provider may decide you still need an office visit.</li>
            <li>
              Technical problems may interrupt or stop your visit before you are
              done.
            </li>
            <li>
              There is a very small chance that someone could use technology to
              hear or see your telehealth visit. To avoid this risk, please use
              a network that is private and secure.
            </li>
          </ul>
        </p>
        <p>
          If you try telehealth and do not like it, you may stop using it at any
          time, even if it is during your scheduled visit. You can still get an
          office visit if you no longer want a telehealth visit. But until the
          office opens for all appointments, you will get an office visit only
          for one of the reasons listed above. Moreover, you are under no
          obligation to sign this document if you prefer other options. Only
          sign this document if you want to use telehealth.
        </p>
        <p>
          If you sign this document, you agree that:
          <ul>
            <li>We talked about the information in this document.</li>
            <li>We answered all your questions.</li>
            <li>You want a telehealth visit.</li>
          </ul>
        </p>
      </div>
    </>
  );
};

export default TelehealthConsent;
