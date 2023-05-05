import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-put',
  templateUrl: './put.component.html',
  styleUrls: ['./put.component.css']
})
export class PutComponent implements OnInit{
  user?:User;
  constructor(private route: ActivatedRoute,private http:HttpService,private router: Router){

  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log('ID:', id);
      this.http.getUser(id).subscribe((data:any)=>{
        console.log(data);
        this.user=data;
      })
      // Do something with the ID parameter, such as fetching the user data
    });}
  onEditSubmit(){
    this.http.putUser(this.user!).subscribe((data:any)=>{
      console.log(data);
      window.location.reload();
      this.router.navigate(['/']);
    })
  }
}
