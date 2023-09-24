import {React,useState,useEffect} from 'react'
import { useParams,Link } from 'react-router-dom'
import Spinner from '../components/Spinner'
import axios from 'axios'
import Backbutton from '../components/Backbutton'
import { AiOutlineEdit } from 'react-icons/ai'



export default function Showbook() {
  const [books,setBooks] = useState([])
  const [loading,setLoading] = useState(false)
  const {id} = useParams()
  useEffect(()=>{
    setLoading(true)
    axios.get(`https://bookstore-gpkq.onrender.com/allbooks/${id}`).then(response => 
    {
        setBooks(response.data)
        setLoading(false)
    })
   },[])
   return (
   <>
   <div className='p-4 flex justify-between item-center'>
    <h1 className='text-3xl'>
      {
        books.title
      }
    </h1>
          <Backbutton/>
   </div>
   <div className='p-4'>
         {
          loading?<div className='w-full flex justify-center item-center'><Spinner/></div>:
          <div className='flex justify-center item-center'>
            <div className='border-2 border-sky-600 rounded-md p-10'>
                 <p className='text-xl'>Title : {books.title}</p>
                 <p className='text-xl'>Author : {books.author}</p>
                 <p className='text-xl'>Publised Year : {books.publishYear}</p>
                 <p className='text-xl'>Last Updated Time : {new Date(books.updatedAt).toString()}</p>
            </div>
            <Link to={`/Editbook/${books._id}`}>
                       <AiOutlineEdit className='text-4xl text-orange-700 mx-3'/>
                  </Link>
          </div>
         }
   </div>
   </>
   )
  
}
