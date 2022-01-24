import { NgModule } from "@angular/core";

import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { StepsModule } from 'primeng/steps';
import { MenuModule } from 'primeng/menu';
import { CaptchaModule } from 'primeng/captcha';
import { CarouselModule } from 'primeng/carousel';
import { ChartModule } from 'primeng/chart';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
    imports: [
        CardModule,
        CheckboxModule,
        ButtonModule,
        InputTextModule,
        MessagesModule,
        MessageModule,
        TableModule,
        DialogModule,
        SidebarModule,
        DropdownModule,
        MenuModule,
        StepsModule,
        CaptchaModule,
        ChartModule,
        CarouselModule,
        TooltipModule
    ],
    exports: [
        CardModule,
        CheckboxModule,
        ButtonModule,
        InputTextModule,
        MessagesModule,
        MessageModule,
        TableModule,
        DialogModule,
        SidebarModule,
        DropdownModule,
        MenuModule,
        StepsModule,
        CaptchaModule,
        ChartModule,
        CarouselModule,
        TooltipModule
    ]
})
export class PrimeModule { };