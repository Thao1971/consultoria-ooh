import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, ComposedChart 
} from 'recharts';
import { 
  TrendingUp, Map, Users, Target, ChevronRight, Menu, X, 
  LayoutDashboard, Building2, BarChart3, Briefcase, 
  ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, MonitorPlay,
  Sparkles, Bot, Send, Loader2, FileText, BookOpen, Printer,
  Coins, Landmark, Search, Clock, ShieldCheck, Globe, FileDown, Eye,
  Zap, BrainCircuit, MessageSquare, Layers, Radio, History,
  UserCheck, Quote, ChevronLeft, Award, MapPin, Gavel, Hexagon,
  Activity, LineChart as ChartIcon
} from 'lucide-react';

// --- DATA SETS: MERCADO (ESTADÍSTICAS INFOADEX + PREDICCIONES) ---

const dataMarketHistory = [
  { year: '2021', totalMedia: 11667.4, ooh: 289.6, variation: 8.4 },
  { year: '2022', totalMedia: 12274.7, ooh: 350.2, variation: 5.2 },
  { year: '2023', totalMedia: 12603.3, ooh: 406.7, variation: 2.7 },
  { year: '2024', totalMedia: 13081.8, ooh: 432.0, variation: 3.8 },
  { year: '2025 (P)', totalMedia: 12745.4, ooh: 460.5, variation: -2.6 },
];

const dataFutureForecast = [
  { year: '2025', value: 460.5 },
  { year: '2026', value: 484.2 },
  { year: '2027', value: 509.1 },
  { year: '2028', value: 535.3 },
  { year: '2029', value: 562.9 },
  { year: '2030', value: 591.8 },
];

const tendersData = [
  { city: 'Madrid', type: 'Mobiliario Urbano', operator: 'Clear Channel / Atresmedia', budget: '400.3M€', expiry: '2028/2031', risk: 'Alto' },
  { city: 'Barcelona', type: 'Mobiliario Urbano', operator: 'JCDecaux', budget: '13.0M€ (Anual)', expiry: '2035', risk: 'Bajo' },
  { city: 'Zaragoza', type: 'Mobiliario Urbano', operator: 'JCDecaux', budget: '59.3M€', expiry: '2032', risk: 'Bajo' },
  { city: 'Red AENA', type: 'Aeropuertos', operator: 'Exterior Plus', budget: '100M€+', expiry: '2026/27', risk: 'Muy Alto' },
];

const supportTypes = [
  { id: 'mu', name: 'Mobiliario Urbano', icon: Building2, share: '45%', insight: 'Core estratégico basado en concesiones municipales de largo plazo.' },
  { id: 'tr', name: 'Transportes', icon: Globe, share: '24%', insight: 'Soportes en aeropuertos, estaciones de tren y metro.' },
  { id: 'gf', name: 'Gran Formato', icon: Layers, share: '19%', insight: 'Vallas y monopostes en vías de acceso e interurbanas.' },
  { id: 'in', name: 'Indoor / Retail', icon: MonitorPlay, share: '12%', insight: 'Soportes en centros comerciales y entornos de gran consumo.' }
];

const companyTargets = [
  { id: 'cc-atresmedia', name: "Clear Channel Esp", status: "Adquirido", owner: "Atresmedia", value: "€115M", focus: "Mobiliario Urbano", desc: "Integración estratégica de TV y Exterior." },
  { id: 'exterior-plus', name: "Exterior Plus", status: "Target", owner: "P. Equity", value: "Premium", focus: "Aeropuertos", desc: "Líder en transporte de lujo y aeropuertos." },
  { id: 'wildstone', name: "Wildstone Spain", status: "Infra", owner: "Fondo", value: "Patrimonial", focus: "Gran Formato", desc: "Modelo basado en la propiedad de activos." },
  { id: 'logan', name: "Logan (Fluxxoh)", status: "Tech", owner: "Indep.", value: "Data driven", focus: "Medición Mobile", desc: "Tecnología puntera para medición de audiencias." }
];

