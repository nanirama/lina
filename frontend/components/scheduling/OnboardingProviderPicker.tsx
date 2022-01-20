import React, { FC, useEffect } from "react";
import cx from "classnames";
import { useSprings, animated } from "@react-spring/web";

import { Provider } from "@healthgent/server/src/lib/api_types";

import ChevronLeft from "../svg/ChevronLeft";
import ChevronRight from "../svg/ChevronRight";

type ChevronButtonProps = {
  hidden: boolean;
  previous?: boolean;
  onClick: () => void;
};

const ChevronButton: FC<ChevronButtonProps> = ({
  hidden,
  onClick,
  previous = false,
}) => {
  const Icon = previous ? ChevronLeft : ChevronRight;
  const text = previous ? "Previous" : "Next";

  return (
    <button
      className={cx(
        "flex flex-col justify-center items-center px-2 mt-1",
        hidden && "invisible pointer-events-none"
      )}
      onClick={onClick}
    >
      <div className="pt-1">
        <Icon />
      </div>
      <small className="text-xs py-1 leading-tight whitespace-nowrap">
        {text} prescriber
      </small>
    </button>
  );
};
type OnboardingProviderPickerProps = {
  selectedProviderId?: string;
  providers: Array<Provider>;
  onProviderChange: (s: string) => void;
};

const OnboardingProviderPicker: FC<OnboardingProviderPickerProps> = ({
  providers,
  selectedProviderId,
  onProviderChange,
}) => {
  const selectedProviderIndex = providers.findIndex(
    (provider) => provider.providerId === selectedProviderId
  );

  const [springProps, springPropsRef] = useSprings(
    providers.length,
    (index) => ({ offset: index })
  );

  useEffect(() => {
    springPropsRef
      .update((index) => ({ offset: index - selectedProviderIndex }))
      .start();
  }, [selectedProviderIndex, springPropsRef]);

  return (
    <div className="relative flex overflow-hidden">
      {springProps.map(({ offset }, index) => {
        const provider = providers[index];
        return (
          <animated.div
            key={provider.providerId}
            style={{
              transform: offset.to(
                (offsetX) => `translate3d(${offsetX * 100}%, 0, 0)`
              ),
            }}
            className={cx(
              "w-full h-full",
              index === selectedProviderIndex ? "relative" : "absolute"
            )}
          >
            <div className="flex flex-col items-center p-4 m-1 border">
              <div className="flex justify-center items-center">
                <ChevronButton
                  hidden={selectedProviderIndex === 0}
                  onClick={() =>
                    onProviderChange(
                      providers[selectedProviderIndex - 1].providerId
                    )
                  }
                  previous
                />
                <img
                  alt={`${provider.firstName} ${provider.lastName}`}
                  src={provider.picUrl || "/images/fallback-avatar.svg"}
                  width={64}
                  height={64}
                  className="rounded-full border border-3 mx-2"
                />
                <ChevronButton
                  hidden={selectedProviderIndex >= providers.length - 1}
                  onClick={() =>
                    onProviderChange(
                      providers[selectedProviderIndex + 1].providerId
                    )
                  }
                />
              </div>
              <div className="mt-4 text-xs">{provider?.bio}</div>
            </div>
          </animated.div>
        );
      })}
    </div>
  );
};

export default OnboardingProviderPicker;
