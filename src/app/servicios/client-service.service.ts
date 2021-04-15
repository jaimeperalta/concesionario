import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../interfaces/client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  baseUrl:string = "https://dry-shelf-87366.herokuapp.com";
  clients:Client[] = [];
  constructor(private http:HttpClient) { }


  getClients(locality,token){
		let headers = new HttpHeaders({"authorization":token});
    this.http.post(`${this.baseUrl}/client/listar`,{locality},{headers:headers})
    .subscribe((xhr:any)=>{
      this.clients = xhr.data;
    },err=>{
      console.log(err);
    })

  }

  crear(client,token):Observable<any>{
		let headers = new HttpHeaders({"authorization":token});
    return this.http.post(`${this.baseUrl}/client/crear`,client,{headers:headers})
  }

  actualizar(client,token):Observable<any>{
		let headers = new HttpHeaders({"authorization":token});
    return this.http.post(`${this.baseUrl}/client/editar`,client,{headers:headers})
  }

  search(data,token){
    if(data.documentId != ""){
      let headers = new HttpHeaders({"authorization":token});
      this.http.post(`${this.baseUrl}/client/buscar`,data,{headers:headers})
      .subscribe((xhr:any)=>{
        this.clients = xhr.data;
      },err=>{
        console.log(err);
        this.clients = [];
      })
    }
    else{
      this.getClients(data.locality,token);
    }
  }

  eliminar(client,token):Observable<any>{
		let headers = new HttpHeaders({"authorization":token});
    return this.http.post(`${this.baseUrl}/client/eliminar`,client,{headers:headers})
  }

  report(data,token):Observable<any>{
		let headers = new HttpHeaders({"authorization":token});
    return this.http.post(`${this.baseUrl}/client/reporte`,data,{headers:headers})
  }


  localities  =  [
    {
      "name": "Amazonas",
      "zone_id": "720"
    },
    {
      "name": "Antioquia",
      "zone_id": "721"
    },
    {
      "name": "Arauca",
      "zone_id": "722"
    },
    {
      "name": "Atlantico",
      "zone_id": "723"
    },
    {
      "name": "Bolivar",
      "zone_id": "725"
    },
    {
      "name": "Boyaca",
      "zone_id": "726"
    },
    {
      "name": "Caldas",
      "zone_id": "727"
    },
    {
      "name": "Caqueta",
      "zone_id": "728"
    },
    {
      "name": "Casanare",
      "zone_id": "729"
    },
    {
      "name": "Cauca",
      "zone_id": "730"
    },
    {
      "name": "Cesar",
      "zone_id": "731"
    },
    {
      "name": "Choco",
      "zone_id": "732"
    },
    {
      "name": "Cordoba",
      "zone_id": "733"
    },
    {
      "name": "Cundinamarca",
      "zone_id": "734"
    },
    {
      "name": "Guainia",
      "zone_id": "735"
    },
    {
      "name": "Guajira",
      "zone_id": "736"
    },
    {
      "name": "Guaviare",
      "zone_id": "737"
    },
    {
      "name": "Huila",
      "zone_id": "738"
    },
    {
      "name": "Magdalena",
      "zone_id": "739"
    },
    {
      "name": "Meta",
      "zone_id": "740"
    },
    {
      "name": "Narino",
      "zone_id": "741"
    },
    {
      "name": "Norte de Santander",
      "zone_id": "742"
    },
    {
      "name": "Putumayo",
      "zone_id": "743"
    },
    {
      "name": "Quindio",
      "zone_id": "744"
    },
    {
      "name": "Risaralda",
      "zone_id": "745"
    },
    {
      "name": "San Andres y Providencia",
      "zone_id": "746"
    },
    {
      "name": "Santander",
      "zone_id": "747"
    },
    {
      "name": "Sucre",
      "zone_id": "748"
    },
    {
      "name": "Tolima",
      "zone_id": "749"
    },
    {
      "name": "Valle del Cauca",
      "zone_id": "750"
    },
    {
      "name": "Vaupes",
      "zone_id": "751"
    },
    {
      "name": "Vichada",
      "zone_id": "752"
    }
  ]
}
