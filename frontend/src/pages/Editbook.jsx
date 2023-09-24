import React,{useState,useEffect} from 'react'
import Backbutton from '../components/Backbutton'
import Spinner from '../components/Spinner'
import axios, { Axios } from 'axios'
import { useNavigate,useParams} from 'react-router-dom'

export default function Editbook() {
  const [title,setTitle]  = useState('');
  const [author,setAuthor]  = useState('');
  const [publishYear,setpublishYear]  = useState('');
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const updateBook = ()=>
  {
    const data = {title,author,publishYear};
    if(title||author||publishYear)
    {
      setLoading(true);
    axios.put(`http://localhost:3030/updateBook/${id}`,data).then(()=>
    {
     setLoading(false);
     navigate('/');
    }).catch(error =>
      {
        setLoading(false)
        alert("somthing went wrong")
        console.log(error)
      })
    }
    else
    {
      alert('Requires Field are Missing')
    }
  }
  useEffect(()=>{
    setLoading(true)
    axios.get(`http://localhost:3030/allbooks/${id}`).then(response => 
    {
      setTitle(response.data.title)
      setAuthor(response.data.author)
      setpublishYear(response.data.publishYear)
      setLoading(false)
    })
   },[]) 
  return (
    <>
    <div className='p-4 flex justify-between item-center'>
      <h1 className='text-3xl'>
          Create Book
      </h1>
      <Backbutton></Backbutton>
    </div>
    <div className='px-10'>
    {
      loading?<div className='w-full h-full flex justify-center item-center'><Spinner/></div>:
      <div className='my-4'>
        <div className='my-5'>
        <label className='text-xl ml-1 text-gray-500'>
          Title:
        </label>
        <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} className='border-2 border-gray-500 px-4 py-2 w-full' placeholder='Berserk' required/>
        </div>
       <div className='my-5'>
            
       <label className='text-xl ml-1 text-gray-500'>
        Authur:
       </label>
       <input type="text" value={author} onChange={(e)=>{setAuthor(e.target.value)}} className='border-2 border-gray-500 px-4 py-2 w-full' placeholder='Nafees' required/>
       </div>
        
        <div className='my-5'>
                    
       <label className='text-xl ml-1 text-gray-500'>
        Publised Year:
       </label>
       <input type="text" value={publishYear} onChange={(e)=>{setpublishYear(e.target.value)}} className='border-2 border-gray-500 px-4 py-2 w-full' placeholder='1865' required/>

        </div>
        <div className='flex justify-end'>
       <button className='px-5 py-2  bg-orange-400 m-8 rounded-md' type='submit' onClick={updateBook}>
        <p className='text-white text-lg font-bold'>
          Update
        </p>
       </button>
        </div>
      </div>
    }
    </div>
</>
  )
}
