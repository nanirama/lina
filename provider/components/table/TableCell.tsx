/**
 * styled Table Cell component wrapping <td>
 */
import React from "react";
import cx from "classnames";

type Props = React.TdHTMLAttributes<HTMLTableCellElement>;

const TableCell = React.forwardRef<HTMLTableCellElement, Props>(
  (props, ref) => {
    const { className, children, ...other } = props;

    const cls = cx("px-4 py-3", className);
    return (
      <td className={cls} ref={ref} {...other}>
        {children}
      </td>
    );
  }
);

export default TableCell;
