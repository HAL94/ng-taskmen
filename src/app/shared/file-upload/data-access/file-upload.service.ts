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
      console.log(result);
    };
  }

  cancelFile() {
    this.filePreview$.next(null);
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
    
    // uploadTask
    // .then((snapshot) => snapshot.ref)
    // .then((fileStorageRef) => getDownloadURL(fileStorageRef))
    // .then((fileUrl) => console.log(fileUrl));

    // const uploadTask = uploadBytesResumable(filenameStorageRef, this.file);
    
    // uploadTask.on(
    //   'state_changed',
    //   (snapshot) => {
    //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //     const progress =
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log('Upload is ' + progress + '% done');
    //     switch (snapshot.state) {
    //       case 'paused':
    //         console.log('Upload is paused');
    //         break;
    //       case 'running':
    //         console.log('Upload is running');
    //         break;
    //     }
    //   },
    //   (error) => {
    //     // A full list of error codes is available at
    //     // https://firebase.google.com/docs/storage/web/handle-errors
    //     switch (error.code) {
    //       case 'storage/unauthorized':
    //         // User doesn't have permission to access the object
    //         break;
    //       case 'storage/canceled':
    //         // User canceled the upload
    //         break;

    //       // ...

    //       case 'storage/unknown':
    //         // Unknown error occurred, inspect error.serverResponse
    //         break;
    //     }
    //   },
    //   () => {
    //     // Upload completed successfully, now we can get the download URL
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //       console.log('File available at', downloadURL);
    //     });
    //   }
    // );

    // return from(uploadBytes(filenameStorageRef, this.file));
  }
}
