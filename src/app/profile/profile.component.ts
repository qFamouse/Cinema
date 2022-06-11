import { Component, OnInit } from '@angular/core';
import {User} from "../core/models/user.model";
import {UserService} from "../core/services";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServerError} from "../core/models/server-error.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  disabled: Boolean = true;
  settingsForm: FormGroup;
  isSubmitting = false;
  avatar: any
  error: ServerError = {message: '', status: 200};


  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) {
    this.settingsForm = this.formBuilder.group({
      login: ['', [Validators.minLength(3), Validators.maxLength(30)]],
      phone: '',
      birthday: '',
      firstName: ['', [Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', Validators.email],
      avatar: ''
    });
  }

  ngOnInit(): void {
    this.route.url.subscribe(data => {
      let authType = data[data.length - 1].path;
      if (authType === 'profile_edit') {
        this.disabled = false;
      }

      this.userService.getAvatar()
        .subscribe(avatar => {
          this.createImageFromBlob(avatar)
        })

      this.user = this.userService.getCurrentUser();
      this.settingsForm.controls['login'].setValue(this.user.login);
      this.settingsForm.controls['email'].setValue(this.user.email);
      this.settingsForm.controls['firstName'].setValue(this.user.firstName);
      this.settingsForm.controls['birthday'].setValue(this.user.birthday);
      this.settingsForm.controls['phone'].setValue(this.user.phone);
    })
  }

  submitForm() {
    this.isSubmitting = true;

    let user = {
      login: this.settingsForm.value.login ?? undefined,
      email: this.settingsForm.value.email ?? undefined,
      firstName: this.settingsForm.value.firstName ?? undefined,
      birthday: this.settingsForm.value.birthday ?? undefined,
      phone: this.settingsForm.value.phone ?? undefined
    }

    let userAvatar = this.settingsForm.value.avatar;

    this.userService
      .update(user)
      .subscribe(
        updatedUser => {
          this.router.navigateByUrl('/profile');
        },
        err => {
          this.error = err;
          this.isSubmitting = false;
        }
      );
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.avatar = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  setAvatar(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.userService.setAvatar(fileList[0])
        .subscribe(success => {
          this.submitForm()
        },
          err => {
            this.error = err;
            this.isSubmitting = false;
          })
    }
  }

}
