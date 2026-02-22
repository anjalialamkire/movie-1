import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Imovie } from 'src/app/model/model';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {
MovieForm !:FormGroup
  userIdArr : Array<number> =[1,2,3,4,5,6,7,8,9,10]
  isinEditMode : boolean = false
  editId !: string

  constructor(private _movieService : MovieService) { }

  ngOnInit(): void {
    this.crateMovieForm()
    this.patchData()
    
    
  }
  
   
 patchData(){
  this._movieService.editMovieObs$
  .subscribe(data =>{
    this.isinEditMode= true
    this.editId = data.id
    this.MovieForm.patchValue(data)
  })
 }
  crateMovieForm(){
    this.MovieForm = new FormGroup({
     poster: new FormControl(null, Validators.required),
     title : new FormControl (null,[Validators.required]),
     year: new FormControl(null,[Validators.required]),
     genre : new FormControl(null,[Validators.required]),
     description:new FormControl(null,[Validators.required]),
     userId :new FormControl(null)
    })
  }

  OnAddMovie(){
     if(this.MovieForm.valid){
      let create = this.MovieForm.value
      this._movieService.createMovie(create)
      .subscribe({
        next : res =>{
          this.MovieForm.reset()
          this._movieService.setNewMovie({...create,id: res.name})
        }
      })
    }
  }
 
  onUpdate(){
      if(this.MovieForm.valid){
      let UPDATED_Movie :Imovie ={...this.MovieForm.value,id : this.editId}
      this._movieService.updateMovie(UPDATED_Movie)
      .subscribe({
        next : data =>{
          this.MovieForm.reset()
          this._movieService.setupdateMovie(UPDATED_Movie)
          this.isinEditMode=false
        }
      })
    }
  }

}
