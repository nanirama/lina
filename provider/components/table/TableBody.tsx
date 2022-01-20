/**
 * styled Table Body component wrapping <tbody>
 */
import React from "react";
import cx from "classnames";

type Props = React.HTMLAttributes<HTMLTableSectionElement>;

const TableBody = React.forwardRef<HTMLTableSectionElement, Props>(
  (props, ref) => {
    const { className, children, ...other } = props;

    const cls = cx(
      "bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400",
      className
    );
    return (
      <tbody className={cls} ref={ref} {...other}>
        {children}
      </tbody>
    );
  }
);

export default TableBody;
