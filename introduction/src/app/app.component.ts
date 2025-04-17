import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountriesComponent } from "./countries/countries.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CountriesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-graphql';
}
