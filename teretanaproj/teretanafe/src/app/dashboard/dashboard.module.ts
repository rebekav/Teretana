import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    DashboardRoutingModule,
    FormsModule,
  ],
})
export class DashboardModule {}
