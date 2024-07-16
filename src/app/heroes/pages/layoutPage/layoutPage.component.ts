import { Component } from '@angular/core';

@Component({
    selector: 'app-layout-page',
    templateUrl: './layoutPage.component.html',
    styleUrl: './layoutPage.component.scss',
})
export class LayoutPageComponent {

  public sidebarItems = [
    {label: 'Listado', icon: 'list', path: './list'},
    {label: 'Añadir', icon: 'add', path: './new-hero'},
    {label: 'Buscar', icon: 'search', path: './search'},
  ]

}
