import { useState, useEffect } from 'react';
import api from '../api/axios';

const EditProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    skills: '', // Lo manejaremos como string separado por comas para facilitar
    contactEmail: ''
  });
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await api.get('/profile');
      if (data) setProfile({ ...data, skills: data.skills?.join(', ') || '' });
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...profile,
        skills: profile.skills.split(',').map(s => s.trim()) // Convertir a array
      };
      await api.post('/profile', dataToSend);
      setMensaje('✅ Perfil actualizado correctamente');
    } catch (error) {
      setMensaje('❌ Error al actualizar');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Editar Hoja de Vida</h2>
      {mensaje && <p className="mb-4 font-bold text-blue-600">{mensaje}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          className="w-full p-2 border rounded" 
          placeholder="Nombre Completo"
          value={profile.name}
          onChange={(e) => setProfile({...profile, name: e.target.value})}
        />
        <textarea 
          className="w-full p-2 border rounded h-32" 
          placeholder="Bio profesional..."
          value={profile.bio}
          onChange={(e) => setProfile({...profile, bio: e.target.value})}
        />
        <input 
          className="w-full p-2 border rounded" 
          placeholder="Habilidades (separadas por coma: React, Node, Git)"
          value={profile.skills}
          onChange={(e) => setProfile({...profile, skills: e.target.value})}
        />
        <input 
          className="w-full p-2 border rounded" 
          placeholder="Email de contacto"
          value={profile.contactEmail}
          onChange={(e) => setProfile({...profile, contactEmail: e.target.value})}
        />
        <button type="submit" className="w-full bg-black text-white py-2 rounded">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditProfile;