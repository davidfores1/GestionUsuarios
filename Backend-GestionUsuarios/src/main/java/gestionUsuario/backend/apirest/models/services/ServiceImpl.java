package gestionUsuario.backend.apirest.models.services;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import gestionUsuario.backend.apirest.models.dao.IUsuarioDao;
import gestionUsuario.backend.apirest.models.entity.Usuario;

@Service
public class ServiceImpl implements IService {

	@Autowired
	private IUsuarioDao usuarioDao ;
	
	
	@Override
	@Transactional(readOnly = true)
	public List<Usuario> findAll() {
		
		return (List<Usuario>) usuarioDao.findAll();
	}


	@Override
	@Transactional(readOnly = true)
	public Usuario findById(Long id) {
		// TODO Auto-generated method stub
		return usuarioDao.findById(id).orElse(null);
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

	@Override
	@Transactional(readOnly = true)
	public List<Usuario> buscarPorNombre(String nombre) {
		return usuarioDao.findByNombre(nombre);
	}


}
