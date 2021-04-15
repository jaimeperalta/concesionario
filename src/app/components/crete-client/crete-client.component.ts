import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Client } from 'src/app/interfaces/client';
import { ClientServiceService } from 'src/app/servicios/client-service.service';
import { GeneralServiceService } from 'src/app/servicios/general-service.service';

@Component({
  selector: 'app-crete-client',
  templateUrl: './crete-client.component.html',
  styleUrls: ['./crete-client.component.scss'],
})
export class CreteClientComponent implements OnInit {
  @Input() client:Client;
  formData:FormGroup;
  isEdit:boolean = false;
  
  constructor(private formBuilder: FormBuilder,public clientService: ClientServiceService, private generalService: GeneralServiceService, private modalController:ModalController) { 
    this.formData =  this.formBuilder.group({
      name:[null,[Validators.required]],
      lastName:[null,[Validators.required]],
      email:[null,[Validators.required,Validators.email]],
      phoneNumber:[null,[Validators.required]],
      locality:["739",[Validators.required]],
      documentId:[null,[Validators.required]],
      concesionario:["1",[Validators.required]]
    })
  }
  
  ngOnInit() {
    if(this.client){
      this.formData.setValue(this.client);
      this.formData.updateValueAndValidity();
      this.formData.disable();
    }
  }
  
  guardar(){
    if(this.formData.valid){
      if(this.client){
        this.actualizar();
      }
      else{
        this.crear()
      }
    }
    else{
      this.generalService.presetnToastR("Por favor completa todos los campos para continuar","Aceptar");
    }
  }
  
  async crear(){
    await this.generalService.presentLoading();
    let infoCrear = {
      ...this.formData.value,
      localityName:this.clientService.localities.filter((val)=>val.zone_id == this.formData.controls.locality.value)[0].name
    }
    let user = await this.generalService.getStorage("user");
    this.clientService.crear(infoCrear,user.token)
    .subscribe(async (xhr)=>{
      await this.generalService.hideLoading();
      if(xhr.status == "success"){
        this.generalService.presetnToastV("Cliente creado correctamente","Aceptar");
        this.modalController.dismiss(true);
      }
      else if(xhr.status == "clientExist"){
        this.generalService.presetnToastV("El cleinte ya se encuentra registrado","Aceptar");
      }
      else if(xhr.status == "noCampos"){
        this.generalService.presetnToastR("Por favor completa todos los campos para continuar","Aceptar");
      }
      else{
        this.generalService.presetnToastR("Error al procesar la solicitud, intenta más tarde","Aceptar",6000);
      }
    },async err=>{
      await this.generalService.hideLoading();
      this.generalService.presetnToastR("Error al procesar la solicitud, intenta más tarde","Aceptar",6000);
    })
  }
  
  editar(){
    this.isEdit = !this.isEdit;
    if(this.isEdit)this.formData.enable();
    else this.formData.disable();

    this.formData.controls.documentId.disable();
    this.formData.controls.email.disable();
    this.formData.controls.locality.disable();
  }
  

  async actualizar(){
    await this.generalService.presentLoading();
    let infoUpdate = {
      name:this.formData.controls.name.value,
      concesionario:this.formData.controls.concesionario.value,
      lastName:this.formData.controls.lastName.value,
      email:this.formData.controls.email.value,
      phoneNumber:this.formData.controls.phoneNumber.value,
      locality:this.formData.controls.locality.value,
      documentId:this.formData.controls.documentId.value,
      localityName:this.clientService.localities.filter((val)=>val.zone_id == this.formData.controls.locality.value)[0].name
    }
    let user = await this.generalService.getStorage("user");
    this.clientService.actualizar(infoUpdate,user.token)
    .subscribe(async (xhr)=>{
      await this.generalService.hideLoading();
      if(xhr.status == "success"){
        this.generalService.presetnToastV("Cliente actualizado correctamente","Aceptar");
        this.modalController.dismiss(true);
      }
      else if(xhr.status == "clientNoExist"){
        this.generalService.presetnToastV("El cleinte no se encuentra registrado","Aceptar");
      }
      else if(xhr.status == "noCampos"){
        this.generalService.presetnToastR("Por favor completa todos los campos para continuar","Aceptar");
      }
      else{
        this.generalService.presetnToastR("Error al procesar la solicitud, intenta más tarde","Aceptar",6000);
      }
    },async err=>{
      await this.generalService.hideLoading();
      this.generalService.presetnToastR("Error al procesar la solicitud, intenta más tarde","Aceptar",6000);
    })
  
  } 

  dismissModal(){
    this.modalController.dismiss();
  }
  
  async eliminar(){
    await this.generalService.presentLoading();
    let eliminarData = {
      locality:this.formData.controls.locality.value,
      documentId:this.formData.controls.documentId.value
    }
    let user = await this.generalService.getStorage("user");
    this.clientService.eliminar(eliminarData,user.token)
    .subscribe(async (xhr)=>{
      await this.generalService.hideLoading();
      if(xhr.status == "success"){
        this.generalService.presetnToastV("Cliente eliminado correctamente","Aceptar");
        this.modalController.dismiss(true);
      }
      else if(xhr.status == "clientNoExist"){
        this.generalService.presetnToastV("El cleinte no se encuentra registrado","Aceptar");
      }
      else if(xhr.status == "noCampos"){
        this.generalService.presetnToastR("Por faavor completa todos los campos para continuar","Aceptar");
      }
      else{
        this.generalService.presetnToastR("Error al procesar la solicitud, intenta más tarde","Aceptar",6000);
      }
    },async err=>{
      await this.generalService.hideLoading();
      this.generalService.presetnToastR("Error al procesar la solicitud, intenta más tarde","Aceptar",6000);
    })
  }
}
