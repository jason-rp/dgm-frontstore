import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import { HttpService } from '@app/@core/http/http.service';

const USER_API = `v${environment.apiVersion}/user`;
@Injectable()
export class UserService {
  constructor(private http: HttpService) {}

  gets() {
    return this.http.get(`${USER_API}/list`);
  }

  update(data: any) {
    return this.http.put(`${USER_API}/${data.id}`, data);
  }

  create(data: any) {
    return this.http.post(`${USER_API}`, data);
  }

  delete(id: any) {
    return this.http.delete(`${USER_API}/${id}`);
  }

  setPassword(data: any) {
    return this.http.put(`${USER_API}/${data.id}/change-password?password=${data.password}`, {});
  }
}
