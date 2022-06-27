import { Component, OnInit } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
} from 'rxjs';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss'],
})
export class HeroSearchComponent implements OnInit {
  public heroes$!: Observable<Hero[]>;
  private searchTerms: Subject<string> = new Subject();

  public constructor(private readonly heroService: HeroService) {}

  public search(term: string): void {
    this.searchTerms.next(term);
  }

  public ngOnInit(): void {
    this.heroes$ = this.searchTerms
      .pipe(debounceTime(300))
      .pipe(distinctUntilChanged())
      .pipe(switchMap((term: string) => this.heroService.searchHeroes(term)));
  }
}
