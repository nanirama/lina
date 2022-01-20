import { ProviderLicense } from "../models/provider_license";
import { stateAbbreviationToName, USState } from "../utils/states";

/**
 *
 * @returns list of states that Lina has practitioners with active licenses
 */
export const getOperatingStates = async (): Promise<Array<USState>> => {
    const licenses = await ProviderLicense.query();
    const states = Array.from(new Set(licenses.map((l) => l.state)));
    return states.map((state) => ({
        abbreviation: state,
        name: stateAbbreviationToName(state),
    }));
};
