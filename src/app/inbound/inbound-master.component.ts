import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inbound-master',
  templateUrl: './inbound-master.component.html',
  styleUrls: ['./inbound-master.component.scss']
})
export class InboundMasterComponent implements OnInit {

  public inboundComponent: number = 1;
  public static showvenders = true;
  constructor() { }

  ngOnInit() {
  }

}
