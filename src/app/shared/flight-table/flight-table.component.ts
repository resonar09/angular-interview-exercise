import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FlightsService } from 'src/app/flights.service';
import { Flight } from 'src/app/models/flight.model';

@Component({
  selector: 'app-flight-table',
  templateUrl: './flight-table.component.html',
  styleUrls: ['./flight-table.component.scss'],
})
export class FlightTableComponent implements OnInit, OnDestroy {
  flights: Flight[];
  flightSubscription: Subscription;
  searchSubscription: Subscription;

  constructor(private flightService: FlightsService) {}

  ngOnInit(): void {
    this.searchSubscription = this.flightService.currentSearchFilter.subscribe((search) => {
      this.flightSubscription = this.flightService.getFlights().subscribe((data) => {
        var flightData: Flight[] = data['flight'];
        this.flights = flightData.filter(
          (x) =>
            x.origin == search.origin &&
            x.destination == search.destination &&
            x.departureDateTime.substring(0, 10) == search.flightDate
        );
      });
    });
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
    this.flightSubscription.unsubscribe();
  }
}