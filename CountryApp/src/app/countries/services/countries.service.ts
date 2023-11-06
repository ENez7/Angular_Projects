import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import { Country } from "../interfaces/country";

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private baseUrl: string = 'https://restcountries.com/v3.1';
  constructor(private httpClient: HttpClient) { }

  searchCapital( capital: string ): Observable<Country[]> {
    const capitalUrl: string = `${this.baseUrl}/capital/${capital}`;
    return this.httpClient
      .get<Country[]>(capitalUrl)
      .pipe(
        catchError( error => of([])) // Catch the error and return a new empty observable
      );
  }
}
