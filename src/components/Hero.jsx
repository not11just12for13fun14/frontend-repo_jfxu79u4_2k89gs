import { Sprout, CloudSun, Droplets, LineChart } from 'lucide-react'

export default function Hero({ onStart }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-sky-50 to-amber-50" />
      <div className="relative max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            AI-Powered Smart Farming Assistant
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Plan crops, predict risks, optimize irrigation, and track market prices with a single assistant designed for real farms.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={onStart} className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-3 rounded-lg shadow">
              <Sprout className="w-5 h-5" /> Get Started
            </button>
            <a href="/test" className="inline-flex items-center gap-2 bg-white text-gray-800 px-5 py-3 rounded-lg border shadow-sm hover:shadow">
              <LineChart className="w-5 h-5" /> Check Backend
            </a>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4 text-sm text-gray-700">
            <div className="flex items-center gap-2"><Droplets className="w-4 h-4 text-sky-600"/>Irrigation</div>
            <div className="flex items-center gap-2"><CloudSun className="w-4 h-4 text-amber-600"/>Climate</div>
            <div className="flex items-center gap-2"><Sprout className="w-4 h-4 text-emerald-600"/>Diseases</div>
          </div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border shadow-sm">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-lg bg-emerald-50 border"><p className="font-semibold">Disease & Pest</p><p className="text-gray-600">Early warnings based on humidity, temp, and observations</p></div>
            <div className="p-4 rounded-lg bg-sky-50 border"><p className="font-semibold">Irrigation</p><p className="text-gray-600">Soil-aware schedules with rainfall adjustments</p></div>
            <div className="p-4 rounded-lg bg-amber-50 border"><p className="font-semibold">Yield Forecast</p><p className="text-gray-600">Heuristic estimates per hectare</p></div>
            <div className="p-4 rounded-lg bg-violet-50 border"><p className="font-semibold">Markets</p><p className="text-gray-600">Local trend suggestions</p></div>
          </div>
        </div>
      </div>
    </section>
  )
}
