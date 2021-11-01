import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { LoginPageComponent } from "./login-page/login-page.component";
import { JoinPageComponent } from "./join-page/join-page.component";
import { AllowPageComponent } from "./allow-page/allow-page.component";
import { UsersComponent } from './users/users.component';
import { ApplicationComponent } from './application.component';
import { MainComponent } from './main/main.component';

import { ADMIN_ROUTE_TYPE } from '@app/enums';
import { AdminGuard } from "./access-level/admin.guard";
import { InvitationComponent } from "./invitation/invitation.component";
import { NdxBookComponent } from "./ndx-book/ndx-book.component";
import { MemberGuard } from "./access-level/member.guard";
import { MemberComponent } from "./member/member.component";
import { TicketComponent } from "./ticket/ticket.component";

@NgModule({
	imports: [
		RouterModule.forChild([
            // { path: ADMIN_ROUTE_TYPE.JOIN_PAGE, component: JoinPageComponent },
            // { path: ADMIN_ROUTE_TYPE.LOGIN, component: LoginPageComponent },
            { path: ADMIN_ROUTE_TYPE.ROOT, component: ApplicationComponent, children: [
                // { path: ADMIN_ROUTE_TYPE.MAIN, component: MainComponent, canActivate: [ MemberGuard ] },
                { path: ADMIN_ROUTE_TYPE.NASDAQ_BOOK, component: NdxBookComponent },
                // { path: ADMIN_ROUTE_TYPE.MEMBER, component: MemberComponent, canActivate: [ AdminGuard ] },
                // { path: ADMIN_ROUTE_TYPE.TICKET, component: TicketComponent, canActivate: [ AdminGuard ] },
                { path: '**', redirectTo: ADMIN_ROUTE_TYPE.NASDAQ_BOOK, pathMatch: 'full' },
            ]},
        ])
	],
	exports: [ RouterModule ]
})
export class ApplicationRoutingModule { }
