import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {User} from "../models/user.model";

const users : string = 'users';

@Injectable()
export class UserService {
  constructor(private apiService: ApiService) {}

  getAll(): Observable<User[]> {
    return this.apiService.get(`/${users}/`);
  }

  getById(slug: any): Observable<User> {
    return this.apiService.get(`/${users}/${slug}`);
  }
}
