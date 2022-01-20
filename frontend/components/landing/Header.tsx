/**
 * Header for landing page
 */
import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import cx from "classnames";
import { Transition } from "@headlessui/react";
import Logo from "./Logo";
import Button from "../core/Button";

interface Props {
  title: string;
  startColor?: string;
  startOffer?: string;
  hideMenu?: boolean;
}

const Header: React.FC<Props> = ({
  title,
  startOffer,
  startColor,
  hideMenu,
}) => {
  const [showOffer, setShowOffer] = useState(!!startOffer);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isTop, setIsTop] = useState(true);

  const onScroll = () => {
    setIsTop(window.pageYOffset < 32);
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleClose = () => setShowSidebar(false);
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={cx(
          "w-full flex flex-col items-center justify-center fixed top-0 left-0 z-50 transition-colors duration-500",
          { "shadow-md": !isTop },
          isTop ? startColor || "bg-seashell" : "bg-white"
        )}
      >
        {showOffer ? (
          <div className="z-50 t-0 bg-darkGray text-white h-8 w-full flex items-center justify-center text-center">
            <Link href="/onboarding/intro/start">
              <a href="#" className="underline hover:no-underline mx-auto">
                {startOffer}
              </a>
            </Link>
            <div onClick={() => setShowOffer(false)} className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        ) : null}
        <nav className="flex container items-center px-6 md:px-0 py-4">
          <Link href="/">
            <a href="#" className="flex items-center">
              <Logo />
            </a>
            {/* <span>Lina</span> */}
          </Link>
          <div className={cx("ml-auto md:hidden", hideMenu ? "hidden" : "")}>
            <button
              onClick={() => setShowSidebar(true)}
              className="flex items-center py-2 px-3 text-coral rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-darkGray"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
          {/* <div className="lg:hidden">
              <Link href="/onboarding/intro/start">
                <a className="primary-button-blue text-sm w-" href="#">
                  Get Started
                </a>
              </Link>
            </div> */}
          <ul className="hidden lg:flex lg:items-center lg:w-auto lg:space-x-8 ml-auto mr-4">
            <div className="hidden lg:flex">
              <Link href="/login">
                <Button
                  href="#"
                  asLink
                  buttonType="secondary"
                  className="text-darkGray hover:underline"
                >
                  Log In
                </Button>
              </Link>
              <Link href="/onboarding/intro/start">
                <Button
                  buttonType="header"
                  className="ml-2 uppercase text-sm px-4"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </ul>
        </nav>
        {/* <hr className="border-1 solid border-gray-200 mx-10" /> */}
      </div>

      <Transition show={showSidebar}>
        <Transition.Child
          enter="transition-opacity ease-linear duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-blueGray-800 opacity-25"
            onClick={() => setShowSidebar(false)}
          ></div>
        </Transition.Child>
        <Transition.Child
          enter="transition-all ease-linear duration-300"
          enterFrom="-ml-64"
          enterTo="ml-0"
          leave="transition-all ease-linear duration-50"
          leaveTo="-ml-64"
        >
          <nav className="py-3 px-6 border-r top-0 w-96 bg-white fixed h-full overflow-auto z-50 ">
            <div className="flex items-center mb-8 ">
              <Link href="/">
                <a className="">
                  <Logo />
                </a>
              </Link>
              <button onClick={() => setShowSidebar(false)} className="ml-auto">
                <svg
                  className="h-6 w-6 cursor-pointer hover:text-blueGray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div>
              <ul className="hidden">
                <li className="mb-1">
                  <a
                    className="block p-4 text-sm"
                    href="/#get_treatment"
                    onClick={toggleClose}
                  >
                    Get Treatment
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    className="block p-4 text-sm"
                    href="/#care_process"
                    onClick={toggleClose}
                  >
                    Care Process
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    className="block p-4 text-sm"
                    href="/#pricing"
                    onClick={toggleClose}
                  >
                    Pricing
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    className="block p-4 text-sm"
                    href="/#faq"
                    onClick={toggleClose}
                  >
                    FAQ
                  </a>
                </li>
              </ul>
              <div className="mt-4 pt-6 border-t border-blueGray-100">
                <Link href="/onboarding/intro/start">
                  <Button asLink>Get Started</Button>
                </Link>
                <Link href="/login">
                  <Button
                    asLink
                    buttonType="secondary"
                    className="text-coral mt-2 border"
                  >
                    Log In
                  </Button>
                </Link>
              </div>
            </div>
          </nav>
        </Transition.Child>
      </Transition>
      {showOffer ? (
        <div className="mb-16 bg-seashell"></div>
      ) : (
        <div className="mb-8 bg-seashell"></div>
      )}
      <div className={cx(showOffer ? "mt-8" : undefined)}></div>
    </>
  );
};

export default Header;
