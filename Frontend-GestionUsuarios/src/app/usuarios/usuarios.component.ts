import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';

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
    { id: 1, nombre: 'Admin' },
    { id: 2, nombre: 'Auditor' },
    { id: 3, nombre: 'Aux' }
  ]

  private usu: Usuario = new Usuario();
  usuarios: Usuario[];
  usuari: Usuario;
  rol: any;

  isPresent: boolean = false;
  bloquearCrear: boolean = false;
  bloquear: boolean = false;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe(
      usuarios => {

        this.usuarios = usuarios

        this.limpiar();
        this.isPresent = false;
        this.bloquearCrear = false;
      }


    );
    this.bloquear = true;
  }

  selectUser(user: Usuario) {

    this.bloquear = false;
    this.bloquearCrear = true;
    this.rol = user.rol.id;
    this.usu = user;
    console.log(this.usu);
    this.isPresent = true;
  }

  create(usu: Usuario): void {

    const course = {
      "rol": {
        "id": this.rol,
      }
    };

    const finalResult = Object.assign(usu, course);
    console.log(finalResult);

    this.usuarioService.create(finalResult)
      .subscribe(finalResult => {
        this.ngOnInit();
      });
  }

  update(): void {
    this.usu.rol.id = this.rol;
    this.usuarioService.update(this.usu)
      .subscribe(usu => {
        location.reload();
      });

  }

  delete() {
    this.usuarioService.delete(this.usu['id_usuario']).subscribe(res => {
      console.log(res);
      this.ngOnInit();
    }, error1 => {
      console.error(error1);
    });
  }

  crear() {
    this.ngOnInit();
    this.bloquear = true;
    this.bloquearCrear = false;
    this.isPresent = false;
    this.nombre.nativeElement.focus();
  }

  limpiar() {

    this.id.nativeElement.value = '';
    this.nombre.nativeElement.value = '';
    this.role.nativeElement.value = '';
    this.activo.nativeElement.value = '';
    this.activo2.nativeElement.value = '';

  }

}