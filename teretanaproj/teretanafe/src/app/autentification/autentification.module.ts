import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutentificationRoutingModule } from './autentification-routing.module';
import { LoginComponent } from './components/login/login.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { RegisterComponent } from './components/register/register.component';
@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AutentificationRoutingModule,
    FormsModule,
    AngularMaterialModule,
  ],
})
export class AutentificationModule {}
