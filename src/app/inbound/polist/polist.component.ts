import { Component, OnInit, HostListener } from '@angular/core';
import { GridComponent } from '@progress/kendo-angular-grid';
import { inspectionGrid, vendorCodeName } from '../../DemoData/inbound';
import { UIHelper } from '../../helpers/ui.helpers';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';
import { InboundMasterComponent } from '../inbound-master.component';
import { HttpCallServiceService } from '../../services/http-call-service.service';
import { POs } from '../../models/POs';
import { GRPOItems } from '../../models/GRPOItems';
import { OpenPOLinesModel } from '../../models/OpenPOLinesModel';
import { AutoLot } from '../../models/AutoLot';
import { Router } from '@angular/router';

@Component({
  selector: 'app-polist',
  templateUrl: './polist.component.html',
  styleUrls: ['./polist.component.scss']
})
export class POListComponent implements OnInit {

  constructor(private modalService: NgbModal, private inboundMasterComponent: InboundMasterComponent,
    private httpCallServiceService: HttpCallServiceService, private router: Router) { }

  imgPath = environment.imagePath;
  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  showLoader: boolean = false;
  searchRequest: string = '';

  isInspectionGrid: boolean = false;

  polist: POs[];
  GRPOItemList: GRPOItems[];
  openPOLinesModel: OpenPOLinesModel[];
  openPOLineModel: OpenPOLinesModel;
  poCode: string = '';
  item: string = "";
  futurepo: boolean = false;
  autoLot: AutoLot[];
  public AddtoGRPOFlag: boolean = this.inboundMasterComponent.AddtoGRPOFlag;


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
    element.classList.add("opti_body-grpo-list");
    element.classList.add("opti_body-main-module");
    // Apply class on body end

    this.isMobile = UIHelper.isMobile();

  }

  onItemlookupClick(content) {
    this.httpCallServiceService.getItemList(this.futurepo, this.inboundMasterComponent.selectedVernder,
      this.poCode).subscribe(
        (data: any) => {
          console.log(data);

          this.GRPOItemList = data.Table;
          this.modalService.open(content, { centered: true });
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

  onPOlookupClick(content) {

    this.httpCallServiceService.getPOList(this.futurepo,
      this.inboundMasterComponent.selectedVernder, this.item).subscribe(
        (data: any) => {
          debugger
          console.log(data);
          if (data.Table != undefined) {
            this.polist = data.Table;
          } else if (data.LICDATA != undefined && data.LICDATA[0].ErrorMsg == "7001") {
            alert("session expire");
            this.router.navigateByUrl('account');
            return;
          }
          this.modalService.open(content, { centered: true });
        },
        error => {
          console.log("Error: ", error);
          alert("fail");
        }
      );

  }

  onPOSelect(selection) {

    const po = selection.selectedRows[0].dataItem;
    this.poCode = po.DocNum;
    document.getElementById('POGridclosebutton').click();
  }

  onItemSelect(selection) {
    const item = selection.selectedRows[0].dataItem;
    this.item = item.ItemCode;
    this.getOpenPOLines(selection);
    document.getElementById('Itemclosebutton').click();
  }


  getOpenPOLines(selection) {
    this.httpCallServiceService.GetOpenPOLines(this.futurepo, this.item,
      this.poCode).subscribe(
        (data: any) => {
          debugger
          console.log(data);
          if (data.Table != undefined) {
            this.openPOLinesModel = data.Table;
            this.isInspectionGrid = true;
          } else if (data.LICDATA != undefined && data.LICDATA[0].ErrorMsg == "7001") {
            alert("session expire");
            this.router.navigateByUrl('account');
            return;
          }
        },
        error => {
          console.log("Error: ", error);
          alert("fail");
        }
      );
  }


  onClickOpenPOLineRowOpenAutoLot(selection) {
    const poline = selection.selectedRows[0].dataItem;
    this.getAutoLot(poline.ITEMCODE);
  }

  getAutoLot(itemCode: string) {
    this.httpCallServiceService.getAutoLot(itemCode).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Table != undefined) {
          this.autoLot = data.Table;
        } else if (data.LICDATA != undefined && data.LICDATA[0].ErrorMsg == "7001") {
          alert("session expire");
          this.router.navigateByUrl('account');
          return;
        }
        if (this.autoLot.length > 0) {
        }
        else {
          this.autoLot.push(new AutoLot("N", itemCode, "", "", "", ""));
        }

        this.inboundMasterComponent.setAutoLots(this.autoLot);
        this.openPOLineModel = this.openPOLinesModel.find(e => e.ITEMCODE == itemCode);
        this.inboundMasterComponent.setClickedItemDetail(this.openPOLineModel);

        this.isInspectionGrid = false;
        this.inboundMasterComponent.inboundComponent = 3;
      },
      error => {
        console.log("Error: ", error);
        alert("fail");
      }
    );
  }

  AddtoGRPO(){
    this.inboundMasterComponent.inboundComponent = 1;
    this.inboundMasterComponent.AddPOList(this.openPOLineModel);
  }

  Cancel() {
    this.inboundMasterComponent.inboundComponent = 1;
  }
}
