import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  username:string = "John Doe";
  userProfile:string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSseB6uZeeMH55OlfcMvLSB_O1j4c9eCKFcLQ&s";
  logged:boolean = true;
}
