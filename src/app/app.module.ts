import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from './shared/dialog/dialog.module';
import { IconsModule } from './shared/icons/icons.module';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth, connectAuthEmulator } from '@angular/fire/auth';
import materialImports from './material.imports';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { provideFirestore, getFirestore, connectFirestoreEmulator, enableIndexedDbPersistence } from '@angular/fire/firestore';
import { connectFunctionsEmulator, Functions, FunctionsInstances, getFunctions } from '@angular/fire/functions';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DialogModule,
    BrowserAnimationsModule,
    IconsModule,
    HttpClientModule,
    provideFirebaseApp(() => {
      const app = initializeApp(environment.firebase)
      connectFunctionsEmulator(getFunctions(app), 'localhost', 5001);
      return app;
    }),
    provideAuth(() => {
      const auth = getAuth();
      connectAuthEmulator(auth, 'http://localhost:9099')
      return auth
    }),
    provideFirestore(() => {
      const firestore = getFirestore();      
      connectFirestoreEmulator(firestore, 'localhost', 8888);
      enableIndexedDbPersistence(firestore);
      return firestore;
    }),    
    ...materialImports
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
