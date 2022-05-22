import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesListComponent } from './components/companies-list/companies-list.component';

const routes: Routes = [
  {path:'company-list', component:CompaniesListComponent},
  {path:'/',redirectTo: 'company-list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
