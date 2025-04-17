import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';

// write a GraphQL query that asks for information (name , capital, etc..) about all countries
const COUNTRIES = gql`
  {
    countries {
      name
      capital
      currency
      languages {
        name
      }
      awsRegion
      emoji
      phone
      continent {
        name
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private apollo: Apollo) {}

  getCountries(): Observable<any[]> {
    return this.apollo
      .watchQuery<any>({
        query: COUNTRIES,
      })
      .valueChanges.pipe(map((result) => result.data.countries));
  }
}