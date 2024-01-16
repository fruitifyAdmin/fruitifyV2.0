import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { StaffService } from '../staff.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginInProcess = false;
  emailLogin = true;
  mobileNumber = ''
  otpValue = ''
  showSpinner = true;
  validUsers: any[] = [];
  validUsersData: any[] = [];
  recaptchaVerifier: any
  windowRef: any;
  currentUser: any = null;
  config = {
    apiKey: "AIzaSyCUSZuELhsjuI1XRJ95hmi3sC-_BG5lFhU",
    authDomain: "fruitify-de474.firebaseapp.com",
    projectId: "fruitify-de474",
    storageBucket: "fruitify-de474.appspot.com",
    messagingSenderId: "1034222982908",
    appId: "1:1034222982908:web:91fcaa342adc771544e979",
    measurementId: "G-90LHSTGEY4"
  }

  constructor(private staffService: StaffService,
    private router: Router, private firebaseAuth: AngularFireAuth, private messageService: MessageService) {
   this.firebaseAuth.authState.subscribe((user) => {this.currentUser = user;});
 }
 
 ngOnInit() {
   this.staffService.getStaffDetails().subscribe((res: any) => {
     res.forEach((staffMember: any) => {
       this.validUsers.push(staffMember.data().uid);  
       this.validUsersData.push(staffMember.data()) 
     });
   })
   this.firebaseAuth.authState.subscribe((user) => {this.currentUser = user;})
   setTimeout(() => {
     this.checkAuthorisation()
   }, 1000);
 }

 checkAuthorisation() {
   if(this.currentUser) {
     if(this.validUsers.indexOf(this.currentUser?.uid) == -1) {          
       this.showSpinner = false;
       this.router.navigateByUrl('unauthorised');
     } else {
       this.validUsersData.forEach((staff: any) => {
         if(staff.uid == this.currentUser.uid) {
           console.warn(staff);
           localStorage.setItem('userName',staff.userName)
           localStorage.setItem('role',staff.role)
           if(staff.status == 'Approved') {
             this.router.navigateByUrl('staffHome');
           } else {
             this.router.navigateByUrl('registrationPending');
           }
         }
       });
       this.showSpinner = false;
     }
   } else {
     this.showSpinner = false;
   }
 }

 signInWithGoogle() {
   this.loginInProcess = true;
   this.firebaseAuth.setPersistence('local').then(() => {
     this.staffService.signInWithGoogle().then((res: any) => {
       this.currentUser = res.user;
       setTimeout(() => {
         this.checkAuthorisation()
       }, 1000);
     }).catch((error: any) => {
       console.warn(error);
       this.loginInProcess = true;
     })
   })
 }

 updateSignInMethod() {
   this.emailLogin = !this.emailLogin
 }

 generateOtp() {
   this.staffService.signInwithMobile('reCaptchaContainer', '+91'+this.mobileNumber);
   this.show()
 }

 verifyOtp() {
   this.staffService.verifyOtp(this.otpValue).then((res: any) => {
     setTimeout(() => {
       this.checkAuthorisation()
     }, 1000);
   }).catch((error: any) => {
     this.loginInProcess = true;
   })
 }

 show() {
   this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Otp sent to your registered mobile number' });
 }
}
