import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { filter, switchMap } from 'rxjs';
import { Imovie } from 'src/app/model/model';
import { MovieService } from 'src/app/service/movie.service';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
@Input() movieObj !: Imovie
  constructor(
    private _MatDialog :MatDialog,
    private _MovieService : MovieService

  ) { }

  ngOnInit(): void {
  }
 
    onRemove(){
    let matConfig = new MatDialogConfig
    matConfig.width = '400px'

    matConfig.data = `Are You Sure, you want to Remove The Course with id ${this.movieObj.id}`

    let matDialogRef = this._MatDialog.open(GetConfirmComponent,matConfig)
    matDialogRef.afterClosed()
        .pipe(
          filter(res => res === true),
          switchMap(() =>{
            return this._MovieService.removeMovie(this.movieObj.id)
          }) 
        )

        .subscribe({
          next : data =>{
           console.log(data); 
           this._MovieService.setremoveMovie(this.movieObj.id)
          },
          error : err =>{
            console.log(err);
            
          }
        })
  }

   onEdit(){
  this._MovieService.setEditMovie(this.movieObj)
 }
   
  
}
