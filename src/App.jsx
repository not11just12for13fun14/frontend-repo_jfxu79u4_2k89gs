import { useState } from 'react'
import Hero from './components/Hero'
import IntakeForm from './components/IntakeForm'
import Results from './components/Results'

function App() {
  const [step, setStep] = useState('hero')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleAnalyze = async (form) => {
    setLoading(true)
    setResult(null)
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

    // Prepare payloads
    const profile = {
      name: form.name,
      phone: form.phone,
      location_text: form.location_text,
      gps_lat: form.gps_lat ? parseFloat(form.gps_lat) : undefined,
      gps_lng: form.gps_lng ? parseFloat(form.gps_lng) : undefined,
      farm_size_ha: form.farm_size_ha ? parseFloat(form.farm_size_ha) : undefined,
      soil_type: form.soil_type || undefined,
      elevation_m: form.elevation_m ? parseFloat(form.elevation_m) : undefined,
      irrigation_method: form.irrigation_method || undefined,
      water_source: form.water_source || undefined,
      farming_practices: form.farming_practices ? form.farming_practices.split(',').map(s=>s.trim()).filter(Boolean) : [],
      crop_history: form.crop_history ? form.crop_history.split(',').map(s=>s.trim()).filter(Boolean) : [],
      surrounding_env: form.surrounding_env || undefined
    }

    let profileId
    try {
      const res = await fetch(`${baseUrl}/profiles`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(profile) })
      const data = await res.json()
      profileId = data.id
    } catch (e) {
      console.error(e)
    }

    const soil = {
      farmer_id: profileId,
      ph: form.ph ? parseFloat(form.ph) : undefined,
      nitrogen_ppm: form.nitrogen_ppm ? parseFloat(form.nitrogen_ppm) : undefined,
      phosphorus_ppm: form.phosphorus_ppm ? parseFloat(form.phosphorus_ppm) : undefined,
      potassium_ppm: form.potassium_ppm ? parseFloat(form.potassium_ppm) : undefined,
      organic_matter_pct: form.organic_matter_pct ? parseFloat(form.organic_matter_pct) : undefined,
      ec_dS_m: form.ec_dS_m ? parseFloat(form.ec_dS_m) : undefined
    }

    try {
      if (profileId) {
        await fetch(`${baseUrl}/soiltests`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(soil) })
      }
    } catch (e) { console.error(e) }

    const obs = {
      farmer_id: profileId,
      target_crop: form.target_crop || undefined,
      temp_c: form.temp_c ? parseFloat(form.temp_c) : undefined,
      humidity_pct: form.humidity_pct ? parseFloat(form.humidity_pct) : undefined,
      rainfall_mm: form.rainfall_mm ? parseFloat(form.rainfall_mm) : undefined,
      wind_kph: form.wind_kph ? parseFloat(form.wind_kph) : undefined,
      pest_signs: form.pest_signs ? form.pest_signs.split(',').map(s=>s.trim()).filter(Boolean) : [],
      disease_signs: form.disease_signs ? form.disease_signs.split(',').map(s=>s.trim()).filter(Boolean) : []
    }

    try {
      if (profileId) {
        await fetch(`${baseUrl}/observations`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(obs) })
      }
    } catch (e) { console.error(e) }

    try {
      const res = await fetch(`${baseUrl}/analyze`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ farmer_id: profileId, target_crop: form.target_crop || undefined }) })
      const data = await res.json()
      setResult(data.result)
      setStep('results')
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-amber-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {step === 'hero' && (
          <>
            <Hero onStart={() => setStep('form')} />
            <div className="mt-10 bg-white/70 backdrop-blur-md border rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">Tell us about your farm</h2>
              <p className="text-gray-600 mb-4">We’ll collect farm details, observations, and soil test values to build a personalized plan.</p>
              <button onClick={() => setStep('form')} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md font-semibold">Start</button>
            </div>
          </>
        )}

        {step === 'form' && (
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Farm Intake Form</h2>
              <button onClick={() => setStep('hero')} className="text-sm text-gray-600 hover:text-gray-800">Back</button>
            </div>
            <IntakeForm onSubmit={handleAnalyze} loading={loading} />
          </div>
        )}

        {step === 'results' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Your Smart Plan</h2>
              <button onClick={() => setStep('form')} className="text-sm text-gray-600 hover:text-gray-800">Edit inputs</button>
            </div>
            <Results data={result} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
