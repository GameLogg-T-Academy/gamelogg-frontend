import { Component, OnInit } from '@angular/core';
import { Game } from '../../model/game.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GameloggService } from '../../service/gamelogg.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../model/user.model';

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
    private gameService: GameloggService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const gameName = this.route.snapshot.paramMap.get('name');
    if (gameName) {
      this.gameService.getGameByName(gameName).subscribe((data) => {
        this.game = data.content[0];
      });
    }
  }

  removeClick(): void {
    this.gameService.removeById(this.game.id);
    alert("Game removed succesfully")
    this.router.navigate(['/']);
  }
}
