/**
 * React hook used to set a discount code in the application context
 * based on the current page URL.
 */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DiscountCode } from "../../../server/src/lib/api_types";
import { useAppContext } from "../../context/AppContext";

export const useOffer = () => {
  const router = useRouter();
  const { discountCode, setDiscountCode } = useAppContext();
  useEffect(() => {
    if (Object.keys(router.query).length > 0) {
      const { offer } = router.query;
      if (offer) {
        setDiscountCode(offer as DiscountCode);
      }
    }
  }, [router.query]);
  const offerText = "Start your first month for just $5";
  return { discountCode, offerText };
};
