import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TheirMessageComponent } from './their-message.component';



@NgModule({
  declarations: [
    TheirMessageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [TheirMessageComponent]
})
export class TheirMessageModule { }
