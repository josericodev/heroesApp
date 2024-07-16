import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
    selector: 'app-list-page',
    templateUrl: './listPage.component.html',
    styleUrl: './listPage.component.css',
})
export class ListPageComponent implements OnInit {

  public heroes: Hero[] = [];

  constructor(public HeroesS: HeroesService) {}

  ngOnInit(): void {
    this.HeroesS.getHeroes().subscribe(heroes => this.heroes = heroes)
  }
}
