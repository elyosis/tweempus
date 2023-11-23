import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs';
import { Author } from './author.model';

@Injectable()
export class AuthorService {

  url: string = "http://localhost:3000/authors";

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

  handleError(error: any) {
    let errMsg = error.message ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : "Server error"
    
    console.error(errMsg);
    return throwError(() => errMsg)
  }
}
