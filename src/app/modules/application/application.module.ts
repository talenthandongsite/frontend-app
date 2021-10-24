import { NgModule } from "@angular/core";
import { PrimeModule } from '@app/prime.module';
import { SharedModule } from '@app/shared.module';

import { AdminGuard } from "./access-level/admin.guard";
import { MemberGuard } from "./access-level/member.guard";

import { ApplicationRoutingModule } from './application-routing.module';

import { ApplicationComponent } from './application.component';
import { AllowPageComponent } from './allow-page/allow-page.component';
import { InvitationComponent } from "./invitation/invitation.component";
import { JoinPageComponent } from './join-page/join-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainComponent } from './main/main.component';
import { NdxBookComponent } from "./ndx-book/ndx-book.component";
import { ProductService } from "./ndx-book/productservice";
import { UsersComponent } from './users/users.component';
import { SystemAdminGuard } from "./access-level/system-admin.guard";
import { MemberComponent } from "./member/member.component";
import { TicketComponent } from "./ticket/ticket.component";

@NgModule({
    declarations: [
        ApplicationComponent,
        MainComponent,
        JoinPageComponent,
        LoginPageComponent,
        AllowPageComponent,
        UsersComponent,
        InvitationComponent,
        NdxBookComponent,
        MemberComponent,
        TicketComponent,
    ],
    imports: [
        ApplicationRoutingModule,
        PrimeModule,
        SharedModule
    ],
    providers: [
        AdminGuard,
        MemberGuard,
        SystemAdminGuard,
        ProductService
    ]
})
export class ApplicationModule {};