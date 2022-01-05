import { Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import { Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UsuarioService {
  private urlEndPoint: string = 'http://localhost:8080/api/usuarios';
  private urlEndPoint2: string = 'http://localhost:8080/api/usuario';
  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'})

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.urlEndPoint);
  }

  getUsuario(query:String): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.urlEndPoint2}/${query}`);
  }

  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.urlEndPoint, usuario, {headers: this.httpHeaders})
  }

  update(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.urlEndPoint}/${usuario.id_usuario}`, usuario, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Usuario>{
    return this.http.delete<Usuario>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
  }

}
