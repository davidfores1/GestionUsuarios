import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  @ViewChild('id') id: ElementRef;
  @ViewChild('nombre') nombre: ElementRef;
  @ViewChild('role') role: ElementRef;
  @ViewChild('activo') activo: ElementRef;
  @ViewChild('activo2') activo2: ElementRef;

  roles = [
    { id: 1, nombre: 'Administrador' },
    { id: 2, nombre: 'Auditor' },
    { id: 3, nombre: 'Auxiliar' }
  ]

  private datoUsuario: Usuario = new Usuario();
  usuarios: Usuario[];
  rol: any;

  isPresent: boolean = false;
  bloquearCrear: boolean = false;
  bloquear: boolean = false;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe(
      usuarios => {

        this.usuarios = usuarios
        this.isPresent = false;
        this.bloquearCrear = false;
      }


    );
    this.limpiar();
    this.bloquear = true;
  }

  selectUser(user: Usuario) {

    this.bloquear = false;
    this.bloquearCrear = true;
    this.rol = user.rol.id;
    this.datoUsuario = user;
    this.isPresent = true;
  }

  create(usuarioCrear: Usuario): void {

    const rolId = {
      "rol": {
        "id": this.rol,
      }
    };

    const finalResult = Object.assign(usuarioCrear, rolId);
    this.usuarioService.create(finalResult)
      .subscribe(finalResult => {

        this.ngOnInit();

      });
  }

  update(): void {

    this.datoUsuario.rol.id = this.rol;
    this.usuarioService.update(this.datoUsuario)
      .subscribe(usu => {
        location.reload();
      });

  }

  delete() {
    this.usuarioService.delete(this.datoUsuario['id_usuario']).subscribe(res => {
      console.log(res);
      this.ngOnInit();
    }, error1 => {
      console.error(error1);
    });
  }

  crear() {
    this.bloquear = true;
    this.bloquearCrear = false;
    this.isPresent = false;
    this.nombre.nativeElement.focus();
  }

  limpiar() {

    this.nombre.nativeElement.value = '';
    this.role.nativeElement.value = '';
    this.activo.nativeElement.value = '';
    this.activo2.nativeElement.value = '';

  }

}