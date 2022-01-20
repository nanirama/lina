/**
 * Tab component, not sure if we use this or not
 */
import React, { useState } from "react";
import cx from "classnames";

interface Props {
  onSelectedChange: (s: string) => unknown;
  children: React.ReactElement<{ label: string }>[];
}

const Tabs: React.FC<Props> = ({ children, onSelectedChange }) => {
  const [selected, setSelected] = useState(children[0].props.label);
  const onChange = (s: string) => {
    setSelected(s);
    onSelectedChange(s);
  };
  return (
    <div className="flex space-x-4 justify-center">
      {React.Children.map(children, (c) => {
        const label = c.props?.label;
        return (
          <div
            key={label}
            onClick={() => onChange(label)}
            className={cx(
              "text-xl",
              label === selected
                ? "border-coral text-coral border-b-2"
                : "border-transparent text-blueGray-500 hover:text-coral"
            )}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
