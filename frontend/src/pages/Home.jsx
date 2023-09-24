import {React,useEffect,useState} from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link,Navigate, useNavigate } from 'react-router-dom'
import {BsInfoCircle} from "react-icons/bs"
import {AiOutlineEdit} from "react-icons/ai"
import {MdOutlineDelete} from 'react-icons/md'

export default function Home() {
       const [books,setBooks] = useState([])
       const [loading,setLoading] = useState(false)
       const navigate = useNavigate()
       let Deletebook = (id)=>
       {
         setLoading(true)
         axios.delete(`https://bookstore-gpkq.onrender.com/deletebook/${id}`).then(()=>
         {
            setLoading(true)
            axios.get('https://bookstore-gpkq.onrender.com/allbooks').then(response => 
            {
                setBooks(response.data)
                setLoading(false)
                alert("Book got deleted")
            })
         }).catch(error =>
            {
                console.log(error)
                setLoading(false)
            })
       }
       useEffect(()=>{
        setLoading(true)
        axios.get('https://bookstore-gpkq.onrender.com/allbooks').then(response => 
        {
            setBooks(response.data)
            setLoading(false)
        })
       },[])
       return (
        <div className='px-4'>
             <div className='flex justify-between item-center'>
                <h1 className='text-3xl my-8'>
                     Books
                </h1>
                <Link to='/Createbook' className='my-8'>
                    <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>
                       Add Books
                    </button>
                </Link>
             </div>
             {
                loading?<div className='w-full h-full flex justify-center item-center'><Spinner/></div>:( <table className='w-full border-separate border-spacing-2'>
                    <thead>
                        <tr>
                            <th className='border border-slate-600 rounded-md'>
                                No
                            </th>
                            <th className='border border-slate-600 rounded-md'>
                                Title
                            </th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>
                                Author
                            </th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>
                                Pulished Year
                            </th>
                            <th className='border border-slate-600 rounded-md'>
                                Operations
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            books.map((book,index)=>
                            {
                                return (
                                <tr key={book._id} className='h-8'>
                                        <td className='border border-slate-700 rounded-md text-center'>
                                        {index+1}
                                        </td>
                                        <td className='border border-slate-700 rounded-md text-center'>
                                        {book.title}
                                        </td>
                                        <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                        {book.author}
                                        </td>
                                        <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                        {book.publishYear}
                                        </td>
                                        <td className='border border-slate-700 rounded-md text-center'>
                                            <div className='flex justify-center gap-x-4'>
                                            <Link to={`/Showbook/${book._id}`}>
                                                <BsInfoCircle className='text-2xl text-blue-700'/>
                                            </Link>
                                            <Link to={`/Editbook/${book._id}`}>
                                                <AiOutlineEdit className='text-2xl text-orange-700'/>
                                            </Link>
                                            <button onClick={()=>{Deletebook(book._id)}}>
                                                 <MdOutlineDelete className='text-2xl text-red-700'/>
                                            </button>
                                            </div>
                                        </td>
                                </tr>
                                )
                            })
                        }
                    </tbody>
                </table>)
             }
        </div>
       )
}
