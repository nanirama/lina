/**
 * A styled wrapper for a <button> used throughout the provider codebase.
 */
import React, { ReactNode } from "react";
import cx from "classnames";

interface Props {
  children?: React.ReactNode;
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
  const { children, className, ...otherProps } = props;
  const buttonClass = cx(
    className,
    "flex items-center justify-center",
    "primary-button-blue"
  );
  return (
    // @ts-ignore
    <button className={buttonClass} {...otherProps}>
      {children}
    </button>
  );
});

export default Button;
