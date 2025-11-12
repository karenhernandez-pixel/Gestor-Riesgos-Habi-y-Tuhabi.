import React from 'react'
const PROB=['Casi certeza','Posible','Moderado','Raro','Improbable']
const IMP=['Bajo','Medio','Moderado','Alto','Crítico']
function classify(v){ if(v>=16) return 'Crítico'; if(v>=10) return 'Alto'; if(v>=6) return 'Moderado'; if(v>=3) return 'Medio'; return 'Bajo' }
function color(l){ if(l==='Crítico') return '#7F1D1D'; if(l==='Alto') return '#EF4444'; if(l==='Moderado') return '#F97316'; if(l==='Medio') return '#FACC15'; return '#22C55E' }
export default function Heatmap({data}){
  const grid = PROB.map(()=> IMP.map(()=> []))
  (data||[]).forEach(d=>{
    const p = d['PROBABILIDAD (tx)'] || (d['PROBABILIDAD (Valor)']? ['Improbable','Raro','Moderado','Posible','Casi certeza'][d['PROBABILIDAD (Valor)']-1]:null)
    const it = d['IMPACTO (txt)'] || (d['IMPACTO (vl)']? ['Bajo','Medio','Moderado','Alto','Crítico'][d['IMPACTO (vl)']-1]:null)
    const ri = PROB.indexOf(p), ci = IMP.indexOf(it)
    if(ri>=0 && ci>=0) grid[ri][ci].push(d)
  })
  const counts = {Bajo:0,Medio:0,Moderado:0,Alto:0,'Crítico':0}
  (data||[]).forEach(d=> counts[classify(Number(d['RIESGO INHERENTE (Valor)']||0))]++)
  return (<div className='space-y-4'>
    <div className='overflow-auto bg-white rounded shadow p-4'>
      <div className='grid grid-cols-6 gap-2 items-center'>
        <div></div>
        {IMP.map(h=> <div key={h} className='font-semibold text-slate-600'>{h}</div>)}
        {PROB.map((p,row)=>(<React.Fragment key={p}>
          <div className='font-semibold text-slate-600'>{p}</div>
          {IMP.map((c,col)=>{
            const cell = grid[row][col]
            const level = cell.length? (cell[0]['RIESGO INHERENTE (tx)'] || classify(Number(cell[0]['RIESGO INHERENTE (Valor)']||0))) : null
            return (<div key={c} style={{background: cell.length? color(level) : '#f8fafc'}} className='p-4 rounded text-center'>{cell.length? `${cell.length} ${level}` : '-'}</div>)
          })}
        </React.Fragment>))}
      </div>
    </div>
    <div className='text-center font-semibold'>
      <span className='inline-flex items-center gap-2 mr-4'><span style={{width:12,height:12,background:'#22C55E',borderRadius:6}}></span> 🟢 Bajo: {counts.Bajo}</span>
      <span className='inline-flex items-center gap-2 mr-4'><span style={{width:12,height:12,background:'#FACC15',borderRadius:6}}></span> 🟡 Medio: {counts.Medio}</span>
      <span className='inline-flex items-center gap-2 mr-4'><span style={{width:12,height:12,background:'#F97316',borderRadius:6}}></span> 🟠 Moderado: {counts.Moderado}</span>
      <span className='inline-flex items-center gap-2'><span style={{width:12,height:12,background:'#EF4444',borderRadius:6}}></span> 🔴 Alto/Crítico: {counts.Alto + counts['Crítico']}</span>
    </div>
  </div>)
}