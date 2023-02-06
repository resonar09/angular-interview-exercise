import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FlightsService } from 'src/app/flights.service';
import { Flight } from 'src/app/models/flight.model';
import { Search } from 'src/app/models/search.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  origins: Flight[] = [];
  destinations: Flight[] = [];
  flightSubscription: Subscription;
  constructor(private fb: FormBuilder, private flightService: FlightsService) {}
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      origin: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      flightDate: ['', [Validators.required]],
    });

    this.flightSubscription = this.flightService.getFlights().subscribe((data) => {
      console.log('SEARCH',data);
      const flights: Flight[] = data['flight'];
      this.origins = this.getDistinctAirports(flights, 'origin');
      this.destinations = this.getDistinctAirports(flights, 'destination');
    });
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  onSearch(form: FormGroup) {
    this.flightService.changeSearchFilter(form.value);

  }
  getDistinctAirports(data: any, filterBy: string) {
    var lookup = {};
    var items = data;
    var result = [];

    for (var item, i = 0; (item = items[i++]); ) {
      var name = item[filterBy];
      if (!(name in lookup)) {
        lookup[name] = 1;
        result.push(name);
      }
    }
    return result.sort();
  }
}
