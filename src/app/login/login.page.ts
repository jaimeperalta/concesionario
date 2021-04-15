import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralServiceService } from '../servicios/general-service.service';
import firebase from "firebase";
import { Router } from '@angular/router';
import { LoginServiceService } from '../servicios/login-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  signInForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private generalService: GeneralServiceService, private loginService: LoginServiceService, private router: Router) {
    this.signInForm =  this.formBuilder.group({
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required]]
    })
   }

  ngOnInit() {
  }

  async login(){
    console.log(this.signInForm.valid);
    if(this.signInForm.valid){
      await this.generalService.presentLoading();
      firebase.auth().signInWithEmailAndPassword(this.signInForm.controls.email.value,this.signInForm.controls.password.value)
      .then((data) => {
        this.getUserData(data.user.uid);
      })
      .catch((error) => {
        console.log("fail ",error);
        this.generalService.hideLoading();
        this.generalService.presetnToastR("Email o Password incorrectos","Aceptar");
      });
    }
    else{
      this.generalService.presetnToastR("Ingresar tu Email y Password","Aceptar");
    }
  }

  getUserData(uid){
    this.loginService.login(uid)
    .subscribe(async (xhr)=>{
      await this.generalService.hideLoading();
      if(xhr.status == "success"){
        await this.generalService.setStorage("user",{token:xhr.token,userData:xhr.userData})
        this.router.navigateByUrl("/home");
      }else{
        this.generalService.presetnToastR("Error al inciar sesion, intenta más tarde","Aceptar");
      }
    },async err=>{
      await this.generalService.hideLoading();
      this.generalService.presetnToastR("Error al inciar sesion, intenta más tarde","Aceptar");
    })
  }

}
