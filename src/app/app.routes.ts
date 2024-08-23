import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'Home'},
    { path: 'games/:name', component: GameDetailComponent },
];
