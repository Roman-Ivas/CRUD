import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  userList:User[]=[]
constructor(private http:HttpService){}
  ngOnInit(): void {
    this.http.getList().subscribe((data:any)=>{
      console.log(data)
      this.userList=data;
    })
  }
myDelete(user:User){
  // this.http.deleteUser(user).subscribe((data:any)=>{
  //   window.location.reload()
  // });

}
}
