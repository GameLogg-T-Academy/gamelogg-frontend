import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../model/game.model';
import { User } from '../model/user.model';
import { Page } from '../model/page.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GameloggService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { 
  }

  getAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/games`);
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`);
  }

  getGameByName(name: string): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/games?name=${name}`);
  }

  getGameByPage(page: number, size: number): Observable<Page<Game>> {
    return this.http.get<Page<Game>>(`${this.apiUrl}/games?pageNumber=${page}&pageSize=${size}`);
  }

  getFavoriteGames(): Observable<Page<Game>> {
    return this.http.get<Page<Game>>(`${this.apiUrl}/games?favorite=true`);
  }

  getByStatus(status:String): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/games?status=${status}`);
  }

  createGame(game: Game) {
    return this.http.post<Game>(`${this.apiUrl}/games`, game);
  }
}
