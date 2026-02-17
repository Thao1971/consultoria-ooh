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
  Activity, LineChart as ChartIcon, Info, Download, Book, MousePointer2, PieChart as PieIcon, 
  Train, Plane, ShoppingBag, Maximize
} from 'lucide-react';

// --- CONFIGURACIÓN DE IA ---
const apiKey = ""; 
const SYSTEM_PROMPT = `Eres el Consultor Senior de Bud Advisors. Tienes acceso a fichas de empresas, tesis de expertos y tipologías de soportes OOH. Responde con un tono ejecutivo.`;

// --- BASE DE DATOS GLOBAL: MERCADO ---
const dataTotalMarket = [
  { year: '2021', value: 11667 }, { year: '2022', value: 12274 }, { year: '2023', value: 12603 },
  { year: '2024', value: 13081 }, { year: '2025 (P)', value: 12745 },
];

const dataMediaSplit = [
  { name: 'Digital', value: 47.2, fill: '#000000' }, { name: 'Televisión', value: 16.8, fill: '#333333' },
  { name: 'OOH (Exterior)', value: 6.6, fill: '#ffd900' }, { name: 'Radio', value: 3.8, fill: '#666666' },
  { name: 'Otros', value: 25.6, fill: '#999999' },
];

const dataOohEvolution = [
  { year: '2021', ooh: 289.6 }, { year: '2022', ooh: 350.2 }, { year: '2023', ooh: 407.2 },
  { year: '2024', ooh: 432.2 }, { year: '2025 (P)', ooh: 460.5 },
];

const dataOohAssetSplit = [
  { name: 'Mobiliario Urbano', value: 45, fill: '#000000' }, { name: 'Gran Pantalla', value: 24, fill: '#ffd900' },
  { name: 'Transportes', value: 19, fill: '#333333' }, { name: 'Indoor/Retail', value: 12, fill: '#e5e7eb' },
];

const dataDigitalization = [
  { name: 'DOOH (Digital)', value: 41.7, color: '#ffd900' }, { name: 'OOH (Tradicional)', value: 58.3, color: '#000000' },
];

const dataFutureForecast = [
  { year: '2025', value: 460.5 }, { year: '2030', value: 591.8 },
];

// --- BASE DE DATOS GLOBAL: SOPORTES ---

const supportDatabase = [
  {
    id: 'mu',
    name: 'Mobiliario Urbano',
    icon: Building2,
    share: '45%',
    description: 'Soportes de utilidad pública integrados en el entorno urbano mediante concesiones administrativas.',
    details: 'Incluye marquesinas de autobús, MUPIs, columnas publicitarias y relojes-termómetro. Es el core del OOH por su capacidad de generar cobertura masiva y frecuencia.',
    assets: ['Marquesinas', 'MUPIs estáticos/digitales', 'Columnas', 'Relojes'],
    operators: ['JCDecaux', 'Clear Channel', 'Atresmedia'],
    insight: 'Barrera de entrada muy alta debido a las licitaciones de largo plazo (10-15 años).'
  },
  {
    id: 'tr',
    name: 'Transportes',
    icon: Train,
    share: '19%',
    description: 'Publicidad en nodos de movilidad crítica como aeropuertos, estaciones de tren, metro y autobuses.',
    details: 'Permite impactar a audiencias en momentos de espera (high dwell time) y captar perfiles profesionales o de ocio de alto valor adquisitivo.',
    assets: ['Aeropuertos (AENA)', 'Metro (BCN/MAD)', 'Estaciones Renfe/Adif', 'Autobuses'],
    operators: ['Exterior Plus', 'Global', 'Clear Channel'],
    insight: 'El Metro de Barcelona y Madrid son los bancos de prueba principales para la innovación DOOH.'
  },
  {
    id: 'gf',
    name: 'Gran Formato',
    icon: Maximize,
    share: '24%',
    description: 'Soportes de dimensiones espectaculares en vías de acceso, fachadas e hitos urbanos.',
    details: 'Enfocado en la notoriedad de marca e impacto visual extremo. Incluye vallas monoposte, lonas en edificios y pantallas digitales de gran escala.',
    assets: ['Monopostes LED', 'Lonas en edificios', 'Vallas 8x3', 'Pantallas Espectaculares (Callao)'],
    operators: ['Wildstone', 'Super 8', 'Callao City Lights', 'Explus'],
    insight: 'La digitalización del monoposte interurbano es la tendencia de crecimiento más rentable.'
  },
  {
    id: 'in',
    name: 'Indoor / Retail',
    icon: ShoppingBag,
    share: '12%',
    description: 'Soportes ubicados en el interior de centros comerciales, supermercados y entornos de gran consumo.',
    details: 'Es el nexo de unión entre la publicidad y el punto de venta. Fundamental para estrategias de Retail Media y atribución directa.',
    assets: ['Centros Comerciales', 'Circuitos en Supermercados', 'Pantallas en Parkings'],
    operators: ['Clear Channel', 'Exterior Plus', 'O14 Media'],
    insight: 'Segmento clave para cerrar el círculo del journey de compra mediante data propia de los retailers.'
  }
];

