/**
 * Basic white card with padding, used as a container for other components.
 */

import React from "react";
import cx from "classnames";

interface Props {
  className?: string;
  onClick?: () => any;
}

const Card: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <div
      className={cx("flex bg-white rounded border solid p-4", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
