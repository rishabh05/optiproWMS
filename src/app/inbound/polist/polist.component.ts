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
import { OpenPOLinesModel } from 'src/app/models/OpenPOLinesModel';

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
  poCode: string='';
  item: string="";
  futurepo: boolean=false;

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

    this.httpCallServiceService.GetOpenPOLines(this.futurepo, this.item,
      this.poCode).subscribe(
      (data: any) => {
        console.log(data);
        debugger
        this.openPOLinesModel = data.Table;
        this.modalService.open(selection, { centered: true });
      },
      error => {
        console.log("Error: ", error);
        alert("fail");
      }
    );
    
  }

  /**
   * Show Inspection Grid 
   * @param status 
  */
  showInspectionGrid(status) {
    this.isInspectionGrid = status;
  }

  onRowSelectOpenAutoLot(selection){
    debugger
    const item = selection.selectedRows[0].dataItem;
    this.item = item.ItemCode;

    this.httpCallServiceService.GetOpenPOLines(this.futurepo, this.item,
      this.inboundMasterComponent.selectedVernder).subscribe(
      (data: any) => {
        console.log(data);
        debugger
        this.openPOLinesModel = data.Table;
        this.modalService.open(selection, { centered: true });
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
