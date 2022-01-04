import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  roles=[
    {id:1, nombre:'Admin'},
    {id:2, nombre:'Auditor'},
    {id:3, nombre:'Aux'}
  ]

  @ViewChild('swiper') swiper: ElementRef;

  private usu: Usuario = new Usuario();
  usuarios: Usuario[];
  usuari: Usuario;
  rol:any;
  isPresent:boolean = false;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe(
      usuarios => {
           
        this.usuarios = usuarios

        // console.log(this.usuarios);
      } 

    );
  
  }

  selectUser(user: Usuario) {
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

    const finalResult = Object.assign(usu,course);
    console.log(finalResult);
    
    this.usuarioService.create(finalResult)
    .subscribe( finalResult => {
      this.ngOnInit();
    },);
  }

  update():void{
    this.usu.rol.id = this.rol;
    this.usuarioService.update(this.usu)
    .subscribe( usu => {
      this.ngOnInit();
    },);
  }

  delete() {
    this.usuarioService.delete(this.usu['id_usuario']).subscribe(res => {
      console.log(res);
      this.ngOnInit();
    }, error1 => {
      console.error(error1);
    });
  }

  crear(){
    this.swiper.nativeElement.focus();
  }

}