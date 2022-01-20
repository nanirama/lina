/**
 * Alert used to indicate errors/success after performing an operation on a page.
 */
import React, { SVGAttributes } from "react";
import cx from "classnames";

enum AlertEnum {
  success,
  danger,
  warning,
  info,
  neutral,
}

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The type of the alert
   */
  type?: keyof typeof AlertEnum;
  /**
   * If defined, shows the close icon that calls this function
   */
  onClose?: () => void;
}

type IconProps = SVGAttributes<SVGElement>;

export const InfoIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

export const WarningIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

export const DangerIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

export const SuccessIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

export const NeutralIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  const { className, children, type = "neutral", onClose, ...other } = props;

  const types = {
    base: "p-4 pl-12 relative rounded-lg leading-5",
    withClose: "pr-12",
    success:
      "bg-green-50 text-green-900 dark:bg-green-600 dark:text-white border-green-300",
    danger:
      "bg-red-50 text-red-900 dark:bg-red-600 dark:text-white border-red-300",
    warning:
      "bg-yellow-50 text-yellow-900 dark:bg-yellow-600 dark:text-white border-yellow-300",
    neutral:
      "bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-300",
    info: "bg-blue-50 text-blue-900 dark:bg-blue-600 dark:text-white border-blue-300",
  };
  const icon = {
    base: "h-5 w-5",
    success: "text-green-400 dark:text-green-300",
    danger: "text-red-400 dark:text-red-300",
    warning: "text-yellow-400 dark:text-yellow-100",
    neutral: "text-gray-400 dark:text-gray-500",
    info: "text-blue-400 dark:text-blue-300",
  };

  const baseStyle =
    "p-4 pl-12 relative rounded-lg leading-5 border border-solid";
  const withCloseStyle = "pr-12";
  const typeStyle = types[type];
  const iconBaseStyle = icon.base;
  const iconTypeStyle = icon[type];

  let Icon;
  switch (type) {
    case "success":
      Icon = SuccessIcon;
      break;
    case "warning":
      Icon = WarningIcon;
      break;
    case "danger":
      Icon = DangerIcon;
      break;
    case "info":
      Icon = InfoIcon;
      break;
    case "neutral":
      Icon = NeutralIcon;
      break;
    default:
      Icon = NeutralIcon;
  }

  const cls = cx(baseStyle, typeStyle, onClose && withCloseStyle, className);

  const iconCls = cx(
    iconBaseStyle,
    iconTypeStyle,
    "absolute left-0 top-0 ml-4 mt-4"
  );
  const closeCls = cx(iconBaseStyle, iconTypeStyle);

  return (
    <div className={cls} role="alert" ref={ref} {...other}>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-4 mr-4"
          aria-label="close"
        >
          <svg
            className={closeCls}
            fill="currentColor"
            viewBox="0 0 20 20"
            role="img"
            aria-hidden="true"
          >
            <path
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
              fillRule="evenodd"
            ></path>
          </svg>
        </button>
      )}
      <Icon className={iconCls} />
      {children}
    </div>
  );
});

export default Alert;
