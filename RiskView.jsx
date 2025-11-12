import React from 'react'
export default function RiskView({data}){
  const keys = data.length? Object.keys(data[0]) : ['CODIGO DEL RIESGO','NOMBRE DEL RIESGO','RESPONSABLE','PROBABILIDAD (tx)','IMPACTO (txt)','RIESGO INHERENTE (tx)']
  return (<div className='overflow-auto bg-white rounded shadow p-4'>
    <table className='w-full table-auto'><thead><tr>{keys.map(k=> <th key={k} className='text-left p-2 bg-purple-50'>{k}</th>)}</tr></thead>
    <tbody>{(data||[]).map((r,idx)=>(<tr key={idx} className='border-t'><td className='p-2'>{r['CODIGO DEL RIESGO']}</td><td className='p-2'>{r['NOMBRE DEL RIESGO']}</td><td className='p-2'>{r['RESPONSABLE']}</td><td className='p-2'>{r['PROBABILIDAD (tx)']}</td><td className='p-2'>{r['IMPACTO (txt)']}</td><td className='p-2'>{r['RIESGO INHERENTE (tx)']}</td></tr>))}</tbody></table></div>)
}