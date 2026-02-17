import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, ComposedChart 
} from 'recharts';
import { 
  TrendingUp, Map, Users, Target, ChevronRight, Menu, X, 
  LayoutDashboard, Building2, BarChart3, Briefcase, 
  ArrowLeft, CheckCircle2, AlertTriangle, MonitorPlay,
  Sparkles, Bot, Send, Loader2, FileText, BookOpen, Printer,
  Coins, Landmark, Search, Clock, ShieldCheck, Globe, FileDown, Eye,
  Zap, BrainCircuit, MessageSquare, Layers, Radio, History,
  UserCheck, Quote, ChevronLeft
} from 'lucide-react';

// --- DATA SETS (CONTENIDO INTEGRAL DE ENTREVISTAS) ---

const allExpertInterviews = [
  { 
    id: "agata-romo",
    name: "Ágata Romo", 
    role: "Directora de Marketing", 
    company: "Exterior Plus", 
    keyPoint: "Atención vs Fragmentación",
    tesis: "El medio Exterior gana la batalla por la atención frente a la fragmentación digital.",
    fullContent: `Vivimos un momento de transformación profunda en el ecosistema publicitario. Mientras que el entorno digital sufre una saturación sin precedentes y una creciente fragmentación de audiencias, Exterior se refuerza como un medio real, no intrusivo y contextual. 

La digitalización no es solo poner pantallas, es entender el contexto del usuario. En Exterior Plus apostamos por la medición cualitativa. No se trata solo de cuánta gente pasa por delante, sino de cuánta gente realmente nos presta atención. El OOH es hoy el 'primer medio' en términos de impacto visual puro y memoria de marca.`,
    tags: ["Atención", "Contexto", "Eficacia"]
  },
  { 
    id: "borja-balanzat",
    name: "Borja Balanzat", 
    role: "Director General", 
    company: "Global España", 
    keyPoint: "R-evolución Digital",
    tesis: "La R-evolución es digitalizar metro y tren (Circuito Brighter).",
    fullContent: `El año pasado hablábamos de R-evolucionar el medio. Hoy esa transformación es un éxito imparable. Acabamos de inaugurar la primera pantalla digital en Metro Barcelona (Sagrera) con tecnología de última generación. 

Nuestro patrimonio digital supera ya las 900 pantallas, con el circuito Brighter (250 mupis) como punta de lanza. La medición con Geobus y Geostation nos permite demostrar que el DOOH es el segundo medio digital más eficiente en generación de ventas tanto a corto como a largo plazo. Medir no es solo contar, es demostrar valor.`,
    tags: ["Digitalización", "Medición", "Metro"]
  },
  { 
    id: "alberto-mora",
    name: "Alberto Mora", 
    role: "Director Comercial", 
    company: "Exteria Group", 
    keyPoint: "Sabiduría Humana + Data",
    tesis: "Agilidad sin ser autómatas. El equilibrio está en la sabiduría humana.",
    fullContent: `El mantra de 'lo necesito para ayer' nos obliga a acelerar procesos, pero no debemos convertirnos en autómatas. En Exteria creemos que la sabiduría personal debe llenar nuestras planificaciones, apoyada siempre en herramientas de mercado como AMIC, Geomex o Tom Micro. 

Ofrecemos un servicio de calidad que permite a exclusivistas medianos competir al más alto nivel. La clave es la gestión eficiente: herramientas adecuadas para no sacrificar el tiempo de análisis que cada proyecto merece.`,
    tags: ["Planificación", "Agilidad", "Talento"]
  },
  { 
    id: "pedro-fernandez",
    name: "Pedro Fernández", 
    role: "Dir. Producto y Marketing", 
    company: "Clear Channel", 
    keyPoint: "Disponibilidad Mental",
    tesis: "La Disponibilidad Mental es clave. Los CEP definen la probabilidad de compra.",
    fullContent: `Los avances en medición y automatización han eclipsado a veces los valores tradicionales de Exterior. Debemos defender la Cobertura y la Notoriedad bajo una mirada fresca: la Disponibilidad Mental. 

Los Category Entry Points (CEP) son la base. Exterior cuenta con palancas únicas: Disponibilidad física (proximidad al punto de venta), Frecuencia del mensaje (no intrusivo) y Relevancia Contextual. El OOH es el medio que aporta un mayor efecto 'priming' a los medios digitales.`,
    tags: ["Branding", "CEP", "Efecto Priming"]
  },
  { 
    id: "carlos-valiente",
    name: "Carlos Valiente", 
    role: "Director General", 
    company: "014 Media", 
    keyPoint: "Phygital Bridge",
    tesis: "Enfoque Phygital: digitalizar datos offline para enriquecer campañas online.",
    fullContent: `En un mundo de tiempos líquidos, Exterior es el medio sólido. No depende del scroll, sino de la vida real. En 014 Media apostamos por el valor diferencial: recogemos y digitalizamos datos del mundo offline para alimentar el ecosistema digital. 

El DOOH no es solo un escaparate, es un punto de contacto activo en el journey. La digitalización no se limita a las pantallas, ha transformado la forma de operar, planificar y medir resultados.`,
    tags: ["Phygital", "Omnicanalidad", "Datos"]
  },
  { 
    id: "diego-delgado",
    name: "Diego Delgado", 
    role: "Head of Sales", 
    company: "Logan", 
    keyPoint: "Confianza mediante el Dato",
    tesis: "Fluxxoh predice flujos de audiencia. El dato móvil genera confianza.",
    fullContent: `La digitalización ha cambiado el paradigma: las posiciones ya no son fijas. Para ganar la confianza de las marcas, necesitamos herramientas de medición precisas. 

En Logan hemos desarrollado Fluxxoh, que combina datos de navegación y consumo digital con datos geoespaciales móviles. Esto nos permite fijar clústeres de audiencia y prever flujos de movimiento, ofreciendo a las marcas el impacto cualificado que realmente buscan.`,
    tags: ["Big Data", "Audiencias", "Mobile"]
  },
  { 
    id: "marta-rodriguez",
    name: "Marta Rodríguez", 
    role: "Directora General", 
    company: "Gran Pantalla", 
    keyPoint: "Conexión Estratégica",
    tesis: "Optimizar la conexión antes que el alcance. SkyLed permite segmentación.",
    fullContent: `¿Dónde estará mi target? Tradicionalmente se buscaba visibilidad masiva, pero hoy eso es ineficiente. Lo que importa es alcanzar al público de manera precisa. 

Nuestro circuito SkyLed de gran formato se ubica en zonas estratégicas (acceso restringido a vehículos eléctricos, intercambiadores). No se trata de ocupar espacios, sino de estar donde la gente es más sensible a la información. Menos es más cuando el público es el correcto.`,
    tags: ["Targeting", "SkyLed", "Eficiencia"]
  },
  { 
    id: "gorka-pagaza",
    name: "Gorka Pagazaurtundia", 
    role: "Director Comercial", 
    company: "Callao City Lights", 
    keyPoint: "Ubicación Premium",
    tesis: "Ubicación, ubicación, ubicación. Gran Vía asegura visibilidad masiva.",
    fullContent: `La Gran Vía de Madrid es la segunda calle más visitada de Europa. Estar aquí asegura tráfico e impacto. Pero el éxito requiere más: una creatividad pensada para el medio. 

Las piezas 3D y el copy contextualizado en el momento oportuno multiplican la efectividad. Callao City Lights es el epicentro del DOOH en España, vinculando marcas con el mundo del ocio, el teatro y la cultura en un entorno único.`,
    tags: ["Premium", "Creatividad 3D", "Madrid"]
  },
  { 
    id: "antonio-aguayo",
    name: "Antonio Aguayo", 
    role: "Socio Director", 
    company: "H2O", 
    keyPoint: "Crecimiento Sostenido",
    tesis: "Optimismo real apoyado en la digitalización y planificación rigurosa.",
    fullContent: `El medio Exterior afronta el futuro con un optimismo fundamentado. El crecimiento es constante, impulsado por la conversión de soportes analógicos a digitales de alta resolución. 

Desde H2O defendemos que este crecimiento debe ir acompañado de una planificación que entienda las nuevas métricas. La capacidad de segmentación del DOOH está atrayendo a marcas que antes solo invertían en digital puro.`,
    tags: ["Optimismo", "Evolución", "Soportes"]
  },
  { 
    id: "pablo-berrondo",
    name: "Pablo Berrondo", 
    role: "CSO", 
    company: "Beyup", 
    keyPoint: "Visibilidad Real",
    tesis: "Pasar del OTS a la visibilidad real. La medición es la base de la inversión.",
    fullContent: `El gran reto es la medición real. Ya no basta con el Opportunity to See (OTS); los anunciantes exigen datos de visibilidad comprobada. 

En Beyup trabajamos para que el DOOH hable el mismo lenguaje que otros medios digitales. La integración de tecnologías de tracking nos permite certificar qué ojos han estado realmente sobre la pantalla, eliminando la incertidumbre del medio exterior tradicional.`,
    tags: ["Métricas", "Certificación", "ROI"]
  },
  { 
    id: "carlos-pestana",
    name: "Carlos Pestaña", 
    role: "Managing Director", 
    company: "Wildstone Spain", 
    keyPoint: "Patrimonio Interurbano",
    tesis: "Valor en la propiedad del activo y su digitalización de alta calidad.",
    fullContent: `Estamos desbloqueando el poder del DOOH en las vías interurbanas. El modelo de Wildstone se basa en la propiedad de la infraestructura. 

Al controlar el suelo y el soporte, podemos asegurar inversiones a largo plazo en tecnología LED de máxima calidad. Las carreteras son el nuevo territorio de la gran pantalla digital, ofreciendo coberturas masivas fuera de los centros urbanos saturados.`,
    tags: ["Infraestructura", "Interurbano", "LED"]
  },
  { 
    id: "sofia-ruiz",
    name: "Sofía Ruiz Rincón", 
    role: "Dir. Marketing y Com.", 
    company: "Global España", 
    keyPoint: "Ciudad como Lienzo",
    tesis: "La ciudad como lienzo: experiencias memorables que emocionan.",
    fullContent: `La Publicidad Exterior ha evolucionado hacia una forma de arte urbano. Las marcas ya no solo quieren destacar, quieren interactuar con el entorno. 

Campañas como la 3D de Fuze Tea en Metro Barcelona o las experiencias inmersivas de Netflix transforman espacios cotidianos en recuerdos perdurables. Cuando la publicidad se integra con el arte urbano, genera un respeto y una emoción que el usuario agradece.`,
    tags: ["Experiencial", "Arte Urbano", "Storytelling"]
  }
];

