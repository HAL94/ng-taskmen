import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  collection,
  collectionData,
  query,
  where,
} from '@angular/fire/firestore';

import {
  combineAll,
  combineLatest,
  combineLatestAll,
  combineLatestWith,
  concat,
  concatAll,
  concatMap,
  distinct,
  exhaustMap,
  map,
  merge,
  mergeAll,
  mergeMap,
  mergeScan,
  of,
  switchMap,
  take,
  tap,
  toArray,
  zip,
} from 'rxjs';
import { AuthService } from 'src/app/shared/auth/data-access/auth.service';
import { FileUploadService } from 'src/app/shared/file-upload/data-access/file-upload.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(
    private fs: Firestore,
    private upload: FileUploadService,
    private auth: AuthService
  ) {}

  getUsersList() {
    const colRef = collection(this.fs, 'users');
    const users = query(colRef, where('uid', '!=', this.auth.user.uid));
    const users$ = collectionData(users);    
    const obs = users$.pipe(
      // map((users) => users.map((user, idx) => idx)),      
      map((users) => users.map((user) => this.getLastMessage(user['uid']).pipe(
        switchMap((lastMessage) => of(({ ...user, lastMessage}))),
      ))),      
      take(1),
      concatMap(userObj => userObj),      
      combineLatestAll(),
    );  
    return obs;
  }

  getUserInfo(userId: string) {
    // console.log('getting user data', userId);
    const colRef = collection(this.fs, 'users');
    const userDoc = query(colRef, where('uid', '==', userId));
    return collectionData(userDoc).pipe(map((data) => data[0]));
  }

  getChat(toUid: string) {
    const { uid } = this.auth.user;
    const colRef = collection(this.fs, 'chats');
    const userInitiatedChats = query(
      colRef,
      where(`participants.${uid}`, '==', true),
      where(`participants.${toUid}`, '==', true)
    );
    return collectionData(userInitiatedChats).pipe(
      // tap((chats) => console.log('fetched something', chats)),
      map((chatArr) => (chatArr[0] ? chatArr[0] : {}))
    );
  }

  getLastMessage(fromUid: string) {
    const { uid: toUid } = this.auth.user;
    // console.log('that user', fromUid, 'this user', toUid);
    const colRef = collection(this.fs, 'chats');
    const lastChatMessage = query(
      colRef,
      where(`participants.${toUid}`, '==', true),
      where(`participants.${fromUid}`, '==', true)
    );

    return collectionData(lastChatMessage).pipe(
      map((chatArr) => (chatArr[0] ? chatArr[0] : {})),
      // tap((chat) => console.log(chat)),
      map((chatDoc) => chatDoc['lastMessage'] || {})
    );
    // return lastChatMessage
  }

  async sendMessage(content: string, to: string, chatId?: string) {
    const { uid } = this.auth.user;
    const chatRef = doc(this.fs, `chats/${chatId}`);

    let data = (await getDoc(chatRef)).data();
    let uploadData = await this.upload.uploadFile();

    const lastMessage = {
      message: content,
      sender: uid,
      receiver: to,
      timestamp: Date.now(),
      file: uploadData,
    };
    if (!data) {
      const chatsRef = collection(this.fs, 'chats');
      console.log(chatsRef, content, `to: ${to}`, `from: ${uid}`);

      const createdChatRef = await addDoc(chatsRef, {
        createdAt: Date.now(),
        participants: {
          [uid]: true,
          [to]: true,
        },
        count: 1,
        messages: [lastMessage],
      });

      await updateDoc(createdChatRef, {
        ...data,
        id: createdChatRef.id,
        lastMessage,
      });
    } else {
      data['messages'] = [...data['messages'], lastMessage];
      data['lastMessage'] = lastMessage;
      await updateDoc(chatRef, data);
    }
  }
}
