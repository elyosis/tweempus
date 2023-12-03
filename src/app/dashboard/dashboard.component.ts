import { Component, OnInit } from '@angular/core';
import { Twimp } from '../shared/twimp/twimp.model';
import { TwimpService } from '../shared/twimp/twimp.service';
import { from } from 'rxjs';
import { AuthorService } from '../shared/author/author.service';

@Component({
  selector: 'tweempus-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  twimps: Twimp[] = [];

  constructor(private twimpService: TwimpService, private authorService: AuthorService) {}

  ngOnInit() {
    this.twimpService.getTwimps().subscribe(twimps => {
      from(twimps).subscribe(twimp => {
        this.authorService.getAuthor(twimp.author.id).subscribe(author => {
          twimp.author = author;
          this.twimpService.getFavoritesByAuthor(localStorage["author"], twimp.id).subscribe(favorite => {
            twimp.favorite = favorite;
            this.twimps.push(twimp)
          })
        })
      })
    })
  }
}
