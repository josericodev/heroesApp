import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
    selector: 'heroes-hero-card',
    templateUrl: './cardHero.component.html',
    styleUrl: './cardHero.component.scss',
})
export class CardHeroComponent implements OnInit {

  @Input()
  public hero!: Hero;

  ngOnInit():void {
    if(!this.hero) throw Error('Hero property is required');
  }
}
