import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { CountryResponse } from './country';
import { COUNTRY_MAP } from './country-map';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiURL = 'http://api.worldbank.org/v2';

  constructor(private http: HttpClient) {}

  getCountryInfo(countryId: string): Observable<CountryResponse> {
    return this.http.get<CountryResponse>(`${this.apiURL}/country/${countryId}?format=json`).pipe(
      map((response: any) => response[1][0])
    );
  }

  searchCountryByName(countryName: string): Observable<string | null> {
    const countryCode = COUNTRY_MAP[countryName];
    if (countryCode) {
      return of(countryCode);
    }
    else {
      return of(null);
    }
  }
}
