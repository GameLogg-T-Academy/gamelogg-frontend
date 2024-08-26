import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  username:string = "John Doe";
  userProfile:string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSseB6uZeeMH55OlfcMvLSB_O1j4c9eCKFcLQ&s";
  logged:boolean = true;
  searchQuery: string = '';
  
  constructor(private router: Router) {}

  searchGame() {
    if (this.searchQuery) {
      this.router.navigate(['/search/title', this.searchQuery]);
    }
  }
}
