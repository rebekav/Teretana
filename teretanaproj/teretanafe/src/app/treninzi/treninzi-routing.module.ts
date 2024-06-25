import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KorisnikGuard } from '../core/guards/korisnik.guard';
import { DodajTreningComponent } from './components/dodaj-trening/dodaj-trening.component';
import { IstorijaTreningaComponent } from './components/istorija-treninga/istorija-treninga.component';

const routes: Routes = [
  {
    path: '',
    component: IstorijaTreningaComponent,
    canActivate: [KorisnikGuard],
  },

  {
    path: 'dodaj-trening',
    component: DodajTreningComponent,
    canActivate: [KorisnikGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TreninziRoutingModule {}
