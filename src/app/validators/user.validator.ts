import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap  } from 'rxjs/operators';

const URL = 'https://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root'
})
export class UserValidator {
  constructor(private http: HttpClient) {}

  searchUser(text: string) {
    // debounce
    return timer(1000)
      .pipe(
        switchMap(() => {
          // Check if username is available
          // return this.http.get<any>(`${URL}/users?username=${text}`);
          if (text === 'jorge') {
            return of(['test']);
          }
          else {
            return of([]);
          }
        })
      );
  }

  userValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.searchUser(control.value)
        .pipe(
          map(res => {
            // if username is already taken
            if (res.length) {
              // return error
              return { 'userNameExists': true};
            } else {
              return null;
            }
          })
        );
    };

  }

}
