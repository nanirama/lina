/**
 * Component on landing to display benefits of product
 */
import React from "react";

const Benefits = () => {
  return (
    <section className="pt-16 pb-20 bg-blueGray-50">
      <div className="container px-4 mx-auto content-center">
        <div className="flex flex-wrap items-center mb-12">
          <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
            <h2 className="text-4xl font-bold font-heading">
              <span>
                Personalized care, with the safety and convenience of home.
              </span>
            </h2>
          </div>
          <div className="w-full lg:w-1/2">
            <p className="lg:pl-16 text-blueGray-500 leading-loose">
              We know these are challenging times, and we&apos;re here for you.
              Schedule an appointment anytime online. Our team will develop a
              treatment plan based on your needs, and can ship medication as
              necessary.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 -mb-6">
          <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-6">
            <div className="pt-8 px-6 pb-6 bg-white text-center rounded shadow">
              <svg
                className="w-10 h-10 mx-auto mb-4 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                ></path>
              </svg>
              <h3 className="mb-2 font-bold font-heading">Online Assessment</h3>
              <p className="text-sm text-blueGray-500">
                We know your time is valuable. Find out if Lina is right for you
                with our quick online assessment.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-6">
            <div className="pt-8 px-6 pb-6 bg-white text-center rounded shadow">
              <svg
                className="w-10 h-10 mx-auto mb-4 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                ></path>
              </svg>
              <h3 className="mb-2 font-bold font-heading">World Class Team</h3>
              <p className="text-sm text-blueGray-500">
                Our team of board-certified psychiatrists and therapists will
                work with you to see what treatment is best.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-6">
            <div className="pt-8 px-6 pb-6 bg-white text-center rounded shadow">
              <svg
                className="w-10 h-10 mx-auto mb-4 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
              <h3 className="mb-2 font-bold font-heading">Quick Results</h3>
              <p className="text-sm text-blueGray-500">
                You can start therapy instantly, and if you need medication we
                can deliver it to your door within 3 days.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-6">
            <div className="pt-8 px-6 pb-6 bg-white text-center rounded shadow">
              <svg
                className="w-10 h-10 mx-auto mb-4 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                ></path>
              </svg>
              <h3 className="mb-2 font-bold font-heading">Safe and Secure</h3>
              <p className="text-sm text-blueGray-500">
                You can do all of this from home, with everything protected by
                our HIPPA compliant encryption.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