// --- DATA SETS: EXPERTOS (ARTÍCULOS COMPLETOS) ---

const expertInterviews = [
  { 
    id: "borja-balanzat",
    name: "Borja Balanzat Góngora", 
    role: "Director General", 
    company: "Global España", 
    keyPoint: "R-evolución Digital",
    tesis: "Digitalización, medición e innovación: el camino de Global en el Exterior.",
    fullContent: `El año pasado comenzaba estas líneas hablando de cómo había llegado el momento de R-evolucionar el medio Exterior y sus entornos. Hoy, puedo confirmaros que esa transformación está siendo un éxito y avanza de forma imparable. Hace solo unos días inauguramos la primera pantalla digital en Metro Barcelona, en la estación de Sagrera, con una campaña de H&M. Esta instalación, que incorpora tecnología de última generación, supone un paso más en un ambicioso plan de digitalización que este año ha dado un salto histórico: hemos duplicado nuestra presencia digital con la creación del circuito Brighter, que incluye 250 mupis digitales en siete ciudades, y la puesta en marcha de cuatro nuevas Pantallas de Gran Formato Digital.\n\nA día de hoy, el patrimonio digital de Global en España supera las 900 pantallas, ubicadas principalmente en estaciones de tren de ADIF, Metro Barcelona (TMB) y entornos urbanos clave. Hablamos de soportes vanguardistas, de alta calidad y máxima tecnología, que permiten a las marcas conectar con millones de personas en entornos de gran impacto visual. Una visibilidad y audiencia masiva, constante y diaria que convierte al DOOH en un pilar esencial dentro del mix de medios. Pero en Global no nos conformamos con multiplicar nuestro portfolio. Apostamos por un DOOH basado en data, tecnología y medición, porque medir no es solo contar, es demostrar.`,
    tags: ["Digitalización", "Metro", "Medición"]
  },
  { 
    id: "agata-romo",
    name: "Ágata Romo", 
    role: "Directora de Marketing", 
    company: "Exterior Plus", 
    keyPoint: "Atención",
    tesis: "Exterior gana la batalla por la atención frente a la fragmentación digital.",
    fullContent: `Vivimos un momento de transformación profunda en el ecosistema publicitario. Mientras que el entorno digital sufre una saturación sin precedentes y una creciente fragmentación de las audiencias, Exterior se refuerza como un medio publicitario de masas que ha sabido adaptarse a los nuevos tiempos sin perder su esencia. Su capacidad para impactar en el mundo real, en el momento adecuado y con el mensaje oportuno, lo convierte en una pieza fundamental para cualquier estrategia de marca.\n\nEn Exterior Plus, entendemos que la clave del éxito no reside solo en tener los mejores soportes, sino en cómo utilizamos la tecnología y el dato para potenciar su eficacia. La digitalización ha permitido que Exterior deje de ser un medio estático para convertirse en un canal dinámico, capaz de ofrecer contenidos relevantes en tiempo real. Esto no solo mejora la experiencia del usuario, sino que incrementa significativamente el recuerdo de marca y la intención de compra.`,
    tags: ["Atención", "Eficacia", "Estrategia"]
  },
  { 
    id: "pedro-fernandez",
    name: "Pedro Fernández Sanz", 
    role: "Dir. Producto y Marketing", 
    company: "Clear Channel", 
    keyPoint: "Disponibilidad",
    tesis: "Los CEP definen la disponibilidad mental de una marca en el punto de compra.",
    fullContent: `Los Category Entry Points (CEP) son la base de la Disponibilidad mental de una marca, que es la probabilidad de que un consumidor piense en una marca en situaciones de compra. Cuanto mayor sea la disponibilidad mental, mayor será la cuota de mercado. Exterior cuenta con palancas únicas para maximizar estos objetivos.`,
    tags: ["Branding", "CEP", "Impacto"]
  },
  { id: "alvaro-mayol", name: "Álvaro Mayol", role: "GM", company: "Taptap Digital", tesis: "Conectando datos masivos con resultados tangibles.", tags: ["Data", "Atribución"], keyPoint: "Datos", fullContent: "El medio DOOH está experimentando una profunda transformación impulsada por la digitalización. El gran reto hoy es conectar datos masivos con resultados de negocio tangibles. La tecnología geoespacial permite cerrar el círculo entre el impacto físico y la acción digital." },
  { id: "pablo-berrondo", name: "Pablo Berrondo", role: "CSO", company: "Beyup", tesis: "El reto es pasar del OTS a la visibilidad real.", tags: ["Métricas", "Certificación"], keyPoint: "Visibilidad", fullContent: "La medición real es la base de la inversión publicitaria actual. Ya no basta con estimaciones; los anunciantes exigen certificación. La integración de tecnologías de seguimiento nos permite certificar qué ojos han estado realmente sobre la pantalla." },
  { id: "diego-delgado", name: "Diego Delgado", role: "Sales Head", company: "Logan", tesis: "Fluxxoh predice flujos de audiencia cualificados.", tags: ["Big Data", "Fluxxoh"], keyPoint: "Audiencia", fullContent: "Ganar la confianza de la marca mediante el uso inteligente del dato móvil. Combinamos datos de navegación y consumo digital con datos geoespaciales para fijar clústeres de audiencia por zonas de influencia." },
  { id: "marta-rodriguez", name: "Marta Rodríguez", role: "Directora General", company: "Gran Pantalla", tesis: "Optimizar la conexión antes que el alcance masivo.", tags: ["SkyLed", "Precisión"], keyPoint: "Conexión", fullContent: "Tradicionalmente, las campañas se han centrado en grandes circuitos de cobertura masiva. Pero en un entorno segmentado, esta estrategia puede resultar ineficiente. Lo que importa es alcanzar al público objetivo de manera precisa." },
  { id: "alberto-mora", name: "Alberto Mora", role: "Director Comercial", company: "Exteria", tesis: "Sabiduría humana apoyada en herramientas de mercado.", tags: ["Análisis", "Talento"], keyPoint: "Humano", fullContent: "Ser ágiles, sí; ser autómatas, no. Planificamos campañas eficaces apoyándonos en herramientas de mercado como AMIC Marcas, Tom Micro y Geomex, pero sin sacrificar el tiempo de análisis humano." },
  { id: "gorka-pagaza", name: "Gorka Pagazaurtundia", role: "Director Comercial", company: "Callao Lights", tesis: "Ubicación Premium: Gran Vía asegura visibilidad masiva.", tags: ["Iconic", "3D"], keyPoint: "Ubicación", fullContent: "Location, location, location. La regla número uno del éxito en Exterior. Madrid es un enclave de especial interés, y la Gran Vía ocupa un lugar privilegiado por ser la segunda calle más visitada de Europa." },
  { id: "cristina-martin", name: "Cristina Martín", role: "CEO", company: "Bidscom", tesis: "Estandarizar la medición es vital para escalar.", tags: ["Estándares", "Programática"], keyPoint: "Estandarización", fullContent: "La fragmentación de datos es la gran barrera actual del sector. Necesitamos métricas unificadas que permitan a los compradores programáticos operar con la misma confianza que en otros entornos digitales." },
  { id: "sofia-ruiz", name: "Sofía Ruiz", role: "Marketing Dir.", company: "Global", tesis: "La ciudad como lienzo: experiencias que emocionan.", tags: ["Arte Urbano", "Storytelling"], keyPoint: "Creatividad", fullContent: "La publicidad exterior evoluciona hacia una forma de arte urbano. Campañas inmersivas y creatividades emocionantes son las que perduran en la memoria del ciudadano y transforman el entorno cotidiano." },
  { id: "juanjo-armario", name: "Juanjo Armario", role: "Comercial", company: "Súper 8", tesis: "La espectacularidad icónica multiplica el recuerdo.", tags: ["Espectacular", "Recuerdo"], keyPoint: "Espectáculo", fullContent: "Los soportes icónicos son multiplicadores de la notoriedad de marca. La combinación de grandes dimensiones, tecnología de vanguardia y ubicaciones inmejorables permite crear momentos de impacto únicos." },
  { id: "carlos-pestana", name: "Carlos Pestaña", role: "Managing Director", company: "Wildstone", tesis: "Valor en la propiedad del activo interurbano.", tags: ["Patrimonio", "Vallas"], keyPoint: "Infraestructura", fullContent: "Estamos desbloqueando el poder del DOOH en las vías interurbanas de España. Al controlar el soporte y el suelo, podemos garantizar una digitalización de alta calidad a largo plazo." },
  { id: "carlos-valiente", name: "Carlos Valiente", role: "Director General", company: "014 Media", tesis: "Digitalizar el mundo físico para enriquecer el online.", tags: ["Phygital", "Sólido"], keyPoint: "Phygital", fullContent: "Exterior es el medio sólido que convive con la gente en la calle. Recogemos y digitalizamos datos del mundo offline para enriquecer los resultados de las campañas digitales y cerrar el círculo del journey." },
  { id: "diego-ruiz", name: "Diego Ruiz Cano", role: "Especialista", company: "Programmatic Spain", tesis: "El futuro del DOOH es 100% programático.", tags: ["Automatización", "Futuro"], keyPoint: "Programática", fullContent: "La integración en el ecosistema digital omnicanal es imparable. Al adoptar estrategias basadas en datos, los anunciantes pueden desbloquear un valor significativo y fomentar una publicidad más impactante." }
];

