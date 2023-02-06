import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Flight } from './models/flight.model';
import { Search } from './models/search.model';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  private healthEndpoint: string =
    'https://apis.qa.alaskaair.com/aag/1/guestServices/flights/ping';

    private flightEndpoint: string = 'https://apis.qa.alaskaair.com/aag/1/guestServices/flights';

  //
  // Example Flight Search call
  // https://apis.qa.alaskaair.com/aag/1/guestServices/flights/scheduledrouting/flights/search?scheduledDepartureCity=SEA&scheduledDepartureDate=2023-03-01&scheduledArrivalCity=LAX&includeCancelledFlights=false&includeDepartedFlights=false
  //
  // scheduledDepartureCity: 3 letter airport code for the departure airport (e.g.: SEA)
  // scheduledArrivalCity: 3 letter airport code for the arrival airport (e.g.: LAX)
  // scheduledDepartureDate: ISO formatted departure date (e.g.: 2023-03-01)
  //
  // These two parameters are required but should just be left as false
  // includeCancelledFlights
  // includeDepartedFlights
  //
  private flights: Flight[];
  private searchFilter = new BehaviorSubject<Search>({
    origin: '',
    destination: '',
    flightDate: '',
  });
  currentSearchFilter = this.searchFilter.asObservable();
  constructor(private http: HttpClient) {}

  changeSearchFilter(searchFilter: Search) {
    this.searchFilter.next(searchFilter);
  }

  public getHealthPing(): Observable<string> {
    const options = {
      headers: new HttpHeaders({
        'Ocp-Apim-Subscription-Key': environment.apiKey,
      }),
    };

    return this.http.get<string>(this.healthEndpoint, options).pipe(
      map((result: string) => {
        return result;
      })
    );
  }

  public getFlights(): Observable<Flight[]> {
    const options = {
      headers: new HttpHeaders({
        'Ocp-Apim-Subscription-Key': environment.apiKey
      }),
    };
    return this.http.get<Flight[]>('../../assets/flights.json', options).pipe(
      map((result: Flight[]) => {
        return result;
      })
    );
  }
}
