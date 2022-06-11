import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMessageComponent } from './my-message.component';



@NgModule({
  declarations: [
    MyMessageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [MyMessageComponent]
})
export class MyMessageModule { }
