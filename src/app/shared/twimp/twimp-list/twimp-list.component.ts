import { Component, Input, OnInit } from '@angular/core';

import { Twimp } from '../twimp.model';

@Component({
  selector: 'tweempus-twimp-list',
  templateUrl: './twimp-list.component.html',
  styleUrls: ['./twimp-list.component.css']
})
export class TwimpListComponent {
  @Input() twimps!:  Twimp[];
}
