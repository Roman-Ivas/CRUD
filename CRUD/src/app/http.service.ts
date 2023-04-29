import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }
  getList(){
    return this.http.get("");
  }
  createUser(user:User){
    return this.http.post(``,user);
  }
  deleteUser(user:User){
    return this.http.delete(``);
  }
  putUser(user:User){
    return this.http.put(``,user);
  }
}
