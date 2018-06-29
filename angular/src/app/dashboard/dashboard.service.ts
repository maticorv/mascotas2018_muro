import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { RestBaseService } from "../tools/rest.tools";

@Injectable()
export class DashboardService extends RestBaseService {

  private urlDetalle = "/states";

  constructor(private http: Http) {
    super();
   }

   // GET estados
   buscarEstados(): Promise <Estado[]> {
     return this.http.get(DashboardService.serverUrl + this.urlDetalle, this.getRestHeader())
     .toPromise()
     .then(response => {
       return response.json() as Estado[];
      })
      .catch(this.handleError);
  }
  // ABM estados
  // Alta estado
  guardarEstado(value: Estado): Promise<Estado> {
    return this.http.post(DashboardService.serverUrl + this.urlDetalle, JSON.stringify(value), this.getRestHeader())
      .toPromise()
      .then(response => {
        return response.json() as Estado;
      })
      .catch(this.handleError);
  }
  // Baja estado
  eliminarEstado(id: number): Promise <any> {
    if (id) {
      return this.http.delete(DashboardService.serverUrl + this.urlDetalle + "/" + id, this.getRestHeader())
      .toPromise()
      .then(response => {
       return "";
      })
      .catch(this.handleError);
    }
  }
}
export interface Estado {
  id: number;
  detalle: string;
  usuario: string;
}
