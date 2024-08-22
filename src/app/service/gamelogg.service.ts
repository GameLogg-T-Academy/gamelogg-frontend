import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../model/game.model';
import { User } from '../model/user.model';


@Injectable({
  providedIn: 'root'
})
export class GameloggService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { 
  }

  getAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/games`);
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`);
  }
}
