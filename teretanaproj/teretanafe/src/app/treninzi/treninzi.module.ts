import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreninziRoutingModule } from './treninzi-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';
import { IstorijaTreningaComponent } from './components/istorija-treninga/istorija-treninga.component';
import { DodajTreningComponent } from './components/dodaj-trening/dodaj-trening.component';

@NgModule({
  declarations: [IstorijaTreningaComponent, DodajTreningComponent],
  imports: [
    CommonModule,
    TreninziRoutingModule,
    AngularMaterialModule,
    FormsModule,
  ],
})
export class TreninziModule {}
