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

  months: any[] = ["Jan", "Feb", 'Mar', "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

  userCollection: AngularFirestoreCollection;
  customerCollection: AngularFirestoreCollection;
  menuCategoryCollection: AngularFirestoreCollection;
  ordersCollection: AngularFirestoreCollection;
  mainMenuCollectionOld: AngularFirestoreCollection;

  constructor(private fireStore: AngularFirestore, private firebaseAuth: AngularFireAuth, private windowservice: WindowService) {
    // this.windowRef = this.windowservice.windowRef;
    this.userCollection = fireStore.collection('Staff');
    this.menuCategoryCollection = fireStore.collection('menuCollection');
    this.ordersCollection = fireStore.collection('Orders');
    this.customerCollection = fireStore.collection('Users');
    this.mainMenuCollectionOld = fireStore.collection('Menu');
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

  getSideMenuCategories() {
    return this.menuCategoryCollection.doc('menuCategories').collection('categoriesCollection').get();
  }

  addSideMenuCategories(obj: any) {
    return this.menuCategoryCollection.doc('menuCategories').collection('categoriesCollection').doc().set(obj);
  }

  addSideMenuItem(categoryName: any, obj: any) {
    return this.menuCategoryCollection.doc('menuCategories').collection(categoryName.name).doc().set(obj);
  }

  editSideMenuCategories(obj: any, id: any) {
    return this.menuCategoryCollection.doc('menuCategories').collection('categoriesCollection').doc(id).update(obj);
  }

  editSideMenuItem(categoryName: any, obj: any, id: any) {
    return this.menuCategoryCollection.doc('menuCategories').collection(categoryName).doc(id).update(obj);
  }

  deleteSideMenuCategories(id: any) {
    return this.menuCategoryCollection.doc('menuCategories').collection("categoriesCollection").doc(id).delete();
  }
  
  deleteSideMenuItem(categoryName: any, id: any) {
    return this.menuCategoryCollection.doc('menuCategories').collection(categoryName).doc(id).delete();
  }
  
  getMenuItems(categoryName: string) {
    return this.menuCategoryCollection.doc('menuCategories').collection(categoryName).get();
  }

  getPastOrders(category: any, timeStamp: any) {
    var date = new Date(timeStamp)
    var dateVal = date.getDate().toString()
    if(parseInt(dateVal) < 10) {
      dateVal = '0'+dateVal.toString();
    }
    var month = (date.getMonth()+1).toString()
    if(parseInt(month) < 10) {
      month = '0'+month;
    }
    var completeDate = dateVal + '-' + month + '-' + date.getFullYear().toString()    
    return this.ordersCollection.doc(category).collection(date.getFullYear().toString()).doc(this.months[date.getMonth()]).collection(completeDate).get()
  }

  getFoodMenuCategories() {
    return this.mainMenuCollectionOld.get();
  }

  getFoodMenuItems(selectedCategory: any) {
    return this.mainMenuCollectionOld.doc(selectedCategory).collection("Items").get();
  }
}
