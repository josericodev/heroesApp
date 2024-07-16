import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../interfaces/hero.interface';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { environments } from '../../../environments/environments.prod';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) {}

  public getHeroes():Observable<Hero[]> {
      return this.http.get<Hero[]>(this.baseUrl + '/heroes');
  }

  public getHero(id: string):Observable<Hero | undefined> {
    return this.http.get<Hero | undefined>(`${this.baseUrl}/heroes/${id}`).pipe(
      catchError(error => of(undefined))
    );
  }

  getSuggestions( query: string ): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes?q=${ query }&_limit=6`);
  }

  addHero(hero:Hero): Observable<Hero> {
    hero.id = uuidv4();
    console.log("Hero service ", hero)
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero)
  }

  updateHero(hero:Hero): Observable<Hero> {
    if(!hero.id) throw Error('Hero is required');

    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero)
  }

  delteHeroById(id:string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/heroes/${id}`).pipe(
      catchError(err => of(false)),
      switchMap(resp => {
        return of(!!resp )
      })
    )
  }

}
