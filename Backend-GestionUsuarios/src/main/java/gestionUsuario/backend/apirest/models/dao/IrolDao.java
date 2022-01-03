package gestionUsuario.backend.apirest.models.dao;

import org.springframework.data.repository.CrudRepository;

import gestionUsuario.backend.apirest.models.entity.Rol;


public interface IrolDao extends CrudRepository<Rol, Long>{
	
	
}
