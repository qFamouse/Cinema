import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {map, Observable} from "rxjs";
import {Seance} from "../models/seance.model";
import {Hall} from "../models/hall.model";
import {HttpParams} from "@angular/common/http";

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

  getRepertoire(from: Date, to: Date): Observable<Hall[]> {
    const params = new HttpParams()
      .set('from', from.toISOString())
      .set('to', to.toISOString());

    return this.apiService.get(`/${seances}/repertoire`, params).pipe(map(data => {
      let halls : Hall[] = data;
      halls.forEach(hall => {
        hall.seances.forEach(seance => {
          seance.date = new Date(seance.date);
          seance.movie.date = new Date(seance.movie.date);

          let splitDuration = seance.movie.duration.toString().split(':');
          seance.movie.duration = new Date(0, 0, 0,
            parseInt(splitDuration[0]) || 0,
            parseInt(splitDuration[1]) || 0,
            parseInt(splitDuration[2]) || 0, 0);
        })
      })

      return halls;
    }))
  }
}
