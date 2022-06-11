import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../core/services";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAuth: boolean;

  constructor(
    public router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.isAuthenticated
      .subscribe(isAuth => {
        this.isAuth = isAuth
      })
  }

  signOut() {
    if (this.isAuth) {
      this.userService.purgeAuth()
      this.router.navigateByUrl('/register');
    }
  }

}
