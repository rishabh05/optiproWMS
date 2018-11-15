import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { UIHelper } from '../../helpers/ui.helpers';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sales-order-detail',
  templateUrl: './sales-order-detail.component.html',
  styleUrls: ['./sales-order-detail.component.scss']
})
export class SalesOrderDetailComponent implements OnInit {

  
  @Input() currentSidebarInfo:CurrentSidebarInfo;

  constructor() { }

  tabName: string = 'home';
  vTabName: string = 'vhome';
  imgPath = environment.imagePath;

  // tab function
  openTab(evt, tabName, tabType) {
    if(tabType=='vertical'){
      this.vTabName = tabName;
      UIHelper.customOpenTab(evt, 'vertical');
    }else{
      this.vTabName = 'vhome';
      this.tabName = tabName;
      UIHelper.customOpenTab(evt, 'horizontal');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // apply width on opti_TabID
    UIHelper.getWidthOfOuterTab();
  }

  ngOnInit() {
    // apply width on opti_TabID
    UIHelper.getWidthOfOuterTab();
  }

}
