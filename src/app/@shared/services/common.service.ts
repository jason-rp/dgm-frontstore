import { Injectable } from '@angular/core';
import { HttpService } from '@app/@core/http/http.service';
import { environment } from '@env/environment';

const FILE_API = `v${environment.apiVersion}/file`;

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpService) {}

  getFile(fileId: string) {
    return this.http.download(`${FILE_API}/${fileId}`);
  }

  getDownloadableFile(fileId: string) {
    return this.http.get(`${FILE_API}/downloadable/${fileId}`);
  }
}
