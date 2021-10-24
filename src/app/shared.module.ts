import { NgModule } from "@angular/core";

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VideoEmbedPipe } from "@services/pipe/video-embed.pipe";

@NgModule({
    declarations: [
        VideoEmbedPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        VideoEmbedPipe
    ]
})
export class SharedModule { };
