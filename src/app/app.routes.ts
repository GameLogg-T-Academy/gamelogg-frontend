import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchPageComponent } from './components/search-page/search-page.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'Home'},
    { path: 'games/:name', component: GameDetailComponent },
    { path: 'profile', component: ProfileComponent, title: 'Profile' },
    { path: 'search/genre/:genre', component: SearchPageComponent, title: "Search"},
    { path: 'search/title/:title', component: SearchPageComponent, title: "Search"}
];
