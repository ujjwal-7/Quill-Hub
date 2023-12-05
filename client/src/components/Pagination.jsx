import React from 'react'

const Pagination = ({pageNumber, setPageNumber, totalPages}) => {
  return (
    <div className='flex w-full justify-center gap-5'>
        <button onClick={() => {setPageNumber(pageNumber - 1)}} disabled = {pageNumber <= 1} className={`h-8 w-12 sm:h-10 sm:w-14 text-center  text-white ${pageNumber <= 1 ? 'bg-stone-400 cursor-not-allowed' : 'bg-[#1a8917]'}`}>Prev</button>

        <div className='text-lg'>{pageNumber} / {totalPages}</div>

        <button onClick={() => {setPageNumber(pageNumber + 1)}} disabled = {pageNumber >= totalPages} className={`h-8 w-12 sm:h-10 sm:w-14 text-center  text-white  ${pageNumber >= totalPages ? 'bg-stone-400 cursor-not-allowed' : 'bg-[#1a8917]'}`}>Next</button>
    </div>
  )
}

export default Pagination