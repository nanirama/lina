/**
 * styled Table Header component wrapping <thead>
 */
import React from "react";
import cx from "classnames";

type Props = React.HTMLAttributes<HTMLTableSectionElement>;

const TableHeader = React.forwardRef<HTMLTableSectionElement, Props>(
  (props, ref) => {
    const { className, children, ...other } = props;

    const cls = cx(
      "text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800",
      className
    );
    return (
      <thead className={cls} ref={ref} {...other}>
        {children}
      </thead>
    );
  }
);

export default TableHeader;
