import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { HomeModule } from "../home/home.module";



@NgModule({
    declarations: [
        NotFoundComponent
    ],
    imports: [
        CommonModule,
        HomeModule
    ]
})
export class NotFoundModule { }
