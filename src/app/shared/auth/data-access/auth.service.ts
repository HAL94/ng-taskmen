
import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, DocumentReference, docSnapshots, setDoc}from '@angular/fire/firestore';
import { updateProfile } from '@firebase/auth';
import { forkJoin, from, map, Observable, of, switchMap } from 'rxjs';
import { SigninCredentials, SignupCredentials } from '../utils/auth.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private user$: Observable<any | null>;

  readonly isLoggedIn$ = authState(this.auth);

  doc: DocumentReference;

  constructor(private auth: Auth, private firestore: Firestore) {     
    this.user$ = this.isLoggedIn$.pipe(
      switchMap((user) => {
        if (!user) {
          return of(null);
        }
        const docRef = doc(this.firestore, `users/${user?.uid}`)
        return docSnapshots(docRef).pipe(map((snapshot) => snapshot.data()))      
      })
    )
  }

  get user() {
    return this.user$;
  }
 
  getCurrentUser() {    
    return this.auth.currentUser!;
  }

  signIn({ email, password }: SigninCredentials) {
    return from(signInWithEmailAndPassword(this.auth, email, password))
  }

  signUp({ email, password, displayName }: SignupCredentials) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(      
      switchMap(({ user }) => forkJoin([
        updateProfile(user, { displayName }),
        new Promise(async (resolve, reject) => {          
          const docRef = doc(this.firestore, `users/${user.uid}`)
          await setDoc(docRef, { displayName, email, isVerified: user.emailVerified, uid: user.uid })
          resolve(null)
        })        
      ])),
    );
  }

  signOut() {    
    return from(this.auth.signOut());
  }
}
