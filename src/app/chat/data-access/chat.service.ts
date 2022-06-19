import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
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
  collectionSnapshots,
  onSnapshot,
  collectionChanges,
} from '@angular/fire/firestore';

import {
  BehaviorSubject,
  combineLatest,
  combineLatestAll,
  concatMap,
  exhaustMap,
  filter,
  map,
  mergeAll,
  mergeMap,
  of,
  switchMap,
  take,
  tap,
  toArray,
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
  ) {
    const colRef = collection(this.fs, 'users');

    const users = query(colRef, where('uid', '!=', this.auth.user.uid));
    
    onSnapshot(users, (querySnapshot) => {
      const usersArr = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        usersArr.push(doc.data());
      });
      // console.log(usersArr);
      this.chatUsers$.next(usersArr);
    });
  }

  chatUsers$ = new BehaviorSubject<any>([]);
  
  get chatUsers() {
    return this.chatUsers$.asObservable().pipe(
      filter((result) => result.length > 0),
      take(1),      
      tap((result) => console.log(result)),
      map((users) => users.map((user: User) => this.getLastMessage(user.uid).pipe(                
        // tap((result) => console.log('anything', result)),
        switchMap(lastMessage => of({ ...user, lastMessage: lastMessage[user.uid] ? lastMessage[user.uid] : null }))
      ))),
      concatMap(userObj => userObj),
      combineLatestAll()
    );
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
    if (!this.auth || !fromUid) {
      return of(null);
    }
    const { uid: toUid } = this.auth.user;
    // console.log('getting users message', fromUid);
    // console.log('that user', fromUid, 'this user', toUid);
    const colRef = collection(this.fs, 'chats');
    const lastChatMessage = query(
      colRef,
      where(`participants.${toUid}`, '==', true),
      where(`participants.${fromUid}`, '==', true)
    );

    return collectionData(lastChatMessage).pipe(
      // tap((chat) => console.log('got chat', chat)),
      map((chatArr) => (chatArr[0] ? chatArr[0] : {})),
      // tap((chat) => console.log('got chat', chat)),
      // filter((chat) => !!chat),      
      map((chatDoc) => chatDoc['lastMessage'] || {})
    );
    
  }

  async sendMessage(content: string, to: string, chatId?: string) {
    const { uid } = this.auth.user;
    const chatRef = doc(this.fs, `chats/${chatId}`);

    let data = (await getDoc(chatRef)).data();
    let uploadData = await this.upload.uploadFile();

    const message = {
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
        messages: [message],
        lastMessage: {[uid]: { message: content, timestamp: message.timestamp, file: message.file  }}
      });

      await updateDoc(createdChatRef, {        
        id: createdChatRef.id
      });
    } else {
      data['messages'] = [...data['messages'], message];
      data['lastMessage'] = { ...data['lastMessage'], [uid]: { message: content, timestamp: message.timestamp, file: message.file  } };
      await updateDoc(chatRef, data);
    }

    // await this.updateUserLastMsg({ message: content, timestamp: message.timestamp, file: message.file  });

    this.upload.cancelFile();
  }

  private async updateUserLastMsg(msg: any) {
    const { uid } = this.auth.user;

    const userDocRef = doc(this.fs, `users/${uid}`);
    await updateDoc(userDocRef, {
      lastMessage: msg
    })
  }
}
