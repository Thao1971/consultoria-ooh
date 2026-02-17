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
  Activity, LineChart as ChartIcon, Info, Download, Book, MousePointer2, 
  PieChart as PieIcon, Train, Maximize, ShoppingBag
} from 'lucide-react';

// --- CONFIGURACIÓN DE IA ---
const apiKey = ""; 
const SYSTEM_PROMPT = `Eres el Consultor Senior de Bud Advisors. Tienes acceso a toda la base de datos de mercado OOH 2025, fichas de empresas como Clear Channel y tesis de expertos como Borja Balanzat. Responde con un tono ejecutivo y analítico.`;

// --- BASE DE DATOS GLOBAL: MERCADO ---
const dataMarketHistory = [
  { year: '2021', totalMedia: 11667.4, ooh: 289.6, variation: 8.4 },
  { year: '2022', totalMedia: 12274.7, ooh: 350.2, variation: 16.29 },
  { year: '2023', totalMedia: 12603.3, ooh: 407.2, variation: 6.14 },
  { year: '2024', totalMedia: 13081.8, ooh: 432.2, variation: 6.6 },
  { year: '2025 (P)', totalMedia: 12745.4, ooh: 460.5, variation: -2.6 },
];

const dataFutureForecast = [
  { year: '2025', value: 460.5 }, { year: '2026', value: 484.2 }, { year: '2027', value: 509.1 },
  { year: '2028', value: 535.3 }, { year: '2029', value: 562.9 }, { year: '2030', value: 591.8 },
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
    details: 'Permite impactar a audiencias en momentos de espera (high dwell time) y captar perfiles de alto valor adquisitivo.',
    assets: ['Aeropuertos (AENA)', 'Metro (BCN/MAD)', 'Estaciones Renfe/Adif'],
    operators: ['Exterior Plus', 'Global', 'Clear Channel'],
    insight: 'El Metro de Barcelona es un referente en digitalización con el circuito Brighter.'
  }
];

// --- BASE DE DATOS GLOBAL: COMPAÑÍAS ---
const companyDatabase = [
  {
    id: 'cc-esp',
    name: "Clear Channel España",
    status: "Operador Líder",
    group: "Clear Channel Outdoor Holdings, Inc. (EE. UU.)",
    valuation: "€115M (Ref. Atresmedia)",
    description: "Operador y gestor de activos de Publicidad Exterior con foco en mobiliario urbano y centros comerciales. Líder en transformación digital.",
    headquarters: "C/ Arturo Soria 336, 1ª planta, 28033 Madrid",
    management: [
      { name: "Jordi Sáez", role: "Consejero Delegado" },
      { name: "Maite Rodríguez", role: "Directora General Comercial" },
      { name: "Jaime Linaza", role: "CFO y Transformación Digital" },
      { name: "Pedro Fernández", role: "Director de Marketing y Producto" }
    ],
    inventory: {
      total: "42.000+ caras",
      digital: "1.701 pantallas",
      traditional: "37.290 soportes",
      digitalWeight: "32% del ingreso (FY24)"
    },
    financials: {
      capex: "9,9 M€ (FY24)",
      marketShare: "23% estimada",
      delegations: "Madrid, Barcelona, Valencia, Sevilla, Málaga, Zaragoza y Bilbao"
    }
  }
];

