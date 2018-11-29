import { Component, OnInit } from '@angular/core';
import { AutoLot } from '../models/AutoLot';
import { OpenPOLinesModel } from '../models/OpenPOLinesModel';
import { oSubmitPOLots } from '../models/oSubmitPOLots';

@Component({
  selector: 'app-inbound-master',
  templateUrl: './inbound-master.component.html',
  styleUrls: ['./inbound-master.component.scss']
})
export class InboundMasterComponent implements OnInit {

  public inboundComponent: number = 1;
  public selectedVernder: string;
  public autoLots: AutoLot[];
  public openPOmodel: OpenPOLinesModel;
  public oSubmitPOLotsArray: oSubmitPOLots[] = []; 
  public AddtoGRPOFlag: boolean = false;
  public SubmitPOArray: OpenPOLinesModel[] = [];
  
  constructor() { }

  ngOnInit() {
  }

  setSelectedVender(vender: string){
    this.selectedVernder = vender;
  }
  
  setAutoLots(autoLots: AutoLot[]){
    this.autoLots = autoLots;
  }

  setClickedItemDetail(openPOmodel){
    this.openPOmodel = openPOmodel;
  }

  public savePOLots(oSubmitPOLot: oSubmitPOLots){
    this.oSubmitPOLotsArray.push(oSubmitPOLot);
    this.AddtoGRPOFlag = true;
  }

  public AddPOList(openPOLinesModel: OpenPOLinesModel){
    this.SubmitPOArray.push(openPOLinesModel);
  }
}
