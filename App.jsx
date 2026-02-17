import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { 
  TrendingUp, Map, Users, Target, ChevronRight, Menu, X, 
  LayoutDashboard, Building2, BarChart3, Briefcase, 
  ArrowRight, CheckCircle2, AlertTriangle, MonitorPlay,
  Sparkles, Bot, Send, Loader2, FileText, BookOpen, Printer,
  Coins, Landmark, Search, Clock, ShieldCheck, Globe, FileDown, Eye
} from 'lucide-react';

// --- DATA SETS (ESTUDIO LA FEDE 2024 & INFOADEX) ---

const dataHistoricalBudgets = [
  { year: '2014', budget: 218.8 },
  { year: '2015', budget: 406.4 },
  { year: '2016', budget: 59.3 },
  { year: '2017', budget: 13.3 },
  { year: '2018', budget: 347.9 },
  { year: '2019', budget: 79.0 },
  { year: '2020', budget: 171.5 },
  { year: '2021', budget: 105.6 },
  { year: '2022', budget: 201.99 },
  { year: '2023', budget: 47.72 },
];

const dataTopAdvertisers = [
  { name: 'Coca-Cola', value: 16.1 },
  { name: 'Samsung', value: 10.9 },
  { name: 'L\'Oréal', value: 8.9 },
  { name: 'Disney', value: 8.7 },
  { name: 'Netflix', value: 8.2 },
  { name: 'Orange', value: 5.8 },
  { name: 'McDonald\'s', value: 5.3 },
  { name: 'Telefónica', value: 4.4 },
];

const dataPerCapita = [
  { name: 'Madrid', value: 13.33 },
  { name: 'País Vasco', value: 8.52 },
  { name: 'C. Valenciana', value: 1.42 },
  { name: 'Cataluña', value: 0.87 },
];