// --- BASE DE DATOS GLOBAL: EXPERTOS ---
const expertInterviews = [
  { 
    id: "borja-balanzat",
    name: "Borja Balanzat Góngora", 
    role: "Director General", 
    company: "Global España", 
    tesis: "Digitalización, medición e innovación: el camino de Global en el Exterior.",
    fullContent: `El año pasado comenzaba estas líneas hablando de cómo había llegado el momento de R-evolucionar el medio Exterior y sus entornos. Hoy, puedo confirmaros que esa transformación está siendo un éxito y avanza de forma imparable.\n\nHace solo unos días inauguramos la primera pantalla digital en Metro Barcelona, en la estación de Sagrera, con una campaña de H&M. Esta instalación, que incorpora tecnología de última generación, supone un paso más en un ambicioso plan de digitalización que este año ha dado un salto histórico: hemos duplicado nuestra presencia digital con la creación del circuito Brighter, que incluye 250 mupis digitales en siete ciudades, y la puesta en marcha de cuatro nuevas Pantallas de Gran Formato Digital.\n\nA día de hoy, el patrimonio digital de Global en España supera las 900 pantallas, ubicadas principalmente en estaciones de tren de ADIF, Metro Barcelona (TMB) y entornos urbanos clave. Hablamos de soportes vanguardistas, de alta calidad y máxima tecnología, que permiten a las marcas conectar con millones de personas en entornos de gran impacto visual. Una visibilidad y audiencia masiva, constante y diaria que convierte al DOOH en un pilar esencial dentro del mix de medios.`,
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
    concedente: 'Ayuntamiento de Zaragoza',
    expiry: '2037',
    duration: '15 años',
    value: '59.397.989 €',
    risk: 'Bajo',
    analysis: `Contrato de concesión administrativa integral cerrado hasta 2037. El Ayuntamiento no financia la instalación ni el mantenimiento; el riesgo recae íntegramente en el operador. Zaragoza cuenta con 80+ MUPIs digitales. Restricción estructural: 20% del inventario reservado a comunicación institucional.`,
    extraContracts: [
      { name: 'Tranvía Línea 1', operator: 'Clear Channel', expiry: '2035', detail: 'Explotación publicitaria en convoyes y paradas.' }
    ]
  }
];

// --- VISTAS ---

