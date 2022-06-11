import { Injectable } from '@angular/core';
import { 
  Firestore, 
  doc,
  addDoc,
  updateDoc,
  getDoc,
  collection,
  collectionData,
  query, where
} from '@angular/fire/firestore';

import { map } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/data-access/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {  

  constructor(private fs: Firestore, private auth: AuthService) {}

  getUsersList() {
    const colRef = collection(this.fs, 'users');    
    const users = query(colRef, where('uid', '!=', this.auth.user.uid))
    const users$ = collectionData(users);
    return users$;
  }

  getUserInfo(userId: string) {
    // console.log('getting user data', userId);
    const colRef = collection(this.fs, 'users');    
    const userDoc = query(colRef, where('uid', '==', userId));
    return collectionData(userDoc).pipe(
      map((data) => data[0]),      
    )
  }
 
  getChat(toUid: string) {
    const { uid } = this.auth.user;    
    const colRef = collection(this.fs, 'chats');    
    const userInitiatedChats = query(colRef, where(`participants.${uid}`, '==', true), where(`participants.${toUid}`, '==', true));
    return collectionData(userInitiatedChats).pipe(
      // tap((chats) => console.log('fetched something', chats)),
      map((chatArr) => chatArr[0] ? chatArr[0] : {})
    );
  }

  async sendMessage(content: string, to: string, chatId?: string) {
    const { uid } = this.auth.user;
    const chatRef = doc(this.fs, `chats/${chatId}`);
    
    let data = (await getDoc(chatRef)).data()
    if (!data) {
      const chatsRef = collection(this.fs, 'chats');
      console.log(chatsRef, content, `to: ${to}`, `from: ${uid}`);      
      const createdChatRef = await addDoc(chatsRef, {
        createdAt: Date.now(),
        participants: {
          [uid]: true,
          [to]: true
        },
        count: 1,
        messages: [{ message: content, sender: uid, receiver: to, timestamp: Date.now() }]
      })
      
      await updateDoc(createdChatRef, { ...data, id: createdChatRef.id });  
    } else {
      data['messages'] = [...data['messages'], {sender: uid, message: content, receiver: to, timestamp: Date.now()}];
      await updateDoc(chatRef, data);
    }
  }
}
