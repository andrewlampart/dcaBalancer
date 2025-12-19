
import React, { useState, useMemo, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area,
  BarChart, Bar, Cell
} from 'recharts';
import { 
  Settings2, TrendingUp, ShoppingBag, Users, Info, 
  ArrowRight, Heart, Brain, Zap, ShieldCheck, Wallet 
} from 'lucide-react';
import { DEFAULT_CONFIG, SCENARIOS } from './constants';
import { simulateEconomy } from './services/economySimulator';
import { EconomyConfig, UserScenario } from './types';

const App: React.FC = () => {
  const [config, setConfig] = useState<EconomyConfig>(DEFAULT_CONFIG);
  const [scenarioId, setScenarioId] = useState<string>(SCENARIOS[1].id);
  const [timeHorizon, setTimeHorizon] = useState<number>(90);

  const selectedScenario = useMemo(() => 
    SCENARIOS.find(s => s.id === scenarioId) || SCENARIOS[0], 
  [scenarioId]);

  const simulationData = useMemo(() => 
    simulateEconomy(config, selectedScenario, timeHorizon), 
  [config, selectedScenario, timeHorizon]);

  const finalPoints = simulationData[simulationData.length - 1]?.totalPoints || 0;
  
  const handleConfigChange = (key: keyof EconomyConfig, val: number) => {
    setConfig(prev => ({ ...prev, [key]: val }));
  };

  const affordabilityStats = [
    { name: 'Kawa', cost: config.costCoffee, color: '#F59E0B' },
    { name: 'Gadżet', cost: config.costGadget, color: '#10B981' },
    { name: 'Skin Zen', cost: config.costSkinZen, color: '#6366F1' },
    { name: 'Premium', cost: config.costPremium, color: '#EF4444' },
  ];

  const daysToAfford = (cost: number) => {
    const day = simulationData.find(d => d.totalPoints >= cost)?.day;
    return day ? `${day} dni` : 'Nigdy';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl text-white">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">DCA Economy Balancer</h1>
            <p className="text-xs text-slate-500 font-medium">DepressionControlApp • Q4 2025</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-100 p-1 rounded-lg">
            {SCENARIOS.map(s => (
              <button
                key={s.id}
                onClick={() => setScenarioId(s.id)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  scenarioId === s.id 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
          <select 
            value={timeHorizon} 
            onChange={(e) => setTimeHorizon(Number(e.target.value))}
            className="bg-white border border-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value={30}>30 dni</option>
            <option value={90}>90 dni</option>
            <option value={180}>180 dni</option>
            <option value={365}>1 rok</option>
          </select>
        </div>
      </header>

      <main className="flex-1 p-6 flex flex-col lg:flex-row gap-6 max-w-screen-2xl mx-auto w-full">
        {/* Left: Controls */}
        <div className="lg:w-1/3 space-y-6 shrink-0">
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-slate-900">
              <Zap size={20} className="text-amber-500" />
              <h2 className="font-bold text-lg">Zarobki (Punkty)</h2>
            </div>
            
            <div className="space-y-6">
              <Slider 
                label="Mood Check-in" 
                value={config.moodCheckInPoints} 
                max={50} 
                onChange={(v) => handleConfigChange('moodCheckInPoints', v)} 
                suffix="pkt"
              />
              <Slider 
                label="Codzienne Logowanie (Step)" 
                value={config.streakStep} 
                max={20} 
                onChange={(v) => handleConfigChange('streakStep', v)} 
                suffix="pkt"
              />
              <Slider 
                label="Bonus 7-dniowy" 
                value={config.streakBonusDay7} 
                max={500} 
                onChange={(v) => handleConfigChange('streakBonusDay7', v)} 
                suffix="pkt"
              />
              <Slider 
                label="Ćwiczenia Oddechowe" 
                value={config.breathingPoints} 
                max={100} 
                onChange={(v) => handleConfigChange('breathingPoints', v)} 
                suffix="pkt"
              />
              <Slider 
                label="Raport PDF" 
                value={config.reportPoints} 
                max={1000} 
                onChange={(v) => handleConfigChange('reportPoints', v)} 
                suffix="pkt"
              />
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-slate-900">
              <ShoppingBag size={20} className="text-indigo-500" />
              <h2 className="font-bold text-lg">Ceny Nagród</h2>
            </div>
            
            <div className="space-y-6">
              <Slider 
                label="Kawa na Kampusie" 
                value={config.costCoffee} 
                max={2000} 
                onChange={(v) => handleConfigChange('costCoffee', v)} 
                suffix="pkt"
              />
              <Slider 
                label="Gadżet DCA" 
                value={config.costGadget} 
                max={3000} 
                onChange={(v) => handleConfigChange('costGadget', v)} 
                suffix="pkt"
              />
              <Slider 
                label="Skin Zen Master" 
                value={config.costSkinZen} 
                max={10000} 
                onChange={(v) => handleConfigChange('costSkinZen', v)} 
                suffix="pkt"
              />
              <Slider 
                label="Premium Drop (Miś/Koszulka)" 
                value={config.costPremium} 
                max={20000} 
                onChange={(v) => handleConfigChange('costPremium', v)} 
                suffix="pkt"
              />
            </div>
          </section>

          <section className="bg-indigo-600 p-6 rounded-2xl text-white shadow-lg shadow-indigo-200">
            <div className="flex items-center gap-2 mb-2">
              <Wallet size={20} />
              <h2 className="font-bold">Bilans końcowy</h2>
            </div>
            <div className="text-4xl font-extrabold mb-1">{Math.floor(finalPoints)} <span className="text-indigo-200 text-lg">pkt</span></div>
            <p className="text-xs text-indigo-100 opacity-80 leading-relaxed">
              Tyle punktów zgromadzi {selectedScenario.name.toLowerCase()} po {timeHorizon} dniach korzystania z aplikacji.
            </p>
          </section>
        </div>

        {/* Right: Statistics and Charts */}
        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {affordabilityStats.map(stat => (
              <div key={stat.name} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.name}</p>
                <div className="text-2xl font-bold text-slate-900 mb-2">{daysToAfford(stat.cost)}</div>
                <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-500" 
                    style={{ 
                      width: `${Math.min(100, (finalPoints / stat.cost) * 100)}%`,
                      backgroundColor: stat.color 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[400px]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp size={20} className="text-emerald-500" />
                <h3 className="font-bold text-slate-900">Przyrost punktów w czasie</h3>
              </div>
              <div className="text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                {timeHorizon} dni • Scenariusz: {selectedScenario.name}
              </div>
            </div>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={simulationData}>
                  <defs>
                    <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => [`${Math.floor(value)} pkt`, 'Suma']}
                    labelFormatter={(label) => `Dzień ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="totalPoints" 
                    stroke="#6366f1" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorPoints)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Info size={18} className="text-slate-400" />
                Dostępność nagród (%)
              </h3>
              <div className="space-y-4">
                {affordabilityStats.map(stat => (
                  <div key={stat.name} className="flex items-center justify-between group">
                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{stat.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-slate-400">{Math.floor(Math.min(100, (finalPoints / stat.cost) * 100))}%</span>
                      {finalPoints >= stat.cost ? (
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-md uppercase tracking-wide">Można kupić</span>
                      ) : (
                        <span className="px-2 py-0.5 bg-slate-50 text-slate-400 text-[10px] font-bold rounded-md uppercase tracking-wide">Brakuje {Math.floor(stat.cost - finalPoints)} pkt</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Users size={18} className="text-slate-400" />
                Analiza retencji
              </h3>
              <div className="bg-slate-50 p-4 rounded-xl space-y-2">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Przy obecnych ustawieniach, <b>{selectedScenario.name}</b> potrzebuje średnio <b>{daysToAfford(config.costCoffee)}</b>, aby odebrać pierwszą kawę. 
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Zalecany czas na pierwszą realną nagrodę to 7-14 dni dla utrzymania wysokiej retencji.
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {finalPoints > 5000 && <span className="bg-rose-50 text-rose-600 text-[10px] font-bold px-2 py-1 rounded">⚠️ Ryzyko inflacji</span>}
                {finalPoints < 1000 && timeHorizon > 60 && <span className="bg-amber-50 text-amber-600 text-[10px] font-bold px-2 py-1 rounded">⚠️ Nagrody zbyt drogie</span>}
                <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-1 rounded">✓ Bezpieczne dla leków</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 px-6 py-6 text-center text-slate-400 text-xs">
        System Gamyfikacji DepressionControlApp • Fahrenheit University Hackathon • PG | UG | GUMed
      </footer>
    </div>
  );
};

const Slider: React.FC<{ 
  label: string, 
  value: number, 
  max: number, 
  onChange: (v: number) => void,
  suffix?: string 
}> = ({ label, value, max, onChange, suffix = "" }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <label className="text-sm font-semibold text-slate-600">{label}</label>
      <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{value}{suffix}</span>
    </div>
    <input 
      type="range" 
      min="0" 
      max={max} 
      value={value} 
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
    />
  </div>
);

export default App;