// --- DATOS MERCADO ---
const dataMarketTotal = [
  { year: '2021', total: 11667.4, variation: 8.4 },
  { year: '2022', total: 12274.7, variation: 5.2 },
  { year: '2023', total: 12603.3, variation: 2.7 },
  { year: '2024', total: 13081.8, variation: 3.8 },
  { year: '2025', total: 12745.4, variation: -2.6 },
];

const maTargets = [
  { name: "Clear Channel Esp", status: "Adquirido", owner: "Atresmedia", value: "€115M", risk: "Bajo" },
  { name: "Exterior Plus", status: "Target", owner: "Fondo", value: "Premium", risk: "Medio" },
  { name: "Global España", status: "Estratégico", owner: "Global", value: "Líder Transporte", risk: "Bajo" },
  { name: "Wildstone", status: "Infra", owner: "Capital", value: "Patrimonio", risk: "Mínimo" },
];

// --- CONFIGURACIÓN IA ---
const getApiKey = () => {
  try {
    return (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_OPENAI_API_KEY) 
           || (typeof process !== 'undefined' && process.env && process.env.VITE_OPENAI_API_KEY) 
           || "";
  } catch (e) { return ""; }
};
const apiKey = getApiKey();
const SYSTEM_PROMPT = `Eres el CSO de IMU Group. Experto en M&A OOH. Conoces las 15 tesis de expertos (Romo, Balanzat, etc.). Atresmedia compró Clear Channel por €115M. JCDecaux domina Barna hasta 2035.`;

