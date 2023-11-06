import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {catchError, delay, map, Observable, of} from "rxjs";
import { Country } from "../interfaces/country";

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private baseUrl: string = 'https://restcountries.com/v3.1';
  constructor(private httpClient: HttpClient) { }

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
    return this.getCountriesRequest(capitalUrl);
  }

  searchCountry( country: string ): Observable<Country[]> {
    const countryUrl: string = `${this.baseUrl}/name/${country}`;
    return this.getCountriesRequest(countryUrl);
  }

  searchRegion( region: string ): Observable<Country[]> {
    const regionUrl: string = `${this.baseUrl}/region/${region}`;
    return this.getCountriesRequest(regionUrl);
  }
}
