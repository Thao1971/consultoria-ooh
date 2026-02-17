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
  Activity, LineChart as ChartIcon, Info, Download, Book
} from 'lucide-react';

// --- BASE DE DATOS: MERCADO ---
const dataMarketHistory = [
  { year: '2021', totalMedia: 11667.4, ooh: 289.6, variation: 8.4 },
  { year: '2022', totalMedia: 12274.7, ooh: 350.2, variation: 16.29 },
  { year: '2023', totalMedia: 12603.3, ooh: 406.7, variation: 6.14 },
  { year: '2024', totalMedia: 13081.8, ooh: 432.2, variation: 6.6 },
  { year: '2025 (P)', totalMedia: 12745.4, ooh: 460.5, variation: -2.6 },
];

const dataFutureForecast = [
  { year: '2025', value: 460.5 }, { year: '2026', value: 484.2 }, { year: '2027', value: 509.1 },
  { year: '2028', value: 535.3 }, { year: '2029', value: 562.9 }, { year: '2030', value: 591.8 },
];

// --- BASE DE DATOS: EXPERTOS ---
const expertInterviews = [
  { 
    id: "borja-balanzat",
    name: "Borja Balanzat Góngora", 
    role: "Director General", 
    company: "Global España", 
    tesis: "Digitalización, medición e innovación: el camino de Global en el Exterior.",
    fullContent: `El año pasado comenzaba estas líneas hablando de cómo había llegado el momento de R-evolucionar el medio Exterior... [Contenido Completo]`,
    tags: ["Digitalización", "Metro", "Medición"]
  },
  { 
    id: "agata-romo",
    name: "Ágata Romo", 
    role: "Directora de Marketing", 
    company: "Exterior Plus", 
    tesis: "Exterior gana la batalla por la atención frente a la fragmentación digital.",
    fullContent: `Vivimos un momento de transformación profunda en el ecosistema publicitario... [Contenido Completo]`,
    tags: ["Atención", "Eficacia", "Estrategia"]
  },
  { 
    id: "pedro-fernandez",
    name: "Pedro Fernández Sanz", 
    role: "Dir. Producto y Marketing", 
    company: "Clear Channel", 
    tesis: "Los CEP definen la disponibilidad mental de una marca en el punto de compra.",
    fullContent: `Los Category Entry Points (CEP) son la base de la Disponibilidad mental de una marca... [Contenido Completo]`,
    tags: ["Branding", "CEP", "Impacto"]
  }
];

// --- VISTAS ---

