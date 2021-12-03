import { SigninComponent } from './userAuthentification/signin/signin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoriesComponent } from './favories/favories.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { FilmsComponent } from './films/films.component';
import { SignupComponent } from './userAuthentification/signup/signup.component';
import { CommonModule } from '@angular/common';

const routes : Routes = [
  {path: '', component: FilmsComponent },
  {path : 'films', component:FilmsComponent},
  {path : 'DetailFilm/:id', component:FilmDetailComponent},
  {path : 'favouris', component:FavoriesComponent},
  {path: 'signup', component: SignupComponent },
  {path: 'signin', component: SigninComponent },
  { path: '**', redirectTo:"not-found" },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
