import { Component, Input } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormatBudgetPipe, FormatDurationPipe } from '@shared/pipes';
import { Router, RouterModule } from '@angular/router';
import { FilterMovieListComponent } from '../filter-movie-list/filter-movie-list.component';
import { Movie } from '@shared/models';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [NgIf, NgFor, FormatBudgetPipe, FormatDurationPipe, RouterModule, FilterMovieListComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export default class MovieListComponent {
  @Input() movies: Movie[] = [];
  filteredMovies!: Movie[];

  constructor(private router: Router) {}

  viewDetails(movieId: string): void {
    this.router.navigate(['/movies', movieId]);
  }

  getFilteredMovies(filteredMovies: Movie[]): void {
    this.filteredMovies = filteredMovies;
  }
}
