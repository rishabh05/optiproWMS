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
import { AutoLot } from 'src/app/models/AutoLot';

@Component({
  selector: 'app-polist',
  templateUrl: './polist.component.html',
  styleUrls: ['./polist.component.scss']
})
export class POListComponent implements OnInit {

  constructor(private modalService: NgbModal, private inboundMasterComponent: InboundMasterComponent,
    private httpCallServiceService: HttpCallServiceService) { }

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
  poCode: string = '';
  item: string = "";
  futurepo: boolean = false;
  autoLot: AutoLot[];


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
          debugger
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
    debugger
    this.httpCallServiceService.getPOList(this.futurepo,
      this.inboundMasterComponent.selectedVernder).subscribe(
        (data: any) => {
          console.log(data);
          debugger
          this.polist = data.Table;
          this.modalService.open(content, { centered: true });
        },
        error => {
          console.log("Error: ", error);
          alert("fail");
        }
      );

  }

  onPOSelect(selection) {
    debugger
    const po = selection.selectedRows[0].dataItem;
    this.poCode = po.DocNum;
  }

  onItemSelect(selection) {
    debugger
    const item = selection.selectedRows[0].dataItem;
    this.item = item.ItemCode;
    this.getOpenPOLines(selection);
  }


  getOpenPOLines(selection) {
    this.httpCallServiceService.GetOpenPOLines(this.futurepo, this.item,
      this.poCode).subscribe(
        (data: any) => {
          console.log(data);
          debugger
          this.openPOLinesModel = data.Table;
          // this.modalService.open(selection, { centered: true });
          this.isInspectionGrid = true;
        },
        error => {
          console.log("Error: ", error);
          alert("fail");
        }
      );
  }


  onClickOpenPOLineRowOpenAutoLot(selection) {
    this.getAutoLot();
  }

  getAutoLot() {
    this.httpCallServiceService.getAutoLot(this.item).subscribe(
      (data: any) => {
        console.log(data);
        debugger
        this.autoLot = data.Table;

        if (this.autoLot.length > 0) {
        }
        else {
          this.autoLot.push(new AutoLot("N", this.item, "", "", "", ""));
          // this.autoLot[0].ItemCode = this.item;
          // this.autoLot[0].AUTOLOT = "N";
          // this.autoLot[0].OPERATION = "";
          // this.autoLot[0].STRING = "";
          // this.autoLot[0].OPRTYPE = "";
          // this.autoLot[0].LineId = "";
        }

        this.inboundMasterComponent.setAutoLots(this.autoLot);

        this.isInspectionGrid = false;
        this.inboundMasterComponent.inboundComponent = 3;
      },
      error => {
        console.log("Error: ", error);
        alert("fail");
      }
    );
  }

  public onNextClick() {
    // this.router.navigateByUrl('polist');
    this.inboundMasterComponent.inboundComponent = 3;
  }
}
