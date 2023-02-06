export interface Flight {
    origin: string;
    destination: string;            
    flightNumber: number;
    departureDateTime: string;
    arrivalDateTime: string; 
    includeCancelledFlights: boolean;
    includeDepartedFlights: boolean; 
}