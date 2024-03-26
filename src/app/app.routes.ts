import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { MovieService } from '@shared/services';

export const routes: Routes = [
  {
    path: 'movies/:movieId',
    loadComponent: () => import('./features/movie-detail/movie-detail.component')
  },
  {
    path: 'movies',
    loadComponent: () => import('./features/movie-list/movie-list.component'),
    resolve: {
      movies: () => inject(MovieService).getMovies()
    }
  },
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  }
];
