import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreteClientComponent } from '../components/crete-client/crete-client.component';
import { Client } from '../interfaces/client';
import { ClientServiceService } from '../servicios/client-service.service';
import { GeneralServiceService } from '../servicios/general-service.service';
import { Plugins } from '@capacitor/core';
import { browser } from 'protractor';
const { Browser } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  locality = "739";
  search:string = "";
  reportMode:string = "0"
  constructor(public generalService: GeneralServiceService, public clientService: ClientServiceService, private modalController: ModalController) {}

  ngOnInit() {
    this.getData();
  }  

  async getData(){
    let user = await this.generalService.getStorage("user");
    this.clientService.getClients(this.locality,user.token);
  }

  async crear(){
    let modal = await this.modalController.create({
      component:CreteClientComponent
    })
    modal.onDidDismiss().then((val)=>{
      if(val){
        this.getData();
      }
    })
    await modal.present();
  }

  async edit({...client}: Client){
    delete(client["localityName"]);
    let modal = await this.modalController.create({
      component:CreteClientComponent,
      componentProps:{
        client:client
      }
    })
    modal.onDidDismiss().then((val)=>{
      if(val.data){
        this.getData();
      }
    })
    await modal.present();
  }

  async buscar(){
    let user = await this.generalService.getStorage("user");
    this.clientService.search({documentId:this.search,locality:this.locality},user.token);
  }
  
  async report(){
    if(this.reportMode != "0"){
      await this.generalService.presentLoading();
      let user = await this.generalService.getStorage("user");
      let localityName = this.clientService.localities.filter((row)=>row.zone_id == this.locality)[0].name
      this.clientService.report({reporte:this.reportMode,locality:this.locality,localityName},user.token)
      .subscribe(async (xhr)=>{
        await this.generalService.hideLoading();
        this.reportMode = "0";
        Browser.open({url: xhr.url,windowName:"_self",presentationStyle:"popover"})  
      },err=>{
        this.generalService.hideLoading();
      })
    }
  }

}
