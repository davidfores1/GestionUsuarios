import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  private usu: Usuario = new Usuario();

  usuarios: Usuario[];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe(
      usuarios => this.usuarios = usuarios

    );
  }

  selectUser(user: Usuario) {
    this.usu = user;
  }
 
  create(): void {
    this.usuarioService.create(this.usu)
      .subscribe(usu => {
        console.log(usu);
      }
      );
  }

  update():void{
    this.usuarioService.update(this.usu)
    .subscribe( usu => {
      console.log(usu); 
    },);
  }

  delete() {
    this.usuarioService.delete(this.usu['id_usuario']).subscribe(res => {
      console.log(res);
      location.reload();
    }, error1 => {
      console.error(error1);
    });
  }

}