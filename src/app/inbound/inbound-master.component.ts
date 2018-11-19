import { Component, OnInit } from '@angular/core';
import { AutoLot } from '../models/AutoLot';

@Component({
  selector: 'app-inbound-master',
  templateUrl: './inbound-master.component.html',
  styleUrls: ['./inbound-master.component.scss']
})
export class InboundMasterComponent implements OnInit {

  public inboundComponent: number = 1;
  public selectedVernder: string;
  public autoLots: AutoLot[];
  
  constructor() { }

  ngOnInit() {
  }

  setSelectedVender(vender: string){
    this.selectedVernder = vender;
  }
  
  setAutoLots(autoLots: AutoLot[]){
    this.autoLots = autoLots;
  }

}
