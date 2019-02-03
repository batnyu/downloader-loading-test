import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import * as fromLoading from "./reducers/loading.reducer";
import { LoadingComponent } from "./components/loading/loading.component";
import { LoadingPageComponent } from "./containers/loading-page/loading-page.component";
import { MaterialModule } from "../material/material.module";

@NgModule({
  declarations: [LoadingComponent, LoadingPageComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature("loading", fromLoading.reducer),
    MaterialModule
  ],
  exports: [LoadingPageComponent]
})
export class LoadingModule {}
