import { Component, ElementRef, ViewChild } from '@angular/core';
import { FileUploadService } from '../data-access/file-upload.service';

@Component({
  selector: 'app-file-upload',
  template: `
    <div>
      <input type="file" #fileInput (change)="onFileChange($event)" accept="file" [multiple]="false" [hidden]="true" id="file_upload_input"/>
      <button mat-icon-button aria-label="Upload File" type="button" (click)="onUploadClick()">
        <mat-icon class="text-[#8b8e95]">upload</mat-icon>
      </button>
    </div>
  `,
  styles: [
  ]
})
export class FileUploadComponent {
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private upload: FileUploadService) { }

  onFileChange($event: any) {
    // console.log('file event', $event);
    const file = $event.target.files[0];
    // console.log('path', file);
    this.upload.selectFile(file);
  }
  
  
  onUploadClick() {
    this.fileInput.nativeElement.click();    
  }

}
