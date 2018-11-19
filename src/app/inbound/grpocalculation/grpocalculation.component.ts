import { Component, OnInit, HostListener } from '@angular/core';
import {receiveForPOItemCodeGrid, receiveForAddItemCodeGrid, receiveForBinGrid} from '../../DemoData/inbound'
import { environment } from '../../../environments/environment';
import { UIHelper } from '../../helpers/ui.helpers';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridComponent } from '@progress/kendo-angular-grid';
@Component({
  selector: 'app-grpocalculation',
  templateUrl: './grpocalculation.component.html',
  styleUrls: ['./grpocalculation.component.scss']
})
export class GRPOCalculationComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  imgPath = environment.imagePath;
  isMobile: boolean;
  isColumnFilter1: boolean = false;
  isColumnGroup1: boolean = false;
  isColumnFilter2: boolean = false;
  isColumnGroup2: boolean = false;
  showLoader: boolean = false;
  searchRequest: string = '';

  public gridData: any[];
  public gridData2: any[];
  public gridData3: any[];

  // UI Section
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobile = UIHelper.isMobile();
  }
  // End UI Section



  ngOnInit() {
    // Apply class on body start
    const element = document.getElementsByTagName("body")[0];
    element.className = "";
    element.classList.add("opti_body-rcvforpo-selection");
    element.classList.add("opti_body-main-module");
    // Apply class on body end

    this.isMobile = UIHelper.isMobile();

    this.getRcvOrderList();
    this.GenerateOrderList();
    this.rcvOrderLookupGrid();
    // this.getVendorCodeAndName();

  }

  /**
   * Method to get list of inquries from server.
  */
  public getRcvOrderList() {
    this.showLoader = true;
    this.gridData = receiveForPOItemCodeGrid;
    setTimeout(() => {
      this.showLoader = false;
    }, 1000);
  }

  /**
   * Method to get list of inquries from server.
  */
  public GenerateOrderList() {
    this.showLoader = true;
    this.gridData3 = receiveForAddItemCodeGrid;
    setTimeout(() => {
      this.showLoader = false;
    }, 1000);
  }

  /**
   * Method to get list of inquries from server.
  */
  public rcvOrderLookupGrid() {
    this.showLoader = true;
    this.gridData2 = receiveForBinGrid;
    setTimeout(() => {
      this.showLoader = false;
    }, 1000);
  }

 onFilterChange(checkBox: any, grid: GridComponent) {
    if (checkBox.checked == false) {
      this.clearFilter(grid);
    }
  }

  clearFilter(grid: GridComponent) {
    //grid.filter.filters=[];
  }

  public listItems: Array<string> = [
    'Normal', 'Normal2', 'Normal3'
  ];

  public value = [ 'Normal' ]

  save(e){

  }

  receive(e){

  }

  addQuantity(e){

  }

  selectBinCode(e){
    document.getElementById('closeBinCodeGrid').click();
  }

  onVenderLookupClick(content){
    this.modalService.open(content, { centered: true });
  }

}
