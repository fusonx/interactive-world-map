import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { SvgMapComponent } from './svg-map/svg-map.component';
import { CountryResponse } from './country';
import { ApiService } from './api.service';
import { SearchBarComponent } from './search-bar/search-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, SvgMapComponent, NgFor, CurrencyPipe, SearchBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Country Information';
  selectedCountry: CountryResponse | null = null;
  searchTerm: string = '';

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) { }

  getCountryInfo(countryId: string) {
    if (!countryId) {
      this.selectedCountry = null;
      this.cdr.detectChanges();
      return;
    }
    this.apiService.getCountryInfo(countryId).subscribe(
      data => {
        this.selectedCountry = data;
        this.cdr.detectChanges();
      }
    );
  }

  onTerm(term: string) {
    if (!term.trim()) {
      this.selectedCountry = null;
      this.cdr.detectChanges();
      return;
    }
    const formattedTerm = term.toLowerCase();
    this.apiService.searchCountryByName(formattedTerm).subscribe(
      countryCode => {
        if (countryCode) {
          this.getCountryInfo(countryCode)
        }
        else {
          this.selectedCountry = null;
          this.cdr.detectChanges();
        }
      }
    );
  }
}
