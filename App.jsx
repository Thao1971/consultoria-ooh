import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { 
  TrendingUp, Map, Users, Target, ChevronRight, Menu, X, 
  LayoutDashboard, Building2, BarChart3, Briefcase, 
  ArrowRight, CheckCircle2, AlertTriangle, MonitorPlay,
  Sparkles, Bot, Send, Loader2, FileText, BookOpen, Printer
} from 'lucide-react';

// --- DATA SETS ---

// InfoAdex: Inversión Histórica (Medios Controlados)
const dataInfoAdex = [
  { year: '2022', inversion: 350.2, growth: 16.1 },
  { year: '2023', inversion: 406.7, growth: 16.1 },
  { year: '2024', inversion: 432.0, growth: 6.2 },
  { year: '2025', inversion: 460.5, growth: 6.6 },
];

// Mordor Intelligence: Previsión Futura (OOH + DOOH Mercado Total)
const dataMordor = [
  { year: '2025', marketSize: 390.6 },
  { year: '2026', marketSize: 410.7 },
  { year: '2027', marketSize: 431.9 },
  { year: '2028', marketSize: 454.1 },
  { year: '2029', marketSize: 477.5 },
  { year: '2030', marketSize: 502.1 },
];

// Digital vs Analog Split (2025 Estimate)
const dataDoohSplit = [
  { name: 'Convencional (OOH)', value: 268.4, color: '#94a3b8' },
  { name: 'Digital (DOOH)', value: 192.1, color: '#3b82f6' },
];

// Asset Categories Distribution
const dataAssets = [
  { name: 'Mobiliario Urbano', value: 45, color: '#1e3a8a' },
  { name: 'Transporte', value: 25, color: '#1e40af' },
  { name: 'Gran Formato', value: 20, color: '#3b82f6' },
  { name: 'Indoor/Retail', value: 10, color: '#60a5fa' },
];

// Concession Map Data
const concessionsData = [
  { city: 'Madrid', operator: 'Clear Channel', expiry: '2028/2031', details: 'Contrato 12 años. Marquesinas y Mupis.' },
  { city: 'Barcelona', operator: 'JCDecaux', expiry: '2035 (Aprox)', details: 'Adjudicado Oct 2025. Incluye digitalización.' },
  { city: 'Valencia', operator: 'JCDecaux', expiry: 'Vinculado Valenbisi', details: 'Liderazgo en soportes de calle.' },
  { city: 'Bilbao', operator: 'JCDecaux', expiry: 'N/A', details: 'Marquesinas diseño Foster.' },
  { city: 'Sevilla', operator: 'JCDecaux', expiry: 'Vinculado Sevici', details: 'Feudo histórico en el sur.' },
];

// --- GEMINI API SETUP ---
const apiKey = ""; // The key is provided by the environment
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-09-2025" });

const reportContext = `
Eres un consultor experto en M&A y publicidad exterior (OOH) en España.
Datos clave:
1. Inversión 2025: 460,5 M€ (+6,6%). Penetración DOOH: 41,7%.
2. CAGR 2025-2030: 5,15%.
3. >70% mercado es concesional.
4. Jugadores: JCDecaux (BCN, VLC, BIO, SVQ), Clear Channel/Atresmedia (MAD), Global (Transporte).
5. Estrategia: Buy-and-Build.
`;

// --- COMPONENTS ---

