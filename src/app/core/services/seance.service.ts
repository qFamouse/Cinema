import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {Seance} from "../models/seance.model";

const seances : string = 'seances';

@Injectable()
export class SeanceService {
  constructor(private apiService: ApiService) {}

  getAll(): Observable<Seance[]> {
    return this.apiService.get(`/${seances}/`);
  }

  getById(slug: any): Observable<Seance> {
    return this.apiService.get(`/${seances}/${slug}`);
  }
}