// --- BASE DE DATOS GLOBAL: COMPAÑÍAS ---

const companyDatabase = [
  {
    id: 'cc-esp',
    name: "Clear Channel España",
    status: "Operador Líder",
    valuation: "€115M (Ref. Atresmedia)",
    description: "Operador de Publicidad Exterior con foco en mobiliario urbano y retail.",
    management: [{ name: "Jordi Sáez", role: "Consejero Delegado" }, { name: "Pedro Fernández", role: "Dir. Marketing" }],
    inventory: { total: "42.000+ caras", digital: "1.701 pantallas", digitalWeight: "32% (FY24)" },
    financials: { capex: "9,9 M€ (FY24)", marketShare: "23%" }
  },
  {
    id: 'ext-plus',
    name: "Exterior Plus",
    status: "Target",
    valuation: "Premium",
    description: "Líder en transporte (AENA) y gran formato digital.",
    inventory: { total: "25.000+", digital: "900+" },
    management: [{ name: "Antonio Revilla", role: "CEO" }],
    financials: { marketShare: "Líder Aeropuertos" }
  }
];

// --- BASE DE DATOS GLOBAL: EXPERTOS ---

const expertInterviews = [
  { 
    id: "borja-balanzat",
    name: "Borja Balanzat Góngora", 
    role: "Director General", 
    company: "Global España", 
    tesis: "Digitalización, medición e innovación en el Exterior.",
    fullContent: `El año pasado comenzaba estas líneas hablando de la R-evolución... [Texto completo de Borja]`,
    tags: ["Metro", "Medición", "Liderazgo"]
  }
];

// --- BASE DE DATOS GLOBAL: LICITACIONES ---

const tendersDatabase = [
  {
    id: 'zgz-mu',
    city: 'Zaragoza',
    name: 'Mobiliario Urbano Municipal',
    operator: 'JCDecaux España S.L.U.',
    expiry: '2037',
    duration: '15 años',
    risk: 'Bajo',
    value: '59.397.989 €',
    analysis: `Contrato de concesión integral (15 años). El operador asume inversión y mantenimiento a cambio de exclusividad publicitaria. Zaragoza cuenta con 80+ MUPIs digitales.`
  }
];

// --- VISTAS ---

