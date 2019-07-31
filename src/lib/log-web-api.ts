import { catchError } from 'rxjs/internal/operators/catchError';
import { LogEntry, WebLog } from './ngj-logger.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogPublisher } from './logPublisher';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'X-AUTH-LOG-HEADER': 'YAO7OV6S8I2D3HL7PXWB3GCAM7D95VIA1553246982106'
  })
};

export class LogWebApi extends LogPublisher {

    private apiToken: string;

    constructor(private http: HttpClient, private apiUrl: string, private token: string) {
      // Must call super() from derived classes
      super();
      // Set location
      this.location = apiUrl;
      this.apiToken = token;
    }

    // Add log entry to back end data store
    log(entry: LogEntry): Observable<boolean> {
        httpOptions.headers =
          httpOptions.headers.set('X-AUTH-LOG-HEADER', this.token);
        console.log('token :' + this.token);
        console.log('location :' + this.location);
        this.http.post<any >(this.location, entry.buildWebLogString() , httpOptions)
            .pipe(catchError(this.handleErrors)
         );

        return of(true);
    }


    // Clear all log entries from local storage
    clear(): Observable<boolean> {
      // TODO: Call Web API to clear all values
      return of(true);
    }

    private handleErrors(error: any):
                   Observable<any> {
      const errors: string[] = [];
      let msg = '';

      msg = 'Status: ' + error.status;
      msg += ' - Status Text: ' + error.statusText;
      if (error.json()) {
        msg += ' - Exception Message: ' +
               error.json().exceptionMessage;
      }
      errors.push(msg);

      console.error('An error occurred', errors);
      return Observable.throw(errors);
    }
  }
