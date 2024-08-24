import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../model/game.model';
import { User } from '../model/user.model';


@Injectable({
  providedIn: 'root'
})
export class GameloggService {

  private apiUrl = 'http://localhost:8080'

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

  getGameByName(name: string): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/games?name=${name}`);
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
