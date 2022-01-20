import React from "react";
import { Provider } from "@healthgent/server/src/lib/api_types";
import cx from "classnames";

interface Props {
  selectedProviderId?: string;
  providers: Array<Provider>;
  onProviderChange: (s: string) => unknown;
}

const ProviderPicker: React.FC<Props> = ({
  providers,
  selectedProviderId,
  onProviderChange,
}) => {
  return (
    <div>
      {providers.map((provider) => (
        <div
          key={provider.providerId}
          className={cx("flex items-center p-4 m-1 border")}
          onClick={() => onProviderChange(provider.providerId)}
        >
          <img
            src={provider?.picUrl}
            width="64"
            height="64"
            className="rounded-full mb-2 border border-3 mr-4"
          />
          <div className="text-xs">{provider?.bio}</div>
        </div>
      ))}
    </div>
  );
};

export default ProviderPicker;
