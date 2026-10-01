import React from 'react'

const CTA = ({title, desc}) => {
  return (
    <div className='mt-12 flex flex-col gap-3 items-center mb-8'>
        <p className='text-2xl font-semibold text-black/70'>{title}</p>
        <p className='text-base text-black/50'>{desc}</p>
    </div>
  )
}

export default CTA