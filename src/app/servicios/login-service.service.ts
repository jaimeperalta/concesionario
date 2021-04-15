import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  baseUrl:string = "https://dry-shelf-87366.herokuapp.com"
  constructor(private http:HttpClient) { }


  login(uid):Observable<any> {
		return this.http.post(`${this.baseUrl}/user/login`,{uid})
	}
}
