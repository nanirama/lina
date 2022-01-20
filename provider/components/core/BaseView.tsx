/**
 * This utilizes <ProtectedView> from /common in order to create
 * logged-in only views on the provider app.
 */
import React from "react";
import { ProtectedView } from "@healthgent/common";
import Sidebar from "./Sidebar";

interface Props { }

const BaseProviderView: React.FC<Props> = ({ children }) => (
  <ProtectedView>
    <div>
      <div className="flex flex-col">
        <Sidebar />
        <div className="mt-12 bg-gray-50 w-full min-h-screen overflow-auto p-8">
          {children}
          <div className="h-24 w-full" />
        </div>
      </div>
    </div>
  </ProtectedView>
);

export default BaseProviderView;