// --- APP PRINCIPAL ---

const App = () => {
  const [activeArea, setActiveArea] = useState('mercado');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  const NavItem = ({ id, label, icon: Icon }) => (
    <button onClick={() => { setActiveArea(id); setSelectedItem(null); setSidebarOpen(false); }} className={`w-full flex items-center gap-5 px-6 py-5 rounded-[24px] transition-all font-black uppercase text-[9px] tracking-[0.25em] ${activeArea === id ? 'bg-slate-900 text-white shadow-2xl translate-x-2' : 'text-slate-800 hover:bg-black/5'}`}>
      <Icon size={20} /> {label}
    </button>
  );

  const renderContent = () => {
    if (activeArea === 'ai') return <AiConsultantView />;
    if (activeArea === 'licitaciones') return <TendersView />;
    if (selectedItem) {
      if (activeArea === 'companias') return <CompanyDetailView company={selectedItem} onBack={() => setSelectedItem(null)} />;
      return <ExpertDetailView expert={selectedItem} onBack={() => setSelectedItem(null)} />;
    }
    switch (activeArea) {
      case 'mercado': return <MarketView />;
      case 'soportes': return <AssetsView />;
      case 'companias': return <CompaniesView onSelect={setSelectedItem} />;
      case 'expertos': return <ExpertsListView onSelect={setSelectedItem} />;
      default: return <MarketView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans selection:bg-yellow-200 selection:text-black">
      <aside className={`fixed inset-y-0 left-0 z-50 w-80 bg-[#ffd900] text-slate-900 transform transition-transform duration-500 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'} print:hidden flex flex-col ring-1 ring-black/5`}>
        <div className="p-12 border-b border-black/10 text-center">
           <h1 className="text-4xl font-black tracking-tighter leading-none uppercase italic">IMU<br/><span className="text-black/60 lowercase tracking-tight not-italic">Intelligence</span></h1>
        </div>
        <nav className="p-8 space-y-4 flex-1 overflow-y-auto custom-scrollbar">
          <NavItem id="mercado" label="01. Mercado" icon={BarChart3} />
          <NavItem id="soportes" label="02. Soportes" icon={Layers} />
          <NavItem id="licitaciones" label="03. Licitaciones" icon={Gavel} />
          <NavItem id="companias" label="04. Compañías" icon={Target} />
          <NavItem id="expertos" label="05. Expertos" icon={MessageSquare} />
          
          <div className="pt-8 mt-8 border-t border-black/10">
             <button onClick={() => setActiveArea('ai')} className={`w-full flex items-center gap-5 px-6 py-5 rounded-[24px] transition-all font-black uppercase text-[9px] tracking-[0.25em] mb-4 ${activeArea === 'ai' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-800 hover:bg-black/5'}`}>
               <BrainCircuit size={20}/> Strat-GPT Hub
             </button>
             <div className="px-2 mt-4 flex justify-center">
                <img 
                  src="https://static.wixstatic.com/media/88e5e3_c20937499861486895bbba1fd101b94e~mv2.png" 
                  alt="Bud Advisors Logo"
                  className="w-full h-auto object-contain rounded-xl mix-blend-multiply opacity-90 contrast-125"
                />
             </div>
          </div>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto h-screen p-6 md:p-20 print:p-0">
        <div className="md:hidden flex justify-between items-center mb-12 bg-white p-6 rounded-[32px] border print:hidden shadow-sm">
           <h1 className="font-black text-slate-900 tracking-tighter uppercase italic text-2xl">IMU Intel</h1>
           <button onClick={() => setSidebarOpen(true)} className="p-4 bg-[#ffd900] text-slate-900 rounded-2xl shadow-xl"><Menu size={24} /></button>
        </div>
        <div className="max-w-[1400px] mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

// --- VISTAS ESPECÍFICAS ---

const MarketView = () => (
  <div className="space-y-12 animate-in fade-in duration-700 pb-20 text-slate-900">
    <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200 pb-8">
      <div>
        <h2 className="text-6xl font-black tracking-tighter leading-none mb-4 uppercase italic font-sans">Market <span className="text-slate-500 not-italic uppercase tracking-normal italic">Analysis</span></h2>
        <p className="text-slate-500 text-xl font-bold tracking-tight italic">Evolución y Forecast de Inversión OOH España.</p>
      </div>
      <div className="bg-slate-900 text-white p-6 rounded-[32px] flex items-center gap-8 shadow-2xl">
        <div className="text-center"><p className="text-[9px] font-black uppercase opacity-50 mb-1 italic">Total Medios 24</p><p className="text-3xl font-black text-[#ffd900] italic">€13.081M</p></div>
        <div className="w-px h-12 bg-slate-700"></div>
        <div className="text-center"><p className="text-[9px] font-black uppercase opacity-50 mb-1 italic">Inversión OOH 24</p><p className="text-3xl font-black text-[#ffd900] italic">€432.0M</p></div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-[40px] p-10 border shadow-sm">
        <h3 className="text-xl font-black uppercase tracking-tighter italic mb-8 flex items-center gap-3"><TrendingUp className="text-[#ffd900]" /> 01. Evolución Inversión Real OOH (M€)</h3>
        <div className="h-[300px] w-full"><ResponsiveContainer><AreaChart data={dataMarketHistory}><defs><linearGradient id="colorOoh" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ffd900" stopOpacity={0.2}/><stop offset="95%" stopColor="#ffd900" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" /><XAxis dataKey="year" tick={{fontSize: 11, fontWeight: 700}} axisLine={false} tickLine={false} /><YAxis tick={{fontSize: 11}} axisLine={false} tickLine={false} /><Tooltip /><Area type="monotone" dataKey="ooh" stroke="#000" strokeWidth={3} fillOpacity={1} fill="url(#colorOoh)" dot={{r: 5, fill: '#000'}} /></AreaChart></ResponsiveContainer></div>
      </div>
      <div className="bg-white rounded-[40px] p-10 border shadow-sm">
        <h3 className="text-xl font-black uppercase tracking-tighter italic mb-8 flex items-center gap-3"><BarChart3 className="text-[#ffd900]" /> 02. Inversión Total Medios Controlados (M€)</h3>
        <div className="h-[300px] w-full"><ResponsiveContainer><BarChart data={dataMarketHistory}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" /><XAxis dataKey="year" tick={{fontSize: 11, fontWeight: 700}} axisLine={false} tickLine={false} /><YAxis tick={{fontSize: 11}} axisLine={false} tickLine={false} /><Tooltip cursor={{fill: '#fcf8e3'}} /><Bar dataKey="totalMedia" fill="#000" radius={[8, 8, 0, 0]} barSize={35} /></BarChart></ResponsiveContainer></div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
        <h3 className="text-xl font-black uppercase tracking-tighter italic mb-10 flex items-center gap-3 text-white"><Clock className="text-[#ffd900]" /> 03. Evolución Futura & Forecast (2030)</h3>
        <div className="h-[250px] w-full"><ResponsiveContainer><LineChart data={dataFutureForecast}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" /><XAxis dataKey="year" tick={{fontSize: 11, fill: '#94a3b8'}} axisLine={false} tickLine={false} /><YAxis tick={{fontSize: 11, fill: '#94a3b8'}} axisLine={false} tickLine={false} /><Tooltip contentStyle={{backgroundColor: '#1e293b', border: 'none'}} /><Line type="stepAfter" dataKey="value" stroke="#ffd900" strokeWidth={4} dot={{r: 6, fill: '#ffd900'}} /></LineChart></ResponsiveContainer></div>
      </div>
      <div className="bg-white rounded-[40px] p-10 border shadow-sm">
        <h3 className="text-xl font-black uppercase tracking-tighter italic mb-8 flex items-center gap-3"><Activity className="text-[#ffd900]" /> 04. Tendencias & Variación (%)</h3>
        <div className="h-[250px] w-full"><ResponsiveContainer><ComposedChart data={dataMarketHistory}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" /><XAxis dataKey="year" tick={{fontSize: 11, fontWeight: 700}} axisLine={false} tickLine={false} /><YAxis tick={{fontSize: 11}} axisLine={false} tickLine={false} /><Tooltip /><Bar dataKey="variation" fill="#e5e7eb" radius={[5, 5, 0, 0]} barSize={25} /><Line type="monotone" dataKey="variation" stroke="#000" strokeWidth={3} dot={{r: 5, fill: '#000'}} /></ComposedChart></ResponsiveContainer></div>
      </div>
    </div>

    <div className="bg-white rounded-[40px] p-10 border shadow-sm">
      <h3 className="text-xl font-black uppercase tracking-tighter italic mb-8 flex items-center gap-3"><ChartIcon className="text-[#ffd900]" /> 05. Evolución de la Inversión en Medios Controlados</h3>
      <div className="h-[300px] w-full"><ResponsiveContainer><LineChart data={dataMarketHistory}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" /><XAxis dataKey="year" tick={{fontSize: 11, fontWeight: 700}} axisLine={false} tickLine={false} /><YAxis tick={{fontSize: 11}} axisLine={false} tickLine={false} /><Tooltip /><Line type="monotone" dataKey="totalMedia" stroke="#000" strokeWidth={4} dot={{r: 6, fill: '#ffd900', stroke: '#000', strokeWidth: 2}} /></LineChart></ResponsiveContainer></div>
    </div>
  </div>
);

const TendersView = () => (
  <div className="space-y-10 animate-in fade-in duration-700">
    <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none mb-4 uppercase italic">Licitaciones <span className="text-slate-500 not-italic uppercase tracking-normal">Control</span></h2>
    <div className="bg-white border border-slate-200 rounded-[40px] overflow-hidden shadow-sm">
       <table className="w-full text-left font-sans"><thead className="bg-slate-900 text-white"><tr><th className="p-6 text-[10px] font-black uppercase tracking-widest italic">Plaza</th><th className="p-6 text-[10px] font-black uppercase tracking-widest italic">Operador</th><th className="p-6 text-[10px] font-black uppercase tracking-widest italic text-center">Vencimiento</th><th className="p-6 text-[10px] font-black uppercase tracking-widest italic text-right">Riesgo</th></tr></thead><tbody className="divide-y divide-slate-100 font-medium">{tendersData.map((t, i) => (<tr key={i} className="hover:bg-yellow-50 transition-colors"><td className="p-6 font-black uppercase italic text-sm">{t.city}</td><td className="p-6 text-xs font-black italic">{t.operator}</td><td className="p-6 text-xs text-center">{t.expiry}</td><td className="p-6 text-right"><span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase ${t.risk.includes('Alto') ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>{t.risk}</span></td></tr>))}</tbody></table>
    </div>
  </div>
);

const AssetsView = () => (
  <div className="space-y-10 animate-in fade-in duration-700">
    <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none mb-4 uppercase italic">Support <span className="text-slate-500 not-italic uppercase tracking-normal">Atlas</span></h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{supportTypes.map((s, i) => (<div key={i} className="bg-white border border-slate-200 rounded-[40px] p-10 hover:shadow-2xl transition-all group"><div className="flex justify-between items-start mb-8"><div className="p-5 bg-slate-900 text-white rounded-3xl group-hover:bg-[#ffd900] group-hover:text-black transition-colors"><Building2 size={32} /></div><p className="text-4xl font-black text-slate-900 italic">{s.share}</p></div><h3 className="text-2xl font-black italic uppercase mb-4">{s.name}</h3><div className="bg-yellow-50 p-6 rounded-3xl border border-yellow-200 italic"><p className="text-slate-900 text-sm font-bold">"{s.insight}"</p></div></div>))}</div>
  </div>
);

const CompaniesView = ({ onSelect }) => (
  <div className="space-y-10 animate-in fade-in duration-700">
    <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none mb-4 uppercase italic">M&A <span className="text-slate-500 not-italic uppercase tracking-normal italic">Targets</span></h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{companyTargets.map((c, i) => (<div key={i} onClick={() => onSelect(c)} className="bg-white border border-slate-200 rounded-[40px] p-10 hover:shadow-2xl transition-all cursor-pointer group"><div className="flex justify-between items-center mb-8"><span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-100">{c.status}</span><p className="text-xs font-black italic">Val: {c.value}</p></div><h3 className="text-3xl font-black italic uppercase text-slate-900 mb-4">{c.name}</h3><p className="text-slate-500 font-medium mb-8 leading-relaxed">{c.desc}</p></div>))}</div>
  </div>
);

const ExpertsListView = ({ onSelect }) => (
  <div className="space-y-10 animate-in fade-in duration-700 pb-20">
    <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none mb-4 uppercase italic font-sans">Expert <span className="text-slate-500 not-italic uppercase tracking-normal">Vision</span></h2>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {expertInterviews.map((expert) => (
        <div key={expert.id} onClick={() => onSelect(expert)} className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm hover:shadow-xl hover:border-black transition-all cursor-pointer group relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:rotate-12 transition-all duration-700"><Quote size={120} fill="currentColor" /></div>
          <div className="flex items-center gap-4 mb-6"><div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-xl italic group-hover:bg-[#ffd900] group-hover:text-black transition-colors">{expert.company[0]}</div><div><h4 className="text-lg font-black leading-tight group-hover:text-black transition-colors">{expert.name}</h4><p className="text-[10px] font-black uppercase mt-1 opacity-50">{expert.role}</p></div></div>
          <p className="text-sm font-medium text-slate-600 leading-relaxed italic line-clamp-3">"{expert.tesis}"</p>
          <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center text-slate-900 font-black text-[10px] uppercase italic">Leer Análisis Completo <ArrowRight size={16} /></div>
        </div>
      ))}
    </div>
  </div>
);

