import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Home = () => {
  const [commodities, setComs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:4444/commodities')
      .then((response) => {
        setComs(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [])
  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Grocery List</h1>
        <Link to='/commodities/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Cost</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Quantity</th>
              <th className='border border-slate-600 rounded-md'>Item</th>
              <th className='border border-slate-600 rounded-md'>Expiration Date</th>
              <th className='border border-slate-600 rounded-md'>Category</th>
              <th className='border border-slate-600 rounded-md'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {commodities.map((commodity, index) => (
              <tr key={commodity._id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  ${commodity.cost}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {commodity.quantity} {commodity.units}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {commodity.name}
                </td>
                <td className={commodity.expiration == null ? 'border border-slate-700 rounded-md text-center' :
                    new Date(commodity.expiration).getTime() - Date.now() < 0 ? 'border border-slate-700 rounded-md text-center bg-red-500':
                    (new Date(commodity.expiration).getTime() - Date.now()) / (1000 * 3600 * 24) < 5 ? 'border border-slate-700 rounded-md text-center bg-orange-400' : 
                                                                                'border border-slate-700 rounded-md text-center'}>
                    {commodity.expiration == null ? '' : new Date(commodity.expiration).getMonth()+1 + '/' + new Date(commodity.expiration).getDate() + '/' + new Date(commodity.expiration).getFullYear()}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {commodity.category}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/commodities/details/${commodity._id}`}>
                      <BsInfoCircle className='text-2xl text-green-800 hover:text-black' />
                    </Link>
                    <Link to={`/commodities/edit/${commodity._id}`}>
                      <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black' />
                    </Link>
                    <Link to={`/commodities/delete/${commodity._id}`}>
                      <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Home