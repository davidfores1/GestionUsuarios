package gestionUsuario.backend.apirest.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import org.springframework.validation.BindingResult;

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
	public ResponseEntity<?> create(@RequestBody Usuario usuario, BindingResult result) {

		Usuario usuarioNew = null;
		  Map<String, Object> response = new HashMap<>();

		if(result.hasErrors()) {

			List<String> errors = result.getFieldErrors()
					.stream()
					.map(err -> "El campo '" + err.getField() +"' "+ err.getDefaultMessage())
					.collect(Collectors.toList());

			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}

		try {
			usuarioNew = rolService.save(usuario);
		} catch(DataAccessException e) {
			response.put("mensaje", "El nombre del usuario es unico y todos los campos son obligatorio");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		response.put("mensaje", "El usuario ha sido creado con éxito!");
		response.put("usuario", usuarioNew);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
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
