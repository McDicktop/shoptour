import React from 'react'

function OrdersList({children}) {
  return (
    <ul className='flex flex-col gap-2'>{children}</ul>
  )
}

export default OrdersList