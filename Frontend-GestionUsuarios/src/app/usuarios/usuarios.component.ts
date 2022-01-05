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
  @ViewChild('consultar') consultar: ElementRef;

  roles = [
    { id: 1, nombre: 'Administrador' },
    { id: 2, nombre: 'Auditor' },
    { id: 3, nombre: 'Auxiliar' }
  ]

  private datoUsuario: Usuario = new Usuario();
  usuarios: Usuario[];
  rol: any;
  query:string = '';
  data:any;

  isPresent: boolean = false;
  bloquearCrear: boolean = false;
  bloquear: boolean = false;
  
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    
    if(this.query === ''){

      this.usuarioService.getUsuarios().subscribe(
        usuarios => {
           
          this.usuarios = usuarios
          this.isPresent = false;
          this.bloquearCrear = false;

        }
  
      );

    }else{
    this.usuarioService.getUsuario(this.query).subscribe(
      usuarios => {
         
        this.usuarios = usuarios
        this.isPresent = false;
        this.bloquearCrear = false;

      }

    );
  }
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
      .subscribe(res => {

        this.data = res;

        alert(this.data.mensaje);
        
        this.limpiar();
        this.ngOnInit();

      });
  }

  update(): void {

    this.datoUsuario.rol.id = this.rol;
    this.usuarioService.update(this.datoUsuario)
      .subscribe(usu => {

        this.ngOnInit();
        this.limpiar();

      });

  }

  delete() {

    this.usuarioService.delete(this.datoUsuario['id_usuario']).subscribe(res => {

      this.ngOnInit();
      this.limpiar();

    });
  }

  crear() {

    this.bloquear = true;
    this.bloquearCrear = false;
    this.isPresent = false;

    this.limpiar();
    this.nombre.nativeElement.focus();
    
  }

  limpiar() {

    this.nombre.nativeElement.value = '';
    this.role.nativeElement.value = '';

  }

  limpiarConsutar(){

    this.query = '';
    this.consultar.nativeElement.value = '';
    this.ngOnInit();
  }

}