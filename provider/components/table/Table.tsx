/**
 * styled Table component wrapping <table>
 */
import React from "react";

type Props = React.TableHTMLAttributes<HTMLTableElement>;

const Table = React.forwardRef<HTMLTableElement, Props>((props, ref) => {
  const { children, ...other } = props;
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full whitespace-no-wrap" ref={ref} {...other}>
        {children}
      </table>
    </div>
  );
});

export default Table;
