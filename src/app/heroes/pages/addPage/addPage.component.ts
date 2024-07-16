import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Publisher, Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/cardHero/confirmDialog/confirmDialog.component';


@Component({
    selector: 'app-add-page',
    templateUrl: './addPage.component.html',
    styleUrl: './addPage.component.css',
})
export class AddPageComponent implements OnInit {

  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ]

  public title: string = "";

  constructor (
    private HeroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ){
  }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params.pipe(
      tap(({id}) => {
        if (id === "") this.router.navigateByUrl('/');
      }),
      switchMap( ({ id }) =>  this.HeroesService.getHero(id))
    ).subscribe( hero => {
      if (!hero) return this.router.navigateByUrl('/');

      this.heroForm.reset(hero);
      return;
    })
  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onSubmit():void {
    if (this.heroForm.invalid) return;
    if (this.currentHero.id) {
      this.HeroesService.updateHero(this.currentHero)
      .subscribe(hero => {
        this.showSnackbar(`${hero.superhero} updated!`)
      })

      return;
    }

    this.HeroesService.addHero( this.currentHero )
    .subscribe(hero => {
      this.router.navigate(['/heroes/edit', hero.id]);
      this.showSnackbar(`${hero.superhero} created!`)
    })
    // this.HeroesService.updateHero( this.heroForm.value );
  }

  onDeleteHero () {
    if (!this.currentHero.id) throw Error('Hero id is required');
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      data: this.heroForm.value
    })

    dialogRef.afterClosed().subscribe(result => {
      if (!result)  return
      this.HeroesService.delteHeroById(this.currentHero.id).subscribe(
        (valor) => valor ? this.router.navigateByUrl('/') : this.showSnackbar(`An error ocurred to eliminated the heroe.`)
      )
    })
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'done', {
      duration: 2500
    })
  }
}