const ExpertDetailView = ({ expert, onBack }) => (
  <div className="max-w-4xl mx-auto bg-white rounded-[60px] shadow-2xl border border-slate-100 overflow-hidden animate-in slide-in-from-right-10 pb-20">
    <div className="p-10 bg-slate-900 text-white flex justify-between items-center font-sans"><button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-black text-xs uppercase tracking-widest"><ChevronLeft size={20} /> Volver</button><div className="flex items-center gap-2 bg-[#ffd900] text-black px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest italic"><BookOpen size={14}/> Exclusive Content</div></div>
    <div className="p-10 md:p-20">
      <div className="flex flex-col md:flex-row gap-10 items-start mb-16 border-b pb-16 border-slate-100"><div className="w-32 h-32 bg-slate-100 rounded-[40px] flex items-center justify-center font-black text-5xl text-slate-900 italic shadow-xl">{expert.company[0]}</div><div><p className="text-slate-900 font-black uppercase text-xs tracking-[0.4em] mb-4 italic">{expert.role} de {expert.company}</p><h2 className="text-7xl font-black text-slate-900 tracking-tighter leading-[0.8] mb-6 uppercase italic font-sans">{expert.name}</h2><div className="flex gap-2 mt-4 flex-wrap">{expert.tags && expert.tags.map((t, idx) => (<span key={idx} className="bg-slate-900 text-white text-[9px] font-black uppercase px-4 py-1.5 rounded-full">{t}</span>))}</div></div></div>
      <article className="prose prose-slate max-w-none"><div className="bg-yellow-50 border-l-[12px] border-[#ffd900] p-12 rounded-r-[50px] mb-16 italic shadow-inner"><Quote className="text-yellow-200 mb-6" size={50} fill="currentColor" /><p className="text-slate-900 font-black text-3xl tracking-tight leading-tight">"{expert.tesis}"</p></div><div className="space-y-12 text-slate-700 text-2xl leading-[1.6] font-medium selection:bg-yellow-200">{expert.fullContent && expert.fullContent.split('\n\n').map((para, i) => (<p key={i} className="first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-black">{para}</p>))}</div></article>
    </div>
  </div>
);

const CompanyDetailView = ({ company, onBack }) => (
  <div className="max-w-5xl mx-auto bg-white rounded-[60px] shadow-2xl border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-10 pb-20">
    <div className="p-10 bg-slate-900 text-white flex justify-between items-center"><button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-black text-xs uppercase tracking-widest"><ChevronLeft size={20} /> Volver</button><div className="bg-[#ffd900] text-black px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest italic font-sans">Company Profile</div></div>
    <div className="p-10 md:p-20 font-sans"><h2 className="text-7xl font-black tracking-tighter italic uppercase leading-none mb-6">{company.name}</h2><p className="text-2xl text-slate-500 font-medium italic mb-10">{company.desc}</p><div className="p-10 bg-slate-900 rounded-[40px] text-white"><h4 className="text-[#ffd900] font-black uppercase text-[10px] mb-4">Strategic Valuation</h4><p className="text-4xl font-black italic">{company.value || company.val}</p></div></div>
  </div>
);

const AiConsultantView = () => (
  <div className="max-w-4xl mx-auto h-[750px] flex flex-col bg-white rounded-[50px] shadow-2xl overflow-hidden ring-1 ring-slate-200">
    <div className="p-10 border-b bg-slate-900 text-white flex items-center gap-6 font-sans"><div className="bg-[#ffd900] p-4 rounded-3xl text-black shadow-xl shadow-yellow-500/10"><BrainCircuit size={32} /></div><div><h3 className="font-black text-2xl tracking-tighter uppercase italic leading-none">Strat-GPT <span className="text-[#ffd900] not-italic">ADVISOR</span></h3><p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em] mt-3">Advanced Intelligence Hub</p></div></div>
    <div className="flex-1 overflow-y-auto p-10 bg-slate-50/50 space-y-8"><div className="bg-white border p-6 rounded-[32px] text-sm font-bold shadow-sm max-w-[85%] font-sans">Bienvenido al Hub de Inteligencia de Bud Advisors. Análisis de M&A y Mercado en tiempo real.</div></div>
    <div className="p-8 bg-white border-t flex gap-4"><input type="text" placeholder="Analiza el potencial de adquisición de Exterior Plus..." className="flex-1 bg-slate-50 border-none rounded-3xl px-8 py-5 text-sm font-bold outline-none ring-offset-2 focus:ring-2 focus:ring-yellow-400 transition-all" /><button className="bg-[#ffd900] text-slate-900 p-5 rounded-3xl hover:bg-[#ffed4d] transition-all shadow-xl"><Send size={24} /></button></div>
  </div>
);

export default App;