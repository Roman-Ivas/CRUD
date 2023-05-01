import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { PutComponent } from './put/put.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {path:"",component:ListComponent},
  {path:"put",component:PutComponent},
  {path:"create",component:CreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
