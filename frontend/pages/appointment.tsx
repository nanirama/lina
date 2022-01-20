/**
 * Wrapper around daily.co call iframe
 */
import { NextPage } from "next";
import React from "react";
import Script from "next/script";

interface Props {
  roomId: string;
}

const Room: NextPage<Props> = ({ roomId }) => {
  return (
    <div>
      <Script
        id="daily-script"
        src="https://unpkg.com/@daily-co/daily-js"
        onLoad={() => {
          // @ts-ignore
          window.callFrame = window.DailyIframe.createFrame({
            iframeStyle: {
              position: "fixed",
              width: "100%",
              height: "100%",
            },
          });
          // @ts-ignore
          callFrame.join({ url: `https://hellolina.daily.co/${roomId}` });
        }}
      />
    </div>
  );
};

Room.getInitialProps = ({ query }) => {
  const roomId = query.id as string;
  return { roomId };
};

export default Room;
