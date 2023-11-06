import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, of, tap } from "rxjs";
import { Country } from "../interfaces/country";
import { CacheStoreInterface } from "../interfaces/cache-store.interface";
import { Region } from "../interfaces/region.type";

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private baseUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStoreInterface = {
    byCapital: {term: '', countries: []},
    byCountries: {term: '', countries: []},
    byRegion: {region: '', countries: []},
  };
  constructor(private httpClient: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('cacheStorage', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(): void {
    if (!localStorage.getItem('cacheStorage')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStorage')!);
  }
  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(() => of([])),
      );
  }

  searchCountryByAlphaCode( alphaCode: string ): Observable<Country | null> {
    const alphaUrl: string = `${this.baseUrl}/alpha/${alphaCode}`;
    return this.httpClient
      .get<Country[]>(alphaUrl)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(error => of(null)) // Catch the error and return a new empty observable
      );
  }

  searchCapital( capital: string ): Observable<Country[]> {
    const capitalUrl: string = `${this.baseUrl}/capital/${capital}`;
    return this.getCountriesRequest(capitalUrl)
      .pipe(
        tap(countries => this.cacheStore.byCapital = {
          term: capital,
          countries
        }),
        tap(() => this.saveToLocalStorage()),
      );
  }

  searchCountry( country: string ): Observable<Country[]> {
    const countryUrl: string = `${this.baseUrl}/name/${country}`;
    return this.getCountriesRequest(countryUrl)
      .pipe(
        tap(countries => this.cacheStore.byCountries = {
          term: country,
          countries
        }),
        tap(() => this.saveToLocalStorage()),
      );
  }

  searchRegion( region: Region ): Observable<Country[]> {
    const regionUrl: string = `${this.baseUrl}/region/${region}`;
    return this.getCountriesRequest(regionUrl)
      .pipe(
        tap(countries => this.cacheStore.byRegion = {
          region,
          countries
        }),
        tap(() => this.saveToLocalStorage()),
      );
  }
}
