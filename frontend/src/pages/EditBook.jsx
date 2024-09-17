import React, { useState, useEffect } from 'react'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [units, setUnits] = useState('');
  const [cost, setCost] = useState('');
  const [expiration, setExpiration] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:4444/commodities/${id}`)
    .then((response) => {
      setName(response.data.name);
      setQuantity(response.data.quantity);
      setUnits(response.data.units);
      setCost(response.data.cost);
      setExpiration(response.data.expiration);
      setCategory(response.data.category);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      alert('Encountered an error while fetching data');
      console.log(error);
    })
  }, [])
  const handleEditBook = () => {
    const data = {
      name,
      quantity,
      units,
      cost,
      expiration,
      category,
    };
    setLoading(true);
    axios
      .put(`http://localhost:4444/commodities/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Item edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error occured. Please check console.');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Item</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
      <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Item (required)</label>
          <input 
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Quantity (required)</label>
          <input 
            type='text'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Units</label>
          <input 
            type='text'
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Cost (required)</label>
          <input 
            type='text'
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Expiration (Year-Month-Day)</label>
          <input 
            type='text'
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Category</label>
          <input 
            type='text'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditBook