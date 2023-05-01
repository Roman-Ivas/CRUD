import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }
  getList(){
    return this.http.get("http://localhost:3001/list");
  }
  createUser(user:User){
    return this.http.post("http://localhost:3001/create",user);
  }
  deleteUser(user:User){
    //return this.http.delete(`http://localhost:3001/list/${user.id},`);
  }
  putUser(user:User){
    return this.http.put(``,user);
  }
}
