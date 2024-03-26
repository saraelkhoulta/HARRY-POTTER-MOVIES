import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '@shared/services';
import { AsyncPipe, NgIf } from '@angular/common';
import { FormatBudgetPipe, FormatDurationPipe } from '@shared/pipes';
import { Movie } from '@shared/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [NgIf, AsyncPipe, FormatBudgetPipe, FormatDurationPipe],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export default class MovieDetailComponent implements OnInit {
  movieDetails$: Observable<Movie> | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('movieId') || '';

    this.movieDetails$ = this.movieService.getMovieDetails(movieId);
  }

  back() {
    this.router.navigate(['/movies']);
  }
}
