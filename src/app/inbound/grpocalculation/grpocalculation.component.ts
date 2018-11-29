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
import { RecvingQuantityBin } from '../../models/RecvingQuantityBin';
import { oSubmitPOLots } from 'src/app/models/oSubmitPOLots';
import { Router } from '@angular/router';


@Component({
  selector: 'app-grpocalculation',
  templateUrl: './grpocalculation.component.html',
  styleUrls: ['./grpocalculation.component.scss']
})
export class GRPOCalculationComponent implements OnInit {

  constructor(private modalService: NgbModal, private inboundMasterComponent: InboundMasterComponent,
    private httpCallServiceService: HttpCallServiceService, private router: Router) { }

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
  oSubmitPOLotsObj: oSubmitPOLots;


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
    // this.oSubmitPOLots = new oSubmitPOLots();
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

  save() {
    this.prepareSubmitPurchaseOrder();
    this.inboundMasterComponent.savePOLots(this.oSubmitPOLotsObj);
    this.inboundMasterComponent.inboundComponent = 2;
  }

  receive(e) {
    alert("Do you want to print all labels after submit ?");
    this.prepareSubmitPurchaseOrder();
    this.SubmitGoodsReceiptPO();
  }

  prepareSubmitPurchaseOrder() {
    debugger
    this.oSubmitPOLotsObj = new oSubmitPOLots();

    this.oSubmitPOLotsObj.POReceiptLots = [];
    this.oSubmitPOLotsObj.POReceiptLotDetails = [];
    this.oSubmitPOLotsObj.UDF = [];
    this.oSubmitPOLotsObj.LastSerialNumber = [];

    this.oSubmitPOLotsObj.POReceiptLots.push({
      DiServerToken: localStorage.getItem("Token"),
      PONumber: this.Ponumber,
      CompanyDBId: localStorage.getItem("CompID"),
      LineNo: this.openPOLineModel[0].LINENUM,
      ShipQty: this.openPOLineModel[0].RPTQTY.toString(),
      OpenQty: this.openPOLineModel[0].OPENQTY,
      WhsCode: localStorage.getItem("whseId"),
      Tracking: this.openPOLineModel[0].TRACKING,
      ItemCode: this.openPOLineModel[0].ITEMCODE,
      LastSerialNumber: 0,
      Line: 0,
      UOM: -1,// this.openPOLineModel[0].UOM,
      GUID: localStorage.getItem("GUID"),
      UsernameForLic: localStorage.getItem("UserId")
      //------end Of parameter For License----
    });

    this.oSubmitPOLotsObj.UDF.push({
      Key: "OPTM_TARGETWHS",//UDF[iIndex].Key,
      Value: "",//this.getView().byId("txtQCWhse").getValue(),//UDF[iIndex].Value,
      //LotNo: UDF[iIndex].LotNo,
      Flag: 'D', // D = Line, H= Header, L = Lots
      LineNo: 0
    });
    this.oSubmitPOLotsObj.UDF.push({
      Key: "OPTM_TARGETBIN",//UDF[iIndex].Key,
      Value: "",//this.getView().byId("txtQCBin").getValue(),
      //LotNo: UDF[iIndex].LotNo,
      Flag: 'D', // D = Line, H= Header, L = Lots
      LineNo: 0
    });


    for (var iBtchIndex = 0; iBtchIndex < this.recvingQuantityBinArray.length; iBtchIndex++) {
      this.oSubmitPOLotsObj.POReceiptLotDetails.push({
        Bin: this.recvingQuantityBinArray[iBtchIndex].Bin,
        LineNo: this.openPOLineModel[0].LINENUM,
        LotNumber: "", //getUpperTableData.GoodsReceiptLineRow[iBtchIndex].SysSerNo,
        LotQty: this.recvingQuantityBinArray[iBtchIndex].Quantity.toString(),
        SysSerial: "0",
        ExpireDate: "",//oCurrentController.GetSubmitDateFormat(getUpperTableData.GoodsReceiptLineRow[iBtchIndex].EXPDATE), // oCurrentController.GetSubmitDateFormat(oActualGRPOModel.PoDetails[iIndex].ExpireDate),//oActualGRPOModel.PoDetails[iIndex].ExpireDate,
        VendorLot: "",//getUpperTableData.GoodsReceiptLineRow[iBtchIndex].MfgSerNo,
        //NoOfLabels: oActualGRPOModel.PoDetails[iIndex].NoOfLabels,
        //Containers: piContainers,
        SuppSerial: "",//getUpperTableData.GoodsReceiptLineRow[iBtchIndex].MfgSerNo,
        ParentLineNo: 0
        //InvType: oActualGRPOModel.GoodsReceiptLineRow[iIndex].LotStatus,
      });
    }

    // for (var iLastIndexNumber = 0; iLastIndexNumber < olastSerialNumber.LastSerialNumber.length; iLastIndexNumber++) {
    this.oSubmitPOLotsObj.LastSerialNumber.push({
      // LastSerialNumber: olastSerialNumber.LastSerialNumber[iLastIndexNumber],
      // LineId: olastSerialNumber.LineId[iLastIndexNumber],
      // ItemCode: oActualGRPOModel.POLinesList[0].ItemCode
    });
    // }
  }

  SubmitGoodsReceiptPO(){
    this.httpCallServiceService.SubmitGoodsReceiptPO(this.oSubmitPOLotsObj).subscribe(
      (data: any) => {
        console.log(data);
        debugger
        if (data[0].ErrorMsg == "" && data[0].Successmsg == "SUCCESSFULLY") {
          alert("Goods Receipt PO generated successfully with Doc No: " + data.DocEntry);
          this.inboundMasterComponent.inboundComponent = 2;
        } else if (data[0].ErrorMsg == "7001") {
          alert("session expire");
          this.router.navigateByUrl('account');
          return;
        }
        else {
          alert(data[0].ErrorMsg);
        }
      },
      error => {
        console.log("Error: ", error);
        alert("fail");
      }
    );
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
      this.showButton = true;
      this.qty = undefined;
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

  lastTypedBin: string = "";
  public focusOutFromBin() {
    debugger
    if (this.RecvbBinvalue == undefined || this.lastTypedBin == this.RecvbBinvalue) {
      return;
    }
    this.lastTypedBin = this.RecvbBinvalue;
    this.httpCallServiceService.IsBinExist(this.RecvbBinvalue).subscribe(
      (data: any) => {
        console.log(data);

        if (data[0].Result == "0") {
          alert("Invalid Bin");
          this.RecvbBinvalue = "";
          document.getElementById("RecvbBinid").blur();
        }
      },
      error => {
        console.log("Error: ", error);
        alert("fail");
      }
    );
  }
}
