/**
 * Basic horizontal tabbing implementation
 * UNUSED COMPONENT
 */
import React, { useState } from "react";
import cx from "classnames";

interface Props {
  titles: Array<string>;
}

const Tabs: React.FC<Props> = ({ titles, children }) => {
  const [tab, setTab] = useState(0);
  return (
    <>
      <div className="flex mb-4">
        {titles.map((t, idx) => (
          <div
            key={`tabtitle-${t}`}
            className={cx("mr-2 border-b-4 text-lg ", {
              "text-gray-700 hover:text-gray-800 border-solid border-gray-400":
                idx === tab,
              "text-gray-400 hover:text-gray-500 border-transparent":
                idx !== tab,
            })}
            onClick={() => setTab(idx)}
          >
            {t}
          </div>
        ))}
      </div>
      {React.Children.map(children, (c, idx) => (
        <div className={idx === tab ? "block" : "hidden"}>{c}</div>
      ))}
    </>
  );
};

export default Tabs;
