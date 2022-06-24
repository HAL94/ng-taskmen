import { Injectable } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { getStorage, ref, uploadBytesResumable, uploadBytes, getDownloadURL } from 'firebase/storage';
import { BehaviorSubject, from, of, Subject, switchMap } from 'rxjs';
import { FilePreview } from '../utils/file-preview.interface';
import { UploadStatus } from '../utils/upload-status.interface';
// import * as fs from '@angular/fire/storage';


@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  filePreview$ = new BehaviorSubject<FilePreview>(null);
  uploadStatus$ = new Subject<UploadStatus>();

  file: File;
  // storage = getStorage();

  constructor(private storage: Storage) {}

  get filePreview() {
    return this.filePreview$.asObservable();
  }

  get uploadStatus() {
    return this.uploadStatus$.asObservable();
  }

  selectFile(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      this.filePreview$.next({
        src: result,
        type: file.type,
        name: file.name,
        size: file.size,
      });
      this.file = file;
      // console.log(result);
    };
  }

  cancelFile() {
    this.filePreview$.next(null);
    this.file = null;
  }

  async uploadFile() {
    // console.log('not uploading yet');
    try {
      if (!this.file) {
        return null;
      }
      const filenameStorageRef = ref(this.storage, this.file.name);
      this.uploadStatus$.next(UploadStatus.PENDING);
      const uploadResult = await uploadBytes(filenameStorageRef, this.file)
      const downloadUrl = await getDownloadURL(uploadResult.ref)
      this.uploadStatus$.next(UploadStatus.COMPLETED);
      this.filePreview$.next(null);

      return {
        url: downloadUrl,
        name: this.file.name,
        type: this.file.type
      }

    } catch (error) {
      this.uploadStatus$.next(UploadStatus.REJECTED);
      return {
        error
      };
    }
  }
}
