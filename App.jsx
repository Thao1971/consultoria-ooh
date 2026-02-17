import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { 
  TrendingUp, Map, Users, Target, ChevronRight, Menu, X, 
  LayoutDashboard, Building2, BarChart3, Briefcase, 
  ArrowRight, CheckCircle2, AlertTriangle, MonitorPlay,
  Sparkles, Bot, Send, Loader2, FileText, BookOpen, Printer
} from 'lucide-react';

// --- CONFIGURACIÓN DE DATOS (MERCADO OOH ESPAÑA) ---

const dataInfoAdex = [
  { year: '2022', inversion: 350.2, growth: 16.1 },
  { year: '2023', inversion: 406.7, growth: 16.1 },
  { year: '2024', inversion: 432.0, growth: 6.2 },
  { year: '2025', inversion: 460.5, growth: 6.6 },
];

const concessionsData = [
  { city: 'Madrid', operator: 'Clear Channel / Atresmedia', expiry: '2028/2031', details: 'Contrato extendido.' },
  { city: 'Barcelona', operator: 'JCDecaux', expiry: '2035 (Aprox)', details: 'Adjudicado Oct 2025.' },
  { city: 'Valencia', operator: 'JCDecaux', expiry: 'Vinculado Valenbisi', details: 'Liderazgo local.' },
  { city: 'Sevilla', operator: 'JCDecaux', expiry: 'Vinculado Sevici', details: 'Dominio histórico.' },
  { city: 'Bilbao', operator: 'JCDecaux', expiry: 'Estable', details: 'Diseño Norman Foster.' },
];

// --- CONFIGURACIÓN IA (OPENAI / CHATGPT) ---
// Se utiliza un acceso más compatible para evitar errores de entorno en la compilación
const getApiKey = () => {
  try {
    // Intenta acceder vía Vite (import.meta) o vía Node/Netlify (process.env)
    return (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_OPENAI_API_KEY) 
           || (typeof process !== 'undefined' && process.env && process.env.VITE_OPENAI_API_KEY) 
           || "";
  } catch (e) {
    return "";
  }
};

const apiKey = getApiKey();

const SYSTEM_PROMPT = `
Eres un Agente Especializado en Out of Home (OOH) y M&A para el Grupo IMU en España. 
Responde con tono consultivo, profesional y enfocado a resultados de negocio.
Utiliza estos datos: Inversión 2025 460.5M€, Crecimiento 6.6%, DOOH 41.7%.
Tu labor es asesorar estratégicamente sobre la expansión en el mercado español.
`;

// --- COMPONENTES DE INTERFAZ ---

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

// --- VISTAS ---

const DashboardView = () => (
  <div className="space-y-6">
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-slate-900">Dashboard Estratégico</h2>
      <p className="text-slate-500 mt-2">Métricas clave del mercado OOH/DOOH en España 2025.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard title="Inversión 2025" value="460,5 M€" subtext="+6,6% vs 2024" trend="positive" icon={BarChart3} />
      <MetricCard title="Penetración DOOH" value="41,7%" subtext="Crecimiento Digital" trend="positive" icon={MonitorPlay} />
      <MetricCard title="CAGR Proyectado" value="5,15%" subtext="Previsión 2025-2030" trend="positive" icon={TrendingUp} />
      <MetricCard title="Riesgo Concesional" value="Alto" subtext=">70% Mercado" trend="neutral" icon={AlertTriangle} />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="Evolución Histórica (M€)">
        <div className="h-72 w-full">
          <ResponsiveContainer>
            <AreaChart data={dataInfoAdex}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="inversion" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.1} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card title="Mapa de Concesiones">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600 font-medium">
              <tr>
                <th className="p-3">Ciudad</th>
                <th className="p-3">Operador</th>
                <th className="p-3">Vencimiento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {concessionsData.map((d, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-medium text-slate-900">{d.city}</td>
                  <td className="p-3 text-blue-600">{d.operator}</td>
                  <td className="p-3 text-slate-500">{d.expiry}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  </div>
);

const ReportView = () => (
  <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-sm border border-slate-200">
    <div className="border-b border-slate-200 pb-8 mb-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Estrategia de Entrada: OOH España</h1>
      <p className="text-slate-500">Documento de Análisis Estratégico • Confidencial para Grupo IMU</p>
    </div>
    <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Resumen Ejecutivo</h2>
      <p>
        El mercado publicitario Exterior (OOH) en España atraviesa una fase de consolidación y digitalización acelerada. Con una inversión estimada de 460,5 M€ para 2025. El Grupo IMU se posiciona como un actor clave en la consultoría estratégica de este sector.
      </p>
    </article>
  </div>
);

const AiConsultantView = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hola. Soy tu consultor especializado de ChatGPT para el Grupo IMU. ¿En qué puedo ayudarte hoy sobre el mercado OOH?' }
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
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: "⚠️ Configuración pendiente: Falta la clave de API. Por favor, añádela en Netlify como variable de entorno VITE_OPENAI_API_KEY." 
      }]);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
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
      if (data.error) throw new Error(data.error.message);
      
      const aiText = data.choices[0].message.content;
      setMessages(prev => [...prev, { role: 'assistant', text: aiText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: "Error de conexión: " + error.message }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[600px] flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b bg-slate-900 text-white flex items-center gap-3">
        <Bot size={24} className="text-blue-500" />
        <h3 className="font-bold">Consultor OOH GPT (Grupo IMU)</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50 space-y-4" ref={scrollRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white shadow-md' : 'bg-white border shadow-sm'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-xs text-slate-500 animate-pulse flex items-center gap-2"><Loader2 size={12} className="animate-spin" /> Analizando mercado...</div>}
      </div>
      <div className="p-4 border-t bg-white flex gap-2">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Consulta sobre competencia, DOOH o M&A..." 
          className="flex-1 border rounded-lg px-4 py-2 outline-none focus:border-blue-500 transition-colors" 
        />
        <button onClick={handleSendMessage} className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md"><Send size={20} /></button>
      </div>
    </div>
  );
};

// --- APLICACIÓN PRINCIPAL ---

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
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        activeView === id ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-800/50'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white transform transition-transform md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 border-b border-slate-800">
          <h1 className="text-2xl font-bold tracking-tight">OOH<span className="text-blue-500 italic">Strategy</span></h1>
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] mt-2 font-bold">Intelligence Lab by bud</p>
        </div>
        <nav className="p-6 space-y-3">
          <NavItem id="dashboard" label="Dashboard" icon={LayoutDashboard} />
          <NavItem id="report" label="Informe de Estrategia" icon={FileText} />
          <div className="pt-6 mt-6 border-t border-slate-800">
            <NavItem id="ai" label="Consultor GPT ✨" icon={Bot} />
          </div>
        </nav>
        <div className="absolute bottom-0 w-full p-8 border-t border-slate-800 bg-slate-900/50">
          <p className="text-slate-500 text-[9px] uppercase font-bold tracking-[0.3em] text-center opacity-80">para el grupo IMU</p>
        </div>
      </aside>
      
      <main className="flex-1 overflow-y-auto h-screen p-6 md:p-12">
        <div className="md:hidden mb-6 flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border">
          <h1 className="font-bold text-slate-900">OOH Strategy</h1>
          <button onClick={() => setSidebarOpen(true)} className="p-2 bg-slate-900 text-white rounded-lg"><Menu size={20}/></button>
        </div>
        <div className="max-w-7xl mx-auto">{renderView()}</div>
      </main>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
};

export default App;