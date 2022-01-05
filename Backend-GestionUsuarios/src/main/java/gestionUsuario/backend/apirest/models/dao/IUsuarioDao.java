package gestionUsuario.backend.apirest.models.dao;


import gestionUsuario.backend.apirest.models.entity.Rol;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import gestionUsuario.backend.apirest.models.entity.Usuario;

import java.util.List;


public interface IUsuarioDao extends CrudRepository<Usuario, Long> {

    @Query("select u from Usuario u where u.nombre like %?1%")
    public List<Usuario> findByNombre(String nombre);

    @Query("from Rol")
    public List<Rol> findAllRoles();

}
