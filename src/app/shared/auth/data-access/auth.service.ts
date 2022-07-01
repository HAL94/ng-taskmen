
import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, DocumentReference, setDoc}from '@angular/fire/firestore';
import { updateProfile } from '@firebase/auth';
import { forkJoin, from, switchMap, tap } from 'rxjs';
import { SigninCredentials, SignupCredentials } from '../utils/auth.model';
import { AvatarGenerator } from 'random-avatar-generator';
import { updateDoc } from '@firebase/firestore';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly isLoggedIn$ = authState(this.auth);

  doc: DocumentReference;

  constructor(private auth: Auth, private firestore: Firestore) {     
    
  }

  get user() {    
    return this.auth.currentUser!;
  }

  signIn({ email, password }: SigninCredentials) {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      tap(async (userCredentials) => {
        if (userCredentials) {
          const docRef = doc(this.firestore, `users/${userCredentials.user.uid}`);
          await updateDoc(docRef, { isOnline: true });
        }
      })
    )
  }

  signUp({ email, password, displayName }: SignupCredentials) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(      
      switchMap(({ user }) => forkJoin([
        updateProfile(user, { displayName }),
        new Promise(async (resolve, reject) => {
          const generator = new AvatarGenerator();
          const avatar = generator.generateRandomAvatar();          
          
          const docRef = doc(this.firestore, `users/${user.uid}`)
          await setDoc(docRef, { displayName, email, isVerified: user.emailVerified, uid: user.uid, isOnline: true, photoURL: user.photoURL || avatar })
          resolve(null)
        })        
      ])),
    );
  }

  signOut() {
    const user = this.user;
    return from(updateDoc(doc(this.firestore, `users/${user.uid}`), { isOnline: false })).pipe(
      switchMap(() => from(this.auth.signOut()))
    )
  }
}
