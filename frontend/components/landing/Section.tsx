/**
 * Used to denoate a section on the landing page
 */
import React from "react";
import cx from "classnames";

interface Props {
  // id tag for the section
  id?: string;
  // any CSS classes to apply, if applicable
  className?: string;
  // whether to remove padding
  noPadding?: boolean;
  // optional CSS properties
  style?: React.CSSProperties;
}

const Section: React.FC<Props> = ({
  children,
  className,
  noPadding,
  ...otherProps
}) => {
  const combinedClass = cx(!noPadding ? "py-12 md:py-28 px-6" : "", className);
  return (
    <section className={combinedClass} {...otherProps}>
      {children}
    </section>
  );
};

export default Section;
