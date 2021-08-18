import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  movies: Movie[] = []
  moviesSlideShow: Movie[] = []

  treshold: number = 1200
  @HostListener('window: scroll', ['$event'])
  onScroll(){
    const posi = (document.documentElement.scrollTop || document.body.scrollTop) + this.treshold
    const maxScroll = ( document.documentElement.scrollHeight || document.body.scrollHeight)
    
    if( posi > maxScroll){
      if(this._peliService.cargando){
        return
      }
      console.log({posi,maxScroll})
      this._peliService.getPeliculas().subscribe( movies => {
        // console.log(movies)
        this.movies.push(...movies)
        // console.log(this.movies)
      } )
    }
    
  }

  constructor(private _peliService: PeliculasService){
    this._peliService.getPeliculas().subscribe( movies => {
      // console.log(movies)
      this.movies = movies
      this.moviesSlideShow = movies
      // console.log(this.movies)
    } )
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
    this._peliService.resetPage()
  }

}
