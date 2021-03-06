import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { purchaseOrderNumberVendor, vendorCodeName } from '../../DemoData/inbound';
import { UIHelper } from '../../helpers/ui.helpers';
import { GridComponent } from '@progress/kendo-angular-grid';
import { environment } from '../../../environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpCallServiceService } from '../../services/http-call-service.service';
import { Vender } from '../../models/Vender';
import { Router } from '@angular/router';
import { InboundMasterComponent } from '../inbound-master.component';
declare var $: any;

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

  public PurchaseOrders: any[] = this.inboundMasterComponent.SubmitPOArray;

  venders: Vender[];
  venderCode: string = "";
  venderName: string = "";
  showGrid: boolean = false;
  

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
    this.PurchaseOrders = purchaseOrderNumberVendor;
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

  onVenderLookupClick(content) {
    this.httpCallServiceService.getVenderList().subscribe(
      (data: any) => {
        console.log(data);

        if (data.Table != undefined) {
          this.venders = data.Table;
        }
        else if (data.LICDATA != undefined && data.LICDATA[0].ErrorMsg == "7001") {
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

  selectVendorCode(selection) {
    const vender = selection.selectedRows[0].dataItem;
    this.venderCode = vender.CARDCODE;
    this.venderName = vender.CARDNAME;
    document.getElementById('closeVendorCodeGrid').click();
  }

  public onNextClick() {
    this.inboundMasterComponent.selectedVernder = this.venderCode;
    this.inboundMasterComponent.inboundComponent = 2;
  }
}
