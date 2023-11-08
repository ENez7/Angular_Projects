import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { count, switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [],
})
export class CountryPageComponent implements OnInit {
  public country?: Country;
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: CountriesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.service.searchCountryByAlphaCode(id)))
      .subscribe((country: Country | null) => {
        if (!country) {
          return this.router.navigateByUrl('');
        }
        this.country = country;
        return;
      });
  }

  private searchCountry(code: string) {
    this.service.searchCountryByAlphaCode(code).subscribe((countries) => {
      console.log({ countries });
    });
  }

  protected readonly count = count;
}
