/**
 * styled Table Row component wrapping <tr>
 */
import React from "react";
import cx from "classnames";

type Props = React.HTMLAttributes<HTMLTableRowElement>;

const TableRow = React.forwardRef<HTMLTableRowElement, Props>((props, ref) => {
  const { className, children, ...other } = props;

  const cls = cx("", className);
  return (
    <tr className={cls} ref={ref} {...other}>
      {children}
    </tr>
  );
});

export default TableRow;
