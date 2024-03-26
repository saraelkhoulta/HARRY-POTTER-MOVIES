import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '@shared/models';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    const apiUrl = '/movies';
    return this.http.get<Movie[]>(apiUrl);
  }

  getMovieDetails(movieId: string): Observable<Movie> {
    const apiUrl = '/movies';
    return this.http.get<Movie>(`${apiUrl}/${movieId}`);
  }
}
