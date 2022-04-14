import { NgModule } from "@angular/core";
import { PrimeModule } from '@app/prime.module';
import { SharedModule } from '@app/shared.module';

import { AdminGuard } from "./access-level/admin.guard";
import { MemberGuard } from "./access-level/member.guard";

import { ApplicationRoutingModule } from './application-routing.module';

import { ApplicationComponent } from './application.component';
import { NdxBookComponent } from "./ndx-book/ndx-book.component";
import { ProductService } from "./ndx-book/productservice";
import { SystemAdminGuard } from "./access-level/system-admin.guard";
import { NdxBookDataPipe } from "./ndx-book/ndx-book-data.pipe";
import { DownloadComponent } from "./download/download.component";
import { FttModelComponent } from "./ftt-model/ftt-model.component";

@NgModule({
    declarations: [
        ApplicationComponent,
        NdxBookComponent,
        FttModelComponent,
        DownloadComponent,
        NdxBookDataPipe
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
        ProductService,
        NdxBookDataPipe
    ]
})
export class ApplicationModule {};