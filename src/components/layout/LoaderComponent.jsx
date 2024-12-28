import React from 'react'

function LoaderComponent() {
    return (
        // <div>Loading...</div>
        <div className='flex items-center justify-center w-full h-[calc(100vh-156px-2rem)]'>
            <div className='w-12 h-12 border-4 border-blue-500 border-solid rounded-full animate-spin border-t-transparent'></div>
        </div>
    )
}

export default LoaderComponent