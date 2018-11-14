import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InboundRoutingModule } from './inbound-routing.module';
import { VenderSelectionComponent } from '../inbound/vender-selection/vender-selection.component';

@NgModule({
  imports: [
    CommonModule,
    InboundRoutingModule
  ],
  declarations: [VenderSelectionComponent],
  exports:[VenderSelectionComponent]
})
export class InboundModule { }
