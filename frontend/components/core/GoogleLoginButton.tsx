/**
 * Used when we had google login, which we no longer do
 * UNUSED COMPONENT
 * feel free to delete
 */
import {
  GoogleLogin,
  GoogleLoginResponse,
  useGoogleLogin,
} from "react-google-login";
import React, { useEffect, useReducer, useState } from "react";
import cx from "classnames";

interface Props {
  onSuccess: (s: string) => any;
  onFailure: (e: Error) => any;
  text: string;
  className?: string;
}

type GoogleSignInError =
  | "popup_closed_by_user"
  | "access_denied"
  | "immediate_failed"
  | "idpiframe_initialization_failed";

const GoogleIcon = () => {
  return (
    <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
      <g fill="#000" fillRule="evenodd">
        <path
          d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"
          fill="#EA4335"
        ></path>
        <path
          d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"
          fill="#4285F4"
        ></path>
        <path
          d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z"
          fill="#FBBC05"
        ></path>
        <path
          d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"
          fill="#34A853"
        ></path>
        <path fill="none" d="M0 0h18v18H0z"></path>
      </g>
    </svg>
  );
};

interface ButtonState {
  pressed: boolean;
  response?: GoogleLoginResponse;
}

enum ActionType {
  PRESS = "PRESS",
  UPDATE_RESPONSE = "UPDATE_RESPONSE",
}

type Action =
  | {
    type: ActionType.PRESS;
  }
  | { type: ActionType.UPDATE_RESPONSE; response: GoogleLoginResponse };

const reducer = (state: ButtonState, action: Action) => {
  switch (action.type) {
    case ActionType.PRESS:
      return { ...state, pressed: true };
    case ActionType.UPDATE_RESPONSE:
      if (state.pressed) {
        return { ...state, response: action.response };
      } else {
        return { ...state };
      }
  }
};

const GoogleLoginButton: React.FC<Props> = ({
  onSuccess,
  onFailure,
  className,
  text,
}) => {
  // Don't have time to figure this out rn I know this looks dumb
  const [state, dispatch] = useReducer(reducer, {
    pressed: false,
    response: undefined,
  });
  const { pressed, response } = state;
  useEffect(() => {
    if (pressed && response) {
      onSuccess(response.getAuthResponse().id_token);
    }
  }, [pressed, response]);

  const cb = (resp: GoogleLoginResponse) => {
    dispatch({ type: ActionType.UPDATE_RESPONSE, response: resp });
  };

  const handleError = (e: { error: GoogleSignInError }) => {
    if (
      e.error !== "popup_closed_by_user" &&
      e.error !== "idpiframe_initialization_failed"
    ) {
      onFailure(new Error("Could not login with Google"));
    }
  };
  return (
    <GoogleLogin
      render={(renderProps) => (
        <button
          className={cx(
            "w-full flex items-center justify-center bg-white border border-solid px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none",
            className
          )}
          onClick={() => {
            dispatch({ type: ActionType.PRESS });
            renderProps.onClick();
          }}
          disabled={renderProps.disabled}
        >
          <GoogleIcon />
          <span className="ml-2 font-lg">{text}</span>
        </button>
      )}
      clientId={process.env.NEXT_PUBLC_GOOGLE_CLIENT_ID as string}
      buttonText="Login"
      onSuccess={(r) => cb(r as GoogleLoginResponse)}
      onFailure={handleError}
      cookiePolicy={"single_host_origin"}
      isSignedIn={true}
    />
  );
};

export default GoogleLoginButton;
