import { Component } from '@angular/core';
import { CountriesService } from '../countries.service';
import { Observable } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
  imports: [
    MatTableModule,
    MatPaginatorModule
  ]
})
export class CountriesComponent {
  displayedColumns: string[] = [
    'name',
    'capital',
    'currency',
    'languages',
    'awsRegion',
    'emoji',
    'phone',
    'continent',
  ];
  constructor(private countriesService: CountriesService) {}

  dataSource$!: Observable<any>;

  ngOnInit(): void {
    this.dataSource$ = this.countriesService.getCountries();
    this.dataSource$.subscribe((data) => {
      console.log('DATA', data);
    });
  }

  getLanguageNames(languages: any[]): string {
    return languages.map((language) => language.name).join(', ');
  }
}