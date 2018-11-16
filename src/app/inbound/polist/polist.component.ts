import { Component, OnInit, HostListener } from '@angular/core';
import { GridComponent } from '@progress/kendo-angular-grid';
import { inspectionGrid, vendorCodeName } from '../../DemoData/inbound';
import { UIHelper } from '../../helpers/ui.helpers';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';
import { InboundMasterComponent } from '../inbound-master.component';

@Component({
  selector: 'app-polist',
  templateUrl: './polist.component.html',
  styleUrls: ['./polist.component.scss']
})
export class POListComponent implements OnInit {

  constructor(private modalService: NgbModal, private inboundMasterComponent: InboundMasterComponent) { }

  imgPath = environment.imagePath;
  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  showLoader: boolean = false;
  searchRequest: string = '';

  public gridInspection: any[];
  public gridData2: any[];

  isInspectionGrid:boolean = false;
  
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

    this.getInspectionGrid();
    this.getVendorCodeAndName();

  }


  /**
   * Method to get list of inquries from server.
  */
  public getInspectionGrid() {
    this.showLoader = true;
    this.gridInspection = inspectionGrid;
    setTimeout(()=>{    
      this.showLoader = false;
    }, 1000);
  }

  /**
   * 
  */
  getVendorCodeAndName(){
    this.showLoader = true;
    this.gridData2 = vendorCodeName;
    setTimeout(()=>{    
      this.showLoader = false;
    }, 1000);
  }



  onFilterChange(checkBox:any,grid:GridComponent)
  {
    if(checkBox.checked==false){
      this.clearFilter(grid);
    }
  }

  clearFilter(grid:GridComponent){      
    //grid.filter.filters=[];
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }  

  selectVendorCode(e){
    
  }

  /**
   * Show Inspection Grid 
   * @param status 
  */
  showInspectionGrid(status){
    this.isInspectionGrid = status;
  }

  public onNextClick(){
    // this.router.navigateByUrl('polist');
    this.inboundMasterComponent.inboundComponent = 3;
  }
}
