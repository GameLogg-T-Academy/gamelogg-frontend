import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../model/game.model';
import { RouterModule } from '@angular/router';
import { GameloggService } from '../../service/gamelogg.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Page } from '../../model/page.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  gameForm: FormGroup;
  username:string = "Johndoe";
  userBio:string = "Nothing here!";
  userProfile:string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSseB6uZeeMH55OlfcMvLSB_O1j4c9eCKFcLQ&s";

  index:number = 0;

  totalPages: number = 10;
  currentPage: number = 0;
  itemsPerPage:number = 25;

  favoriteGames: Game[] = [];
  gameByStatus: Game[] = [];
  topGames: Game[] = [
    {
      id: 501,
      name: "One Punch Man: A Hero Nobody Knows Deluxe Edition",
      description: "Become a hero in this action-packed anime game.",
      genre: "Fighting",
      releaseDate: new Date(),
      price: 79.99,
      rating: 0, 
      url: "https://sttc.gamersgate.com/images/product/one-punch-man-a-hero-nobody-knows-deluxe-edition/cover-180-0c33a4.jpg"
  },
  {
      id: 502,
      name: "ONE PIECE World Seeker Deluxe Edition",
      description: "Join Luffy and his crew in this open-world adventure.",
      genre: "Adventure",
      releaseDate: new Date(),
      price: 89.99,
      rating: 0, 
      url: "https://sttc.gamersgate.com/images/product/one-piece-world-seeker-deluxe-edition/cover-180-75a5b1.jpg"
  },
  {
      id: 500,
      name: "Back 4 Blood: Deluxe Edition",
      description: "Team up and fight against hordes of zombies.",
      genre: "Shooter",
      releaseDate: new Date(),
      price: 89.99,
      rating: 0, 
      url: "https://sttc.gamersgate.com/images/product/back-4-blood-deluxe-edition/cover-180-267524.jpg"
  }
  ]
  games: Game[] = [];
  
  changeIndex(n:number){
    if (n >= 0 && n < 5) this.index = n;
    if (this.index == 1) this.loadGames();
    if (this.index == 2) this.loadFavorites();
  }

  constructor(private gameService: GameloggService, private fb: FormBuilder) {
    this.gameForm = this.fb.group({
      title: ['', Validators.required],
      url: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      rating: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      genre: [''],
      releaseDate: ['', Validators.required],
      favorite: [false],
      status: [''],
      developer: [''],
      publisher: ['']
    });
  }

  /* used to moved the carrossel, delete comment when component is finished*/
  translateX = 0;
  currentIndex = 0;
  cardWidth = 210;
  maxIndex = 0;
  ngAfterViewInit() {
    const carouselElement = document.querySelector('.last-games');
    if (carouselElement) this.maxIndex = this.games.length - Math.floor(carouselElement.clientWidth / this.cardWidth);
    
    this.loadGames();
  }

  next() {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
      this.translateX -= this.cardWidth;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.translateX += this.cardWidth;
    }
  }

  loadGames(page: number = 0): void {
    this.gameService.getGameByPage(page, this.itemsPerPage).subscribe(data => {
      this.games = data.content;
      this.currentPage = page;
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.loadGames(page);
  }

  loadFavorites(): void {
    this.gameService.getFavoriteGames().subscribe({
      next: (data: Page<Game>) => {
        this.favoriteGames = data.content; 
      },
      error: (err) => {
        console.error('Error occurred:', err); 
      }
    });
  }

  getByStatus(n:number) {
    if (n == 0) {
      this.gameService.getByStatus("completed").subscribe(data => this.gameByStatus = data);
    } else if (n == 1) {
      this.gameService.getByStatus("in_progress").subscribe(data => this.gameByStatus = data);
    } else if (n == 2) {
      this.gameService.getByStatus("not_started").subscribe(data => this.gameByStatus = data);
    }
  }

  onSubmit(): void {
    if (this.gameForm.valid) {
      const game: Game = this.gameForm.value;
      this.gameService.createGame(game).subscribe(data => console.log(data));
    }
  }

}