const MarketView = ({ onNavigate }) => {
  const [showInsight, setShowInsight] = useState(false);

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20 text-slate-900">
      {/* CABECERA */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 pb-8">
        <div className="flex-1">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-4 uppercase italic">
            Bienvenidos <span className="text-slate-500 not-italic uppercase tracking-normal">Hub de Inteligencia Artificial</span> de Bud Advisors en el mercado del OOH
          </h2>
          <p className="text-slate-500 text-lg font-bold italic">Visualización técnica de datos OOH 2025.</p>
        </div>
        <div className="flex flex-col items-end gap-4 shrink-0">
          <button className="bg-slate-900 text-[#ffd900] px-8 py-4 rounded-3xl font-black uppercase text-xs tracking-widest flex items-center gap-3 hover:bg-black transition-all shadow-xl">
            <Download size={18} /> Descargar Consultoría
          </button>
          <div className="bg-slate-900 text-white p-6 rounded-[32px] flex items-center gap-8 shadow-2xl border border-white/10">
            <div className="text-center"><p className="text-[9px] font-black uppercase opacity-50 mb-1 italic">Total Medios 25</p><p className="text-2xl font-black text-[#ffd900] italic">€12.745M</p></div>
            <div className="w-px h-10 bg-slate-700"></div>
            <div className="text-center"><p className="text-[9px] font-black uppercase opacity-50 mb-1 italic">OOH Spend 25</p><p className="text-2xl font-black text-[#ffd900] italic">€460.5M</p></div>
          </div>
        </div>
      </div>

      {/* CUADRÍCULA DE 5 GRÁFICOS (VERSIÓN ANTERIOR) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 01. EVOLUCIÓN INVERSIÓN REAL OOH (WIDER) */}
        <div className="lg:col-span-2 bg-white rounded-[40px] p-10 border shadow-sm relative group overflow-hidden">
          <div className="flex justify-between items-start mb-8 relative z-10">
            <h3 className="text-xl font-black uppercase tracking-tighter italic flex items-center gap-3"><TrendingUp className="text-[#ffd900]" /> 01. Evolución Inversión Real OOH (M€)</h3>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 bg-slate-50 px-3 py-1 rounded-full animate-pulse"><Info size={12} /> Pincha para análisis</div>
          </div>
          <div className="h-[350px] w-full relative">
            <button onClick={() => setShowInsight(true)} className="absolute inset-0 z-20 w-full h-full cursor-pointer opacity-0" />
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
            <div className="absolute inset-0 bg-slate-900/95 p-12 flex flex-col justify-center animate-in zoom-in-95 duration-300 z-50">
              <button onClick={() => setShowInsight(false)} className="absolute top-8 right-8 text-white/50 hover:text-[#ffd900]"><X size={24} /></button>
              <p className="text-lg md:text-xl font-bold text-white italic leading-relaxed text-center max-w-2xl mx-auto">
                "El medio Exterior mantiene un <span className="text-[#ffd900]">crecimiento sostenido</span>: pasa de 350 M€ (2022) a 460,5 M€ (2025), con variaciones de <span className="text-[#ffd900]">+16,29%, +6,14% y +6,6%</span> y una tasa compuesta del <span className="text-[#ffd900]">9,5%</span> batiendo el -2,6% del mercado general."
              </p>
            </div>
          )}
        </div>

        {/* 02. INVERSIÓN TOTAL MEDIOS */}
        <div className="bg-white rounded-[40px] p-10 border shadow-sm">
          <h3 className="text-xl font-black uppercase tracking-tighter italic mb-8 flex items-center gap-3"><BarChart3 className="text-[#ffd900]" /> 02. Inversión Total Medios Controlados (M€)</h3>
          <div className="h-[250px] w-full"><ResponsiveContainer><BarChart data={dataMarketHistory}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" /><XAxis dataKey="year" tick={{fontSize: 11, fontWeight: 700}} axisLine={false} tickLine={false} /><YAxis tick={{fontSize: 11}} axisLine={false} tickLine={false} /><Tooltip cursor={{fill: '#fcf8e3'}} /><Bar dataKey="totalMedia" fill="#000" radius={[8, 8, 0, 0]} barSize={35} /></BarChart></ResponsiveContainer></div>
        </div>

        {/* 03. FORECAST 2030 */}
        <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
          <h3 className="text-xl font-black uppercase tracking-tighter italic mb-10 flex items-center gap-3 text-white"><Clock className="text-[#ffd900]" /> 03. Evolución Futura & Forecast (2030)</h3>
          <div className="h-[250px] w-full relative z-10"><ResponsiveContainer><LineChart data={dataFutureForecast}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" /><XAxis dataKey="year" tick={{fontSize: 11, fill: '#94a3b8'}} axisLine={false} tickLine={false} /><YAxis tick={{fontSize: 11, fill: '#94a3b8'}} axisLine={false} tickLine={false} /><Tooltip contentStyle={{backgroundColor: '#1e293b', border: 'none'}} /><Line type="stepAfter" dataKey="value" stroke="#ffd900" strokeWidth={4} dot={{r: 6, fill: '#ffd900'}} /></LineChart></ResponsiveContainer></div>
        </div>

        {/* 04. TENDENCIAS & VARIACIÓN */}
        <div className="bg-white rounded-[40px] p-10 border shadow-sm">
          <h3 className="text-xl font-black uppercase tracking-tighter italic mb-8 flex items-center gap-3 text-slate-900"><Activity className="text-[#ffd900]" /> 04. Tendencias & Variación (%)</h3>
          <div className="h-[250px] w-full"><ResponsiveContainer><ComposedChart data={dataMarketHistory}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" /><XAxis dataKey="year" tick={{fontSize: 11, fontWeight: 700}} axisLine={false} tickLine={false} /><YAxis tick={{fontSize: 11}} axisLine={false} tickLine={false} /><Tooltip /><Bar dataKey="variation" fill="#e5e7eb" radius={[5, 5, 0, 0]} barSize={25} /><Line type="monotone" dataKey="variation" stroke="#000" strokeWidth={3} dot={{r: 5, fill: '#000'}} /></ComposedChart></ResponsiveContainer></div>
        </div>

        {/* 05. EVOLUCIÓN HISTÓRICA MEDIOS */}
        <div className="bg-white rounded-[40px] p-10 border shadow-sm">
          <h3 className="text-xl font-black uppercase tracking-tighter italic mb-8 flex items-center gap-3 text-slate-900"><ChartIcon className="text-[#ffd900]" /> 05. Histórico Inversión Medios Controlados</h3>
          <div className="h-[250px] w-full"><ResponsiveContainer><LineChart data={dataMarketHistory}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" /><XAxis dataKey="year" tick={{fontSize: 11, fontWeight: 700}} axisLine={false} tickLine={false} /><YAxis tick={{fontSize: 11}} axisLine={false} tickLine={false} /><Tooltip /><Line type="monotone" dataKey="totalMedia" stroke="#000" strokeWidth={4} dot={{r: 6, fill: '#ffd900', stroke: '#000', strokeWidth: 2}} /></LineChart></ResponsiveContainer></div>
        </div>
      </div>

      {/* ÍNDICE ESTRATÉGICO FINAL */}
      <div className="bg-white rounded-[60px] border border-slate-200 p-12 md:p-24 shadow-sm mt-20">
         <div className="max-w-4xl mx-auto"><h3 className="text-4xl font-black uppercase tracking-tighter italic text-slate-900 mb-12 flex items-center gap-4"><Book className="text-[#ffd900]" /> Índice <span className="text-slate-400">Estratégico</span></h3><div className="grid grid-cols-1 md:grid-cols-2 gap-6">{[{ id: 'soportes', label: 'Tipos de Soportes', mod: '02' }, { id: 'licitaciones', label: 'Licitaciones & Plazas', mod: '03' }, { id: 'companias', label: 'M&A Targets', mod: '04' }, { id: 'expertos', label: 'Visión de Expertos', mod: '05' }].map((item) => (<button key={item.id} onClick={() => onNavigate(item.id)} className="group flex flex-col p-10 bg-slate-50 rounded-[50px] border border-slate-100 hover:bg-black transition-all text-left"><span className="text-[11px] font-black uppercase text-slate-400 group-hover:text-[#ffd900] mb-4">Módulo {item.mod}</span><span className="text-2xl font-black italic text-slate-900 group-hover:text-white uppercase mb-3 leading-none">{item.label}</span><ChevronRight size={28} className="mt-10 text-slate-300 group-hover:text-[#ffd900] group-hover:translate-x-3 transition-all" /></button>))}</div></div>
      </div>
    </div>
  );
};

