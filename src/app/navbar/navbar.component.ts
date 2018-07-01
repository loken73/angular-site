import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  tokenExists: boolean;
  constructor(private router: Router) { }

  ngOnInit() {
    this.findToken();
  }

  findToken() {
    this.tokenExists = localStorage.getItem('User_Token') !== null;

    return this.tokenExists;

  }

  LogOut() {
    localStorage.removeItem('User_Token');
    this.router.navigate(['/login-register']);
  }


}
