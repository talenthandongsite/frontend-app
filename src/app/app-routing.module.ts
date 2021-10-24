import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InvalidComponent } from "./invalid/invalid.component";

const routes: Routes = [
	{ path: '', redirectTo: 'app', pathMatch: 'full' },
	{ path: 'app', loadChildren: () => import(`./modules/application/application.module`).then(module => module.ApplicationModule) },
	{ path: 'register', loadChildren: () => import(`./modules/register/register.module`).then(module => module.RegisterModule) },
	{ path: 'invalid', component: InvalidComponent },
	{ path: '**', redirectTo: 'app', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
