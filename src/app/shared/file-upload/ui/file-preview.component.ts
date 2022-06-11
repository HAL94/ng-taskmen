import { Component, Input, OnInit } from '@angular/core';
import { FileUploadService } from '../data-access/file-upload.service';
import { FilePreview } from '../utils/file-preview.interface';
import { UploadStatus } from '../utils/upload-status.interface';

@Component({
  selector: 'app-file-preview',
  template: `
    <div aria-label="Loading Spinner" *ngIf="(upload.uploadStatus | async) === PENDING else preview">
      <mat-spinner></mat-spinner>
    </div>
    <ng-template #preview>
      <div class="flex flex-row justify-start items-center">
        <div *ngIf="filePreview.type.startsWith('image')" class="mt-3">
          <img [src]="filePreview.src" [alt]="filePreview.name" [width]="width" [height]="height" [class]="'rounded-3xl' + class"/>
        </div>
        <div *ngIf="filePreview.type === 'text/plain'">
          <div class="bg-[#77bff2]" 
          [ngStyle]="{'height': height+'px', 'width': width+'px'}" 
          [ngClass]="'rounded-3xl px-2 py-3' + class">
            <span>{{filePreview.name}}</span>
          </div>
        </div>
        <button mat-icon-button type="button" class="self-start" (click)="onCancelFile()"><mat-icon>close</mat-icon></button>
      </div>
    </ng-template>

  `,
  styles: [
  ]
})
export class FilePreviewComponent implements OnInit {
  @Input() filePreview: FilePreview;
  @Input() width = 300;
  @Input() height = 100;
  @Input() class: string = '';

  PENDING = UploadStatus.PENDING;

  constructor(public upload: FileUploadService) { }

  ngOnInit(): void {
  }

  onCancelFile() {
    this.upload.cancelFile();
  }

}
