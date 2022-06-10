import { Component, OnInit } from '@angular/core';
import {UserService} from "../core/services";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ServerError} from "../core/models/server-error.model";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  error: ServerError = {message: '', status: 200};
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.authForm = this.formBuilder.group({
      'login': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      this.title = 'Sign In';
      // Set a title for the page accordingly

      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.title = 'Sign Up';
        this.authForm.addControl('email', new FormControl());
        this.authForm.addControl('firstName', new FormControl());
        this.authForm.addControl('birthday', new FormControl());
      }
    })
  }

  submitForm() {
    this.isSubmitting = true;
    this.error = {message: '', status: 200}

    const credentials = this.authForm.value;
    this.userService
      .attemptAuth(this.authType, credentials)
      .subscribe(
         data => {
           console.log(data);
           this.router.navigateByUrl('/');
         },
        err => {
          console.log(err)
          this.error = err;
          this.isSubmitting = false;
        }
      );
  }
}
