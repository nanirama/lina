/**
 * Footer for landing page
 */
import Link from "next/link";
import React, { FC, HTMLProps } from "react";
import LegitscriptSeal from "./LegitscriptSeal";
import Logo from "./Logo";

import Facebook from "../svg/SocialMedia/Facebook";
import Instagram from "../svg/SocialMedia/Instagram";
import LinkedIn from "../svg/SocialMedia/LinkedIn";

type SocialMediaLinkProps = {
  href: string;
};

const SocialMediaLink: FC<SocialMediaLinkProps> = ({ href, children }) => (
  <a target="_blank" rel="noreferrer" className="w-6" href={href}>
    {children}
  </a>
);

type FooterItemProps = HTMLProps<HTMLAnchorElement> & {
  href: string;
  className?: string;
  external?: boolean;
};

const FooterItem: FC<FooterItemProps> = ({
  href,
  children,
  external = false,
  ...props
}) => {
  const link = (
    <a
      className="border-b border-current hover:border-none"
      href={external ? href : undefined}
      {...props}
    >
      {children}
    </a>
  );

  return <li>{external ? link : <Link href={href}>{link}</Link>}</li>;
};

const Footer = () => {
  return (
    <footer
      id="footer"
      className="px-6 py-12 md:py-28 flex justify-center bg-seashell"
    >
      <div className="container grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col space-y-4">
          <Logo />
          <LegitscriptSeal />
        </div>
        <div className="mt-8 md:mt-0 p-4 md:p-0 grid grid-cols-1 md:grid-cols-2">
          <ul className="text-sm mb-4 lg:mb-8 flex flex-col gap-y-1">
            <FooterItem href="/terms-of-service">Terms of Service</FooterItem>
            <FooterItem href="/privacy-policy">Privacy Policy</FooterItem>
            <FooterItem href="mailto:press@hellolina.com" external>
              Press Inquiries
            </FooterItem>
            <FooterItem
              href="https://boards.greenhouse.io/lina"
              target="_blank"
              external
            >
              Careers
            </FooterItem>
            <FooterItem href="/refer-friend">Refer a Friend</FooterItem>
            <FooterItem href="/blog">Blog</FooterItem>
          </ul>
          <ul className="flex flex-col text-sm gap-y-1">
            <FooterItem href="mailto:support@hellolina.com" external>
              support@hellolina.com
            </FooterItem>
            <FooterItem href="/faq">FAQ</FooterItem>
            <li>9am-5pm EST, M-F</li>
            <li className="flex pt-3 gap-x-3">
              <SocialMediaLink href="https://www.instagram.com/linamentalhealth/?hl=en">
                <Instagram />
              </SocialMediaLink>
              <SocialMediaLink href="https://www.linkedin.com/company/hellolina/">
                <LinkedIn />
              </SocialMediaLink>
              <SocialMediaLink href="https://www.facebook.com/people/Lina/100068077291395/">
                <Facebook />
              </SocialMediaLink>
            </li>
          </ul>
          <p className="text-xs mt-8">
            &copy; 2021 Lina, a B&amp;G Innovations company. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
