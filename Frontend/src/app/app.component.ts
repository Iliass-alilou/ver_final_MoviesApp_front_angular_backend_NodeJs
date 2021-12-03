import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Film } from './Models/film';
import { FilmService } from './services/film.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MoviesApp';
 
}
