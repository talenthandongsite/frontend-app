import { NgModule } from "@angular/core";
import { PrimeModule } from '@app/prime.module';
import { SharedModule } from '@app/shared.module';
import { RegisterRoutingModule } from './register-routing.module';

import { RegisterComponent } from './register.component';
import { FormComponent } from './form/form.component';
import { CompleteComponent } from './complete/complete.component';
import { FailedComponent } from "./failed/failed.component";
import { FormInterviewComponent } from "./form/form-interview/form-interview.component";
import { FormRegisterComponent } from "./form/form-register/form-register.component";
import { FormScrapComponent } from "./form/form-scrap/form-scrap.component";
import { TermGeneralComponent } from "./form/term-general/term-general.component";
import { TermPrivateComponent } from "./form/term-private/term-private.component";
import { TermRiskComponent } from "./form/term-risk/term-risk.component";
import { TermScrapComponent } from "./form/term-scrap/term-scrap.component";
import { TermRegisterComponent } from './form/term-register/term-register.component';

@NgModule({
    declarations: [
        RegisterComponent,
        FormComponent,
        CompleteComponent,
        FailedComponent,
        FormInterviewComponent,
        FormRegisterComponent,
        FormScrapComponent,
        TermRegisterComponent,
        TermGeneralComponent,
        TermPrivateComponent,
        TermRiskComponent,
        TermScrapComponent,
        TermRegisterComponent
    ],
    imports: [
        RegisterRoutingModule,
        SharedModule,
        PrimeModule
    ]
})
export class RegisterModule {};