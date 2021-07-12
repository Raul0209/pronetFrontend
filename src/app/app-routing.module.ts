import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeRateComponent } from './components/exchange-rate/exchange-rate.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [

  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },

  {
    path: "home",
    component: MainComponent
  },
  {
    path: "exchange-rate",
    component: ExchangeRateComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
