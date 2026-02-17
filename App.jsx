import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, ComposedChart 
} from 'recharts';
import { 
  TrendingUp, Map, Users, Target, ChevronRight, Menu, X, 
  LayoutDashboard, Building2, BarChart3, Briefcase, 
  ArrowRight, CheckCircle2, AlertTriangle, MonitorPlay,
  Sparkles, Bot, Send, Loader2, FileText, BookOpen, Printer,
  Coins, Landmark, Search, Clock, ShieldCheck, Globe, FileDown, Eye,
  Zap, BrainCircuit, MessageSquareQuote, Layers, Radio, History,
  UserCheck, Quote
} from 'lucide-react';

// --- DATA SETS ACTUALIZADOS ---

const dataMarketTotal = [
  { year: '2021', total: 11667.4, variation: 8.4 },
  { year: '2022', total: 12274.7, variation: 5.2 },
  { year: '2023', total: 12603.3, variation: 2.7 },
  { year: '2024', total: 13081.8, variation: 3.8 },
  { year: '2025', total: 12745.4, variation: -2.6 },
];

const maTargets = [
  { name: "Clear Channel Esp", status: "Adquirido", owner: "Atresmedia", value: "€115M", risk: "Bajo (Integrado)" },
  { name: "Exterior Plus", status: "Target", owner: "Fondo", value: "Premium", risk: "Medio (Contrato AENA)" },
  { name: "Global España", status: "Estratégico", owner: "Global", value: "Metro/Tren", risk: "Bajo (Liderazgo)" },
  { name: "Wildstone", status: "Infra", owner: "Capital", value: "Patrimonio", risk: "Mínimo (Propietario)" },
];

