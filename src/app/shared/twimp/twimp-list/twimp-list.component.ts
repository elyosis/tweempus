import { Component, OnInit } from '@angular/core';

import { Twimp } from '../twimp.model';
import { Author } from '../../author/author.model';

@Component({
  selector: 'tweempus-twimp-list',
  templateUrl: './twimp-list.component.html',
  styleUrls: ['./twimp-list.component.css']
})
export class TwimpListComponent implements OnInit {
  authors: Author[] = [];
  twimps: Twimp[] = [];

  ngOnInit() {
    this.authors.push(new Author("01"));
    for (let i = 1; i < 5; i++) {
      this.twimps.push(new Twimp (i.toString(), "", this.authors[0], "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam efficitur sodales libero, sit amet posuere arcu consectetur ut. Nam volutpat ligula ac nunc consectetur vestibulum.", "08/04/2023"));
    }
  }

}
