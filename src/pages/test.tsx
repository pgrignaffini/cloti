import React from 'react'

function TestPage() {
    return (
        <div className='h-screen w-full flex flex-col justify-center items-center'>
            <iframe src="https://steno-ai.azurewebsites.net/summit/drtalks" className="h-3/4 w-3/4" title="Steno AI"></iframe>
        </div>
    )
}

export default TestPage