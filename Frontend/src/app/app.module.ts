import { Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmsComponent } from './films/films.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { FilmComponent } from './film/film.component';
import { HttpClientModule } from '@angular/common/http';
import { FilmService } from './services/film.service';
import { PaginationComponent } from './pagination/pagination.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { FavoriesComponent } from './favories/favories.component';
import { SignupComponent } from './userAuthentification/signup/signup.component';
import { SigninComponent } from './userAuthentification/signin/signin.component';



@NgModule({
  declarations: [
    AppComponent,
    FilmsComponent,
    NavBarComponent,
    FooterComponent,
    FilmComponent,
    PaginationComponent,
    FilmDetailComponent,
    FavoriesComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [HttpClientModule,FilmService],
  bootstrap: [AppComponent]
})
export class AppModule { }
