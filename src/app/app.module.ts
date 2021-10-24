
import { NgModule } from "@angular/core";

import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { A11yModule } from "@angular/cdk/a11y";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SharedModule } from './shared.module';

import { DataService } from '@services/data/data.service';
import { DataInterceptor } from "@services/data/data.interceptor";
import { LoginService } from '@services/login/login.service';
import { LoginSession } from "./services/login/login.session";

import { AppComponent } from "./app.component";
import { InvalidComponent } from "./invalid/invalid.component";
import { LocalStorageService } from "@services/local-storage/local-storage.service";


@NgModule({
	imports: [
		RouterModule,
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		HttpClientModule,
		A11yModule,
		SharedModule,

	],
	declarations: [
		AppComponent,
		InvalidComponent
	],
	providers: [
		LoginSession,
		LoginService,
		DataService,
		LocalStorageService,
		{ provide: HTTP_INTERCEPTORS, useClass: DataInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
