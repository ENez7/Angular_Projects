import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Country } from "../interfaces/country";

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private baseUrl: string = 'https://restcountries.com/v3.1';
  constructor(private httpClient: HttpClient) { }

  searchCapital( capital: string ): Observable<Country[]> {
    const capitalUrl = `${this.baseUrl}/capital/${capital}`;
    return this.httpClient.get<Country[]>(capitalUrl);
  }
}
