import React, {useState} from 'react'
import { motion } from 'framer-motion'
export default function Sidebar({view,setView}){
  const [open,setOpen]=useState(true)
  return (
    <motion.aside initial={false} animate={{width: open?240:72}} className='bg-habiPurple text-white min-h-screen'>
      <div className='p-4 flex items-center justify-between'>
        <img src='/logo-48.webp' className='w-10 h-10' alt='logo' />
        <button onClick={()=>setOpen(!open)} className='text-white'>☰</button>
      </div>
      <nav className='mt-6'>
        <ul>
          <li><button className={`w-full text-left py-3 px-4 hover:bg-purple-700 ${view==='home'?'bg-purple-800':''}`} onClick={()=>setView('home')}>🏠 Inicio</button></li>
          <li><button className={`w-full text-left py-3 px-4 hover:bg-purple-700 ${view==='view'?'bg-purple-800':''}`} onClick={()=>setView('view')}>📋 Riesgos y Controles</button></li>
          <li><button className={`w-full text-left py-3 px-4 hover:bg-purple-700 ${view==='edit'?'bg-purple-800':''}`} onClick={()=>setView('edit')}>✏️ Edición (Líderes)</button></li>
        </ul>
      </nav>
    </motion.aside>
  )
}