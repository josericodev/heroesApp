import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../../interfaces/hero.interface';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-heroes-page',
    templateUrl: './heroesPage.component.html',
    styleUrl: './heroesPage.component.css',
})
export class HeroesPageComponent implements OnInit {

  public hero?
  : Hero;

  constructor(
    private HeroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}


  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(({id}) => this.HeroesService.getHero(id))
    ).subscribe(hero => {
      if(!hero) return this.router.navigate(['/heroes.list']);
      this.hero = hero;
      return;
    })
  }

  goBack():void {
    this.router.navigateByUrl('heroes/list');
  }
}