const MarketView = ({ onNavigate }) => {
  const [showInsight, setShowInsight] = useState(false);

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20 text-slate-900">
      {/* CABECERA CON BOTÓN DE DESCARGA */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 pb-8">
        <div className="flex-1">
          <h2 className="text-6xl font-black tracking-tighter leading-none mb-4 uppercase italic">Market <span className="text-slate-500 not-italic uppercase tracking-normal italic">Analysis</span></h2>
          <p className="text-slate-500 text-xl font-bold tracking-tight italic max-w-2xl">Evolución y Forecast de Inversión OOH España para Bud Advisors.</p>
        </div>
        <div className="flex flex-col items-end gap-4">
          <button className="bg-slate-900 text-[#ffd900] px-8 py-4 rounded-3xl font-black uppercase text-xs tracking-widest flex items-center gap-3 hover:bg-black transition-all shadow-xl group">
            <Download size={18} className="group-hover:translate-y-1 transition-transform" /> 
            Descargar Consultoría Completa (PDF)
          </button>
          <div className="bg-slate-900 text-white p-6 rounded-[32px] flex items-center gap-8 shadow-2xl border border-white/10">
            <div className="text-center">
              <p className="text-[9px] font-black uppercase opacity-50 mb-1 italic">Total Medios '25</p>
              <p className="text-3xl font-black text-[#ffd900] italic">€12.745M</p>
            </div>
            <div className="w-px h-12 bg-slate-700"></div>
            <div className="text-center">
              <p className="text-[9px] font-black uppercase opacity-50 mb-1 italic">Inversión OOH '25</p>
              <p className="text-3xl font-black text-[#ffd900] italic">€460.5M</p>
            </div>
          </div>
        </div>
      </div>

      {/* GRÁFICOS ANALÍTICOS */}
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white rounded-[40px] p-10 border shadow-sm relative group overflow-hidden">
          <div className="flex justify-between items-start mb-8 relative z-10">
            <h3 className="text-xl font-black uppercase tracking-tighter italic flex items-center gap-3 text-slate-900">
              <TrendingUp className="text-[#ffd900]" /> 01. Evolución Inversión Real OOH (M€)
            </h3>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 bg-slate-50 px-3 py-1 rounded-full animate-pulse">
               <Info size={12} /> Pincha en el gráfico para análisis profundo
            </div>
          </div>
          
          <div className="h-[400px] w-full relative">
            <button 
              onClick={() => setShowInsight(true)}
              className="absolute inset-0 z-20 w-full h-full cursor-pointer opacity-0"
              aria-label="Ver análisis profundo"
            />
            <ResponsiveContainer>
              <AreaChart data={dataMarketHistory}>
                <defs><linearGradient id="colorOoh" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ffd900" stopOpacity={0.2}/><stop offset="95%" stopColor="#ffd900" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="year" tick={{fontSize: 11, fontWeight: 700}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 11}} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none'}} />
                <Area type="monotone" dataKey="ooh" stroke="#000" strokeWidth={3} fillOpacity={1} fill="url(#colorOoh)" dot={{r: 5, fill: '#000'}} activeDot={{r: 8, fill: '#ffd900'}} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {showInsight && (
            <div className="absolute inset-0 bg-slate-900/95 p-8 md:p-12 flex flex-col justify-center animate-in zoom-in-95 duration-300 z-50">
               <button onClick={(e) => { e.stopPropagation(); setShowInsight(false); }} className="absolute top-8 right-8 text-white/50 hover:text-[#ffd900] transition-colors"><X size={32} /></button>
               <div className="max-w-3xl mx-auto">
                  <div className="bg-[#ffd900] text-black w-fit px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 italic">Strategic Insight</div>
                  <p className="text-xl md:text-2xl font-bold text-white italic tracking-tight leading-relaxed mb-8">
                    "El medio Exterior mantiene un <span className="text-[#ffd900]">crecimiento sostenido</span>: pasa de 350 M€ (2022) a 460,5 M€ (2025), con variaciones interanuales de <span className="text-[#ffd900]">+16,29%, +6,14% y +6,6%</span> y una tasa de crecimiento compuesto del <span className="text-[#ffd900]">9,5%</span> batiendo el crecimiento negativo de la inversión publicitaria en España en 2025 que ha sido de un -2,6%."
                  </p>
                  <div className="flex gap-6"><div className="flex-1 p-6 bg-white/5 rounded-3xl border border-white/10"><p className="text-white/40 text-[9px] font-black uppercase mb-1">Crecimiento Compuesto</p><p className="text-3xl font-black text-[#ffd900]">9,5%</p></div><div className="flex-1 p-6 bg-white/5 rounded-3xl border border-white/10"><p className="text-white/40 text-[9px] font-black uppercase mb-1">Ajuste Mercado '25</p><p className="text-3xl font-black text-rose-500">-2,6%</p></div></div>
               </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-[40px] p-10 border shadow-sm">
          <h3 className="text-xl font-black uppercase tracking-tighter italic mb-8 flex items-center gap-3"><BarChart3 className="text-[#ffd900]" /> 02. Inversión Total Medios Controlados (M€)</h3>
          <div className="h-[250px] w-full"><ResponsiveContainer><BarChart data={dataMarketHistory}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" /><XAxis dataKey="year" tick={{fontSize: 11, fontWeight: 700}} axisLine={false} tickLine={false} /><YAxis tick={{fontSize: 11}} axisLine={false} tickLine={false} /><Tooltip cursor={{fill: '#fcf8e3'}} /><Bar dataKey="totalMedia" fill="#000" radius={[8, 8, 0, 0]} barSize={35} /></BarChart></ResponsiveContainer></div>
        </div>
        <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
          <h3 className="text-xl font-black uppercase tracking-tighter italic mb-10 flex items-center gap-3 text-white"><Clock className="text-[#ffd900]" /> 03. Evolución Futura & Forecast (2030)</h3>
          <div className="h-[250px] w-full relative z-10"><ResponsiveContainer><LineChart data={dataFutureForecast}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" /><XAxis dataKey="year" tick={{fontSize: 11, fill: '#94a3b8'}} axisLine={false} tickLine={false} /><YAxis tick={{fontSize: 11, fill: '#94a3b8'}} axisLine={false} tickLine={false} /><Tooltip contentStyle={{backgroundColor: '#1e293b', border: 'none'}} /><Line type="stepAfter" dataKey="value" stroke="#ffd900" strokeWidth={4} dot={{r: 6, fill: '#ffd900'}} /></LineChart></ResponsiveContainer></div>
        </div>
      </div>

      {/* SECCIÓN DE ENSAYO TEXTUAL E ÍNDICE INTERACTIVO */}
      <div className="bg-white rounded-[50px] border border-slate-200 p-12 md:p-20 shadow-sm mt-20">
         <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
               <div className="p-4 bg-slate-900 text-[#ffd900] rounded-3xl shadow-lg"><Book size={32} /></div>
               <h3 className="text-4xl font-black uppercase tracking-tighter italic text-slate-900">Resumen Estratégico <span className="text-slate-400">Consultoría</span></h3>
            </div>
            
            <div className="space-y-12 mb-20 text-xl font-medium leading-relaxed text-slate-700 italic">
               <p>La industria del Out-of-Home (OOH) en España se encuentra en un punto de inflexión estructural. Mientras que el ecosistema de medios tradicional experimenta una contracción ante la fragmentación digital, el medio exterior se ha consolidado como el <span className="text-black font-black underline decoration-[#ffd900] decoration-4">último gran medio masivo no intrusivo</span>.</p>
               
               <p>Nuestra consultoría analiza el mercado bajo cinco prismas críticos: la robustez de los datos de inversión real, la diversificación de activos físicos y digitales, el riesgo concesional derivado de las grandes licitaciones municipales, el radar de consolidación de operadores (M&A) y la visión prospectiva de los líderes del sector.</p>
               
               <p>A continuación, puedes acceder directamente a los módulos detallados de inteligencia estratégica pulsando en cada área del índice.</p>
            </div>

            {/* ÍNDICE INTERACTIVO COMO BOTONES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <button onClick={() => onNavigate('soportes')} className="group flex flex-col p-8 bg-slate-50 rounded-[40px] border border-slate-100 hover:border-slate-900 hover:bg-slate-900 transition-all text-left">
                  <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-[#ffd900] mb-4">Módulo 02</span>
                  <span className="text-2xl font-black italic text-slate-900 group-hover:text-white uppercase mb-2">Tipos de Soportes</span>
                  <p className="text-sm font-medium text-slate-500 group-hover:text-slate-400">Análisis técnico de mobiliario urbano, transporte e indoor.</p>
                  <ChevronRight size={24} className="mt-8 text-slate-300 group-hover:text-[#ffd900] group-hover:translate-x-2 transition-all" />
               </button>

               <button onClick={() => onNavigate('licitaciones')} className="group flex flex-col p-8 bg-slate-50 rounded-[40px] border border-slate-100 hover:border-slate-900 hover:bg-slate-900 transition-all text-left">
                  <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-[#ffd900] mb-4">Módulo 03</span>
                  <span className="text-2xl font-black italic text-slate-900 group-hover:text-white uppercase mb-2">Licitaciones & Plazas</span>
                  <p className="text-sm font-medium text-slate-500 group-hover:text-slate-400">Control de contratos públicos y vencimientos en Madrid y BCN.</p>
                  <ChevronRight size={24} className="mt-8 text-slate-300 group-hover:text-[#ffd900] group-hover:translate-x-2 transition-all" />
               </button>

               <button onClick={() => onNavigate('companias')} className="group flex flex-col p-8 bg-slate-50 rounded-[40px] border border-slate-100 hover:border-slate-900 hover:bg-slate-900 transition-all text-left">
                  <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-[#ffd900] mb-4">Módulo 04</span>
                  <span className="text-2xl font-black italic text-slate-900 group-hover:text-white uppercase mb-2">M&A Targets</span>
                  <p className="text-sm font-medium text-slate-500 group-hover:text-slate-400">Fichas técnicas de operadores y potencial de adquisición.</p>
                  <ChevronRight size={24} className="mt-8 text-slate-300 group-hover:text-[#ffd900] group-hover:translate-x-2 transition-all" />
               </button>

               <button onClick={() => onNavigate('expertos')} className="group flex flex-col p-8 bg-slate-50 rounded-[40px] border border-slate-100 hover:border-slate-900 hover:bg-slate-900 transition-all text-left">
                  <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-[#ffd900] mb-4">Módulo 05</span>
                  <span className="text-2xl font-black italic text-slate-900 group-hover:text-white uppercase mb-2">Visión de Expertos</span>
                  <p className="text-sm font-medium text-slate-500 group-hover:text-slate-400">Repositorio integral de entrevistas y tesis estratégicas.</p>
                  <ChevronRight size={24} className="mt-8 text-slate-300 group-hover:text-[#ffd900] group-hover:translate-x-2 transition-all" />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

// --- OTROS COMPONENTES (ADAPTADOS) ---

const TendersView = () => (
  <div className="space-y-10 animate-in fade-in duration-700 pb-20">
    <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none mb-4 uppercase italic">Licitaciones <span className="text-slate-500 not-italic uppercase tracking-normal">Control</span></h2>
    <div className="bg-white border border-slate-200 rounded-[40px] overflow-hidden shadow-sm">
       <table className="w-full text-left font-sans"><thead className="bg-slate-900 text-white"><tr><th className="p-6 text-[10px] font-black uppercase tracking-widest italic">Plaza</th><th className="p-6 text-[10px] font-black uppercase tracking-widest italic text-center">Expiración</th><th className="p-6 text-[10px] font-black uppercase tracking-widest italic text-right">Riesgo</th></tr></thead><tbody className="divide-y divide-slate-100 font-medium"><tr><td className="p-6 font-black uppercase italic text-sm">Madrid</td><td className="p-6 text-xs text-center">2028</td><td className="p-6 text-right font-black text-rose-600">ALTO</td></tr><tr><td className="p-6 font-black uppercase italic text-sm">Barcelona</td><td className="p-6 text-xs text-center">2035</td><td className="p-6 text-right font-black text-emerald-600">BAJO</td></tr></tbody></table>
    </div>
  </div>
);

const AssetsView = () => (
  <div className="space-y-10 animate-in fade-in duration-700">
    <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none mb-4 uppercase italic font-sans">Support <span className="text-slate-500 not-italic uppercase tracking-normal">Atlas</span></h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8"><div className="bg-white border border-slate-200 rounded-[40px] p-10 hover:shadow-2xl transition-all group"><div className="flex justify-between items-start mb-8"><div className="p-5 bg-slate-900 text-white rounded-3xl group-hover:bg-[#ffd900] group-hover:text-black transition-colors"><Building2 size={32} /></div><p className="text-4xl font-black text-slate-900 italic">45%</p></div><h3 className="text-2xl font-black italic uppercase mb-4 text-slate-900">Mobiliario Urbano</h3><div className="bg-yellow-50 p-6 rounded-3xl border border-yellow-200 italic font-bold text-slate-900 text-sm">"Segmento core de inversión."</div></div></div>
  </div>
);

const CompaniesView = ({ onSelect }) => (
  <div className="space-y-10 animate-in fade-in duration-700">
    <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none mb-4 uppercase italic font-sans">M&A <span className="text-slate-500 not-italic uppercase tracking-normal italic">Targets</span></h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8"><div onClick={() => onSelect({name: 'Clear Channel Esp', desc: 'Líder en MU.'})} className="bg-white border border-slate-200 rounded-[40px] p-10 hover:shadow-2xl transition-all cursor-pointer group"><div className="flex justify-between items-center mb-8"><span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-100">Adquirido</span><p className="text-xs font-black italic">Val: €115M</p></div><h3 className="text-3xl font-black italic uppercase text-slate-900 mb-4 tracking-tighter">Clear Channel Esp</h3><p className="text-slate-500 font-medium italic">Consolidación Atresmedia.</p></div></div>
  </div>
);

const ExpertsListView = ({ onSelect }) => (
  <div className="space-y-10 animate-in fade-in duration-700 pb-20">
    <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none mb-4 uppercase italic font-sans">Expert <span className="text-slate-500 not-italic uppercase tracking-normal">Vision</span></h2>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {expertInterviews.map((expert) => (
        <div key={expert.id} onClick={() => onSelect(expert)} className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm hover:shadow-xl hover:border-black transition-all cursor-pointer group relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:rotate-12 transition-all duration-700"><Quote size={120} fill="currentColor" /></div>
          <div className="flex items-center gap-4 mb-6"><div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-xl italic group-hover:bg-[#ffd900] group-hover:text-black transition-colors">{expert.company[0]}</div><div><h4 className="text-lg font-black leading-tight group-hover:text-black transition-colors font-sans">{expert.name}</h4><p className="text-[10px] font-black uppercase mt-1 opacity-50 italic">{expert.role}</p></div></div>
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
      <article className="prose prose-slate max-w-none font-sans"><div className="bg-yellow-50 border-l-[12px] border-[#ffd900] p-12 rounded-r-[50px] mb-16 italic shadow-inner"><Quote className="text-yellow-200 mb-6" size={50} fill="currentColor" /><p className="text-slate-900 font-black text-3xl tracking-tight leading-tight italic">"{expert.tesis}"</p></div><div className="space-y-12 text-slate-700 text-2xl leading-[1.6] font-medium selection:bg-yellow-200 italic">{expert.fullContent && expert.fullContent.split('\n\n').map((para, i) => (<p key={i} className="first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-black">{para}</p>))}</div></article>
    </div>
  </div>
);

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
      if (activeArea === 'companias') return <div className="p-20 text-center"><h2 className="text-6xl font-black italic">{selectedItem.name}</h2><button onClick={() => setSelectedItem(null)} className="mt-10 bg-black text-white px-8 py-3 rounded-full uppercase text-xs font-black tracking-widest">Volver al Radar</button></div>;
      return <ExpertDetailView expert={selectedItem} onBack={() => setSelectedItem(null)} />;
    }
    switch (activeArea) {
      case 'mercado': return <MarketView onNavigate={setActiveArea} />;
      case 'soportes': return <AssetsView />;
      case 'companias': return <CompaniesView onSelect={setSelectedItem} />;
      case 'expertos': return <ExpertsListView onSelect={setSelectedItem} />;
      default: return <MarketView onNavigate={setActiveArea} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans selection:bg-yellow-200">
      <aside className={`fixed inset-y-0 left-0 z-50 w-80 bg-[#ffd900] text-slate-900 transform transition-transform duration-500 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'} print:hidden flex flex-col ring-1 ring-black/5`}>
        <div className="p-12 border-b border-black/10 text-center">
           <h1 className="text-4xl font-black tracking-tighter leading-none uppercase italic font-sans">IMU<br/><span className="text-black/60 lowercase tracking-tight not-italic">Intelligence</span></h1>
           <p className="text-[8px] font-black uppercase tracking-[0.5em] mt-4 italic opacity-70">exclusive advisor desk</p>
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
             <div className="mt-4 flex justify-center">
                <img 
                  src="https://static.wixstatic.com/media/88e5e3_c20937499861486895bbba1fd101b94e~mv2.png" 
                  alt="Bud Advisors Logo"
                  className="w-1/3 h-auto object-contain mix-blend-multiply opacity-90 contrast-125"
                />
             </div>
          </div>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto h-screen p-6 md:p-20 print:p-0 custom-scrollbar">
        <div className="md:hidden flex justify-between items-center mb-12 bg-white p-6 rounded-[32px] border print:hidden shadow-sm">
           <h1 className="font-black text-slate-900 tracking-tighter uppercase italic text-2xl font-sans">IMU Intel</h1>
           <button onClick={() => setSidebarOpen(true)} className="p-4 bg-[#ffd900] text-slate-900 rounded-2xl shadow-xl"><Menu size={24} /></button>
        </div>
        <div className="max-w-[1400px] mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

const AiConsultantView = () => (
  <div className="max-w-4xl mx-auto h-[750px] flex flex-col bg-white rounded-[50px] shadow-2xl overflow-hidden ring-1 ring-slate-200 animate-in slide-in-from-bottom-5 duration-500">
    <div className="p-10 border-b bg-slate-900 text-white flex items-center gap-6 font-sans"><div className="bg-[#ffd900] p-4 rounded-3xl text-black shadow-xl shadow-yellow-500/10"><BrainCircuit size={32} /></div><div><h3 className="font-black text-2xl tracking-tighter uppercase italic leading-none">Strat-GPT <span className="text-[#ffd900] not-italic">ADVISOR</span></h3><p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em] mt-3 italic">Exclusive Intelligence Hub</p></div></div>
    <div className="flex-1 overflow-y-auto p-10 bg-slate-50/50 space-y-8"><div className="bg-white border p-6 rounded-[32px] text-sm font-bold shadow-sm max-w-[85%] font-sans italic text-slate-900">Bienvenido al Hub de Inteligencia de Bud Advisors. ¿Análisis M&A en tiempo real?</div></div>
    <div className="p-8 bg-white border-t flex gap-4"><input type="text" placeholder="Analiza el potencial de adquisición de Exterior Plus..." className="flex-1 bg-slate-50 border-none rounded-3xl px-8 py-5 text-sm font-bold outline-none ring-offset-2 focus:ring-2 focus:ring-yellow-400 transition-all" /><button className="bg-[#ffd900] text-slate-900 p-5 rounded-3xl hover:bg-[#ffed4d] transition-all shadow-xl"><Send size={24} /></button></div>
  </div>
);

export default App;