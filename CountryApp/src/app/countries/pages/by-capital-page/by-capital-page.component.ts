import {Component, OnInit} from '@angular/core';
import {CountriesService} from "../../services/countries.service";
import {Country} from "../../interfaces/country";

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit{
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(private service: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.service.cacheStore.byCapital.countries;
    this.initialValue = this.service.cacheStore.byCapital.term;
  }

  searchByCapital( term: string ): void {
    this.isLoading = true;
    this.service.searchCapital(term)
      .subscribe((countries: Country[]): void => {
        this.countries = countries;
        this.isLoading = false;
      });
  }

}
