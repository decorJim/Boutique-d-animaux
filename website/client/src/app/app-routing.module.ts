import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { AnimalComponent } from "./animal/animal.component";
import { ProprietaireComponent } from "./propietaire/proprietaire.component";
import { FactureComponent } from "./facture/facture.component";
import { TraitementComponent } from "./traitement/traitement.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "animals", component: AnimalComponent },
  { path: "proprietaires", component: ProprietaireComponent },
  { path: "factures", component:FactureComponent },
  { path: "traitements", component:TraitementComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }