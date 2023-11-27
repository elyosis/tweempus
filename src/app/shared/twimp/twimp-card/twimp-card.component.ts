import { Component, Input } from '@angular/core';

import { Twimp } from '../twimp.model';
import { TwimpService } from '../twimp.service';

@Component({
  selector: 'tweempus-twimp-card',
  templateUrl: './twimp-card.component.html',
  styleUrls: ['./twimp-card.component.css']
})
export class TwimpCardComponent {
  @Input() twimp!: Twimp;

  constructor(private twimpService: TwimpService) { }

  updateFavorite() {

    this.twimp.favorite = !this.twimp.favorite

    this.twimpService.getFavoritesByUser("1").subscribe(userFavs => {

      if (this.twimp.favorite) {
        this.twimpService.setFavorite("1", this.twimp.id, userFavs).subscribe()
      } else {
        this.twimpService.unsetFavorite("1", this.twimp.id, userFavs).subscribe()
      }
    })
  }
}