const allExpertInterviews = [
  { 
    name: "Ágata Romo", 
    role: "Directora de Marketing", 
    company: "Exterior Plus", 
    tesis: "El medio Exterior gana la batalla por la atención frente a la fragmentación digital. Es un medio real, no intrusivo y contextual.",
    keyPoint: "Atención vs Fragmentación"
  },
  { 
    name: "Alberto Mora", 
    role: "Director Comercial", 
    company: "Exteria Group", 
    tesis: "Agilidad sin ser autómatas. El equilibrio está en la sabiduría humana apoyada en herramientas de mercado (AMIC, Geomex).",
    keyPoint: "Sabiduría Humana + Data"
  },
  { 
    name: "Borja Balanzat", 
    role: "Director General", 
    company: "Global España", 
    tesis: "Digitalización masiva: el circuito Brighter y la medición con Geobus/Geostation demuestran que el DOOH es el motor de ventas.",
    keyPoint: "R-evolución Digital"
  },
  { 
    name: "Pedro Fernández Sanz", 
    role: "Dir. Producto y Marketing", 
    company: "Clear Channel", 
    tesis: "La Disponibilidad Mental es clave. Los CEP (Category Entry Points) definen la probabilidad de que el consumidor piense en la marca.",
    keyPoint: "Disponibilidad Mental"
  },
  { 
    name: "Carlos Valiente", 
    role: "Director General", 
    company: "014 Media", 
    tesis: "Enfoque Phygital: recogemos datos offline para enriquecer campañas online. El DOOH es un punto de contacto activo en el journey.",
    keyPoint: "Phygital Bridge"
  },
  { 
    name: "Antonio Aguayo", 
    role: "Socio Director", 
    company: "H2O", 
    tesis: "Exterior crece de forma sostenida apoyado en la digitalización. El optimismo es real pero requiere de una planificación rigurosa.",
    keyPoint: "Crecimiento Sostenido"
  },
  { 
    name: "Marta Rodríguez", 
    role: "Directora General", 
    company: "Gran Pantalla", 
    tesis: "Optimizar la conexión antes que maximizar el alcance. SkyLed permite segmentación estratégica donde la gente es más sensible.",
    keyPoint: "Conexión Estratégica"
  },
  { 
    name: "Diego Delgado", 
    role: "Head of Sales", 
    company: "Logan", 
    tesis: "Fluxxoh predice flujos de audiencia cualificados. El uso del dato móvil genera la confianza que las marcas necesitan en DOOH.",
    keyPoint: "Confianza mediante el Dato"
  },
  { 
    name: "Gorka Pagazaurtundia", 
    role: "Director Comercial", 
    company: "Callao City Lights", 
    tesis: "Ubicación, ubicación, ubicación. Estar en Gran Vía asegura impacto masivo, especialmente con creatividades 3D y DCO.",
    keyPoint: "Ubicación Premium"
  },
  { 
    name: "Álvaro Mayol", 
    role: "General Manager", 
    company: "Taptap Digital", 
    tesis: "Transformación del DOOH conectando datos masivos con resultados de negocio. La medición de atribución es el reto actual.",
    keyPoint: "Atribución de Resultados"
  },
  { 
    name: "Pablo Berrondo", 
    role: "CSO", 
    company: "Beyup by Geoo", 
    tesis: "El gran reto es pasar del OTS (Opportunity to See) a la visibilidad real comprobada. La medición real es la base de la inversión.",
    keyPoint: "Métricas de Visibilidad"
  },
  { 
    name: "Juanjo Armario", 
    role: "Resp. Comercial", 
    company: "Súper 8 Media", 
    tesis: "La espectacularidad y la innovación en los soportes icónicos multiplican el recuerdo de marca y el impacto visual único.",
    keyPoint: "Soportes Icónicos"
  },
  { 
    name: "Carlos Pestaña", 
    role: "Managing Director", 
    company: "Wildstone Spain", 
    tesis: "Desbloqueando el poder del DOOH interurbano. El valor reside en la propiedad del activo y su digitalización de alta calidad.",
    keyPoint: "Patrimonio Interurbano"
  },
  { 
    name: "Cristina Martín", 
    role: "CEO", 
    company: "Bidscom", 
    tesis: "Necesidad de métricas unificadas. En un momento de transformación profunda, estandarizar la medición es vital para escalar.",
    keyPoint: "Métricas Unificadas"
  },
  { 
    name: "Sofía Ruiz Rincón", 
    role: "Dir. Marketing y Com.", 
    company: "Global España", 
    tesis: "La ciudad como lienzo: la creatividad transforma espacios cotidianos en experiencias memorables que emocionan.",
    keyPoint: "Ciudad como Lienzo"
  }
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

const SYSTEM_PROMPT = `
Eres el CSO de IMU Group. 
Has procesado InfoAdex 2026 y las tesis de 15 líderes de OOH.
Tu objetivo: Asesorar en M&A y estrategia.
Atresmedia compró Clear Channel por €115M. JCDecaux tiene Barcelona hasta 2035.
Usa las tesis de expertos (como Balanzat sobre Metro o Pestaña sobre Interurbano) para dar valor a tus respuestas.
`;

// --- VISTAS ---

const ExpertsView = () => (
  <div className="space-y-8 animate-in fade-in duration-700 pb-20">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
      <div>
        <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none mb-4 uppercase italic">Tesis de <span className="text-blue-600 not-italic uppercase">Expertos</span></h2>
        <p className="text-slate-500 text-xl font-bold tracking-tight italic">Knowledge Base: Repositorio de entrevistas estratégicas 2024-2025.</p>
      </div>
      <div className="bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-xl shadow-blue-600/20 flex items-center gap-3">
         <UserCheck size={20} />
         <span className="text-[10px] font-black uppercase tracking-[0.2em]">{allExpertInterviews.length} Líderes de Opinión</span>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {allExpertInterviews.map((expert, i) => (
        <div key={i} className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm hover:shadow-xl hover:border-blue-500 transition-all duration-500 group relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-10 group-hover:rotate-12 transition-all duration-700">
             <Quote size={120} fill="currentColor" />
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-xl italic group-hover:bg-blue-600 transition-colors">
              {expert.company[0]}
            </div>
            <div>
              <h4 className="text-lg font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{expert.name}</h4>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mt-1">{expert.role}</p>
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter mt-0.5">{expert.company}</p>
            </div>
          </div>

          <div className="mb-6">
             <span className="text-[9px] font-black bg-blue-50 text-blue-700 px-3 py-1 rounded-full uppercase tracking-tighter">
                Eje: {expert.keyPoint}
             </span>
          </div>

          <p className="text-sm font-medium text-slate-600 leading-relaxed italic">
            "{expert.tesis}"
          </p>

          <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
             <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Análisis Estratégico</span>
             <ChevronRight size={16} className="text-blue-600" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const DashboardView = () => (
  <div className="space-y-8 animate-in fade-in duration-700">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
      <div>
        <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none mb-4 uppercase italic">Intel Lab <span className="text-blue-600 not-italic uppercase">2026</span></h2>
        <p className="text-slate-500 text-xl font-bold tracking-tight">Consolidación InfoAdex 2025 + Notebook ML.</p>
      </div>
      <div className="flex bg-slate-900 text-white p-2 rounded-2xl shadow-lg border border-slate-700">
        <div className="flex items-center gap-3 px-4 py-2 border-r border-slate-700">
           <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></div>
           <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 font-sans">Live Data</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 text-slate-500 italic">
           <History size={14} />
           <span className="text-[10px] font-black uppercase tracking-widest">v.2.1.0</span>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white border rounded-[32px] p-8 hover:border-blue-500 transition-all">
         <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-2 text-slate-400 tracking-widest">Market '24</p>
         <h4 className="text-4xl font-black tracking-tighter italic">€13.081M</h4>
         <p className="text-xs font-bold mt-4 text-emerald-500">+3.8% Growth</p>
      </div>
      <div className="bg-white border rounded-[32px] p-8 hover:border-blue-500 transition-all">
         <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-2 text-slate-400 tracking-widest">OOH Vol '24</p>
         <h4 className="text-4xl font-black tracking-tighter italic text-blue-600">€432.0M</h4>
         <p className="text-xs font-bold mt-4 text-slate-500">Excl. Media Mix</p>
      </div>
      <div className="bg-white border rounded-[32px] p-8 hover:border-blue-500 transition-all">
         <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-2 text-slate-400 tracking-widest">M&A Deal</p>
         <h4 className="text-4xl font-black tracking-tighter italic">€115.0M</h4>
         <p className="text-xs font-bold mt-4 text-slate-900 italic font-sans uppercase">Atresmedia Deal</p>
      </div>
      <div className="bg-slate-900 text-white rounded-[32px] p-8 relative overflow-hidden group">
         <BrainCircuit className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5 group-hover:scale-110 transition-transform" />
         <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-1 opacity-50 tracking-widest">ML Prediction</p>
         <h4 className="text-3xl font-black italic">$567M</h4>
         <p className="text-xs font-bold mt-2 text-blue-400 tracking-tighter italic">Forecast 2030</p>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
       <div className="bg-white rounded-[40px] p-10 border shadow-sm">
          <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-8">Inversión Real vs Variación %</h3>
          <div className="h-[350px] w-full">
             <ResponsiveContainer>
                <ComposedChart data={dataMarketTotal}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="total" fill="#0f172a" radius={[10, 10, 0, 0]} barSize={40} />
                  <Line type="monotone" dataKey="variation" stroke="#3b82f6" strokeWidth={4} dot={{r: 6, fill: '#3b82f6', strokeWidth: 0}} />
                </ComposedChart>
             </ResponsiveContainer>
          </div>
       </div>

       <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
          <Target className="absolute -right-20 -bottom-20 w-80 h-80 text-blue-500/10" />
          <h3 className="text-3xl font-black italic tracking-tighter mb-8 uppercase leading-none">M&A Strategy <br/><span className="text-blue-500 not-italic tracking-normal lowercase">target map</span></h3>
          <div className="space-y-3">
             {maTargets.map((m, i) => (
               <div key={i} className="flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all cursor-default group">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-sm italic">{m.name[0]}</div>
                     <div>
                        <p className="text-sm font-black italic">{m.name}</p>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{m.status}</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter mb-1 bg-white/10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors`}>{m.risk.split(' ')[0]}</p>
                     <p className="text-xs font-bold text-white italic">{m.value}</p>
                  </div>
               </div>
             ))}
          </div>
       </div>
    </div>
  </div>
);

const ReportView = () => (
  <div className="max-w-5xl mx-auto bg-white p-10 md:p-24 rounded-[60px] shadow-2xl border border-slate-100 animate-in slide-in-from-bottom-8 duration-1000 print:shadow-none print:border-none print:p-0">
    <div className="flex justify-end gap-3 mb-16 print:hidden">
      <button onClick={() => window.print()} className="bg-slate-900 text-white px-8 py-4 rounded-3xl hover:bg-blue-600 transition-all flex items-center gap-3 font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-900/20"><FileDown size={18} /> Export Strategy</button>
    </div>
    <div className="border-b-[12px] border-slate-900 pb-16 mb-16 relative">
      <h1 className="text-8xl font-black text-slate-900 tracking-tighter leading-[0.8] mb-8 uppercase italic tracking-tighter">The<br/>Strategy<br/><span className="text-blue-600 not-italic uppercase tracking-normal">IMU 2026</span></h1>
      <div className="flex flex-wrap gap-4">
        <span className="bg-slate-900 text-white text-xs font-black px-6 py-2 rounded-full uppercase tracking-widest leading-none flex items-center gap-2 italic"><Clock size={14}/> Analysis v.2.1</span>
        <span className="bg-blue-50 text-blue-700 text-xs font-black px-6 py-2 rounded-full uppercase tracking-widest leading-none">Confidencial</span>
      </div>
    </div>
    <article className="prose prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:text-slate-600 prose-p:leading-relaxed text-slate-700 font-medium italic-headings">
      <h2 className="text-4xl border-b-2 pb-6 mb-10 uppercase italic tracking-tighter">0.1. Contexto Estratégico</h2>
      <p className="text-2xl font-black text-slate-900 leading-tight mb-10 italic">La entrada en el mercado español vía M&A requiere un arbitraje entre el riesgo concesional masivo y la propiedad de infraestructura propia.</p>
    </article>
  </div>
);

const AiConsultantView = () => {
  const [messages, setMessages] = useState([{ role: 'assistant', text: 'Strat-GPT v2.1 Activo. He integrado todos los datos de InfoAdex 2026 y las tesis de todos los directivos. ¿Analizamos un target de compra?' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages]);
  
  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    if (!apiKey) {
      setMessages(prev => [...prev, { role: 'assistant', text: "⚠️ Error de API: Revisa el saldo de tu cuenta OpenAI Billing." }]);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
        body: JSON.stringify({ model: "gpt-4o", messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages.map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.text })), { role: "user", content: userMessage }] })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      setMessages(prev => [...prev, { role: 'assistant', text: data.choices[0].message.content }]);
    } catch (error) { setMessages(prev => [...prev, { role: 'assistant', text: "Error: " + error.message }]); } finally { setLoading(false); }
  };

  return (
    <div className="max-w-4xl mx-auto h-[750px] flex flex-col bg-white rounded-[50px] shadow-2xl border-none overflow-hidden ring-1 ring-slate-200">
      <div className="p-10 border-b bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="bg-blue-600 p-4 rounded-3xl shadow-xl shadow-blue-500/30 ring-4 ring-blue-600/10"><BrainCircuit size={32} /></div>
          <div>
            <h3 className="font-black text-2xl tracking-tighter uppercase leading-none italic">Strat-GPT <span className="text-blue-500 not-italic italic">IMU</span></h3>
            <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.4em] mt-3">Advanced Intelligence Active</p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-10 bg-slate-50/50 space-y-8" ref={scrollRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-6 rounded-[32px] text-sm font-bold leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none shadow-blue-600/20' : 'bg-white text-slate-800 border-none rounded-tl-none shadow-slate-900/5'}`}>{msg.text}</div>
          </div>
        ))}
        {loading && <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse flex items-center gap-3"><Loader2 className="animate-spin" size={14}/> Analizando tesis de directivos...</div>}
      </div>
      <div className="p-8 bg-white border-t flex gap-4">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="¿Cuál es la tesis de Pedro Fernández sobre la disponibilidad mental?" className="flex-1 bg-slate-50 border-none rounded-3xl px-8 py-5 text-sm font-bold focus:ring-4 focus:ring-blue-100 transition-all outline-none" />
        <button onClick={handleSendMessage} className="bg-slate-900 text-white p-5 rounded-3xl hover:bg-blue-600 transition-all shadow-xl"><Send size={24} /></button>
      </div>
    </div>
  );
};

// --- APP ---

const App = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  const NavItem = ({ id, label, icon: Icon }) => (
    <button onClick={() => { setActiveView(id); setSidebarOpen(false); }} className={`w-full flex items-center gap-5 px-6 py-5 rounded-[24px] transition-all font-black uppercase text-[10px] tracking-[0.25em] ${activeView === id ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/40 translate-x-2' : 'text-slate-500 hover:text-white hover:bg-slate-800'}`}>
      <Icon size={20} /> {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans selection:bg-blue-100">
      <aside className={`fixed inset-y-0 left-0 z-50 w-80 bg-slate-900 text-white transform transition-transform duration-500 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'} print:hidden`}>
        <div className="p-12 border-b border-slate-800">
           <h1 className="text-4xl font-black tracking-tighter leading-none uppercase italic">IMU<br/><span className="text-blue-500 lowercase tracking-tight not-italic">Intelligence</span></h1>
           <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.5em] mt-4">by bud consultancy</p>
        </div>
        <nav className="p-8 space-y-4">
          <NavItem id="dashboard" label="The Console" icon={LayoutDashboard} />
          <NavItem id="report" label="The Strategy" icon={FileText} />
          <NavItem id="experts" label="Expert Tesis" icon={MessageSquareQuote} />
          <div className="pt-8 mt-8 border-t border-slate-800">
             <NavItem id="ai" label="Strat-GPT" icon={BrainCircuit} />
          </div>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto h-screen p-6 md:p-20 print:p-0">
        <div className="md:hidden flex justify-between items-center mb-12 bg-white p-6 rounded-[32px] border print:hidden shadow-sm">
           <h1 className="font-black text-slate-900 tracking-tighter uppercase italic text-2xl leading-none">IMU Intel</h1>
           <button onClick={() => setSidebarOpen(true)} className="p-4 bg-slate-900 text-white rounded-2xl shadow-xl"><Menu size={24} /></button>
        </div>
        <div className="max-w-[1400px] mx-auto">
          {activeView === 'dashboard' && <DashboardView />}
          {activeView === 'report' && <ReportView />}
          {activeView === 'experts' && <ExpertsView />}
          {activeView === 'ai' && <AiConsultantView />}
        </div>
      </main>
    </div>
  );
};

export default App;