package gestionUsuario.backend.apirest.models.services;

import java.util.List;

import gestionUsuario.backend.apirest.models.entity.Rol;
import gestionUsuario.backend.apirest.models.entity.Usuario;

public interface IService {

	
	public List<Usuario> findAll();
	
	public Usuario findById(Long id);
	
	public Usuario save(Usuario usuario);
	
	public void delete(Long id_usuario);

}
