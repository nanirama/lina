/**
 * Loads tracking pixels
 * See next.js documentation:
 * https://nextjs.org/docs/advanced-features/custom-document
 */
import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import {
  FB_PIXEL_ID,
  GA_TRACKING_ID,
  ADWORDS_ID,
  renderSegmentSnippet,
  SNAP_ID,
  TIKTOK_ID,
} from "../lib/event_logging";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Global Site Code Pixel - Facebook Pixel */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', ${FB_PIXEL_ID});
              `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>

          {/* Segment tracking code */}
          <script
            dangerouslySetInnerHTML={{ __html: renderSegmentSnippet() }}
          ></script>

          <script
            dangerouslySetInnerHTML={{
              __html: `
                    !function (w, d, t) {
                    w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};

                    ttq.load('${TIKTOK_ID}');
                    ttq.page();
                    }(window, document, 'ttq');
                    `,
            }}
          />

          {/* Google console */}
          <meta
            name="google-site-verification"
            content="nuoTmtJgEH5HVnLkZX_wsIJ7KAG1he2KFA7k6sgiCkM"
          />
          <meta
            name="google-signin-client_id"
            content="743742727469-ioqhndhvso01ccte7943fouv3t6a33i3.apps.googleusercontent.com"
          />
          <meta
            name="keywords"
            content="hellolina, lina, add treatment los angeles, add treatment san francisco, add treatment san diego, adhd treatment, dextroamphetamine, add assessment, vyvance effect, adult add diagnosis, adhd treatment los angeles, adhd treatment san francisco, adhd treatment san diego, psychiatrist san diego, psychiatrist san francisco, psychiatrist los angeles, mental health help online, online adhd help, adult attention deficit, online psychiatrist, vyvanse price, adderall price, adderall XR side effect, adderall XR price, miami adhd treatment"
          ></meta>
          <meta
            name="description"
            content="Lina offers online treatment for anxiety, depression, insomnia and ADHD. Includes psychiatrist visits and medication delivery."
          ></meta>
          <meta
            name="og:description"
            content="Lina offers online treatment for anxiety, depression, insomnia and ADHD. Includes psychiatrists visits and medication delivery."
          ></meta>
          <meta
            name="og:title"
            content="Lina | Online depression, anxiety, insomnia treatment and medication delivered to you"
          ></meta>
          <meta
            name="og:image"
            content="https://hellolina.com/images/share.jpg"
          ></meta>
          <meta name="og:type" content="website"></meta>
          <meta name="twitter:card" content="summary"></meta>
          <meta name="twitter:creator" content="Lina"></meta>
          <meta
            name="twitter:title"
            content="Lina | Online depression, anxiety, insomnia treatment and medication delivered to you"
          ></meta>
          <meta
            name="twitter:description"
            content="Lina | Online depression, anxiety, insomnia treatment and medication delivered to you"
          ></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
