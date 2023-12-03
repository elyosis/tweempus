import { Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs';
import { map, catchError, throwError } from 'rxjs';

import { Author } from '../author/author.model';
import { Twimp } from './twimp.model';

@Injectable()
export class TwimpService {

  url: string = "http://localhost:3000/twimps";
  urlFavorite: string = "http://localhost:3000/author-favorites";

  constructor(private httpClient: HttpClient) { }

  getTwimps(): Observable<Twimp[]> {
    let twimps: Twimp[] = [];

    return this.httpClient.get(this.url).pipe(
      map((twimpsList: any) => {
        for (let i in twimpsList) {
          let twimp: Twimp = new Twimp(twimpsList[i].id, `http://localhost:4200/twimp/` + twimpsList[i].id, new Author(twimpsList[i].author), twimpsList[i].content, twimpsList[i].timestamp);
          twimps.push(twimp);
        }
        return twimps;
      }),
      catchError(this.handleError))
  }

  setTwimp(twimp: Twimp): Observable<any> {
    let dbTwimp: any = {
      'id': twimp.id,
      'author': twimp.author.id,
      'by': twimp.author.fullName,
      'content': twimp.content,
      'timestamp': twimp.timestamp
    };

    return this.httpClient.post(this.url, dbTwimp).pipe(
      catchError(this.handleError)
    );
  }

  getFavoritesByAuthor(idAuthor: string, idTwimp: string): Observable<boolean> {
    return this.httpClient.get(`${this.urlFavorite}/${idAuthor}`).pipe(
      map((response: any) => {
        let favorites: string[] = response["twimps"];

        if (favorites.indexOf(idTwimp) == -1) {
          return false
        } else {
          return true
        }
      }),
      catchError(this.handleError)
    )
  }

  getFavoritesByUser(idUser: string): Observable<any> {
    return this.httpClient.get(`${this.urlFavorite}/${idUser}`).pipe(
      map((response:any) => response.twimps),
      catchError(this.handleError)
    )
  }

  setFavorite(idUser: string, idTwimp: string, oldFavs: string[]): Observable<Object> {
    const newFavs = [...oldFavs, idTwimp];

    return this.httpClient.patch(`${this.urlFavorite}/${idUser}`, {"twimps": newFavs}).pipe(
      catchError(this.handleError)
    )
  }

  unsetFavorite(idUser: string, idTwimp: string, oldFavs: string[]): Observable<Object> {
    const newFavs = oldFavs.filter(id => id != idTwimp);

    return this.httpClient.patch(`${this.urlFavorite}/${idUser}`, {"twimps": newFavs}).pipe(
      catchError(this.handleError)
    )
  }

  handleError(error: any) {
    let errMsg = error.message ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : "Server error"

    console.error(errMsg);
    return throwError(() => errMsg)
  }
}