const MarketView = ({ onNavigate }) => {
  const [showInsight, setShowInsight] = useState(false);

  return (
    <div className="space-y-16 animate-in fade-in duration-700 pb-32 text-slate-900">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 pb-10">
        <div className="flex-1">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-4 uppercase italic">
            Bienvenidos <span className="text-slate-500 not-italic uppercase tracking-normal">Hub de Inteligencia Artificial</span> de Bud Advisors
          </h2>
          <p className="text-slate-500 text-xl font-bold italic">Dashboard de Control y Análisis de Datos 2025.</p>
        </div>
        <div className="flex flex-col items-end gap-6 shrink-0">
          <button className="bg-black text-[#ffd900] px-10 py-5 rounded-[2rem] font-black uppercase text-xs tracking-widest flex items-center gap-3 hover:bg-zinc-800 transition-all shadow-2xl group border border-zinc-700">
            <Download size={20} className="group-hover:translate-y-1 transition-transform" /> Descargar Consultoría
          </button>
          <div className="bg-slate-900 text-white p-6 rounded-[32px] flex items-center gap-8 shadow-2xl border border-white/10">
            <div className="text-center"><p className="text-[9px] font-black uppercase opacity-50 mb-1">Total Medios 25</p><p className="text-3xl font-black text-[#ffd900] italic">€12.745M</p></div>
            <div className="w-px h-10 bg-slate-700"></div>
            <div className="text-center"><p className="text-[9px] font-black uppercase opacity-50 mb-1">OOH Spend 25</p><p className="text-3xl font-black text-[#ffd900] italic">€460.5M</p></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white rounded-[50px] p-12 border shadow-sm relative group overflow-hidden">
          <h3 className="text-xl font-black uppercase italic mb-10 flex items-center gap-3"><TrendingUp className="text-[#ffd900]" /> 01. Volumen de Inversión Publicitaria Global</h3>
          <div className="h-[350px] w-full"><ResponsiveContainer><BarChart data={dataTotalMarket}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" /><XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontWeight: 700}} /><YAxis axisLine={false} tickLine={false} /><Tooltip cursor={{fill: '#fcf8e3'}} /><Bar dataKey="value" fill="#000" radius={[15, 15, 0, 0]} barSize={50} /></BarChart></ResponsiveContainer></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white rounded-[50px] p-12 border shadow-sm relative group overflow-hidden">
          <h3 className="text-xl font-black uppercase italic mb-8 flex items-center gap-3"><PieIcon className="text-[#ffd900]" /> 02. Inversión por Medios (%)</h3>
          <div className="h-[300px] w-full"><ResponsiveContainer><PieChart><Pie data={dataMediaSplit} innerRadius={80} outerRadius={110} paddingAngle={5} dataKey="value">{dataMediaSplit.map((entry, index) => <Cell key={index} fill={entry.fill} />)}</Pie><Tooltip /><Legend iconType="circle" /></PieChart></ResponsiveContainer></div>
        </div>
        <div className="bg-white rounded-[50px] p-12 border shadow-sm relative group overflow-hidden">
          <div className="flex justify-between items-start mb-8 relative z-10"><h3 className="text-xl font-black uppercase italic flex items-center gap-3"><Activity className="text-[#ffd900]" /> 03. Inversión OOH (M€)</h3><div className="text-[10px] font-black uppercase text-slate-400 bg-slate-50 px-3 py-1 rounded-full animate-pulse">Análisis Interactivo</div></div>
          <div className="h-[300px] w-full relative">
            <button onClick={() => setShowInsight(true)} className="absolute inset-0 z-20 w-full h-full cursor-pointer opacity-0" />
            <ResponsiveContainer><AreaChart data={dataOohEvolution}><defs><linearGradient id="gradOoh" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ffd900" stopOpacity={0.4}/><stop offset="95%" stopColor="#ffd900" stopOpacity={0}/></linearGradient></defs><Area type="monotone" dataKey="ooh" stroke="#000" strokeWidth={4} fill="url(#gradOoh)" dot={{r: 5, fill: '#000'}} /><XAxis dataKey="year" hide /></AreaChart></ResponsiveContainer>
          </div>
          {showInsight && (
            <div className="absolute inset-0 bg-slate-900/95 p-10 flex flex-col justify-center animate-in zoom-in-95 duration-300 z-50">
              <button onClick={() => setShowInsight(false)} className="absolute top-6 right-6 text-white/50 hover:text-[#ffd900]"><X size={24} /></button>
              <p className="text-lg font-bold text-white italic leading-relaxed">"Crecimiento compuesto del <span className="text-[#ffd900]">9,5% (2022-25)</span>, batiendo el mercado general publicitario en España."</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-[60px] border border-slate-200 p-12 md:p-24 shadow-sm mt-32">
         <div className="max-w-4xl mx-auto"><h3 className="text-5xl font-black uppercase tracking-tighter italic text-slate-900 mb-16">Índice Estratégico</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-8">{[{ id: 'soportes', label: 'Tipos de Soportes', mod: '02' }, { id: 'licitaciones', label: 'Licitaciones & Plazas', mod: '03' }, { id: 'companias', label: 'M&A Targets', mod: '04' }, { id: 'expertos', label: 'Visión de Expertos', mod: '05' }].map((item) => (<button key={item.id} onClick={() => onNavigate(item.id)} className="group flex flex-col p-10 bg-slate-50 rounded-[50px] border border-slate-100 hover:bg-black transition-all text-left"><span className="text-[11px] font-black uppercase text-slate-400 group-hover:text-[#ffd900] mb-4">Módulo {item.mod}</span><span className="text-3xl font-black italic text-slate-900 group-hover:text-white uppercase mb-3 leading-none">{item.label}</span><ChevronRight size={28} className="mt-10 text-slate-300 group-hover:text-[#ffd900] group-hover:translate-x-3 transition-all" /></button>))}</div></div>
      </div>
    </div>
  );
};

// --- COMPONENTE DETALLE DE SOPORTE ---

const SupportDetailView = ({ support, onBack }) => {
  const Icon = support.icon;
  return (
    <div className="max-w-6xl mx-auto bg-white rounded-[60px] shadow-2xl border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-10 pb-20 text-slate-900">
      <div className="p-10 bg-slate-900 text-white flex justify-between items-center">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-black text-xs uppercase tracking-widest"><ChevronLeft size={20} /> Volver al Atlas</button>
        <div className="bg-[#ffd900] text-black px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest italic">Technical Asset Specification</div>
      </div>
      <div className="p-10 md:p-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <div className="flex items-center gap-6">
               <div className="p-8 bg-slate-900 text-[#ffd900] rounded-[2rem] shadow-2xl"><Icon size={64} /></div>
               <div><h2 className="text-7xl font-black tracking-tighter italic uppercase leading-[0.8] mb-2">{support.name}</h2><p className="text-2xl text-slate-500 font-medium italic">Asset Category • {support.share} Share</p></div>
            </div>
            <p className="text-3xl text-slate-700 font-medium italic leading-relaxed border-l-8 border-[#ffd900] pl-10">{support.description}</p>
            <div className="space-y-6"><h4 className="text-xl font-black italic uppercase underline decoration-[#ffd900] decoration-4">Análisis Técnico</h4><p className="text-lg text-slate-600 leading-relaxed font-medium italic">{support.details}</p></div>
          </div>
          <div className="space-y-8">
             <div className="p-10 bg-slate-900 rounded-[50px] text-white shadow-xl">
                <h4 className="text-[#ffd900] font-black uppercase text-[10px] mb-8 italic tracking-widest">Inventario Clave</h4>
                <ul className="space-y-4">{support.assets.map((a, i) => (<li key={i} className="flex items-center gap-3 font-black italic text-lg"><CheckCircle2 size={18} className="text-[#ffd900]"/> {a}</li>))}</ul>
             </div>
             <div className="p-10 bg-slate-50 rounded-[50px] border shadow-sm">
                <h4 className="text-slate-400 font-black uppercase text-[10px] mb-8 italic">Strategic Insight</h4>
                <p className="font-black italic text-slate-900 leading-snug">"{support.insight}"</p>
                <div className="mt-8 pt-8 border-t"><p className="text-[9px] font-black uppercase text-slate-400 mb-4 tracking-widest">Operadores Líderes</p><div className="flex flex-wrap gap-2">{support.operators.map((o, i) => (<span key={i} className="px-3 py-1 bg-black text-white text-[10px] font-black rounded-lg uppercase italic">{o}</span>))}</div></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- APP PRINCIPAL ---

const App = () => {
  const [activeArea, setActiveArea] = useState('mercado');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const NavItem = ({ id, label, icon: Icon }) => (
    <button onClick={() => { setActiveArea(id); setSelectedItem(null); setSidebarOpen(false); }} className={`w-full flex items-center gap-5 px-6 py-5 rounded-[24px] transition-all font-black uppercase text-[9px] tracking-[0.25em] ${activeArea === id ? 'bg-slate-900 text-white shadow-2xl translate-x-2' : 'text-slate-800 hover:bg-black/5'}`}><Icon size={20} /> {label}</button>
  );

  const renderContent = () => {
    if (activeArea === 'ai') return <AiConsultantView />;
    if (selectedItem) {
      if (activeArea === 'companias') return <CompanyDetailView company={selectedItem} onBack={() => setSelectedItem(null)} />;
      if (activeArea === 'expertos') return <ExpertDetailView expert={selectedItem} onBack={() => setSelectedItem(null)} />;
      if (activeArea === 'licitaciones') return <TenderDetailView tender={selectedItem} onBack={() => setSelectedItem(null)} />;
      if (activeArea === 'soportes') return <SupportDetailView support={selectedItem} onBack={() => setSelectedItem(null)} />;
    }
    switch (activeArea) {
      case 'mercado': return <MarketView onNavigate={setActiveArea} />;
      case 'soportes': return <div className="space-y-12 animate-in fade-in duration-700 pb-32 text-slate-900"><div><h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none mb-4 uppercase italic">Support <span className="text-slate-500 not-italic uppercase tracking-normal">Atlas</span></h2><p className="text-slate-500 text-xl font-bold italic">Análisis técnico del inventario OOH en España.</p></div><div className="grid grid-cols-1 md:grid-cols-2 gap-8">{supportDatabase.map((s) => (<div key={s.id} onClick={() => setSelectedItem(s)} className="bg-white border border-slate-200 rounded-[40px] p-10 hover:shadow-2xl transition-all cursor-pointer group"><div className="flex justify-between items-start mb-8"><div className="p-5 bg-slate-900 text-white rounded-3xl group-hover:bg-[#ffd900] group-hover:text-black transition-colors"><s.icon size={32} /></div><p className="text-4xl font-black text-slate-900 italic">{s.share}</p></div><h3 className="text-3xl font-black italic uppercase text-slate-900 mb-4 leading-none tracking-tighter">{s.name}</h3><p className="text-slate-500 font-medium italic line-clamp-2">{s.description}</p></div>))}</div></div>;
      case 'companias': return <div className="space-y-10 animate-in fade-in duration-700 pb-20"><h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none mb-4 uppercase italic">M&A <span className="text-slate-500 not-italic uppercase tracking-normal">Targets</span></h2><div className="grid grid-cols-1 md:grid-cols-2 gap-8">{companyDatabase.map((c) => (<div key={c.id} onClick={() => setSelectedItem(c)} className="bg-white border border-slate-200 rounded-[40px] p-10 hover:shadow-2xl transition-all cursor-pointer group"><div className="flex justify-between items-center mb-8"><span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-100">{c.status}</span></div><h3 className="text-3xl font-black italic uppercase text-slate-900 mb-4 leading-none tracking-tighter">{c.name}</h3><p className="text-slate-500 font-medium italic line-clamp-2">{c.description}</p></div>))}</div></div>;
      case 'expertos': return <div className="space-y-10 animate-in fade-in duration-700 pb-20"><h2 className="text-6xl font-black tracking-tighter leading-none mb-4 uppercase italic">Expert <span className="text-slate-500 not-italic uppercase tracking-normal">Vision</span></h2><div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">{expertInterviews.map((expert) => (<div key={expert.id} onClick={() => setSelectedItem(expert)} className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm hover:shadow-xl hover:border-black transition-all cursor-pointer group relative overflow-hidden"><div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:rotate-12 transition-all duration-700"><Quote size={120} fill="currentColor" /></div><div className="flex items-center gap-4 mb-6"><div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-xl italic group-hover:bg-[#ffd900] group-hover:text-black transition-colors">{expert.company[0]}</div><div><h4 className="text-lg font-black leading-tight font-sans">{expert.name}</h4><p className="text-[10px] font-black uppercase mt-1 opacity-50 italic">{expert.role}</p></div></div><p className="text-sm font-medium text-slate-600 leading-relaxed italic line-clamp-3">"{expert.tesis}"</p><div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center text-slate-900 font-black text-[10px] uppercase italic tracking-widest">Leer Análisis Completo <ArrowRight size={16} /></div></div>))}</div></div>;
      case 'licitaciones': return <div className="space-y-10 animate-in fade-in duration-700 pb-20"><h2 className="text-6xl font-black tracking-tighter leading-none mb-4 uppercase italic text-slate-900">Licitaciones <span className="text-slate-500 not-italic uppercase tracking-normal">Control</span></h2><div className="bg-white border border-slate-200 rounded-[40px] overflow-hidden shadow-sm"><table className="w-full text-left font-sans font-medium"><thead className="bg-slate-900 text-white font-black"><tr><th className="p-6 text-[10px] font-black uppercase tracking-widest italic">Plaza</th><th className="p-6 text-[10px] font-black uppercase tracking-widest italic text-center">Expiración</th><th className="p-6 text-[10px] font-black uppercase tracking-widest italic text-right">Riesgo</th></tr></thead><tbody className="divide-y divide-slate-100 italic">{tendersDatabase.map((t) => (<tr key={t.id} onClick={() => setSelectedItem(t)} className="hover:bg-yellow-50 transition-colors cursor-pointer"><td className="p-6 font-black uppercase text-sm text-slate-900">{t.city}</td><td className="p-6 text-xs text-center">{t.expiry}</td><td className="p-6 text-right font-black text-rose-600 uppercase">{t.risk}</td></tr>))}</tbody></table></div></div>;
      default: return <MarketView onNavigate={setActiveArea} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans selection:bg-yellow-200 selection:text-black">
      <aside className={`fixed inset-y-0 left-0 z-50 w-80 bg-[#ffd900] text-slate-900 transform transition-transform duration-500 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'} print:hidden flex flex-col ring-1 ring-black/5`}>
        <div className="p-12 border-b border-black/10 text-center"><h1 className="text-4xl font-black tracking-tighter leading-none uppercase italic">IMU<br/><span className="text-black/60 lowercase tracking-tight not-italic font-black">Intelligence</span></h1><p className="text-[8px] font-black uppercase tracking-[0.5em] mt-4 italic opacity-70">exclusive advisor desk</p></div>
        <nav className="p-8 space-y-4 flex-1 overflow-y-auto custom-scrollbar">
          <NavItem id="mercado" label="01. Mercado" icon={BarChart3} />
          <NavItem id="soportes" label="02. Soportes" icon={Layers} />
          <NavItem id="licitaciones" label="03. Licitaciones" icon={Gavel} />
          <NavItem id="companias" label="04. Compañías" icon={Target} />
          <NavItem id="expertos" label="05. Expertos" icon={MessageSquare} />
          <div className="pt-8 mt-8 border-t border-black/10">
             <button onClick={() => setActiveArea('ai')} className={`w-full flex items-center gap-5 px-6 py-5 rounded-[24px] transition-all font-black uppercase text-[9px] tracking-[0.25em] mb-4 ${activeArea === 'ai' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-800 hover:bg-black/5'}`}><BrainCircuit size={20}/> Strat-GPT Hub</button>
             <div className="mt-4 flex justify-center"><img src="https://static.wixstatic.com/media/88e5e3_c20937499861486895bbba1fd101b94e~mv2.png" alt="Bud Advisors" className="w-1/3 h-auto object-contain mix-blend-multiply opacity-90 contrast-125" /></div>
          </div>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto h-screen p-6 md:p-20 print:p-0 custom-scrollbar"><div className="md:hidden flex justify-between items-center mb-12 bg-white p-6 rounded-[32px] border print:hidden shadow-sm"><h1 className="font-black text-slate-900 tracking-tighter uppercase italic text-2xl">IMU Intel</h1><button onClick={() => setSidebarOpen(true)} className="p-4 bg-[#ffd900] text-slate-900 rounded-2xl shadow-xl"><Menu size={24} /></button></div><div className="max-w-[1400px] mx-auto">{renderContent()}</div></main>
    </div>
  );
};

// Componentes estáticos simplificados para expertos y compañías ya definidos arriba en renderContent
const ExpertDetailView = ({ expert, onBack }) => (<div className="max-w-4xl mx-auto bg-white rounded-[60px] p-20 shadow-2xl animate-in slide-in-from-right-10 text-slate-900"><button onClick={onBack} className="flex items-center gap-2 mb-10 font-black text-xs uppercase italic"><ChevronLeft size={16} /> Volver</button><h2 className="text-7xl font-black tracking-tighter uppercase italic mb-10">{expert.name}</h2><div className="prose prose-slate max-w-none text-xl font-medium leading-relaxed italic whitespace-pre-line border-l-8 border-[#ffd900] pl-10">{expert.fullContent}</div></div>);
const TenderDetailView = ({ tender, onBack }) => (<div className="max-w-6xl mx-auto bg-white rounded-[60px] p-20 shadow-2xl animate-in slide-in-from-bottom-10 text-slate-900"><button onClick={onBack} className="flex items-center gap-2 mb-10 font-black text-xs uppercase italic"><ChevronLeft size={16} /> Volver</button><h2 className="text-7xl font-black tracking-tighter uppercase italic mb-8">{tender.city}</h2><p className="text-2xl font-bold italic border-b pb-8 mb-8">{tender.name}</p><p className="text-lg font-medium italic text-slate-600">{tender.analysis}</p></div>);
const AiConsultantView = () => (<div className="p-20 text-center"><h2 className="text-4xl font-black italic text-slate-300 uppercase">Strat-GPT Hub Activo</h2></div>);

export default App;