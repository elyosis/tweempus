import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError, catchError} from 'rxjs';

import { AuthorService } from '../shared/author/author.service';
import { Token } from './token.model';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private url: string = "http://localhost:3000/authenticated"
  token: Token | null = null;

  constructor(private httpClient: HttpClient, private router: Router, private authorService: AuthorService) { }

  login(idAuthor: string): void {
    this.authorService.getAuthor(idAuthor).subscribe(author => {
      const tokenGenerated = this.generateToken();
      this.saveSession(tokenGenerated, author.id).subscribe((response: any) => {
        this.token = new Token(response['id'], response['author']);
        this.router.navigate(['/dashboard']);
      });
    });
  }

  logout(): void {
    this.deleteSession().subscribe(() => {
      this.token = null;
      localStorage.clear()
      this.router.navigate(['/login']);
    });
  }

  generateToken(): string {
    const date: number = new Date().getTime();
    let text: string = "";
    const possible: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    text += date;

    return text;
  }

  saveSession(tokenGenerated: string, idAuthor: string): Observable<Object> {
    const session: Object = { 'id': tokenGenerated, 'author': idAuthor };

    localStorage.setItem("id", tokenGenerated);
    localStorage.setItem("author", idAuthor);
    return this.httpClient.post(this.url, session).pipe(
      catchError(this.handleError)
    );
  }

  deleteSession(): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${localStorage.getItem("id")}`).pipe(
      catchError(this.handleError)
    );
  }

  checkLogin(idAuthor: string) {
    if (localStorage.getItem("id") && localStorage.getItem("author") === idAuthor) {
      return true
    } else {
      return false
    }
  }

  handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return throwError(() => errMsg);
  }
}
