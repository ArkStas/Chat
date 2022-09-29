import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Answer, MessageText} from "src/app/shared/model";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChucknorrisService {

  constructor(private httpClient: HttpClient) {
  }

  public getAnswer(): Observable<MessageText> {

    return this.httpClient.get<Answer>('https://api.chucknorris.io/jokes/random')
      .pipe(
        map((response) => response))
      .pipe(map((result) => {
          return {
            text: result.value,
            date: new Date()
          }
        })
      );
  }

}
