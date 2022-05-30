import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {Review} from "../models/review.service";

const reviews : string = 'reviews';

@Injectable()
export class ReviewsService {
  constructor(private apiService: ApiService) {}

  getAll(): Observable<Review[]> {
    return this.apiService.get(`/${reviews}/`);
  }

  getById(slug: any): Observable<Review> {
    return this.apiService.get(`/${reviews}/${slug}`);
  }
}
