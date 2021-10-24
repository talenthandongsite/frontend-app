import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { REGISTER_ROUTE_TYPE } from '@app/enums';

import { CompleteComponent } from './complete/complete.component';
import { FailedComponent } from "./failed/failed.component";
import { FormComponent } from "./form/form.component";
import { RegisterComponent } from './register.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{ path: REGISTER_ROUTE_TYPE.COMPLETE, component: CompleteComponent },
			{ path: REGISTER_ROUTE_TYPE.FAILED, component: FailedComponent },
            { path: REGISTER_ROUTE_TYPE.ROOT, component: RegisterComponent, children: [
				{ path: REGISTER_ROUTE_TYPE.FORM, component: FormComponent }
			]},
        ])
	],
	exports: [RouterModule]
})
export class RegisterRoutingModule { }