// --- VISTAS ---

const ExpertsView = ({ onSelect }) => (
  <div className="space-y-8 animate-in fade-in duration-700 pb-20">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
      <div>
        <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none mb-4 uppercase italic">Tesis de <span className="text-blue-600 not-italic uppercase">Expertos</span></h2>
        <p className="text-slate-500 text-xl font-bold tracking-tight italic">Knowledge Base: Repositorio Estratégico 2024-2025.</p>
      </div>
      <div className="bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3">
         <UserCheck size={20} />
         <span className="text-[10px] font-black uppercase tracking-[0.2em]">{allExpertInterviews.length} Líderes</span>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {allExpertInterviews.map((expert, i) => (
        <div 
          key={i} 
          onClick={() => onSelect(expert)}
          className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm hover:shadow-xl hover:border-blue-500 transition-all duration-500 group relative overflow-hidden cursor-pointer"
        >
          <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-10 group-hover:rotate-12 transition-all duration-700"><Quote size={120} fill="currentColor" /></div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-xl italic group-hover:bg-blue-600 transition-colors">{expert.company[0]}</div>
            <div>
              <h4 className="text-lg font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{expert.name}</h4>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{expert.role}</p>
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">{expert.company}</p>
            </div>
          </div>

          <div className="mb-6">
             <span className="text-[9px] font-black bg-blue-50 text-blue-700 px-3 py-1 rounded-full uppercase tracking-tighter">Focus: {expert.keyPoint}</span>
          </div>

          <p className="text-sm font-medium text-slate-600 leading-relaxed italic">"{expert.tesis}"</p>

          <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center text-blue-600">
             <span className="text-[10px] font-black uppercase tracking-widest">Leer Entrevista Completa</span>
             <ArrowRight size={16} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ExpertDetailView = ({ expert, onBack }) => (
  <div className="max-w-4xl mx-auto bg-white rounded-[60px] shadow-2xl border border-slate-100 overflow-hidden animate-in slide-in-from-right-10 duration-500">
    <div className="p-10 bg-slate-900 text-white flex justify-between items-center">
       <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-black text-xs uppercase tracking-widest">
         <ChevronLeft size={20} /> Volver al Repositorio
       </button>
       <div className="bg-blue-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">Deep Dive Strategist</div>
    </div>

    <div className="p-10 md:p-20">
      <div className="flex flex-col md:flex-row gap-10 items-start mb-16">
        <div className="w-32 h-32 bg-slate-100 rounded-[40px] flex items-center justify-center font-black text-5xl text-slate-900 italic border-4 border-white shadow-xl">{expert.company[0]}</div>
        <div>
           <p className="text-blue-600 font-black uppercase text-xs tracking-[0.3em] mb-2">{expert.role} de {expert.company}</p>
           <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">{expert.name}</h2>
           <div className="flex gap-2 mt-6">
             {expert.tags.map((t, idx) => (
               <span key={idx} className="bg-slate-50 text-slate-400 text-[9px] font-black uppercase px-3 py-1 rounded-lg border">{t}</span>
             ))}
           </div>
        </div>
      </div>

      <article className="prose prose-slate max-w-none prose-p:text-xl prose-p:leading-relaxed prose-p:text-slate-600 prose-p:font-medium">
         <div className="bg-blue-50 border-l-8 border-blue-600 p-10 rounded-r-[40px] mb-12 italic">
            <Quote className="text-blue-200 mb-4" size={40} />
            <p className="text-blue-900 font-bold text-2xl tracking-tight leading-snug">"{expert.tesis}"</p>
         </div>

         <div className="space-y-8 text-slate-700">
            {expert.fullContent.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
         </div>
      </article>

      <div className="mt-20 pt-10 border-t border-slate-50 flex justify-between items-center opacity-30 text-[10px] font-black uppercase tracking-widest text-slate-400">
         <span>IMU Intelligence Lab • Expert Repository</span>
         <span>© 2026</span>
      </div>
    </div>
  </div>
);

const DashboardView = () => (
  <div className="space-y-8 animate-in fade-in duration-700">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
      <div>
        <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none mb-4 uppercase italic">Intel Lab <span className="text-blue-600 not-italic uppercase">2026</span></h2>
        <p className="text-slate-500 text-xl font-bold tracking-tight">Datos InfoAdex 2025 + Proyecciones ML.</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white border rounded-[32px] p-8 group hover:border-blue-500 transition-all">
         <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-2 text-slate-400 tracking-widest">Market '24</p>
         <h4 className="text-4xl font-black tracking-tighter italic font-sans uppercase leading-none text-slate-900">€13.081M</h4>
         <p className="text-xs font-bold mt-4 text-emerald-500">+3.8% Growth</p>
      </div>
      <div className="bg-white border rounded-[32px] p-8 group hover:border-blue-500 transition-all">
         <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-2 text-slate-400 tracking-widest">OOH Vol '24</p>
         <h4 className="text-4xl font-black tracking-tighter italic font-sans uppercase leading-none text-blue-600">€432.0M</h4>
         <p className="text-xs font-bold mt-4 text-slate-500">Resiliente</p>
      </div>
      <div className="bg-white border rounded-[32px] p-8 group hover:border-blue-500 transition-all">
         <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-2 text-slate-400 tracking-widest">M&A Deal</p>
         <h4 className="text-4xl font-black tracking-tighter italic font-sans uppercase leading-none text-slate-900">€115.0M</h4>
         <p className="text-xs font-bold mt-4 text-slate-900 italic font-sans uppercase">Atresmedia Deal</p>
      </div>
      <div className="bg-slate-900 text-white rounded-[32px] p-8 relative overflow-hidden group">
         <BrainCircuit className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5 group-hover:scale-110 transition-transform" />
         <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-1 opacity-50 tracking-widest">Prediction</p>
         <h4 className="text-3xl font-black italic">$567M</h4>
         <p className="text-xs font-bold mt-2 text-blue-400 tracking-tighter italic">Forecast 2030</p>
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
       <div className="bg-white rounded-[40px] p-10 border shadow-sm">
          <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-8">Inversión vs Variación</h3>
          <div className="h-[350px] w-full">
             <ResponsiveContainer>
                <ComposedChart data={dataMarketTotal}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="total" fill="#0f172a" radius={[10, 10, 0, 0]} barSize={40} />
                  <Line type="monotone" dataKey="variation" stroke="#3b82f6" strokeWidth={4} dot={{r: 6, fill: '#3b82f6'}} />
                </ComposedChart>
             </ResponsiveContainer>
          </div>
       </div>
       <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
          <Target className="absolute -right-20 -bottom-20 w-80 h-80 text-blue-500/10" />
          <h3 className="text-3xl font-black italic tracking-tighter mb-8 uppercase leading-none italic uppercase">M&A Strategy <br/><span className="text-blue-500 not-italic tracking-normal">target map</span></h3>
          <div className="space-y-3">
             {maTargets.map((m, i) => (
               <div key={i} className="flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all cursor-default group">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-sm italic">{m.name[0]}</div>
                     <div><p className="text-sm font-black italic">{m.name}</p><p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{m.status}</p></div>
                  </div>
                  <div className="text-right"><p className="text-[9px] font-black px-3 py-1 rounded-full uppercase bg-white/10 text-blue-400">{m.risk.split(' ')[0]}</p><p className="text-xs font-bold text-white italic">{m.value}</p></div>
               </div>
             ))}
          </div>
       </div>
    </div>
  </div>
);

const ReportView = () => (
  <div className="max-w-5xl mx-auto bg-white p-10 md:p-24 rounded-[60px] shadow-2xl border border-slate-100 animate-in slide-in-from-bottom-8 duration-1000 print:shadow-none print:border-none print:p-0">
    <div className="flex justify-end gap-3 mb-16 print:hidden"><button onClick={() => window.print()} className="bg-slate-900 text-white px-8 py-4 rounded-3xl hover:bg-blue-600 transition-all font-black text-xs uppercase tracking-widest flex items-center gap-2"><FileDown size={18}/> Export strategy</button></div>
    <div className="border-b-[12px] border-slate-900 pb-16 mb-16 relative"><h1 className="text-8xl font-black text-slate-900 tracking-tighter leading-[0.8] mb-8 uppercase italic tracking-tighter">The<br/>Strategy<br/><span className="text-blue-600 not-italic uppercase tracking-normal">IMU 2026</span></h1></div>
    <article className="prose prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:text-slate-600 text-slate-700 font-medium">
      <h2 className="text-4xl border-b-2 pb-6 mb-10 uppercase italic">0.1. Strategic Context</h2>
      <p className="text-2xl font-black text-slate-900 leading-tight italic">Entrada en España vía M&A: arbitraje entre riesgo concesional y patrimonio propio.</p>
    </article>
  </div>
);

const AiConsultantView = () => {
  const [messages, setMessages] = useState([{ role: 'assistant', text: 'Strat-GPT Activo. He integrado InfoAdex 2026 y 15 tesis de directivos. ¿Analizamos un target?' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages]);
  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    if (!apiKey) { setMessages(prev => [...prev, { role: 'assistant', text: "⚠️ Clave de API no detectada en Netlify." }]); return; }
    setLoading(true);
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
        body: JSON.stringify({ model: "gpt-4o", messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages.map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.text })), { role: "user", content: userMessage }] })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', text: data.choices[0].message.content }]);
    } catch (error) { setMessages(prev => [...prev, { role: 'assistant', text: "Error de conexión." }]); } finally { setLoading(false); }
  };
  return (
    <div className="max-w-4xl mx-auto h-[750px] flex flex-col bg-white rounded-[50px] shadow-2xl overflow-hidden ring-1 ring-slate-200">
      <div className="p-10 border-b bg-slate-900 text-white flex items-center justify-between"><div className="flex items-center gap-6"><div className="bg-blue-600 p-4 rounded-3xl shadow-xl"><BrainCircuit size={32} /></div><div><h3 className="font-black text-2xl tracking-tighter uppercase italic leading-none">Strat-GPT <span className="text-blue-500 not-italic">IMU</span></h3><p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.4em] mt-3">Advanced Intelligence</p></div></div></div>
      <div className="flex-1 overflow-y-auto p-10 bg-slate-50/50 space-y-8" ref={scrollRef}>{messages.map((msg, idx) => (<div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] p-6 rounded-[32px] text-sm font-bold leading-relaxed ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none shadow-blue-600/20' : 'bg-white text-slate-800 border-none rounded-tl-none shadow-slate-900/5'}`}>{msg.text}</div></div>))} {loading && <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse flex items-center gap-3"><Loader2 className="animate-spin" size={14}/> Cruzando tesis de expertos...</div>}</div>
      <div className="p-8 bg-white border-t flex gap-4"><input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="¿Es el momento de adquirir activos interurbanos?" className="flex-1 bg-slate-50 border-none rounded-3xl px-8 py-5 text-sm font-bold outline-none focus:ring-4 focus:ring-blue-100 transition-all" /><button onClick={handleSendMessage} className="bg-slate-900 text-white p-5 rounded-3xl hover:bg-blue-600 transition-all shadow-xl"><Send size={24} /></button></div>
    </div>
  );
};

const App = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  const NavItem = ({ id, label, icon: Icon }) => (
    <button 
      onClick={() => { setActiveView(id); setSelectedExpert(null); setSidebarOpen(false); }} 
      className={`w-full flex items-center gap-5 px-6 py-5 rounded-[24px] transition-all font-black uppercase text-[10px] tracking-[0.25em] ${activeView === id ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/40 translate-x-2' : 'text-slate-500 hover:text-white hover:bg-slate-800'}`}
    >
      <Icon size={20} /> {label}
    </button>
  );

  const renderView = () => {
    if (selectedExpert) {
      return <ExpertDetailView expert={selectedExpert} onBack={() => setSelectedExpert(null)} />;
    }
    switch (activeView) {
      case 'dashboard': return <DashboardView />;
      case 'report': return <ReportView />;
      case 'experts': return <ExpertsView onSelect={setSelectedExpert} />;
      case 'ai': return <AiConsultantView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans selection:bg-blue-100">
      <aside className={`fixed inset-y-0 left-0 z-50 w-80 bg-slate-900 text-white transform transition-transform duration-500 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'} print:hidden`}>
        <div className="p-12 border-b border-slate-800"><h1 className="text-4xl font-black tracking-tighter leading-none uppercase italic">IMU<br/><span className="text-blue-500 lowercase tracking-tight not-italic">Intelligence</span></h1><p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.5em] mt-4 italic">by bud consultancy</p></div>
        <nav className="p-8 space-y-4">
          <NavItem id="dashboard" label="The Console" icon={LayoutDashboard} />
          <NavItem id="report" label="The Strategy" icon={FileText} />
          <NavItem id="experts" label="Expert Tesis" icon={MessageSquare} />
          <div className="pt-8 mt-8 border-t border-slate-800"><NavItem id="ai" label="Strat-GPT" icon={BrainCircuit} /></div>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto h-screen p-6 md:p-20 print:p-0">
        <div className="md:hidden flex justify-between items-center mb-12 bg-white p-6 rounded-[32px] border print:hidden shadow-sm"><h1 className="font-black text-slate-900 tracking-tighter uppercase italic text-2xl leading-none">IMU Intel</h1><button onClick={() => setSidebarOpen(true)} className="p-4 bg-slate-900 text-white rounded-2xl shadow-xl"><Menu size={24} /></button></div>
        <div className="max-w-[1400px] mx-auto">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;