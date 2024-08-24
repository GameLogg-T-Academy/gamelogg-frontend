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

  totalPages: number = 0;
  currentPage: number = 0;
  itemsPerPage:number = 25;

  favoriteGames: Game[] = [];
  gameByStatus: Game[] = [];
  topGames: Game[] = [
    {
      id: 501,
      title: "One Punch Man: A Hero Nobody Knows Deluxe Edition",
      description: "Become a hero in this action-packed anime game.",
      genre: "Fighting",
      releaseDate: new Date(),
      price: 79.99,
      rating: 0, 
      url: "https://sttc.gamersgate.com/images/product/one-punch-man-a-hero-nobody-knows-deluxe-edition/cover-180-0c33a4.jpg"
  },
  {
      id: 502,
      title: "ONE PIECE World Seeker Deluxe Edition",
      description: "Join Luffy and his crew in this open-world adventure.",
      genre: "Adventure",
      releaseDate: new Date(),
      price: 89.99,
      rating: 0, 
      url: "https://sttc.gamersgate.com/images/product/one-piece-world-seeker-deluxe-edition/cover-180-75a5b1.jpg"
  },
  {
      id: 500,
      title: "Back 4 Blood: Deluxe Edition",
      description: "Team up and fight against hordes of zombies.",
      genre: "Shooter",
      releaseDate: new Date(),
      price: 89.99,
      rating: 0, 
      url: "https://sttc.gamersgate.com/images/product/back-4-blood-deluxe-edition/cover-180-267524.jpg"
  }
  ]
  games: Game[] = [];

  gameByStatusActive:number = 0;

  changePageSection(n:number){
    if (n >= 0 && n < 5) this.index = n;
    
    if (this.index == 1) this.loadGames();
    else if (this.index == 2) this.loadFavorites();
    else if (this.index == 3) this.getByStatus(0);
    this.currentPage = 0;
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

    this.gameForm.statusChanges.subscribe(status => {
      console.log('Form status:', status);
      console.log('Form errors:', this.gameForm.errors);
    });
  }

  ngAfterViewInit() {    
    this.loadGames();
  }
  
  loadGames(page: number = 0): void {
    this.gameService.getGameByPage(page, this.itemsPerPage).subscribe(data => {
      this.games = data.content;
      this.totalPages = data.totalPages;
      this.currentPage = page;
    });
  }

  changePage(page: number, collection:string): void {
    this.currentPage = page;

    if (collection == "played") this.loadGames(page);
    else if (collection == "favorites") this.loadFavorites(page);
    else if (collection == "by-status") this.getByStatus(this.gameByStatusActive, page);
  }

  loadFavorites(page: number = 0): void {
    this.gameService.getFavoriteGames(page, this.itemsPerPage).subscribe({
      next: (data: Page<Game>) => {
        this.favoriteGames = data.content; 
        this.totalPages = data.totalPages;
      },
      error: (err) => {
        console.error('Error occurred:', err); 
      }
    });
  }

  getByStatus(n:number, page: number = 0) {
    if (n == 0) {
      this.gameService.getByStatus("Completed", page, this.itemsPerPage).subscribe(data => {
        this.gameByStatus = data.content;
        this.totalPages = data.totalPages;
      });
      this.gameByStatusActive = 0;
    } else if (n == 1) {
      this.gameService.getByStatus("In Progress", page, this.itemsPerPage).subscribe(data => {
        this.gameByStatus = data.content;
        this.totalPages = data.totalPages;
      });
      this.gameByStatusActive = 1;

    } else if (n == 2) {
      this.gameService.getByStatus("Not Started", page, this.itemsPerPage).subscribe(data => {
        this.gameByStatus = data.content;
        this.totalPages = data.totalPages;
      });
      this.gameByStatusActive = 2;

    }
  }

  onSubmit(): void {
    if (this.gameForm.valid) {
      const game: Game = this.gameForm.value;
      this.gameService.createGame(game).subscribe(data => console.log(data));
    }
  }

}
