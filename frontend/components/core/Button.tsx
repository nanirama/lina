/**
 * Styled <button> component for the patient facing product
 */
import React, { ReactNode } from "react";
import cx from "classnames";

interface Props {
  // Used to style the button differently based on where in the app it is
  buttonType?: "cta" | "primary" | "secondary" | "header";
  // Use an <a> tag instead of a button
  asLink?: boolean;
  // Whether the button is disabled
  disabled?: boolean;
  // Whether the button is outlined or filled in
  outline?: boolean;
  // Will show a loading circle if true
  processing?: boolean;
}

export interface ButtonAsButtonProps
  extends Props,
  React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The element that should be rendered as a button
   */
  tag?: "button";
  /**
   * The native HTML button type
   */
  type?: "button" | "submit" | "reset";
}

export interface ButtonAsAnchorProps
  extends Props,
  React.AnchorHTMLAttributes<HTMLAnchorElement> {
  tag: "a";
}

export interface ButtonAsOtherProps
  extends Props,
  React.AnchorHTMLAttributes<HTMLAnchorElement> {
  tag: string;
}

export type ButtonProps =
  | ButtonAsButtonProps
  | ButtonAsAnchorProps
  | ButtonAsOtherProps;

type Ref = ReactNode | HTMLElement | string;
const Button = React.forwardRef<Ref, ButtonProps>((props, ref) => {
  const {
    asLink,
    children,
    buttonType,
    className,
    disabled,
    hidden,
    outline,
    processing,
    ...otherProps
  } = props;
  const buttonClass = cx(
    "items-center justify-center p-3",
    "rounded outline-none focus:outline-none",
    {
      flex: !hidden,
      hidden: hidden,
      disabled: disabled,
      // "bg-red-400": !buttonType,
    },
    !outline
      ? {
        "text-white shadow bg-darkGray hover:bg-darkGray-800 active:bg-darkGray-800":
          !disabled && buttonType === "cta",
        "text-white shadow bg-coral hover:bg-coral-500 active:bg-coral-500":
          (!disabled && buttonType === "primary") || !buttonType,
        "text-darkGray bg-transparent text-darkGray border border-solid border-darkGray hover:bg-darkGray hover:text-white rounded-full":
          buttonType === "header",
        "bg-gray-300 hover:bg-gray-300": disabled,
      }
      : {
        "border border-coral text-coral hover:bg-coral hover:text-white":
          true,
      },

    className
  );
  if (asLink) {
    return (
      // @ts-ignore
      <a className={buttonClass} {...otherProps}>
        {children}
      </a>
    );
  }
  return (
    // @ts-ignore
    <button className={buttonClass} disabled={disabled} {...otherProps}>
      {children}
      {processing ? (
        <svg
          className="animate-spin ml-2 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : null}
    </button>
  );
});

export default Button;
