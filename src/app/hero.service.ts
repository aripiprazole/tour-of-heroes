import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

import { Hero } from './hero';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  public constructor(
    private readonly http: HttpClient,
    private readonly messageService: MessageService
  ) {}

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public getHeroes(): Observable<Hero[]> {
    return this.http
      .get<Hero[]>('api/heroes')
      .pipe(tap(() => this.log('fetched heroes')))
      .pipe(catchError(this.handleError<Hero[]>('getHeroes', [])));
  }

  public getHero(id: number): Observable<Hero> {
    return this.http
      .get<Hero>('api/heroes/' + id)
      .pipe(tap(() => this.log(`getHero id=${id}`)))
      .pipe(catchError(this.handleError<Hero>(`getHero id=${id}`)));
  }

  public updateHero(hero: Hero): Observable<any> {
    return this.http
      .put('api/heroes/', hero, this.httpOptions)
      .pipe(tap(() => this.log(`updated hero id=${hero.id}`)))
      .pipe(catchError(this.handleError<any>('updateHero')));
  }

  public addHero(hero: Hero): Observable<Hero> {
    return this.http
      .post<Hero>('api/heroes', hero, this.httpOptions)
      .pipe(tap((newHero) => this.log(`added hero w/ id=${newHero.id}`)))
      .pipe(catchError(this.handleError<any>('updateHero')));
  }

  public deleteHero(id: number): Observable<any> {
    return this.http
      .delete<Hero>('api/heroes/' + id, this.httpOptions)
      .pipe(tap(() => this.log(`deleted hero id=${id}`)))
      .pipe(catchError(this.handleError<Hero>(`deleteHero id=${id}`)));
  }

  public searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http
      .get<Hero[]>(`api/heroes/?name=${term}`)
      .pipe(
        tap((x) =>
          x.length
            ? this.log(`found heroes matching "${term}"`)
            : this.log(`no heroes matching "${term}"`)
        )
      )
      .pipe(catchError(this.handleError<Hero[]>('searchHeroes', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result!);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
