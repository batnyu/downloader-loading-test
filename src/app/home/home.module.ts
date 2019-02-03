import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { MaterialModule } from "../material/material.module";
import { HomeComponent } from "./components/home/home.component";
import { HomePageComponent } from "./containers/home-page/home-page.component";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import * as fromHome from "./reducers/home.reducer";
import { HomeEffects } from "./effects/home.effects";

@NgModule({
  declarations: [HomeComponent, HomePageComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    StoreModule.forFeature("home", fromHome.reducer),
    EffectsModule.forFeature([HomeEffects])
  ]
})
export class HomeModule {}
