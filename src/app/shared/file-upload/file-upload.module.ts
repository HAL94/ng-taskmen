import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './ui/file-upload.component';
import { MatIconModule } from '@angular/material/icon';
import { FilePreviewComponent } from './ui/file-preview.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    FileUploadComponent,
    FilePreviewComponent
  ],
  imports: [
    MatIconModule,
    MatProgressSpinnerModule,
    CommonModule
  ],
  exports: [FileUploadComponent, FilePreviewComponent]
})
export class FileUploadModule { }
