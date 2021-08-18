import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";
import { Cartelera, Movie } from '../interfaces/cartelera-response';
import { SearchCartelera, SearchMovie } from '../interfaces/busqueda-response';
import { Cast, Credits } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  pageActual = 1
  url: string = 'https://api.themoviedb.org/3'
  cargando: boolean = false

  constructor(private _http: HttpClient) { }

  get params() {
    return {
      api_key: '3cf48da1287f27e49bb1eb02ad60b979',
      language: 'es-ES',
      page: this.pageActual.toString()
    }
  }

  // get paramsSearch( texto: string ){
  //   return {
  //     api_key: '3cf48da1287f27e49bb1eb02ad60b979',
  //     language: 'es-ES',
  //     page: this.pageActual.toString(),
  //     include_adult: 'false',
  //     query: texto.toString()
  //   }
  // }

  getPeliculas(): Observable<Movie[]> {

    if (this.cargando) {
      return of([])
    }

    console.log('Consumiendo API')
    this.cargando = true
    return this._http.get<Cartelera>(`${this.url}/movie/now_playing`, {
      params: this.params
    })
      .pipe(
        map((resp: Cartelera) => {
          return resp.results
        }),
        tap(() => {
          this.pageActual += 1
          this.cargando = false
        })
      )
  }

  buscarPelis( texto: string): Observable<SearchMovie[]>{
    //se desestructura el get de params y se modifica y añaden los campos necesarios
    const params = { ...this.params, page: '1', query: texto.toString()}
    return this._http.get<SearchCartelera>(`${this.url}/search/movie`,{
      params: params
    })
    .pipe(
      map((resp: SearchCartelera):SearchMovie[] => {
        return resp.results
      })
    )
  }

  resetPage(){
    this.pageActual = 1
  }

  getPeliInfo( id_peli: number ): Observable<Movie>{
    return this._http.get<Movie>(`${this.url}/movie/${id_peli}`,{
      params: this.params
    })
    .pipe(
      map( peli => peli),
      catchError( err => of(null))
    )
  }

  getCast(id_peli: number):Observable<Cast[]>{
    return this._http.get<Credits>(`${this.url}/movie/${id_peli}/credits`,{
      params: this.params
    })
    .pipe(
      map(
        credits => credits.cast
      ),
      catchError( err => of([]))
      
    )
  }
}
