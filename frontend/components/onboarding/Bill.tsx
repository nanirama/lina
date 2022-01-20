/**
 * Used to display the bill at initial checkout
 */
import React from "react";
import cx from "classnames";

interface LineItem {
  // User visible label for line item
  label: string;
  // Amount in cents
  amount: number;
  // price displayed to user as a string
  displayPrice: string;
  // true if this should be small text
  subtext: boolean;
}

interface Props {
  lineItems: Array<LineItem>;
}
const Bill: React.FC<Props> = ({ lineItems }) => {
  const total = lineItems.map((item) => item.amount).reduce((a, b) => a + b, 0);
  return (
    <div className="flex flex-col border rounded-xl p-4 space-y-2 text-blueGray-500">
      <div className="text-2xl font-semibold text-center text-blueGray-800">
        Medication Plan
      </div>

      <div className="text-center text-2xl my-2"></div>

      {lineItems.map((item) => (
        <div
          key={`itemkey-${item.label}${item.amount}`}
          className={cx("w-full flex justify-between ", {
            "text-green-600": item.amount < 0,
            "text-sm": true,
            "text-blueGray-500": item.subtext,
            "pl-2": item.subtext,
            "text-blueGray-800": !item.subtext,
            "font-semibold": !item.subtext,
          })}
        >
          <div>{item.label}</div>
          <div className="ml-auto">
            {/* {item.amount < 0 ? "-" : ""}${Math.abs(item.amount)} */}
            {item.displayPrice}
          </div>
        </div>
      ))}

      <div className="w-full flex justify-between border-t pt-1 font-bold text-blueGray-800">
        <div>Total due today:</div>
        <div>${total}</div>
      </div>
    </div>
  );
};

export default Bill;
