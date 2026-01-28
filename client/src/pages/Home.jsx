import { useState, useEffect } from 'react';
import api from '../api/axios';

const Home = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/profile');
        setProfile(data);
      } catch (err) { console.error(err); }
    };
    fetchProfile();
  }, []);

  if (!profile) return <div className="text-center p-10">Cargando portafolio profesional...</div>;

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-2xl flex flex-col md:flex-row min-h-[1000px] my-10 resume-container">
      
      {/* COLUMNA IZQUIERDA (Gris/Sidebar) */}
      <aside className="w-full md:w-1/3 bg-[#f0f2f1] p-8 space-y-8">
        {/* Foto de Perfil */}
        <div className="flex justify-center">
          <div className="w-48 h-48 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-300">
            <img 
              src="/mifoto.jpg"  // Vite busca directamente en la carpeta public
              alt="Perfil" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Contacto */}
        <section>
          <h3 className="font-bold uppercase tracking-wider border-b-2 border-gray-400 mb-4">Contacto</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">📞 {profile.contact?.phone || 'No especificado'}</li>
            <li className="flex items-center gap-2">✉️ {profile.contact?.email || 'No especificado'}</li>
            <li className="flex items-center gap-2">📍 {profile.contact?.location || 'No especificado'}</li>
            <li className="flex items-center gap-2">🔗 <a href={profile.contact?.linkedin} className="truncate">{profile.contact?.linkedin || 'linkedin.com/in/usuario'}</a></li>
          </ul>
        </section>

        {/* Idiomas */}
        <section>
          <h3 className="font-bold uppercase tracking-wider border-b-2 border-gray-400 mb-4">Idiomas</h3>
          <div className="space-y-3">
            {profile.languages?.map((lang, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>{lang.name}</span>
                </div>
                <div className="w-full bg-gray-300 h-2 rounded-full">
                  <div className="bg-[#5a7d95] h-2 rounded-full" style={{ width: `${lang.level}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </aside>

      {/* COLUMNA DERECHA (Contenido Principal) */}
      <main className="w-full md:w-2/3 relative">
        {/* Encabezado Azul con Corte Diagonal */}
        <div className="bg-[#5a7d95] text-white pt-16 pb-20 px-12 clip-path-header">
          <h1 className="text-5xl font-black uppercase leading-tight">{profile.name}</h1>
          <p className="text-xl font-light tracking-[0.2em] mt-2 uppercase">{profile.title}</p>
        </div>

        <div className="p-12 space-y-10">
          {/* Perfil */}
          <section>
            <h3 className="text-xl font-bold uppercase border-b-2 border-gray-200 pb-2 mb-4">Perfil</h3>
            <p className="text-gray-700 leading-relaxed text-justify">{profile.bio}</p>
          </section>

          {/* Experiencia */}
          <section>
            <h3 className="text-xl font-bold uppercase border-b-2 border-gray-200 pb-2 mb-4">Experiencia Profesional</h3>
            {profile.experience?.map((exp, i) => (
              <div key={i} className="mb-6">
                <h4 className="font-bold text-lg">{exp.role}</h4>
                <p className="italic text-gray-600 uppercase text-sm">{exp.company}, {exp.city} | {exp.duration}</p>
                <ul className="list-disc ml-5 mt-2 text-gray-700 space-y-1">
                  {exp.description?.map((desc, j) => <li key={j}>{desc}</li>)}
                </ul>
              </div>
            ))}
          </section>

          {/* Formación */}
          <section>
            <h3 className="text-xl font-bold uppercase border-b-2 border-gray-200 pb-2 mb-4">Formación</h3>
            {profile.education?.map((edu, i) => (
              <div key={i} className="mb-4">
                <h4 className="font-bold">{edu.degree}</h4>
                <p className="text-gray-600">{edu.institution}, {edu.city} | {edu.duration}</p>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;