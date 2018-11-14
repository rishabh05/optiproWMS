import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InboundRoutingModule } from './inbound-routing.module';
import { VenderSelectionComponent } from '../inbound/vender-selection/vender-selection.component';
import { POListComponent } from './polist/polist.component';
import { GRPOCalculationComponent } from './grpocalculation/grpocalculation.component';

@NgModule({
  imports: [
    CommonModule,
    InboundRoutingModule
  ],
  declarations: [VenderSelectionComponent, POListComponent, GRPOCalculationComponent],
  exports:[VenderSelectionComponent]
})
export class InboundModule { }
