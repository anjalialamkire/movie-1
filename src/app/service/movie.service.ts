import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Imovie } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

   
  BASE_URL :string = environment.BASE_URL

  MOVIE_URL : string = `${this.BASE_URL}/movie.json`
  

  private  NewMovieSub$ : Subject<Imovie> = new Subject<Imovie>()
  private removeMovieSub$ : Subject<string> = new Subject<string>()
  private editMovieSub$ : Subject<Imovie> = new Subject<Imovie>()
  private updateMovieSub$ :  Subject<Imovie> = new Subject<Imovie>()

   NewMoviesObs$ : Observable<Imovie> = this.NewMovieSub$.asObservable()
   removeMovieObs$ : Observable<string> = this.removeMovieSub$.asObservable()
   editMovieObs$ : Observable<Imovie> = this.editMovieSub$.asObservable()
   updateMovieObse$ : Observable<Imovie> = this.updateMovieSub$.asObservable()
  constructor(
     private _http : HttpClient
  ) { }

  
    setupdateMovie(movie :Imovie){
    this.updateMovieSub$.next(movie)
  }

  setEditMovie(movie:Imovie){
    this.editMovieSub$.next(movie)
  }

  setremoveMovie(id:string){
    this.removeMovieSub$.next(id)
  }

  setNewMovie(movie :Imovie){
    this.NewMovieSub$.next(movie)
  }

    fetchmovie(){
    return this._http.get<any>(this.MOVIE_URL)
            .pipe(
              map(obj =>{
                let movieArr : Array<Imovie>=[]
                for (const key in obj) {
                movieArr.unshift({...obj[key],id:key})
                }
                return movieArr
              })
            )
  }
    

    createMovie (movieObj : Imovie){
    return this._http.post<any>(this.MOVIE_URL,movieObj)
   }

   updateMovie(updateObj:Imovie){
         let UPDATE_URL :string = `${this.BASE_URL}/movie/${updateObj.id}.json`
         return this._http.patch(UPDATE_URL,updateObj)
   }

    removeMovie(id :string){
      let REMOVE_URL : string =`${this.BASE_URL}/movie/${id}.json`

      return this._http.delete(REMOVE_URL)
    }

   


}
