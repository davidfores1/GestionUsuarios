import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Rol } from '../modelos/Rol';
import { Usuario } from '../modelos/usuario';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  // Acceder a elementos DOM
  @ViewChild('id') id: ElementRef;
  @ViewChild('nombre') nombre: ElementRef;
  @ViewChild('role') role: ElementRef;
  @ViewChild('consultar') consultar: ElementRef;

  private datoUsuario: Usuario = new Usuario();
  usuarios: Usuario[];
  rol: any;
  query: string = '';
  data: any;
  roles:Rol[];

  isPresent: boolean = false;
  bloquearCrear: boolean = false;
  bloquear: boolean = false;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {

    if (this.query === '') {
        //  Trae todos los usuarios
      this.usuarioService.getUsuarios().subscribe(
        usuarios => {

          this.usuarios = usuarios
          this.isPresent = false;
          this.bloquearCrear = false;
          this.limpiar();
        }

      );

    } else {
          //  Trae el o los usuario consultado
      this.usuarioService.getUsuario(this.query).subscribe(
        usuarios => {

          this.usuarios = usuarios
          this.isPresent = false;
          this.bloquearCrear = false;
          this.limpiar();
        }

      );
    }
        //  Trae todos los roles
      this.usuarioService.getRoles().subscribe(
        roles => {

          this.roles = roles
          this.isPresent = false;
          this.bloquearCrear = false;

        }

      );
    
    this.bloquear = true;
    
  }

      //  envia el usuario seleccionado
  selectUser(user: Usuario) {
    this.bloquear = false;
    this.bloquearCrear = true;
    this.rol = user.rol.id;
    this.datoUsuario = user;
    this.isPresent = true;
  }

        //  Crea Usuario
  create(usuarioCrear: Usuario): void {
    const rolId = {
      "rol": {
        "id": this.rol,
      }
    };
    const finalResult = Object.assign(usuarioCrear, rolId);
    this.usuarioService.create(finalResult)
      .subscribe(res => {

        this.data = res;

        alert(this.data.mensaje);

        this.ngOnInit();

      });
  }
      //  Actualiza usuario
  update(): void {
    this.datoUsuario.rol.id = this.rol;
    this.usuarioService.update(this.datoUsuario)
      .subscribe(usu => {

      location.reload();

      });
  }
      //  Elimina usuario
  delete() {
    this.usuarioService.delete(this.datoUsuario['id_usuario']).subscribe(res => {

      this.ngOnInit();
      this.limpiar();

    });
  }
      //  envia al formulario para crear usuario
  crear() {
    this.bloquear = true;
    this.bloquearCrear = false;
    this.isPresent = false;

    this.limpiar();
    this.nombre.nativeElement.focus();
  }

        //  limpia inputs del formulario
  limpiar() {
    this.nombre.nativeElement.value = '';
    this.role.nativeElement.value = '';
  }

  //  limpia input de consulta
  limpiarConsutar() {
    this.query = '';
    this.consultar.nativeElement.value = '';
    this.ngOnInit();
  }

}