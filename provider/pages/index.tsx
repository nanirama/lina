/**
 * Homepage that just redirects to the patient list,
 * assuming the user is logged in.
 */
import React, { useEffect } from "react";
import Router from "next/router";
import BaseProviderView from "../components/core/BaseView";

const Home = () => {
  useEffect(() => {
    Router.push("/appointments");
  }, []);
  return <BaseProviderView>home</BaseProviderView>;
};

export default Home;
