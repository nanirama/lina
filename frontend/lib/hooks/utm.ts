/**
 * React hook used to set UTM parameters in the application context
 * based on the current page URL. Used to track conversions / event
 * attribution on the server.
 */
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";

export const useUtm = () => {
  const router = useRouter();
  const { initialParams, setInitialParams } = useAppContext();
  useEffect(() => {
    if (initialParams?.utmSource) {
      return;
    }
    if (Object.keys(router.query).length > 0) {
      const { ref: referralCode } = router.query;
      if (!referralCode) {
        const {
          utm_source,
          utm_medium,
          utm_campaign,
          utm_content,
          utm_term,
          term,
        } = router.query;
        setInitialParams({
          utmSource: utm_source,
          utmMedium: utm_medium,
          utmCampaign: utm_campaign,
          utmContent: utm_content,
          utmTerm: utm_term || term,
          rawUrl: router.asPath,
        });
      } else {
        setInitialParams({
          utmSource: "user_referral",
          utmMedium: "copy_link",
          utmCampaign: "refer_friend_page",
          utmContent: referralCode,
        });
      }
    }
  }, [router.query]);
};
