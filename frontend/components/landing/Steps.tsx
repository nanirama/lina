/**
 * unused?
 */
import React from "react";

const Steps = () => {
  return (
    <section className="py-12 md:py-32 overflow-x-hidden">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap lg:flex-nowrap">
          <div className="w-full">
            <div className="py-6">
              <div className="mb-4">
                <span className="text-xs py-1 px-3 text-blue-600 font-semibold bg-blue-50 rounded-xl">
                  How does it work?
                </span>
                <h2 className="text-4xl mt-3 font-bold font-heading">
                  Get help in 3 easy steps.
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="flex items-start py-4">
                  <div className="w-8 mr-5 text-blue-500">
                    <svg
                      fill="none"
                      className="w-8 h-8"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold font-heading">
                      Schedule a time with a provider
                    </h3>
                    <p className="text-blueGray-500 leading-loose">
                      We won’t make you wait months to see a provider! Fill out
                      a brief, 5-minute online assessment and we’ll help you
                      find a convenient time that works with your schedule.
                    </p>
                  </div>
                </div>
                <div className="flex items-start py-4">
                  <div className="w-8 mr-5 text-blue-500">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold font-heading">
                      Meet with a clinician from the comfort of your home
                    </h3>
                    <p className="text-blueGray-500 leading-loose">
                      Find a quiet place at home and tell our providers how
                      you’re feeling. Our providers will listen to your needs
                      and provide you with individualized care whether that
                      involves medication, talk therapy or self care.
                    </p>
                  </div>
                </div>
                <div className="flex items-start py-4">
                  <div className="w-8 mr-5 text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        fill="#fff"
                        d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold font-heading">
                      Medication shipped to your door
                    </h3>
                    <p className="text-blueGray-500 leading-loose">
                      If you need medication, we can deliver it to your door
                      within 3 days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="relative w-full lg:w-1/2 my-12 lg:my-0"><img className="relative mx-auto rounded-xl w-full z-10" src="https://images.unsplash.com/photo-1536940135352-b4b3875df888?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1050&amp;h=1050&amp;q=80" alt="" /><img className="absolute top-0 left-0 w-40 -ml-12 -mt-12" src="/metis-assets/elements/blob-tear.svg" alt="" /><img className="absolute bottom-0 right-0 w-40 -mr-12 -mb-12" src="/metis-assets/elements/blob-tear.svg" alt="" /></div> */}
        </div>
      </div>
    </section>
  );
};

export default Steps;
