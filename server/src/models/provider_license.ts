import { Model } from "objection";
import { BaseModel } from "./base";
import { Provider } from "./provider";

/**
 * Represents a single state license for a provider.
 */
export class ProviderLicense extends BaseModel {
  id!: number;
  // State abbreviation, e.g. AL, TX, NY
  state!: string;
  providerId!: string;
  active!: boolean;
  expiryDate?: Date;

  provider!: Provider;

  static get tableName() {
    return "provider_licenses";
  }

  static get relationMappings() {
    return {
      provider: {
        relation: Model.BelongsToOneRelation,
        modelClass: Provider,
        join: {
          from: "provider_licences.providerId",
          to: "providers.id",
        },
      },
    };
  }
}
