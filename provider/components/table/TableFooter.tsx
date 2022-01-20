/**
 * styled Table Footer component
 */
import React from "react";
import cx from "classnames";

type Props = React.HTMLAttributes<HTMLDivElement>;

const TableFooter = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { className, children, ...other } = props;

  const cls = cx("", className);
  return (
    <div className={cls} ref={ref} {...other}>
      {children}
    </div>
  );
});

export default TableFooter;
