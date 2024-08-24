import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'Home'},
    { path: 'games', component: HomeComponent },
    { path: 'games/:name', component: GameDetailComponent },
    { path: 'profile', component: ProfileComponent, title: 'Profile' },
];
