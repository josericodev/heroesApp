import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { AddPageComponent } from './pages/addPage/addPage.component';
import { ListPageComponent } from './pages/listPage/listPage.component';
import { SearchPageComponent } from './pages/searchPage/searchPage.component';
import { LayoutPageComponent } from './pages/layoutPage/layoutPage.component';
import { MaterialModule } from '../material/material.module';
import { CardHeroComponent } from './components/cardHero/cardHero.component';
import { HeroImagePipe } from './pipes/heroImage.pipe';
import { HeroesPageComponent } from './pages/heroesPage/heroesPage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/cardHero/confirmDialog/confirmDialog.component';


@NgModule({
  declarations: [
    AddPageComponent,
    ListPageComponent,
    SearchPageComponent,
    LayoutPageComponent,
    CardHeroComponent,
    HeroesPageComponent,
    HeroImagePipe,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HeroesRoutingModule,
    ReactiveFormsModule
  ]
})
export class HeroesModule { }
