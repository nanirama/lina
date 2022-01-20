/**
 * Logic relating to updating a user address
 */

import { PartialModelObject } from "objection";
import { verifyAddress } from "../lib/lob";
import Address from "../models/address";
import { User } from "../models/user";

export const updateAddress = async (
  user: User,
  address: PartialModelObject<Address>
) => {
  // @ts-ignore
  const verifiedAddress = await verifyAddress(address);
  const currentAddress = await Address.query()
    .where({ userId: user.id })
    .first();
  if (currentAddress) {
    return await currentAddress.$query().patch({ ...verifiedAddress });
  }
  return Address.query().insert({ ...verifiedAddress, userId: user.id });
};
