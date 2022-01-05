import { Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import { _throw} from 'rxjs/observable/throw';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Rol } from '../modelos/Rol';

@Injectable()
export class UsuarioService {
  private urlEndPoint: string = 'http://localhost:8080/api/usuarios';
  private urlEndPoint2: string = 'http://localhost:8080/api/usuario';
  private urlEndPoint3: string = 'http://localhost:8080/api/roles';

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
    .pipe(
      map((response: any) => response),
      catchError(e => {
        if (e.status == 400) {
          return _throw(e);
        }
        if (e.error.mensaje) {

          alert(e.error.mensaje)
          
        }

        return _throw(e);

      }));
  }

  update(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.urlEndPoint}/${usuario.id_usuario}`, usuario, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Usuario>{
    return this.http.delete<Usuario>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
  }

  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.urlEndPoint3);
  }

}
