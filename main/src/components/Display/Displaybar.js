import React,{useState} from 'react'

function Displaybar() {
  const [complaints, setComplaints] = useState([])
  return (
    <div className='bg-slate-200 h-[90vh] flex-grow my-2 mr-2'>
      <h2 className='text-center text-xl font-medium border-2 border-red-400'>Complaints</h2>
      <div className='flex border-2 border-yellow-400 text-center justify-between'>
        <div className='border-2 border-white w-[25%]  tracking-tight'>
        Complaint Id's
        </div>
        <div className='border-2 border-white w-[25%] tracking-tight'>
        Date of Filing
        </div>
        <div className='border-2 border-white w-[25%] tracking-tight'>
        District
        </div >
        <div className='border-2 border-white w-[25%] tracking-tight'>
        View Complaint
        </div>
      </div>
      {
        complaints.map(ele => (
          <></>
        ))
      }


    </div>
  )
}

export default Displaybar