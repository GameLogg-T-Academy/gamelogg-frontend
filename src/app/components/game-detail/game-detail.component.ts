import { Component, OnInit } from '@angular/core';
import { Game } from '../../model/game.model';
import { ActivatedRoute } from '@angular/router';
import { GameloggService } from '../../service/gamelogg.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.scss'
})
export class GameDetailComponent  implements OnInit {
  game!: Game;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameloggService
  ) {}

  ngOnInit(): void {
    const gameName = this.route.snapshot.paramMap.get('name');
    console.log(gameName);
    if (gameName) {
      this.gameService.getGameByName(gameName).subscribe((data) => {
        this.game = data[0];
        console.log( this.game);
      });
    }
  }

  

}
