import { Component, OnInit, HostListener } from '@angular/core';
import { purchaseOrderNumberVendor } from '../../DemoData/inbound';
import { UIHelper } from '../../helpers/ui.helpers';
import { GridComponent } from '@progress/kendo-angular-grid';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-vender-selection',
  templateUrl: './vender-selection.component.html',
  styleUrls: ['./vender-selection.component.scss']
})
export class VenderSelectionComponent implements OnInit {

  constructor() { }

  imgPath = environment.imagePath;
  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  showLoader: boolean = false;
  searchRequest: string = '';

  public gridData: any[];
  
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

  }


    /**
   * Method to get list of inquries from server.
  */
 public getPurchaseOrderList() {
  this.showLoader = true;
  this.gridData = purchaseOrderNumberVendor;
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

}
