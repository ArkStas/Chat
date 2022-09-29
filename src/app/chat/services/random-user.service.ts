import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User, UsersResponseInfo} from "src/app/shared/model";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RandomUserService {

  constructor(private httpClient: HttpClient) {
  }

  public getRandomUser(): Observable<User[]> {
    return this.httpClient.get<UsersResponseInfo>('https://randomuser.me/api/?inc=name, picture&results=10&nat=us')
      .pipe(
        map((response) => response.results))
      .pipe(map((result) => {
            return result.map(item => {
              return {
                name: `${item.name.first} ${item.name.last}`,
                picture: item.picture.thumbnail
              };
            })
          }
        )
      );
  }

}
