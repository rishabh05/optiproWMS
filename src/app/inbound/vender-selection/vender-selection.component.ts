import { Component, OnInit, HostListener } from '@angular/core';
import { purchaseOrderNumberVendor, vendorCodeName } from '../../DemoData/inbound';
import { UIHelper } from '../../helpers/ui.helpers';
import { GridComponent } from '@progress/kendo-angular-grid';
import { environment } from '../../../environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpCallServiceService } from '../../services/http-call-service.service';
import { Vender } from '../../models/Vender';
import { Router } from '@angular/router';
import { InboundMasterComponent } from '../inbound-master.component';

@Component({
  selector: 'app-vender-selection',
  templateUrl: './vender-selection.component.html',
  styleUrls: ['./vender-selection.component.scss']
})
export class VenderSelectionComponent implements OnInit {

  constructor(private modalService: NgbModal, private httpCallServiceService: HttpCallServiceService,
    private router: Router, private inboundMasterComponent: InboundMasterComponent) { }

  imgPath = environment.imagePath;
  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  showLoader: boolean = false;
  searchRequest: string = '';

  public gridData: any[];
  public gridData2: any[];

  venders: Vender[];
  venderCode: String = "";
  venderName: String = "";


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
    element.classList.add("opti_body-vendor-selection");
    element.classList.add("opti_body-main-module");
    // Apply class on body end

    this.isMobile = UIHelper.isMobile();

    this.getPurchaseOrderList();
    // this.getVendorCodeAndName();

  }

  /**
   * Method to get list of inquries from server.
  */
  public getPurchaseOrderList() {
    this.showLoader = true;
    this.gridData = purchaseOrderNumberVendor;
    setTimeout(() => {
      this.showLoader = false;
    }, 1000);
  }

  /**
   * 
  */
  getVendorCodeAndName() {
    // this.showLoader = true;
    this.gridData2 = this.venders;
    // setTimeout(() => {
    //   this.showLoader = false;
    // }, 1000);
  }



  onFilterChange(checkBox: any, grid: GridComponent) {
    if (checkBox.checked == false) {
      this.clearFilter(grid);
    }
  }

  clearFilter(grid: GridComponent) {
    //grid.filter.filters=[];
  }

  openVerticallyCentered(content) {
    this.httpCallServiceService.getVenderList().subscribe(
      (data: any) => {
        console.log(data);
        debugger
        this.venders = data.Table;
        this.getVendorCodeAndName();
        this.modalService.open(content, { centered: true });
      },
      error => {
        console.log("Error: ", error);
        alert("fail");
      }
    );
  }

  selectVendorCode(selection) {
    debugger
    const vender = selection.selectedRows[0].dataItem;
    this.venderCode = vender.CARDCODE;
    this.venderName = vender.CARDNAME;
    // modal.dismiss
    // $("#polist").modal('show');
    // this.modalService.dismissAll;
  }

  public onNextClick(){
    // this.router.navigateByUrl('polist');
    this.inboundMasterComponent.inboundComponent = 2;
  }
}