const Card = ({ title, children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 p-6 ${className}`}>
    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
      {title}
    </h3>
    {children}
  </div>
);

const MetricCard = ({ title, value, subtext, trend, icon: Icon }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h4 className="text-2xl font-bold text-slate-900">{value}</h4>
      <p className={`text-xs font-medium mt-2 flex items-center ${trend === 'positive' ? 'text-emerald-600' : 'text-rose-600'}`}>
        {subtext}
      </p>
    </div>
    <div className={`p-3 rounded-lg ${trend === 'positive' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
      <Icon size={24} />
    </div>
  </div>
);

const SectionHeader = ({ title, subtitle, action }) => (
  <div className="mb-8 flex justify-between items-end">
    <div>
      <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
      <p className="text-slate-500 mt-2 text-lg">{subtitle}</p>
    </div>
    {action}
  </div>
);

// --- FULL REPORT VIEW COMPONENT ---

const FullReportView = () => (
  <div className="space-y-8 max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-sm border border-slate-200">
    <div className="border-b border-slate-200 pb-6 mb-6 flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Estrategia de Entrada: Mercado OOH España</h1>
        <p className="text-slate-500">Documento de Consultoría Confidencial • 2025</p>
      </div>
      <button onClick={() => window.print()} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium px-4 py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
        <Printer size={18} /> Imprimir / PDF
      </button>
    </div>

    <article className="prose prose-slate max-w-none text-slate-700">
      <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">0.1. Qué decisión hay que tomar</h3>
      <p>
        Esta consultoría responde a una decisión concreta: cómo debe entrar una compañía extranjera en el mercado español de publicidad exterior (OOH/DOOH) a través de adquisiciones, minimizando riesgos concesionales y maximizando velocidad de escala.
        La decisión no es “entrar o no entrar” en abstracto. Es elegir un camino de entrada con implicaciones operativas, regulatorias y de capital.
      </p>
      <ul className="list-disc pl-5 space-y-2 mt-4">
        <li><strong>Dónde jugar:</strong> Priorización de subcategorías (mobiliario, transporte, gran formato) y ciudades críticas.</li>
        <li><strong>Con quién entrar:</strong> Perfil de target (concesional vs patrimonial) y combinación para plataforma de crecimiento (buy-and-build).</li>
        <li><strong>Cuándo entrar:</strong> Timing óptimo según vencimientos de licencias (ventanas de oportunidad).</li>
      </ul>

      <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Alcance y Metodología</h3>
      <p>
        El informe analiza el mercado español con un enfoque práctico. Se estructura en seis capas de trabajo para pasar de la lectura de mercado a una recomendación ejecutable: Mercado e inversión, Activos, Actores, Licencias, Entrevistas y Síntesis M&A.
      </p>

      <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Mercado e Inversión (2022-2025)</h3>
      <p>
        El medio Exterior mantiene un crecimiento sostenido, pasando de 350 M€ (2022) a <strong>460,5 M€ (2025)</strong>, batiendo el crecimiento negativo de la inversión publicitaria general (-2,6%).
      </p>
      <p>
        <strong>La digitalización es estructural:</strong> En 2025, el DOOH representa el 41,7% de la inversión (192,1 M€). Ya no es una "innovación", sino el estándar operativo. La compra programática acelera, exigiendo métricas comparables con el video online.
      </p>

      <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Activos y Categorías</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
          <h4 className="font-bold text-slate-900">Mobiliario Urbano</h4>
          <p className="text-sm">Núcleo del mercado. Barreras altas por concursos públicos y solvencia. Riesgo concesional de largo plazo. Operadores: JCDecaux (Líder BCN/VLC/SEV), Clear Channel (Líder MAD).</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
          <h4 className="font-bold text-slate-900">Transporte</h4>
          <p className="text-sm">Alta concentración (AENA, ADIF, Metro). Contratos de gran escala e inversión. Ventanas de entrada muy limitadas. Operador clave: Global.</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
          <h4 className="font-bold text-slate-900">Gran Formato</h4>
          <p className="text-sm">Activos individuales o licencias urbanísticas. Menor riesgo sistémico. Ideal para estrategias "Buy-and-Build" y digitalización de activos premium.</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
          <h4 className="font-bold text-slate-900">Indoor / Retail</h4>
          <p className="text-sm">Contratos privados (Malls, Gyms). Puente hacia Retail Media. Necesita escala para ser relevante nacionalmente.</p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. Conclusión Estratégica</h3>
      <p>
        El mercado español no crece por inercia, sino por reasignación hacia soportes digitales y eficientes. La entrada recomendada no debe depender de un único gran contrato concesional (riesgo binario), sino construir una plataforma diversificada (Buy-and-Build) que combine estabilidad concesional con flexibilidad de Gran Formato.
      </p>
    </article>

    <div className="mt-8 pt-8 border-t border-slate-200 text-center text-slate-400 text-sm">
      <p>Fin del Documento • Generado para Cliente Confidencial</p>
    </div>
  </div>
);

// --- AI VIEWS & DASHBOARD (Previous Code integrated) ---

const AiConsultantView = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hola. Soy tu asistente estratégico. ¿En qué puedo ayudarte sobre el informe?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setLoading(true);
    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: userMessage }] }],
        systemInstruction: { parts: [{ text: reportContext }] }
      });
      setMessages(prev => [...prev, { role: 'assistant', text: result.response.text() }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Error de conexión con Gemini.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Chat con el Informe" className="h-[600px] flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4 bg-slate-50 p-4 rounded-lg border border-slate-100 space-y-4" ref={scrollRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-slate-200 rounded-bl-none shadow-sm'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-xs text-slate-500 flex items-center gap-2"><Loader2 className="animate-spin" size={12}/> Analizando...</div>}
      </div>
      <div className="flex gap-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Pregunta algo..." className="flex-1 border rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500"/>
        <button onClick={handleSendMessage} disabled={loading} className="bg-blue-600 text-white p-2 rounded-lg"><Send size={18}/></button>
      </div>
    </Card>
  );
};