// --- COMPONENTES DE DETALLE ---

const CompanyDetailView = ({ company, onBack }) => (
  <div className="max-w-6xl mx-auto bg-white rounded-[60px] shadow-2xl border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-10 pb-20 text-slate-900 font-sans">
    <div className="p-10 bg-slate-900 text-white flex justify-between items-center">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-black text-xs uppercase tracking-widest"><ChevronLeft size={20} /> Volver al Radar</button>
      <div className="bg-[#ffd900] text-black px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest italic tracking-[0.2em]">Bud Advisors Intelligence</div>
    </div>
    <div className="p-10 md:p-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-12">
          <div><h2 className="text-7xl font-black tracking-tighter italic uppercase leading-[0.8] mb-8">{company.name}</h2><p className="text-2xl text-slate-500 font-medium italic leading-relaxed">{company.description}</p></div>
          <div className="p-10 bg-slate-50 rounded-[40px] border border-slate-200"><h4 className="font-black uppercase text-xs tracking-[0.3em] mb-8 text-slate-400">Equipo Directivo España</h4><div className="grid grid-cols-1 md:grid-cols-2 gap-8">{company.management?.map((mgr, i) => (<div key={i} className="flex flex-col"><span className="text-lg font-black italic">{mgr.name}</span><span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{mgr.role}</span></div>))}</div></div>
          <div className="space-y-4"><h4 className="text-xl font-black italic uppercase underline decoration-[#ffd900] decoration-4">Ubicaciones Estratégicas</h4><p className="text-lg text-slate-600 font-medium italic">{company.financials?.delegations}</p></div>
        </div>
        <div className="space-y-8">
           <div className="p-10 bg-slate-900 rounded-[50px] text-white shadow-xl"><h4 className="text-[#ffd900] font-black uppercase text-[10px] mb-8 italic tracking-[0.3em]">Snapshot Inventario</h4><div className="space-y-6"><div><p className="text-slate-400 text-[9px] uppercase font-black mb-1 italic">Total Caras</p><p className="text-3xl font-black italic">{company.inventory?.total}</p></div><div><p className="text-slate-400 text-[9px] uppercase font-black mb-1 italic">Soportes Digitales</p><p className="text-3xl font-black italic text-[#ffd900]">{company.inventory?.digital}</p></div><div><p className="text-slate-400 text-[9px] uppercase font-black mb-1 italic">Peso Ingreso Digital</p><p className="text-xl font-black italic">{company.inventory?.digitalWeight}</p></div></div></div>
           <div className="p-10 bg-[#ffd900] rounded-[50px] text-black"><h4 className="font-black uppercase text-[10px] mb-8 italic">Métricas de Mercado</h4><div className="space-y-4 font-bold text-sm italic"><p>Cuota Mercado: {company.financials?.marketShare}</p><p>CAPEX FY24: {company.financials?.capex}</p></div></div>
        </div>
      </div>
    </div>
  </div>
);

