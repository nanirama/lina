/**
 * component name is a misnomer - this is actually the top bar on the provider portal.
 */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import cx from "classnames";
import Link from "next/link";
import Logo from "./Logo";

interface Props { }

const Item: React.FC<{ link: string }> = ({ link, children }) => {
  const router = useRouter();
  const active = router.pathname === link;
  const className = cx(
    "my-2 items-center font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200",
    {
      "text-gray-800 dark:text-gray-100": active,
    }
  );
  return (
    <div className={className}>
      <Link href={link}>{children}</Link>
    </div>
  );
};

const Sidebar: React.FC<Props> = () => {
  const [isTop, setIsTop] = useState(true);

  const onScroll = () => {
    setIsTop(window.pageYOffset < 32);
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cx(
        "flex w-full h-12 space-x-8 items-center pl-8 bg-white text-gray-500 dark:text-gray-400",
        // { "shadow-md": !isTop }
        "fixed top-0 left-0",
        "border-b border-solid b-2"
      )}
    >
      <Link href="/">
        <a className="text-left text-gray-700 whitespace-no-wrap text-sm uppercase font-bold my-4">
          <Logo />
        </a>
      </Link>
      <Item link="/appointments">Appointments</Item>
      <Item link="/schedule">Availability Schedule</Item>
      <Item link="/clients">Clients</Item>
      <Item link="/templates/new">Templates</Item>
      <Item link="/messages">Messages</Item>
      <Item link="/settings">My Account</Item>
      <Item link="/logout">Logout</Item>
      <div className="hidden px-2 mb-4 mt-auto self-end text-xs">
        Text us at (623) 323-2955 or email sam@healthgent.net if you have
        questions or issues with the provider platform.
      </div>
    </div>
  );
};

export default Sidebar;
