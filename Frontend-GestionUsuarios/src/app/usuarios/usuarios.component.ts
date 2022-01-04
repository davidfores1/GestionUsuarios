import { Component, OnInit } from '@angular/core';
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
 
  create(user: Usuario): void {
    this.usuari = new Usuario();

    console.log(this.usuari);
    
    
    // this.usuarioService.create(this.usuari)
    // .subscribe( usu => {
    //   location.reload();
    // },);
  }

  update():void{
    this.usu.rol.id = this.rol;
    this.usuarioService.update(this.usu)
    .subscribe( usu => {
      location.reload();
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