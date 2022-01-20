export interface Provider {
  name: string;
  id: string;
}

export interface ProviderDateAvailability {
  date: string;
  provider: Provider;
  times: Array<number>;
}

export interface AvailabilitySchedule {
  availability: Array<ProviderDateAvailability>;
}
