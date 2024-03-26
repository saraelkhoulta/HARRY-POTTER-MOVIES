import { Component, EventEmitter, Input, Output, OnInit, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, merge, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Movie } from '@shared/models';

const DEBOUNCE_TIME = 400;

@Component({
  selector: 'app-filter-movie-list',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './filter-movie-list.component.html',
  styleUrl: './filter-movie-list.component.css'
})
export class FilterMovieListComponent implements OnInit {
  @Input() movies: Movie[] = [];
  @Output() filtredMoviesEmmiter = new EventEmitter<Array<Movie>>();

  destroyRef = inject(DestroyRef);
  filteredMovies: Movie[] = [];
  searchForm: FormGroup;
  titleFilter: string | null = '';
  releaseDateFilter: string | null = '';

  titleFilterCtrl = this.fb.control('');
  releaseaDateCtrl = this.fb.control('');

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      titleSearch: this.titleFilterCtrl,
      releaseaDateSearch: this.releaseaDateCtrl
    });
  }

  ngOnInit(): void {
    const releaseDateFilter$ = this.releaseaDateCtrl.valueChanges.pipe(debounceTime(DEBOUNCE_TIME), distinctUntilChanged());
    const titleFilter$ = this.titleFilterCtrl.valueChanges.pipe(debounceTime(DEBOUNCE_TIME), distinctUntilChanged());

    merge(releaseDateFilter$, titleFilter$)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        startWith(this.movies),
        map(() =>
          this.movies.filter((movie: Movie): boolean => {
            const titleMatch = !this.titleFilterCtrl.value || movie.title.toLowerCase().includes(this.titleFilterCtrl.value.toLowerCase());
            const releaseYearMatch = !this.releaseaDateCtrl.value || movie.releaseDate.includes(this.releaseaDateCtrl.value);
            return titleMatch && releaseYearMatch;
          })
        )
      )
      .subscribe(filteredMovies => {
        this.filteredMovies = filteredMovies;
        this.filtredMoviesEmmiter.emit(filteredMovies);
      });
  }
}
