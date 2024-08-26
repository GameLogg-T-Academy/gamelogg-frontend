import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../model/game.model';
import { User } from '../model/user.model';
import { Page } from '../model/page.model';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GameloggService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { 
  }

  getAllGames(pageNumber: number = 0, pageSize: number = 10): Observable<any> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(`${this.apiUrl}/games`, { params });
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`);
  }

  getGameByName(title: string, page: number = 0, size: number = 10): Observable<Page<Game>> {
    return this.http.get<Page<Game>>(`${this.apiUrl}/games?title=${title}&pageNumber=${page}&pageSize=${size}`);
  }

  getGameByPage(page: number, size: number): Observable<Page<Game>> {
    return this.http.get<Page<Game>>(`${this.apiUrl}/games?pageNumber=${page}&pageSize=${size}`);
  }

  getFavoriteGames(page:number, size:number): Observable<Page<Game>> {
    return this.http.get<Page<Game>>(`${this.apiUrl}/games?favorite=true&pageNumber=${page}&pageSize=${size}`);
  }

  getByStatus(status:String, page:number, size:number): Observable<Page<Game>> {
    return this.http.get<Page<Game>>(`${this.apiUrl}/games?status=${status}&pageNumber=${page}&pageSize=${size}`);
  }

  getByGenre(genre:string, page:number, size:number): Observable<Page<Game>> {
    return this.http.get<Page<Game>>(`${this.apiUrl}/games?genre=${genre}&pageNumber=${page}&pageSize${size}`);
  }

  createGame(game: Game) {
    return this.http.post<Game>(`${this.apiUrl}/games`, game);
  }
  
  getAllGamesByPage(page: number, limit: number, headers?: HttpHeaders): Observable<HttpResponse<Game[]>> {
    const params = {
      _page: page.toString(),
      _limit: limit.toString(),
    };

    return this.http.get<Game[]>(`${this.apiUrl}/games`, {
      headers: headers,
      params: params,
      observe: 'response'
    });
  }
}
