import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { ApplicationComponent } from './application.component';

import { APP_ROUTE_TYPE } from '@app/enums';
import { NdxBookComponent } from "./ndx-book/ndx-book.component";
import { DownloadComponent } from "./download/download.component";
import { FttModelComponent } from "./ftt-model/ftt-model.component";

@NgModule({
	imports: [
		RouterModule.forChild([
            // { path: APP_ROUTE_TYPE.JOIN_PAGE, component: JoinPageComponent },
            // { path: APP_ROUTE_TYPE.LOGIN, component: LoginPageComponent },
            { path: APP_ROUTE_TYPE.ROOT, component: ApplicationComponent, children: [
                // { path: APP_ROUTE_TYPE.MAIN, component: MainComponent, canActivate: [ MemberGuard ] },
                // { path: APP_ROUTE_TYPE.MEMBER, component: MemberComponent, canActivate: [ AdminGuard ] },
                // { path: APP_ROUTE_TYPE.TICKET, component: TicketComponent, canActivate: [ AdminGuard ] },
                { path: APP_ROUTE_TYPE.NASDAQ_BOOK, component: NdxBookComponent },
                { path: APP_ROUTE_TYPE.FTT_MODEL, component: FttModelComponent }, 
                { path: APP_ROUTE_TYPE.DOWNLOAD, component: DownloadComponent },
                { path: '**', redirectTo: APP_ROUTE_TYPE.NASDAQ_BOOK, pathMatch: 'full' },
            ]},
        ])
	],
	exports: [ RouterModule ]
})
export class ApplicationRoutingModule { }
