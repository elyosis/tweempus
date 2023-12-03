import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs';
import { Author } from './author.model';

@Injectable()
export class AuthorService {

  url: string = "http://localhost:3000/authors";
  urlFavorites: string = "http://localhost:3000/author-favorites";

  constructor(private httpClient: HttpClient) {}

  getAuthor(id: string): Observable<Author> {
    
    return this.httpClient.get<Author>(`${this.url}/${id}`).pipe(
      map(dbAuthor => {
        let author: Author = new Author(dbAuthor.id);
        author.fullName = dbAuthor.fullName;
        author.url = `http://localhost:4200/authors/${dbAuthor.id}`;
        author.image = dbAuthor.image;

        return author;
      }),
      catchError(this.handleError)
    )
  }

  setAuthor(idAuthor: string, fullName: string, image: string): Observable<any> {
    let dbAuthor: any = { 'id': idAuthor, 'fullName': fullName, 'image': image };

    return this.httpClient.post(this.url, dbAuthor).pipe(
      catchError(this.handleError)
    );
  }

  createFavorite(idAuthor: string): Observable<any> {
    let dbAuthorFav: any = { 'id': idAuthor, 'twimps': [] };

    return this.httpClient.post(this.urlFavorites, dbAuthorFav).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: any) {
    let errMsg = error.message ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : "Server error"
    
    console.error(errMsg);
    return throwError(() => errMsg)
  }
}
