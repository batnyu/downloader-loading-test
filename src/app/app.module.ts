import "reflect-metadata";
import "../polyfills";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { HttpClientModule, HttpClient } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";

// NG Translate
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { AppComponent } from "./app.component";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AppConfig } from "../environments/environment";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HomeModule } from "./home/home.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { LoadingModule } from "./loading/loading.module";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LoadingModule,
    HomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    !AppConfig.production
      ? StoreDevtoolsModule.instrument({
          maxAge: 100
        })
      : []
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
