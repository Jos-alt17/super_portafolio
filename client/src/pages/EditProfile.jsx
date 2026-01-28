import { useState, useEffect } from 'react';
import api from '../api/axios';

const EditProfile = () => {
  const [profile, setProfile] = useState({
    name: '', title: '', bio: '',
    contact: { phone: '', email: '', location: '', linkedin: '' },
    skills: '', interests: '', languages: [], experience: [], education: []
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/profile');
        if (data) {
          setProfile({
            ...data,
            skills: data.skills?.join(', ') || '',
            interests: data.interests?.join(', ') || '',
            languages: data.languages || [],
            experience: data.experience || [],
            education: data.education || []
          });
        }
      } catch (err) { console.error("Error al cargar datos:", err); }
    };
    fetchProfile();
  }, []);

  // --- MANEJADORES PARA LISTAS (EXPERIENCIA, IDIOMAS, EDUCACIÓN) ---
  const addExperience = () => {
    setProfile({ ...profile, experience: [...profile.experience, { role: '', company: '', city: '', duration: '', description: [''] }] });
  };

  const addLanguage = () => {
    setProfile({ ...profile, languages: [...profile.languages, { name: '', level: 80 }] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...profile,
        skills: profile.skills.split(',').map(s => s.trim()).filter(s => s !== ""),
        interests: profile.interests.split(',').map(i => i.trim()).filter(i => i !== "")
      };
      await api.post('/profile', payload);
      alert("✅ ¡Hoja de Vida actualizada con éxito!");
      window.location.href = '/'; // Redirige al Home para ver los cambios
    } catch (err) {
      alert("Error al guardar los cambios");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-xl my-10">
      <h2 className="text-3xl font-black mb-8 text-gray-800 border-b-4 border-[#5a7d95] inline-block">Configuración de CV</h2>
      
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* 1. INFORMACIÓN BÁSICA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="font-bold text-gray-600 text-xs uppercase mb-2">Nombre Completo</label>
            <input className="p-3 border rounded bg-gray-50 focus:ring-2 focus:ring-[#5a7d95] outline-none" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
          </div>
          <div className="flex flex-col">
            <label className="font-bold text-gray-600 text-xs uppercase mb-2">Puesto / Título</label>
            <input className="p-3 border rounded bg-gray-50 focus:ring-2 focus:ring-[#5a7d95] outline-none" value={profile.title} onChange={e => setProfile({...profile, title: e.target.value})} />
          </div>
        </div>

        {/* 2. CONTACTO */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="font-bold mb-4 text-[#5a7d95] uppercase text-sm">Información de Contacto</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="p-2 border rounded" placeholder="Teléfono" value={profile.contact.phone} onChange={e => setProfile({...profile, contact: {...profile.contact, phone: e.target.value}})} />
            <input className="p-2 border rounded" placeholder="Email" value={profile.contact.email} onChange={e => setProfile({...profile, contact: {...profile.contact, email: e.target.value}})} />
            <input className="p-2 border rounded" placeholder="Ubicación (Ciudad, País)" value={profile.contact.location} onChange={e => setProfile({...profile, contact: {...profile.contact, location: e.target.value}})} />
            <input className="p-2 border rounded" placeholder="LinkedIn URL" value={profile.contact.linkedin} onChange={e => setProfile({...profile, contact: {...profile.contact, linkedin: e.target.value}})} />
          </div>
        </div>

        {/* 3. IDIOMAS (CON BARRA DE NIVEL) */}
        <div>
          <h3 className="font-bold mb-4 text-[#5a7d95] uppercase text-sm">Idiomas</h3>
          {profile.languages.map((lang, i) => (
            <div key={i} className="flex gap-4 mb-2 items-center">
              <input className="p-2 border rounded flex-grow" placeholder="Idioma" value={lang.name} onChange={e => {
                const newLangs = [...profile.languages]; newLangs[i].name = e.target.value; setProfile({...profile, languages: newLangs});
              }} />
              <input type="range" min="0" max="100" value={lang.level} onChange={e => {
                const newLangs = [...profile.languages]; newLangs[i].level = e.target.value; setProfile({...profile, languages: newLangs});
              }} className="w-32" />
              <span className="text-xs font-bold w-8">{lang.level}%</span>
            </div>
          ))}
          <button type="button" onClick={addLanguage} className="text-blue-600 text-xs font-bold mt-2">+ AÑADIR IDIOMA</button>
        </div>

        {/* 4. EXPERIENCIA LABORAL */}
        <div>
          <h3 className="font-bold mb-4 text-[#5a7d95] uppercase text-sm border-b pb-2">Experiencia Profesional</h3>
          {profile.experience.map((exp, i) => (
            <div key={i} className="p-4 bg-white border rounded shadow-sm mb-4 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <input className="p-2 border rounded font-bold" placeholder="Cargo/Role" value={exp.role} onChange={e => {
                  const newExp = [...profile.experience]; newExp[i].role = e.target.value; setProfile({...profile, experience: newExp});
                }} />
                <input className="p-2 border rounded" placeholder="Empresa" value={exp.company} onChange={e => {
                  const newExp = [...profile.experience]; newExp[i].company = e.target.value; setProfile({...profile, experience: newExp});
                }} />
                <input className="p-2 border rounded text-xs" placeholder="Ciudad" value={exp.city} onChange={e => {
                  const newExp = [...profile.experience]; newExp[i].city = e.target.value; setProfile({...profile, experience: newExp});
                }} />
                <input className="p-2 border rounded text-xs" placeholder="Duración (Ej: 2021 - Presente)" value={exp.duration} onChange={e => {
                  const newExp = [...profile.experience]; newExp[i].duration = e.target.value; setProfile({...profile, experience: newExp});
                }} />
              </div>
              <textarea className="w-full p-2 border rounded text-sm" placeholder="Descripción (Una tarea por línea)" 
                value={exp.description.join('\n')}
                onChange={e => {
                  const newExp = [...profile.experience]; newExp[i].description = e.target.value.split('\n');
                  setProfile({...profile, experience: newExp});
                }} 
              />
            </div>
          ))}
          <button type="button" onClick={addExperience} className="w-full border-2 border-dashed border-gray-300 py-3 text-gray-500 rounded-lg hover:bg-gray-50 transition">
            + Añadir Puesto de Trabajo
          </button>
        </div>

        <button type="submit" className="w-full bg-[#5a7d95] text-white py-4 rounded-lg font-black text-xl hover:bg-gray-800 transition shadow-2xl">
          GUARDAR Y ACTUALIZAR PORTAFOLIO
        </button>
      </form>
    </div>
  );
};

export default EditProfile;