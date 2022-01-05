package gestionUsuario.backend.apirest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import gestionUsuario.backend.apirest.models.entity.Usuario;
import gestionUsuario.backend.apirest.models.services.IService;


@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class RolRestController {

	@Autowired
	private IService rolService;

	@GetMapping("/usuarios")
	public List<Usuario> index(){
		return rolService.findAll();
	}

	@GetMapping("/usuario/{nombre}")
	public List<Usuario> search(@PathVariable String nombre){
			 return rolService.buscarPorNombre(nombre);
	}

	@PostMapping("/usuarios")
	@ResponseStatus(HttpStatus.CREATED) 
	public Usuario create(@RequestBody Usuario usuario) {
		return rolService.save(usuario);
  }
	
	@PutMapping("/usuarios/{id}")
	@ResponseStatus(HttpStatus.CREATED) 
	public Usuario update(@RequestBody Usuario usuario,@PathVariable Long id) {
		Usuario usuarioActual = rolService.findById(id);
		
		usuarioActual.setRol(usuario.getRol());
		usuarioActual.setNombre(usuario.getNombre());
		usuarioActual.setActivo(usuario.getActivo());
		
		return rolService.save(usuarioActual);	
	}
	
	@DeleteMapping("/usuarios/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT) 
	public void delete(@PathVariable Long id){
		rolService.delete(id);
	}
	
	
}
