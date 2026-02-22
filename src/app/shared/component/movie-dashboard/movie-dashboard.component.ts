import { Component, OnInit } from '@angular/core';
import { Imovie } from 'src/app/model/model';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-movie-dashboard',
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.scss']
})
export class MovieDashboardComponent implements OnInit {

  movieArr : Array<Imovie> =[]

  constructor(
    private _MovieService : MovieService
  ) { }

  ngOnInit(): void {
     this.getMovie()
      this.getAddCourse()
    this.getRemoveMovies()
    this.getUpdateMovie()
   
  
  }
   
getUpdateMovie(){
  this._MovieService.updateMovieObse$
  .subscribe(movie =>{
    let getIndex = this.movieArr.findIndex(p => p.id === movie.id)
    this.movieArr[getIndex]= movie
  })
}


getRemoveMovies(){
  this._MovieService.removeMovieObs$
  .subscribe(id =>{
    let getIndex = this.movieArr.findIndex(p => p.id === id)
    this.movieArr.splice(getIndex,1)
  })
}


  getAddCourse(){
 this._MovieService.NewMoviesObs$
    .subscribe({
      next :(newmovie) =>{
        this.movieArr.unshift(newmovie)
      }
    })

  }



  getMovie(){
    this._MovieService.fetchmovie()
    .subscribe({
      next :data =>{
        this.movieArr= data
      },
      error : err =>{
        console.log(err);
        
      }
    })
  }
}

