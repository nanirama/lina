/**
 * styled Table Container component
 */
import React from "react";
import cx from "classnames";

type Props = React.HTMLAttributes<HTMLDivElement>;

const TableContainer = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { className, children, ...other } = props;

  const cls = cx(
    "w-full overflow-hidden flex-shrink-0 rounded-lg shadow-xs border",
    className
  );
  return (
    <div className={cls} ref={ref} {...other}>
      {children}
    </div>
  );
});

export default TableContainer;
