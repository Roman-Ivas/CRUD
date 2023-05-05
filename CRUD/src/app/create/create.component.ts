import { Component } from '@angular/core';
import { User } from '../user';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
user:User=new User("",0);
constructor(private http:HttpService,private router:Router){}

submit(){
this.router.navigateByUrl("/");
this.http.createUser(this.user).subscribe((data:any)=>{
  console.log("Good!!!")
console.log(data);
window.location.reload();
})


}
}
