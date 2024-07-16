import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layoutPage/layoutPage.component';
import { AddPageComponent } from './pages/addPage/addPage.component';
import { SearchPageComponent } from './pages/searchPage/searchPage.component';
import { ListPageComponent } from './pages/listPage/listPage.component';
import { HeroesPageComponent } from './pages/heroesPage/heroesPage.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'new-hero',
        component: AddPageComponent,
      },
      {
        path: 'search',
        component: SearchPageComponent,
      },
      {
        path: 'edit/:id',
        component: AddPageComponent,
      },
      {
        path: 'list',
        component: ListPageComponent,
      },
      {
        path: ':id',
        component: HeroesPageComponent,
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
