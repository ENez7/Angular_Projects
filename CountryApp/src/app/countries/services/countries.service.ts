import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, of } from "rxjs";
import { Country } from "../interfaces/country";

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private baseUrl: string = 'https://restcountries.com/v3.1';
  constructor(private httpClient: HttpClient) { }

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
    return this.httpClient
      .get<Country[]>(capitalUrl)
      .pipe(
        catchError(error => of([])) // Catch the error and return a new empty observable
      );
  }

  searchCountry( country: string ): Observable<Country[]> {
    const countryUrl: string = `${this.baseUrl}/name/${country}`;
    return this.httpClient
      .get<Country[]>(countryUrl)
      .pipe(
        catchError(error => of([]))
      );
  }

  searchRegion( region: string ): Observable<Country[]> {
    const regionUrl: string = `${this.baseUrl}/region/${region}`;
    return this.httpClient
      .get<Country[]>(regionUrl)
      .pipe(
        catchError(error => of([]))
      );
  }
}
