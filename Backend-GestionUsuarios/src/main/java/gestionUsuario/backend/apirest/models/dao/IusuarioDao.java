package gestionUsuario.backend.apirest.models.dao;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import gestionUsuario.backend.apirest.models.entity.Usuario;

import java.util.List;


public interface IusuarioDao extends CrudRepository<Usuario, Long>{

@Query("select u from Usuario u where u.nombre like %?1%")
public List<Usuario> findByNombre(String nombre);


}
