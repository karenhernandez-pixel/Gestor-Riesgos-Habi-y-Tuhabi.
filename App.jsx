import React, {useState, useEffect} from 'react'
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import RiskView from './components/RiskView'
import RiskEdit from './components/RiskEdit'
import { AnimatePresence, motion } from 'framer-motion'

export default function App(){
  const [view,setView]=useState('home')
  const [data,setData]=useState(()=> JSON.parse(localStorage.getItem('riesgos')||'null') || [])
  useEffect(()=> localStorage.setItem('riesgos', JSON.stringify(data)), [data])
  return (<div className='flex min-h-screen'>
    <Sidebar view={view} setView={setView} />
    <main className='flex-1 p-6'>
      <header className='flex items-center justify-center mb-4 relative'>
        <img src='/logo-48.webp' alt='logo' className='w-12 h-12 absolute left-6' />
        <h1 className='text-3xl font-bold text-habi'>Matriz de Riesgos Habi</h1>
      </header>
      <AnimatePresence exitBeforeEnter>
        {view==='home' && <motion.div key='home' initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}><Home data={data}/></motion.div>}
        {view==='view' && <motion.div key='view' initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}><RiskView data={data}/></motion.div>}
        {view==='edit' && <motion.div key='edit' initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}><RiskEdit data={data} setData={setData}/></motion.div>}
      </AnimatePresence>
    </main>
  </div>)
}