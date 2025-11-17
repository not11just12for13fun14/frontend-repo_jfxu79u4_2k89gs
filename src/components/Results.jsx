export default function Results({ data }) {
  if (!data) return null
  const { disease_risk, pest_risk, irrigation_schedule, climate_advice, yield_forecast, rotation_plan, market_trends } = data
  const chip = (t, c) => (
    <span className={`inline-block text-xs px-2 py-1 rounded-full bg-${c}-100 text-${c}-700 border border-${c}-200`}>{t}</span>
  )

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-2">Disease Risk</h3>
        <div className="space-x-2 space-y-2">
          {Object.entries(disease_risk || {}).map(([k,v]) => (
            <span key={k} className={`inline-block text-xs px-2 py-1 rounded-full ${v==='high'?'bg-red-100 text-red-700 border-red-200':v==='medium'?'bg-amber-100 text-amber-700 border-amber-200':'bg-emerald-100 text-emerald-700 border-emerald-200'} border`}>{k}: {v}</span>
          ))}
        </div>
      </div>
      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-2">Pest Risk</h3>
        <div className="space-x-2 space-y-2">
          {Object.entries(pest_risk || {}).map(([k,v]) => (
            <span key={k} className={`inline-block text-xs px-2 py-1 rounded-full ${v==='high'?'bg-red-100 text-red-700 border-red-200':v==='medium'?'bg-amber-100 text-amber-700 border-amber-200':'bg-emerald-100 text-emerald-700 border-emerald-200'} border`}>{k}: {v}</span>
          ))}
        </div>
      </div>

      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-2">Irrigation Schedule</h3>
        <p className="text-sm text-gray-700">Every <b>{irrigation_schedule?.frequency_days}</b> days, apply <b>{irrigation_schedule?.amount_mm}</b> mm water.</p>
        <ul className="list-disc ml-6 mt-2 text-sm text-gray-600 space-y-1">
          {(irrigation_schedule?.notes || []).map((n,i) => <li key={i}>{n}</li>)}
        </ul>
      </div>

      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-2">Climate-Adaptive Tips</h3>
        <ul className="list-disc ml-6 mt-2 text-sm text-gray-600 space-y-1">
          {(climate_advice || []).map((n,i) => <li key={i}>{n}</li>)}
        </ul>
      </div>

      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-2">Yield Forecast</h3>
        <p className="text-sm text-gray-700">Crop: <b>{yield_forecast?.crop}</b>, Expected: <b>{yield_forecast?.yield_kg_per_ha?.toLocaleString()}</b> kg/ha</p>
      </div>

      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-2">Rotation Plan</h3>
        <div className="flex flex-wrap gap-2">
          {(rotation_plan || []).map((r,i) => <span key={i} className="text-xs px-2 py-1 rounded-full bg-sky-100 text-sky-700 border border-sky-200">{r}</span>)}
        </div>
      </div>

      <div className="bg-white border rounded-lg p-4 lg:col-span-2">
        <h3 className="font-semibold mb-2">Market Trends</h3>
        <div className="grid md:grid-cols-3 gap-3">
          {(market_trends || []).map((m,i) => (
            <div key={i} className="border rounded-md p-3 bg-gray-50">
              <p className="font-semibold text-gray-800">{m.crop}</p>
              <p className="text-sm text-gray-700">{m.avg_price} {m.unit}</p>
              <p className="text-xs text-gray-600">Demand: {m.demand}</p>
              {m.location && (<p className="text-xs text-gray-600">Location: {m.location}</p>)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
