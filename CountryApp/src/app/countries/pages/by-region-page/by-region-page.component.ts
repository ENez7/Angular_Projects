import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [],
})
export class ByRegionPageComponent implements OnInit {
  public countries: Country[] = [];
  public regions: Region[] = [
    'Americas',
    'Asia',
    'Europe',
    'Africa',
    'Oceania',
  ];
  public selectedRegion?: Region;
  public isLoading: boolean = false;
  constructor(private service: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.service.cacheStore.byRegion.countries;
    this.selectedRegion = this.service.cacheStore.byRegion.region ?? '';
  }

  searchByRegion(region: Region): void {
    this.isLoading = true;
    this.selectedRegion = region;
    this.service
      .searchRegion(region)
      .subscribe((countries: Country[]): void => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}