const concessionsData = [
  { city: 'Madrid', operator: 'Clear Channel', expiry: '2028/2031', details: 'Canon anual 33,3 M€' },
  { city: 'Barcelona', operator: 'JCDecaux', expiry: '2035 (Aprox)', details: 'Adjudicado Oct 2025' },
  { city: 'Valencia', operator: 'JCDecaux', expiry: 'Estable', details: 'Vinculado Valenbisi' },
  { city: 'Bilbao', operator: 'JCDecaux', expiry: 'Estable', details: 'Diseño Norman Foster' },
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
Eres un Consultor Senior experto en M&A y OOH para el Grupo IMU. 
Conoces el informe "Estrategia de Entrada: Mercado OOH España".
Utiliza los datos del estudio La FEDE 2024 (1.651M€ aportación social) y los detalles de concesiones de Madrid y Barcelona para responder.
`;

// --- COMPONENTES DE UI ---

const MetricCard = ({ title, value, subtext, trend, icon: Icon }) => (
  <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 flex items-start justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{title}</p>
      <h4 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h4>
      <p className={`text-xs font-bold mt-2 flex items-center gap-1 ${trend === 'positive' ? 'text-emerald-600' : 'text-slate-500'}`}>
        {trend === 'positive' && <TrendingUp size={14} />} {subtext}
      </p>
    </div>
    <div className={`p-4 rounded-2xl ${trend === 'positive' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'}`}>
      <Icon size={24} />
    </div>
  </div>
);

const Card = ({ title, subtitle, children }) => (
  <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
    <div className="mb-6">
      <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase">{title}</h3>
      {subtitle && <p className="text-sm text-slate-500 font-medium mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

// --- VISTAS ---

const DashboardView = () => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">Intelligence Lab</h2>
        <p className="text-slate-500 mt-4 text-lg font-medium">Análisis financiero y social del sector Exterior en España.</p>
      </div>
      <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
        <Sparkles size={14} /> Datos Actualizados 2025
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard title="Inversión OOH" value="460,5 M€" subtext="+6,6% vs 2024" trend="positive" icon={BarChart3} />
      <MetricCard title="Impacto Social" value="1.651 M€" subtext="Canon 10 años" trend="neutral" icon={Landmark} />
      <MetricCard title="Cuota Canon" value="62,7%" subtext="Retorno Social" trend="positive" icon={Coins} />
      <MetricCard title="Inversión p/c" value="13,33 €" subtext="Madrid (Anual)" trend="positive" icon={Users} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card title="Evolución de Presupuestos" subtitle="Presupuestos mínimos de licitación (2014-2023) en M€">
          <div className="h-[350px] w-full mt-4">
            <ResponsiveContainer>
              <BarChart data={dataHistoricalBudgets}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}} 
                  contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} 
                />
                <Bar dataKey="budget" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card title="Ranking Inversión" subtitle="Top Anunciantes OOH 2023">
        <div className="space-y-4 mt-2">
          {dataTopAdvertisers.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-slate-300 w-4">{idx + 1}</span>
                <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{item.name}</span>
              </div>
              <span className="text-xs font-black text-slate-900 bg-slate-100 px-2 py-1 rounded-md">{item.value}M</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

const ReportView = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className={`mx-auto bg-white p-8 md:p-20 rounded-[40px] shadow-2xl border border-slate-100 animate-in slide-in-from-bottom-8 duration-1000 print:shadow-none print:border-none print:p-0 transition-all ${isFullscreen ? 'max-w-none' : 'max-w-5xl'}`}>
      {/* Barra de Acciones PDF */}
      <div className="flex flex-wrap justify-end gap-3 mb-10 print:hidden">
        <button 
          onClick={() => setIsFullscreen(!isFullscreen)} 
          className="bg-slate-100 text-slate-600 px-6 py-3 rounded-2xl hover:bg-slate-200 transition-all flex items-center gap-2 font-bold text-xs uppercase tracking-widest"
        >
          {isFullscreen ? <Eye size={18} /> : <Eye size={18} />} {isFullscreen ? "Vista Normal" : "Pantalla Completa"}
        </button>
        <button 
          onClick={() => window.print()} 
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-700 transition-all flex items-center gap-2 font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-600/20"
        >
          <FileDown size={18} /> Descargar PDF
        </button>
      </div>

      {/* Cabecera del PDF */}
      <div className="border-b-4 border-slate-900 pb-12 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-4">
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-[0.85]">
            ESTRATEGIA<br/>DE ENTRADA
          </h1>
          <p className="text-xl font-bold text-blue-600 tracking-tight">Mercado OOH España • Consultoría Estratégica</p>
          <div className="flex gap-3 pt-2">
            <span className="bg-slate-900 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Confidencial</span>
            <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Grupo IMU • Edición 2025</span>
          </div>
        </div>
        <div className="print:hidden">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">Control de Documento</p>
           <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
             <p className="text-xs font-bold text-slate-600 flex items-center gap-2">
               <ShieldCheck size={14} className="text-emerald-500" /> Verificado por Intelligence Lab
             </p>
           </div>
        </div>
      </div>

      {/* Cuerpo del Documento */}
      <article className="prose prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:text-slate-600 prose-p:leading-relaxed text-slate-700">
        
        <section className="mb-16">
          <h2 className="text-3xl border-b border-slate-100 pb-4 mb-8">0.1. Qué decisión hay que tomar</h2>
          <p className="text-lg">
            Esta consultoría responde a una decisión concreta: <strong>cómo debe entrar una compañía extranjera en el mercado español de publicidad exterior (OOH/DOOH)</strong> a través de adquisiciones, minimizando riesgos concesionales y maximizando velocidad de escala.
          </p>
          <p>La decisión no es “entrar o no entrar” en abstracto. Es elegir un camino de entrada con implicaciones operativas, regulatorias y de capital. En concreto, el cliente debe decidir:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10 not-prose">
            {[
              { t: "Dónde jugar", d: "Qué subcategorías priorizar (mobiliario urbano, transporte, gran formato) y qué ciudades son críticas." },
              { t: "Con quién entrar", d: "Qué perfil de target encaja mejor para construir una plataforma de crecimiento (buy-and-build)." },
              { t: "Cuándo entrar", d: "Timing óptimo en función de los vencimientos de licencias y ventanas de oportunidad." },
              { t: "Cómo capturar valor", d: "Palancas realistas: digitalización, mejora comercial y optimización operativa." }
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-2 flex items-center gap-2">
                  <ChevronRight size={14} className="text-blue-600" /> {item.t}
                </h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl border-b border-slate-100 pb-4 mb-8">1. Alcance y Metodología</h2>
          <p>El alcance se estructura en seis capas de trabajo, diseñadas para pasar de la lectura del mercado a una recomendación ejecutable:</p>
          <div className="space-y-4 font-bold text-slate-600">
            <div className="flex gap-4 items-start"><span className="text-blue-600">01</span> <span>Mercado e inversión: Volúmenes históricos y previsiones.</span></div>
            <div className="flex gap-4 items-start"><span className="text-blue-600">02</span> <span>Activos y categorías: Lógica económica de cada soporte.</span></div>
            <div className="flex gap-4 items-start"><span className="text-blue-600">03</span> <span>Actores del mercado: Ecosistema por subcategorías.</span></div>
            <div className="flex gap-4 items-start"><span className="text-blue-600">04</span> <span>Mapa de licencias: Tabla maestra de vencimientos y riesgos.</span></div>
            <div className="flex gap-4 items-start"><span className="text-blue-600">05</span> <span>Investigación primaria: Entrevistas con ejecutivos del sector.</span></div>
            <div className="flex gap-4 items-start"><span className="text-blue-600">06</span> <span>Síntesis M&A: Definición de arquetipo de entrada y roadmap.</span></div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl border-b border-slate-100 pb-4 mb-8">2. Mercado e Inversión (OOH/DOOH)</h2>
          <h3>2.1. Evolución histórica 2022-2025</h3>
          <p>El medio Exterior mantiene un crecimiento sostenido: pasa de 350,2 M€ (2022) a 460,5 M€ (2025). Con una tasa de crecimiento compuesto del 9,5%, bate con claridad el crecimiento negativo de la inversión publicitaria general en España (-2,6% en 2025).</p>
          
          <div className="bg-slate-900 rounded-[32px] p-10 my-12 text-white not-prose">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div><p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-2">2022</p><p className="text-2xl font-black">350,2 M€</p></div>
              <div><p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-2">2023</p><p className="text-2xl font-black">406,7 M€</p></div>
              <div><p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-2">2024</p><p className="text-2xl font-black">432,0 M€</p></div>
              <div><p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-2">2025 (Est)</p><p className="text-2xl font-black text-blue-500">460,5 M€</p></div>
            </div>
          </div>

          <h3>2.2. Contexto Competitivo</h3>
          <p>Para un inversor internacional, España deja de ser un territorio de expansión orgánica para convertirse en un mercado de consolidación. El crecimiento no vendrá del viento de cola macro, sino de ganar cuota, optimizar activos y mejorar eficiencia.</p>
          <p>La digitalización deja de ser “una categoría” y pasa a ser el estándar operativo: el <strong>41,7% de la inversión en Exterior ya es digital (DOOH)</strong>.</p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl border-b border-slate-100 pb-4 mb-8">3. Activos y Categorías de Soportes</h2>
          <div className="space-y-10">
            <div>
              <h4 className="text-blue-600 font-black uppercase text-xs tracking-[0.3em] mb-4">Mobiliario Urbano</h4>
              <p>Representa el 45% del mercado. Es el núcleo estratégico basado en concesiones de largo plazo (8-12 años). Los operadores dominantes son JCDecaux y Clear Channel (recientemente adquirida por Atresmedia).</p>
              <div className="bg-slate-50 p-6 rounded-2xl text-sm italic border-l-4 border-blue-600">
                "En Barcelona, JCDecaux ha recuperado la concesión hasta 2035, consolidando su liderazgo absoluto en la ciudad condal."
              </div>
            </div>
            
            <div>
              <h4 className="text-blue-600 font-black uppercase text-xs tracking-[0.3em] mb-4">Transporte</h4>
              <p>Incluye Aeropuertos (AENA), Estaciones (ADIF) y Redes de Metro. Se trata de contratos de alta escala económica y concentración. Exterior Plus domina el lote principal de aeropuertos, mientras Global gestiona activos ferroviarios clave.</p>
            </div>

            <div>
              <h4 className="text-blue-600 font-black uppercase text-xs tracking-[0.3em] mb-4">Gran Formato & Indoor</h4>
              <p>Sectores más atomizados. El Gran Formato ofrece mayor flexibilidad para adquisiciones regionales (vallas, monopostes). El Indoor (Centros Comerciales) actúa como puente hacia el retail media digital.</p>
            </div>
          </div>
        </section>

        <div className="bg-blue-600 rounded-[40px] p-12 text-white my-16 not-prose">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 opacity-70">Síntesis Estratégica IMU</h4>
          <p className="text-3xl font-black tracking-tighter leading-tight italic">
            "La ventaja competitiva en España ya no es opcional: es condición de supervivencia. Quien logre digitalizar activos premium y conectarlos programáticamente ganará la batalla por la cuota de mercado en 2026."
          </p>
        </div>
      </article>
      
      <div className="mt-20 pt-10 border-t border-slate-100 flex justify-between items-center opacity-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
        <span>Propiedad de IMU Group</span>
        <span>Página 1 de 1</span>
        <span>Febrero 2026</span>
      </div>
    </div>
  );
};

const AiConsultantView = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hola. Soy tu consultor GPT para el Grupo IMU. He analizado el informe completo sobre la entrada en el mercado español. ¿Qué sección del documento te gustaría profundizar?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');

    if (!apiKey) {
      setMessages(prev => [...prev, { role: 'assistant', text: "⚠️ Configuración pendiente: API Key no detectada en Netlify." }]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages.map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.text })),
            { role: "user", content: userMessage }
          ]
        })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', text: data.choices[0].message.content }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: "Error de conexión con OpenAI." }]);
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-4xl mx-auto h-[700px] flex flex-col bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden">
      <div className="p-8 border-b bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 p-3.5 rounded-2xl shadow-xl shadow-blue-500/30"><Bot size={28} /></div>
          <div>
            <h3 className="font-black text-xl tracking-tighter">Consultor OOH GPT</h3>
            <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.3em]">Knowledge: Estrategia España 2025</p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8 bg-slate-50 space-y-6" ref={scrollRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-5 rounded-[28px] text-sm font-bold leading-relaxed shadow-sm ${
              msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Consultando análisis estratégico...</div>}
      </div>
      <div className="p-6 bg-white border-t border-slate-50">
        <div className="flex gap-4">
          <input 
            type="text" value={input} onChange={(e) => setInput(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Pregunta sobre licencias, M&A o digitalización..." 
            className="flex-1 bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-blue-100 transition-all outline-none" 
          />
          <button onClick={handleSendMessage} className="bg-slate-900 text-white p-4 rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- APP ---

const App = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <DashboardView />;
      case 'report': return <ReportView />;
      case 'ai': return <AiConsultantView />;
      default: return <DashboardView />;
    }
  };

  const NavItem = ({ id, label, icon: Icon }) => (
    <button 
      onClick={() => { setActiveView(id); setSidebarOpen(false); }}
      className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-black uppercase text-[10px] tracking-[0.2em] ${
        activeView === id ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800'
      }`}
    >
      <Icon size={18} /> {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans selection:bg-blue-100">
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white transform transition-transform duration-500 ease-out md:relative md:translate-x-0 print:hidden ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
        <div className="p-10 border-b border-slate-800">
          <h1 className="text-3xl font-black tracking-tighter leading-none">OOH<br/><span className="text-blue-500 italic">Strategy</span></h1>
          <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.4em] mt-3">Intelligence Lab by bud</p>
        </div>
        <nav className="p-6 space-y-4">
          <NavItem id="dashboard" label="Intelligence" icon={LayoutDashboard} />
          <NavItem id="report" label="Informe 2025" icon={FileText} />
          <NavItem id="ai" label="Consultor GPT" icon={Bot} />
        </nav>
        <div className="absolute bottom-0 w-full p-10 border-t border-slate-800 bg-slate-900/50">
          <p className="text-slate-500 text-[8px] font-black uppercase tracking-[0.5em] text-center">para el grupo IMU</p>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto h-screen p-6 md:p-16 print:p-0">
        <div className="md:hidden flex justify-between items-center mb-10 bg-white p-5 rounded-3xl border border-slate-100 shadow-sm print:hidden">
          <h1 className="font-black text-slate-900 tracking-tighter">OOH Strategy</h1>
          <button onClick={() => setSidebarOpen(true)} className="p-3 bg-slate-900 text-white rounded-2xl"><Menu size={20} /></button>
        </div>
        <div className="max-w-7xl mx-auto">
          {renderView()}
        </div>
      </main>

      {isSidebarOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden print:hidden" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
};

export default App;