import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
    selector: 'app-search-page',
    templateUrl: './searchPage.component.html',
    styleUrl: './searchPage.component.css',
})
export class SearchPageComponent {
  public searchInput = new FormControl('');
  public heroes: Hero[] = [];

  constructor(private HeroesService: HeroesService){}

  searchHero() {
    const value: string = this.searchInput.value || '';

    this.HeroesService.getSuggestions(value)
      .subscribe(heroes => this.heroes = heroes);
  }

  onSelectedOption( event: MatAutocompleteSelectedEvent): void {
    if(!event.option.value) {
      return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);
  }

}