// ... (Previous Dashboard Components: ExecutiveSummary, MarketAnalysis, AssetCategories, CompetitiveLandscape kept as implies) ...

const ExecutiveSummary = () => (
    <div className="space-y-6">
    <SectionHeader 
      title="Resumen Ejecutivo" 
      subtitle="Hoja de ruta para la entrada en el mercado español OOH/DOOH." 
    />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard title="Mercado 2025" value="460,5 M€" subtext="+6,6% vs 2024" trend="positive" icon={BarChart3} />
      <MetricCard title="Penetración Digital" value="41,7%" subtext="Estándar operativo" trend="positive" icon={MonitorPlay} />
      <MetricCard title="CAGR 2025-2030" value="5,15%" subtext="Crecimiento Estructural" trend="positive" icon={TrendingUp} />
      <MetricCard title="Dependencia Concesional" value=">70%" subtext="Mobiliario + Transporte" trend="neutral" icon={Building2} />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="La Decisión Estratégica">
        <div className="space-y-4">
            <div className="flex gap-4 items-start p-3 bg-slate-50 rounded-lg">
                <div className="bg-blue-100 p-2 rounded text-blue-700 mt-1"><Map size={18} /></div>
                <div><h4 className="font-semibold text-slate-900">Dónde Jugar</h4><p className="text-sm text-slate-600">Priorización de subcategorías y ciudades críticas.</p></div>
            </div>
            <div className="flex gap-4 items-start p-3 bg-slate-50 rounded-lg">
                <div className="bg-purple-100 p-2 rounded text-purple-700 mt-1"><Users size={18} /></div>
                <div><h4 className="font-semibold text-slate-900">Con Quién Entrar</h4><p className="text-sm text-slate-600">Estrategia 'Buy-and-Build' vs. Riesgo binario.</p></div>
            </div>
        </div>
      </Card>
      <Card title="Dinámica del Mercado">
        <p className="text-slate-600 mb-4">El mercado español no crece por inercia, sino por <strong>reasignación y digitalización</strong>.</p>
        <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Exterior bate al mercado general (+6,6%).</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> DOOH es el estándar operativo (~42%).</li>
            <li className="flex items-center gap-2"><AlertTriangle size={16} className="text-amber-500" /> Brecha de crecimiento vs Global.</li>
        </ul>
      </Card>
    </div>
  </div>
);

const MarketAnalysis = () => (
    <div className="space-y-6">
      <SectionHeader title="Análisis de Mercado" subtitle="Evolución y Proyecciones" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Evolución (InfoAdex)">
            <div className="h-64 w-full"><ResponsiveContainer><AreaChart data={dataInfoAdex}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="year"/><YAxis/><Tooltip/><Area type="monotone" dataKey="inversion" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.2}/></AreaChart></ResponsiveContainer></div>
        </Card>
        <Card title="Proyección (Mordor)">
            <div className="h-64 w-full"><ResponsiveContainer><BarChart data={dataMordor}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="year"/><YAxis domain={[300, 550]}/><Tooltip/><Bar dataKey="marketSize" fill="#1e293b" /></BarChart></ResponsiveContainer></div>
        </Card>
      </div>
    </div>
);

