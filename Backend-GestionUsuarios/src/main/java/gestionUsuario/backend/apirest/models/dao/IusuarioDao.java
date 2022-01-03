package gestionUsuario.backend.apirest.models.dao;


import org.springframework.data.repository.CrudRepository;

import gestionUsuario.backend.apirest.models.entity.Usuario;

public interface IusuarioDao extends CrudRepository<Usuario, Long>{


}
