import { Country } from './country';
import { Region } from './region.type';

export interface CacheStoreInterface {
  byCapital: TermCountry;
  byCountries: TermCountry;
  byRegion: RegionCountry;
}

export interface TermCountry {
  term: string;
  countries: Country[];
}

export interface RegionCountry {
  region?: Region;
  countries: Country[];
}