const AssetCategories = () => (
    <div className="space-y-6">
        <SectionHeader title="Activos" subtitle="Segmentación del Mercado" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card title="Peso Económico"><div className="h-64 w-full"><ResponsiveContainer><PieChart><Pie data={dataAssets} innerRadius={60} outerRadius={80} dataKey="value"><Cell fill="#1e3a8a"/><Cell fill="#1e40af"/><Cell fill="#3b82f6"/><Cell fill="#60a5fa"/></Pie><Tooltip/></PieChart></ResponsiveContainer></div></Card>
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                <div className="bg-white p-4 border rounded-xl"><h4 className="font-bold flex items-center gap-2"><Building2 size={18}/> Mobiliario</h4><p className="text-sm text-slate-500">Concesional. Barreras altas.</p></div>
                <div className="bg-white p-4 border rounded-xl"><h4 className="font-bold flex items-center gap-2"><MonitorPlay size={18}/> Transporte</h4><p className="text-sm text-slate-500">Alta concentración y CAPEX.</p></div>
                <div className="bg-white p-4 border rounded-xl"><h4 className="font-bold flex items-center gap-2"><LayoutDashboard size={18}/> Gran Formato</h4><p className="text-sm text-slate-500">Flexible. Buy-and-Build.</p></div>
                <div className="bg-white p-4 border rounded-xl"><h4 className="font-bold flex items-center gap-2"><Users size={18}/> Indoor</h4><p className="text-sm text-slate-500">Retail Media. Escalabilidad.</p></div>
            </div>
        </div>
    </div>
);

const CompetitiveLandscape = () => (
    <div className="space-y-6">
        <SectionHeader title="Competencia" subtitle="Mapa de Concesiones" />
        <Card title="Concesiones Clave">
            <div className="overflow-x-auto"><table className="w-full text-sm text-left"><thead className="bg-slate-50 text-slate-700"><tr><th className="p-3">Ciudad</th><th className="p-3">Operador</th><th className="p-3">Estado</th></tr></thead>
            <tbody>{concessionsData.map((d,i)=><tr key={i} className="border-b"><td className="p-3 font-medium">{d.city}</td><td className="p-3 text-blue-600">{d.operator}</td><td className="p-3 text-slate-500">{d.expiry}</td></tr>)}</tbody></table></div>
        </Card>
    </div>
);

// --- MAIN APP ---

const App = () => {
  const [activeView, setActiveView] = useState('executive');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderView = () => {
    switch(activeView) {
      case 'executive': return <ExecutiveSummary />;
      case 'market': return <MarketAnalysis />;
      case 'assets': return <AssetCategories />;
      case 'competition': return <CompetitiveLandscape />;
      case 'report': return <FullReportView />; // NEW VIEW
      case 'ai-consultant': return <AiConsultantView />;
      default: return <ExecutiveSummary />;
    }
  };

  const NavItem = ({ id, label, icon: Icon, isAi = false }) => (
    <button 
      onClick={() => { setActiveView(id); setMobileMenuOpen(false); }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        activeView === id 
          ? (isAi ? 'bg-indigo-600 text-white shadow-md' : 'bg-blue-600 text-white shadow-md')
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <Icon size={20} className={isAi ? "text-indigo-300" : ""} />
      <span className="font-medium">{label}</span>
      {isAi && activeView !== id && <Sparkles size={14} className="ml-auto text-indigo-400" />}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col md:flex-row">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 md:relative md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <div><h1 className="text-xl font-bold">OOH Strategy<span className="text-blue-500">.es</span></h1><p className="text-xs text-slate-500 uppercase mt-1">Informe Consultoría</p></div>
          <button onClick={() => setMobileMenuOpen(false)} className="md:hidden"><X size={24}/></button>
        </div>
        <nav className="p-4 space-y-2">
          <NavItem id="executive" label="Dashboard" icon={LayoutDashboard} />
          <NavItem id="market" label="Mercado" icon={BarChart3} />
          <NavItem id="assets" label="Activos" icon={Building2} />
          <NavItem id="competition" label="Competencia" icon={Map} />
          <NavItem id="report" label="Documento Completo" icon={BookOpen} /> 
          <div className="pt-4 mt-4 border-t border-slate-800"><p className="px-4 text-xs font-semibold text-slate-500 uppercase mb-2">AI Tools</p><NavItem id="ai-consultant" label="Consultor AI ✨" icon={Bot} isAi={true} /></div>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto h-screen">
        <div className="md:hidden bg-white border-b p-4 flex justify-between items-center sticky top-0 z-40">
          <h1 className="font-bold">OOH Strategy</h1>
          <button onClick={() => setMobileMenuOpen(true)}><Menu size={24}/></button>
        </div>
        <div className="p-6 max-w-7xl mx-auto pb-20">{renderView()}</div>
      </main>
    </div>
  );
};

export default App;