const TenderDetailView = ({ tender, onBack }) => (
  <div className="max-w-6xl mx-auto bg-white rounded-[60px] shadow-2xl border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-10 pb-20 text-slate-900 font-sans">
    <div className="p-10 bg-slate-900 text-white flex justify-between items-center"><button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-black text-xs uppercase tracking-widest"><ChevronLeft size={20} /> Volver</button><div className="bg-[#ffd900] text-black px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest italic tracking-[0.2em]">Public Asset Analysis</div></div>
    <div className="p-10 md:p-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-12">
          <div><p className="text-[#ffd900] font-black uppercase text-xs tracking-widest mb-2 italic">{tender.city}</p><h2 className="text-7xl font-black tracking-tighter italic uppercase leading-[0.8] mb-8">{tender.name}</h2></div>
          <div className="prose prose-slate max-w-none"><h4 className="text-xl font-black italic uppercase mb-6 underline decoration-[#ffd900] decoration-4">Diagnóstico Técnico</h4><p className="text-lg text-slate-600 leading-relaxed font-medium italic">{tender.analysis}</p></div>
          <div className="p-10 bg-slate-900 rounded-[40px] text-white">
             <h4 className="text-[#ffd900] font-black uppercase text-[10px] mb-8 italic tracking-[0.3em]">Otros Activos en la Plaza</h4>
             <div className="space-y-6">{tender.extraContracts?.map((ext, idx) => (<div key={idx} className="flex justify-between items-center border-b border-white/10 pb-4"><div><p className="font-black italic text-xl">{ext.name}</p><p className="text-xs text-slate-400">{ext.detail}</p></div><div className="text-right"><p className="font-black text-[#ffd900] italic">{ext.operator}</p><p className="text-[10px] uppercase text-slate-400">Vence: {ext.expiry}</p></div></div>))}</div>
          </div>
        </div>
        <div className="space-y-8"><div className="p-10 bg-slate-50 rounded-[50px] border shadow-sm">
           <h4 className="text-slate-400 font-black uppercase text-[10px] mb-8 italic tracking-[0.3em]">Snapshot Concesional</h4>
           <div className="space-y-6">
              <div><p className="text-slate-400 text-[9px] uppercase font-black mb-1 italic">Vencimiento</p><p className="text-4xl font-black italic">{tender.expiry}</p></div>
              <div><p className="text-slate-400 text-[9px] uppercase font-black mb-1 italic">Duración</p><p className="text-3xl font-black italic">{tender.duration}</p></div>
              <div className="pt-6 border-t"><p className="text-slate-400 text-[9px] uppercase font-black mb-1 italic">Valor Estimado</p><p className="text-xl font-black italic">{tender.value}</p></div>
           </div>
        </div></div>
      </div>
    </div>
  </div>
);

const SupportDetailView = ({ support, onBack }) => {
  const Icon = support.icon;
  return (
    <div className="max-w-6xl mx-auto bg-white rounded-[60px] shadow-2xl border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-10 pb-20 text-slate-900 font-sans">
      <div className="p-10 bg-slate-900 text-white flex justify-between items-center"><button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-black text-xs uppercase tracking-widest"><ChevronLeft size={20} /> Volver</button><div className="bg-[#ffd900] text-black px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest italic font-sans tracking-[0.2em]">Asset Atlas Profile</div></div>
      <div className="p-10 md:p-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <div className="flex items-center gap-6"><div className="p-8 bg-slate-900 text-[#ffd900] rounded-[2rem] shadow-2xl"><Icon size={64} /></div><div><h2 className="text-7xl font-black tracking-tighter italic uppercase leading-[0.8] mb-2">{support.name}</h2><p className="text-2xl text-slate-500 font-medium italic">Asset Class • {support.share} Share</p></div></div>
            <p className="text-3xl text-slate-700 font-medium italic leading-relaxed border-l-8 border-[#ffd900] pl-10">{support.description}</p>
            <div className="space-y-6"><h4 className="text-xl font-black italic uppercase underline decoration-[#ffd900] decoration-4">Análisis Técnico</h4><p className="text-lg text-slate-600 leading-relaxed font-medium italic">{support.details}</p></div>
          </div>
          <div className="space-y-8">
             <div className="p-10 bg-slate-900 rounded-[50px] text-white shadow-xl"><h4 className="text-[#ffd900] font-black uppercase text-[10px] mb-8 italic tracking-widest">Inventario Clave</h4><ul className="space-y-4">{support.assets.map((a, i) => (<li key={i} className="flex items-center gap-3 font-black italic text-lg"><CheckCircle2 size={18} className="text-[#ffd900]"/> {a}</li>))}</ul></div>
             <div className="p-10 bg-slate-50 rounded-[50px] border shadow-sm"><h4 className="text-slate-400 font-black uppercase text-[10px] mb-8 italic">Strategic Insight</h4><p className="font-black italic text-slate-900 leading-snug">"{support.insight}"</p></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExpertDetailView = ({ expert, onBack }) => (
  <div className="max-w-4xl mx-auto bg-white rounded-[60px] shadow-2xl border border-slate-100 overflow-hidden animate-in slide-in-from-right-10 pb-20 text-slate-900 font-sans">
    <div className="p-10 bg-slate-900 text-white flex justify-between items-center font-sans"><button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-black text-xs uppercase tracking-widest"><ChevronLeft size={20} /> Volver</button><div className="flex items-center gap-2 bg-[#ffd900] text-black px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest italic"><BookOpen size={14}/> Insight Editorial</div></div>
    <div className="p-10 md:p-20">
      <div className="flex flex-col md:flex-row gap-10 items-start mb-16 border-b pb-16 border-slate-100"><div className="w-32 h-32 bg-slate-100 rounded-[40px] flex items-center justify-center font-black text-5xl text-slate-900 italic shadow-xl">{expert.company?.[0]}</div><div><p className="text-slate-900 font-black uppercase text-xs tracking-[0.4em] mb-4 italic">{expert.role} de {expert.company}</p><h2 className="text-7xl font-black tracking-tighter leading-[0.8] mb-6 uppercase italic font-sans">{expert.name}</h2></div></div>
      <article className="prose prose-slate max-w-none"><div className="bg-yellow-50 border-l-[12px] border-[#ffd900] p-12 rounded-r-[50px] mb-16 italic shadow-inner"><Quote className="text-yellow-200 mb-6" size={50} fill="currentColor" /><p className="text-slate-900 font-black text-3xl tracking-tight leading-tight italic font-sans">"{expert.tesis}"</p></div><div className="space-y-12 text-slate-700 text-2xl leading-[1.6] font-medium selection:bg-yellow-200 italic font-sans whitespace-pre-line">{expert.fullContent}</div></article>
    </div>
  </div>
);

// --- CONSULTOR IA FUNCIONAL ---
const AiConsultantView = () => {
  const [messages, setMessages] = useState([{ role: 'assistant', text: 'Bienvenido al Hub de Inteligencia de Bud Advisors. ¿Análisis M&A o Mercado?' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: userMsg }] }], systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] } })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', text: data.candidates?.[0]?.content?.parts?.[0]?.text || "Error." }]);
    } catch (e) { setMessages(prev => [...prev, { role: 'assistant', text: "Error de conexión." }]); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-4xl mx-auto h-[750px] flex flex-col bg-white rounded-[50px] shadow-2xl overflow-hidden ring-1 ring-slate-200 animate-in slide-in-from-bottom-5">
      <div className="p-10 border-b bg-slate-900 text-white flex items-center gap-6"><div className="bg-[#ffd900] p-4 rounded-3xl text-black shadow-xl"><BrainCircuit size={32} /></div><div><h3 className="font-black text-2xl tracking-tighter uppercase italic leading-none font-sans">Strat-GPT <span className="text-[#ffd900] not-italic">ADVISOR</span></h3></div></div>
      <div className="flex-1 overflow-y-auto p-10 bg-slate-50/50 space-y-8 custom-scrollbar" ref={scrollRef}>
        {messages.map((m, i) => (<div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] p-6 rounded-[32px] text-sm font-bold shadow-sm ${m.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none ring-1 ring-slate-100'}`}>{m.text}</div></div>))}
        {loading && <div className="flex items-center gap-3 text-slate-400 animate-pulse font-sans"><Loader2 className="animate-spin" size={16} /><span>Generando...</span></div>}
      </div>
      <div className="p-8 bg-white border-t flex gap-4"><input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="¿Cuál es el potencial de M&A?" className="flex-1 bg-slate-50 border-none rounded-3xl px-8 py-5 text-sm font-bold outline-none focus:ring-2 focus:ring-yellow-400 transition-all font-sans text-slate-900" /><button onClick={handleSendMessage} disabled={loading} className="bg-[#ffd900] text-slate-900 p-5 rounded-3xl hover:bg-[#ffed4d] disabled:opacity-50 shadow-xl transition-all"><Send size={24} /></button></div>
    </div>
  );
};

// --- APP ---

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
      case 'soportes': return (<div className="space-y-10 animate-in fade-in duration-700 pb-32 text-slate-900"><div><h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none mb-4 uppercase italic font-sans">Support <span className="text-slate-500 not-italic uppercase tracking-normal italic">Atlas</span></h2></div><div className="grid grid-cols-1 md:grid-cols-2 gap-8">{supportDatabase.map((s) => (<div key={s.id} onClick={() => setSelectedItem(s)} className="bg-white border border-slate-200 rounded-[40px] p-10 hover:shadow-2xl transition-all cursor-pointer group"><div className="flex justify-between items-start mb-8"><div className="p-5 bg-slate-900 text-white rounded-3xl group-hover:bg-[#ffd900] group-hover:text-black transition-colors"><s.icon size={32} /></div><p className="text-4xl font-black text-slate-900 italic">{s.share}</p></div><h3 className="text-3xl font-black italic uppercase text-slate-900 mb-4 leading-none tracking-tighter">{s.name}</h3><p className="text-slate-500 font-medium italic line-clamp-2">{s.description}</p></div>))}</div></div>);
      case 'companias': return (<div className="space-y-10 animate-in fade-in duration-700 pb-20"><h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none mb-4 uppercase italic">M&A <span className="text-slate-500 not-italic uppercase tracking-normal">Targets</span></h2><div className="grid grid-cols-1 md:grid-cols-2 gap-8">{companyDatabase.map((c) => (<div key={c.id} onClick={() => setSelectedItem(c)} className="bg-white border border-slate-200 rounded-[40px] p-10 hover:shadow-2xl transition-all cursor-pointer group"><div className="flex justify-between items-center mb-8"><span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-100">{c.status}</span></div><h3 className="text-3xl font-black italic uppercase text-slate-900 mb-4 leading-none tracking-tighter">{c.name}</h3><p className="text-slate-500 font-medium italic line-clamp-2">{c.description}</p></div>))}</div></div>);
      case 'expertos': return (<div className="space-y-10 animate-in fade-in duration-700 pb-20 text-slate-900 font-sans"><h2 className="text-6xl font-black tracking-tighter leading-none mb-4 uppercase italic font-sans">Expert <span className="text-slate-500 not-italic uppercase tracking-normal">Vision</span></h2><div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">{expertInterviews.map((e) => (<div key={e.id} onClick={() => setSelectedItem(e)} className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm hover:shadow-xl hover:border-black transition-all cursor-pointer group relative overflow-hidden"><div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:rotate-12 transition-all duration-700"><Quote size={120} fill="currentColor" /></div><div className="flex items-center gap-4 mb-6"><div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-xl italic group-hover:bg-[#ffd900] group-hover:text-black transition-colors">{e.company[0]}</div><div><h4 className="text-lg font-black leading-tight font-sans">{e.name}</h4><p className="text-[10px] font-black uppercase mt-1 opacity-50 italic">{e.role}</p></div></div><p className="text-sm font-medium text-slate-600 leading-relaxed italic line-clamp-3">"{e.tesis}"</p><div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center text-slate-900 font-black text-[10px] uppercase italic tracking-widest">Leer Análisis Completo <ArrowRight size={16} /></div></div>))}</div></div>);
      case 'licitaciones': return (<div className="space-y-10 animate-in fade-in duration-700 pb-20 text-slate-900"><h2 className="text-6xl font-black tracking-tighter leading-none mb-4 uppercase italic">Licitaciones <span className="text-slate-500 not-italic uppercase tracking-normal">Control</span></h2><div className="bg-white border border-slate-200 rounded-[40px] overflow-hidden shadow-sm"><table className="w-full text-left font-sans font-medium"><thead className="bg-slate-900 text-white font-black"><tr><th className="p-6 text-[10px] font-black uppercase tracking-widest italic">Plaza</th><th className="p-6 text-[10px] font-black uppercase tracking-widest italic text-center">Expiración</th><th className="p-6 text-[10px] font-black uppercase tracking-widest italic text-right">Riesgo</th></tr></thead><tbody className="divide-y divide-slate-100 italic">{tendersDatabase.map((t) => (<tr key={t.id} onClick={() => setSelectedItem(t)} className="hover:bg-yellow-50 transition-colors cursor-pointer"><td className="p-6 font-black uppercase text-sm text-slate-900">{t.city}</td><td className="p-6 text-xs text-center">{t.expiry}</td><td className="p-6 text-right font-black text-rose-600 uppercase">{t.risk}</td></tr>))}</tbody></table></div></div>);
      default: return <MarketView onNavigate={setActiveArea} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans selection:bg-yellow-200 selection:text-black">
      <aside className={`fixed inset-y-0 left-0 z-50 w-80 bg-[#ffd900] text-slate-900 transform transition-transform duration-500 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'} print:hidden flex flex-col ring-1 ring-black/5`}>
        <div className="p-12 border-b border-black/10 text-center"><h1 className="text-4xl font-black tracking-tighter leading-none uppercase italic font-black">IMU<br/><span className="text-black/60 lowercase tracking-tight not-italic font-black">Intelligence</span></h1></div>
        <nav className="p-8 space-y-4 flex-1 overflow-y-auto custom-scrollbar">
          <NavItem id="mercado" label="01. Mercado" icon={BarChart3} />
          <NavItem id="soportes" label="02. Soportes" icon={Layers} />
          <NavItem id="licitaciones" label="03. Licitaciones" icon={Gavel} />
          <NavItem id="companias" label="04. Compañías" icon={Target} />
          <NavItem id="expertos" label="05. Expertos" icon={MessageSquare} />
          <div className="pt-8 mt-8 border-t border-black/10">
             <button onClick={() => setActiveArea('ai')} className={`w-full flex items-center gap-5 px-6 py-5 rounded-[24px] transition-all font-black uppercase text-[9px] tracking-[0.25em] mb-4 ${activeArea === 'ai' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-800 hover:bg-black/5'}`}><BrainCircuit size={20}/> Strat-GPT Hub</button>
             <div className="mt-4 flex justify-center"><img src="https://static.wixstatic.com/media/88e5e3_c20937499861486895bbba1fd101b94e~mv2.png" alt="Bud Advisors Logo" className="w-1/3 h-auto object-contain mix-blend-multiply opacity-90 contrast-125" /></div>
          </div>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto h-screen p-6 md:p-20 print:p-0 custom-scrollbar"><div className="md:hidden flex justify-between items-center mb-12 bg-white p-6 rounded-[32px] border print:hidden shadow-sm"><h1 className="font-black text-slate-900 tracking-tighter uppercase italic text-2xl font-sans leading-none">IMU Intel</h1><button onClick={() => setSidebarOpen(true)} className="p-4 bg-[#ffd900] text-slate-900 rounded-2xl shadow-xl"><Menu size={24} /></button></div><div className="max-w-[1400px] mx-auto">{renderContent()}</div></main>
    </div>
  );
};

export default App;