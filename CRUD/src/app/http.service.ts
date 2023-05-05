import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url: any;

  constructor(private http:HttpClient) { }
  getUser(id:number){
    return this.http.get(`http://localhost:3001/user/${id}`);

  }
  getList(){
    return this.http.get("http://localhost:3001/list");
  }
  createUser(user:User){
    return this.http.post("http://localhost:3001/create",user);
  }
  deleteUser(user:User){
    return this.http.delete(`http://localhost:3001/delete/${user.id}`);
  }
  putUser(user:User){
    return this.http.put(`http://localhost:3001/put/${user.id}`,user);
  }
  checkStatus(): Observable<any> {
    return this.http.get(`${this.url}/api/server-status`);
  }
}
