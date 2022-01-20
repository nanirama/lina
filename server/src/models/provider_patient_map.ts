import { Model } from "objection";
import { BaseModel } from "./base";
import { Provider } from "./provider";
import { Patient } from "./patient";

/**
 * Used to map providers with the patients in their roster.
 * Note that this is many-to-many since it's possible a patient
 * sees multiple providers, or has to transfer providers, etc.
 */
export class ProviderPatientMap extends BaseModel {
    providerId!: string;
    patientId!: string;

    provider!: Provider;
    patient!: Patient;

    static get tableName() {
        return "provider_patient_map";
    }

    static get relationMappings() {
        return {
            provider: {
                relation: Model.BelongsToOneRelation,
                modelClass: Provider,
                join: {
                    from: "provider_patient_map.providerId",
                    to: "providers.id",
                },
            },
            patient: {
                relation: Model.BelongsToOneRelation,
                modelClass: Patient,
                join: {
                    from: "provider_patient_map.patientId",
                    to: "patients.id",
                },
            },
        };
    }
}
