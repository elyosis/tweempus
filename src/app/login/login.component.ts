import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../core/authentication.service';
import { AuthorService } from '../shared/author/author.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'tweempus-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm!: FormGroup;
  userUnregistered: boolean = false;

  constructor(private authService: AuthenticationService, private authorService: AuthorService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      idAuthor: ["", Validators.required]
    });
  }
  
  logIn(form: any) {
    if (this.userUnregistered) {
      this.userUnregistered = false;
    }

    this.authorService.getAuthor(form.value.idAuthor).subscribe({
      next: author => this.authService.login(form.value.idAuthor),
      error: err => this.userUnregistered = true
    });
  }
}
