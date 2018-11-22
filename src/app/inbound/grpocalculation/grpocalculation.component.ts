import { Component, OnInit, HostListener } from '@angular/core';
import { receiveForPOItemCodeGrid, receiveForAddItemCodeGrid, receiveForBinGrid } from '../../DemoData/inbound'
import { environment } from '../../../environments/environment';
import { UIHelper } from '../../helpers/ui.helpers';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridComponent } from '@progress/kendo-angular-grid';
import { OpenPOLinesModel } from '../../models/OpenPOLinesModel';
import { HttpCallServiceService } from '../../services/http-call-service.service';
import { InboundMasterComponent } from '../inbound-master.component';
import { RevingBin } from '../../models/RevingBin';
import { UOM } from '../../models/UOM';
import { RecvingQuantityBin } from 'src/app/models/RecvingQuantityBin';


@Component({
  selector: 'app-grpocalculation',
  templateUrl: './grpocalculation.component.html',
  styleUrls: ['./grpocalculation.component.scss']
})
export class GRPOCalculationComponent implements OnInit {

  constructor(private modalService: NgbModal, private inboundMasterComponent: InboundMasterComponent,
    private httpCallServiceService: HttpCallServiceService) { }

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


  openPOLineModel: OpenPOLinesModel[] = [];
  Ponumber: number;
  revingBins: RevingBin[];
  UOMList: UOM[];
  RecvbBinvalue: string = "";
  uomSelectedVal: UOM;
  qty: number;
  recvingQuantityBinArray: RecvingQuantityBin[] = [];
  showButton: boolean = false;


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


    this.openPOLineModel[0] = this.inboundMasterComponent.openPOmodel;
    this.Ponumber = this.openPOLineModel[0].DOCENTRY;
    this.getUOMList();
    this.GetRecBinList();
  }

  /**
    * Method to get list of inquries from server.
   */
  public GetRecBinList() {
    this.httpCallServiceService.getRevBins(this.openPOLineModel[0].QCREQUIRED).subscribe(
      (data: any) => {
        console.log(data);

        this.revingBins = data;
        if (this.revingBins.length > 0) {
          this.RecvbBinvalue = this.revingBins[0].BINNO;
        }
      },
      error => {
        console.log("Error: ", error);
        alert("fail");
      }
    );
  }

  /**
   * Method to get list of inquries from server.
  */
  public getUOMList() {
    this.httpCallServiceService.getUOMs(this.openPOLineModel[0].ITEMCODE).subscribe(
      (data: any) => {
        console.log(data);

        this.openPOLineModel[0].UOMList = data;
        if (this.openPOLineModel[0].UOMList.length > 0) {
          this.uomSelectedVal = this.openPOLineModel[0].UOMList[0];
        }
      },
      error => {
        console.log("Error: ", error);
        alert("fail");
      }
    );
  }

  onFilterChange(checkBox: any, grid: GridComponent) {
    if (checkBox.checked == false) {
      this.clearFilter(grid);
    }
  }

  clearFilter(grid: GridComponent) {
    //grid.filter.filters=[];
  }

  save(e) {

  }

  receive(e) {
    alert("Do you want to print all labels after submit ?");
    
  }

  cancel(e) {
    this.inboundMasterComponent.inboundComponent = 2;
  }

  addQuantity(e) {
    debugger
    if (this.qty == 0 || this.qty == undefined) {
      alert("Please enter quantity");
      return;
    }

    if (this.RecvbBinvalue == "" || this.RecvbBinvalue == undefined) {
      alert("Invalid Bin");
      return;
    }

    let result = this.recvingQuantityBinArray.find(element => element.Bin == this.RecvbBinvalue);
    if (result == undefined) {
      this.recvingQuantityBinArray.push(new RecvingQuantityBin(this.qty, this.RecvbBinvalue));
      // this.recvingQuantityBinArray = this.temprecvingQuantityBinArray;
    } else {
      alert("can not item add in same bin");
      return;
    }
  }

  selectBinCode(selection) {
    const selected = selection.selectedRows[0].dataItem;
    this.RecvbBinvalue = selected.BINNO;
    document.getElementById('closeBinCodeGrid').click();
  }

  public onRecvBinLookupClick(content) {
    this.modalService.open(content, { centered: true });
  }

  public focusOutFromBin() {
    this.httpCallServiceService.IsBinExist(this.RecvbBinvalue).subscribe(
      (data: any) => {
        console.log(data);
        debugger
        if(data[0].Result == "0"){
          alert("Invalid Bin");
        }
      },
      error => {
        console.log("Error: ", error);
        alert("fail");
      }
    );
  }
}
