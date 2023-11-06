import { Component } from '@angular/core';
import { Country } from "../../interfaces/country";
import { CountriesService } from "../../services/countries.service";

type Region = 'Americas'|'Asia'|'Europe'|'Africa'|'Oceania';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {
  public countries: Country[] = [];
  public regions: Region[] = ['Americas', 'Asia', 'Europe', 'Africa', 'Oceania'];
  public selectedRegion?: Region;
  constructor(private service: CountriesService) {}

  searchByRegion( region: Region ): void {
    this.selectedRegion = region;
    this.service.searchRegion(region).subscribe(
      (countries: Country[]): void => {
        this.countries = countries;
      });
  }
}
