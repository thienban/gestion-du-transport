import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { DisconnectComponent } from "./shared/button/disconnect/disconnect.component";

/*const appRoutes: Routes = [
  { path: "login", component: LoginPageComponent } // /page1 affiche le composant A
];*/

@NgModule({
  declarations: [AppComponent, DisconnectComponent],
  imports: [BrowserModule /*RouterModule.forRoot(appRoutes)*/],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
