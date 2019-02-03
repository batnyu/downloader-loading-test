import { NgModule } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatButtonModule } from "@angular/material/button";

const COMPONENTS = [MatProgressBarModule, MatButtonModule];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS
})
export class MaterialModule {}
