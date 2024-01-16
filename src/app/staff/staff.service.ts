import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from 'firebase/compat/app';
import { GoogleAuthProvider } from "firebase/auth";
import { WindowService } from './window.service';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  reCaptchaVerifier: any
  windowRef: any
  config = {
    apiKey: "AIzaSyCUSZuELhsjuI1XRJ95hmi3sC-_BG5lFhU",
    authDomain: "fruitify-de474.firebaseapp.com",
    projectId: "fruitify-de474",
    storageBucket: "fruitify-de474.appspot.com",
    messagingSenderId: "1034222982908",
    appId: "1:1034222982908:web:91fcaa342adc771544e979",
    measurementId: "G-90LHSTGEY4"
  }

  userCollection: AngularFirestoreCollection;

  constructor(private fireStore: AngularFirestore, private firebaseAuth: AngularFireAuth, private windowservice: WindowService) {
    // this.windowRef = this.windowservice.windowRef;
    this.userCollection = fireStore.collection('Staff');
  }

  ngOnInit() {
    firebase.initializeApp(this.config);
  }

  signInWithGoogle() {
    return this.firebaseAuth.signInWithPopup(new GoogleAuthProvider());
  }
  
  signInwithMobile(reCaptchaContainer: any, mobileNumber?: any) {    
    const app = firebase.initializeApp(this.config);
    this.firebaseAuth.signInWithPhoneNumber(mobileNumber,    
    this.windowRef['phoneRecaptchaVerifier'] = new firebase.auth.RecaptchaVerifier('phone-sign-in-recaptcha', {
      'size': 'invisible',
      'callback': function(response: any) {
        console.warn(response);
        
        // reCAPTCHA solved - will proceed with submit function
      },
      'expired-callback': function() {
        // Reset reCAPTCHA?
      }
    }, app)).then((confirmationResult: any) => {
      this.windowRef.confirmationResult = confirmationResult;
      var data = document.getElementById('phone-sign-in-recaptcha') as HTMLElement;
      data.innerHTML = '';
    });
    // this.windowRef['phoneRecaptchaVerifier'].clear();
  }

  verifyOtp(otp: any) {
    return this.windowRef.confirmationResult.confirm(otp)
  }

  getStaffDetails() {
    return this.userCollection.get();
  }

  addStaffMember(user: any) {
    return this.userCollection.doc(user.uid).set({
      "userName": user.displayName,
      "role": "Staff",
      "status": "Pending",
      "uid": user.uid
    })
  }

  updateStaffMember(uid: any, details: any) {
    return this.userCollection.doc(uid).update({
      "role": details.role,
      "status": details.status,
    })
  }

  getStaffData(id: any) {
    return this.userCollection.doc(id).get();
  }
}
