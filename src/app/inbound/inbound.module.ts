import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InboundRoutingModule } from './inbound-routing.module';
import { VenderSelectionComponent } from '../inbound/vender-selection/vender-selection.component';
import { POListComponent } from './polist/polist.component';
import { GRPOCalculationComponent } from './grpocalculation/grpocalculation.component';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { FileDropModule } from 'ngx-file-drop';

@NgModule({
  imports: [
    CommonModule,
    InboundRoutingModule,
    GridModule,
    ExcelModule,
    FormsModule,
    AngularSvgIconModule,
    PerfectScrollbarModule,
    DropDownsModule,
    FileDropModule
  ],
  declarations: [VenderSelectionComponent, POListComponent, GRPOCalculationComponent],
  exports:[VenderSelectionComponent]
})
export class InboundModule { }
