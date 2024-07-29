import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { provideHttpClient } from "@angular/common/http";


@NgModule({
    declarations: [AppComponent, HeaderComponent],
    imports: [BrowserModule, AppRoutingModule],
    providers: [provideHttpClient()],
    bootstrap: [AppComponent]
})
export class AppModule { }