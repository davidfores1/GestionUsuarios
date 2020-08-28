package gestionUsuario.backend.apirest.models.services;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import gestionUsuario.backend.apirest.models.dao.IrolDao;
import gestionUsuario.backend.apirest.models.dao.IusuarioDao;
import gestionUsuario.backend.apirest.models.entity.Rol;
import gestionUsuario.backend.apirest.models.entity.Usuario;

@Service
public class ServiceImpl implements IService {
    
	@Autowired
	private IrolDao rolDao;
	
	@Autowired
	private IusuarioDao usuarioDao ;
	
	
	@Override
	@Transactional(readOnly = true)
	public List<Rol> findAll() {
		
		return (List<Rol>) rolDao.findAll();
	}
	
	@Override
	@Transactional(readOnly = true)
	public List<Usuario> findAllUsuario() {
		
		return (List<Usuario>) usuarioDao.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Usuario findById(Long id_usuario) {
		// TODO Auto-generated method stub
		return usuarioDao.findById(id_usuario).orElse(null);
	}

	@Override
	@Transactional
	public Usuario save(Usuario usuario) {
		// TODO Auto-generated method stub
		return usuarioDao.save(usuario);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		// TODO Auto-generated method stub
		usuarioDao.deleteById(id);
		
	}

}
