/**
 * Header for the patient portal, just showing a logo with some padding
 */
import Link from "next/link";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import cx from "classnames";
import Logo from "../landing/Logo";

interface Props {
  isLoggedInAs?: Boolean;
}

const Header: React.FC<Props> = ({ isLoggedInAs }) => {
  return (
    <div
      className={cx(
        "w-full px-4 py-4 border-b solid",
        isLoggedInAs ? "bg-coral-100" : "bg-white"
      )}
    >
      <Link href="/">
        <a href="#">
          <Logo />
        </a>
      </Link>
    </div>
  );
};

export default Header;
