import { useState } from 'react'

const initial = {
  name: '',
  phone: '',
  location_text: '',
  gps_lat: '',
  gps_lng: '',
  farm_size_ha: '',
  soil_type: '',
  elevation_m: '',
  irrigation_method: '',
  water_source: '',
  farming_practices: '',
  crop_history: '',
  surrounding_env: '',
  target_crop: '',
  temp_c: '',
  humidity_pct: '',
  rainfall_mm: '',
  wind_kph: '',
  pest_signs: '',
  disease_signs: '',
  ph: '',
  nitrogen_ppm: '',
  phosphorus_ppm: '',
  potassium_ppm: '',
  organic_matter_pct: '',
  ec_dS_m: ''
}

export default function IntakeForm({ onSubmit, loading }) {
  const [form, setForm] = useState(initial)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  const input = (name, label, type = 'text', placeholder = '') => (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-700">{label}</label>
      <input
        name={name}
        value={form[name]}
        onChange={handleChange}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
      {input('name','Name')}
      {input('phone','Phone')}
      {input('location_text','Location')}
      {input('gps_lat','GPS Lat','number')}
      {input('gps_lng','GPS Lng','number')}
      {input('farm_size_ha','Farm size (ha)','number')}
      {input('soil_type','Soil type','text','sandy/loamy/clayey')}
      {input('elevation_m','Elevation (m)','number')}
      {input('irrigation_method','Irrigation method','text','drip/sprinkler/flood')}
      {input('water_source','Water source')}
      {input('farming_practices','Farming practices','text','comma separated')}
      {input('crop_history','Crop history','text','comma separated')}
      {input('surrounding_env','Surrounding environment')}

      <div className="md:col-span-2 border-t pt-2 font-semibold text-gray-700">Current Observations</div>
      {input('target_crop','Target crop')}
      {input('temp_c','Temp (°C)','number')}
      {input('humidity_pct','Humidity (%)','number')}
      {input('rainfall_mm','Rainfall (mm)','number')}
      {input('wind_kph','Wind (kph)','number')}
      {input('pest_signs','Pest signs','text','comma separated')}
      {input('disease_signs','Disease signs','text','comma separated')}

      <div className="md:col-span-2 border-t pt-2 font-semibold text-gray-700">Soil Test</div>
      {input('ph','pH','number')}
      {input('nitrogen_ppm','Nitrogen (ppm)','number')}
      {input('phosphorus_ppm','Phosphorus (ppm)','number')}
      {input('potassium_ppm','Potassium (ppm)','number')}
      {input('organic_matter_pct','Organic Matter (%)','number')}
      {input('ec_dS_m','EC (dS/m)','number')}

      <button disabled={loading} className="md:col-span-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white rounded-md px-4 py-2 font-semibold">
        {loading ? 'Analyzing...' : 'Analyze & Get Plan'}
      </button>
    </form>
  )
}
