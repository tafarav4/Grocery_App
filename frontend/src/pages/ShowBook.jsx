import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { set } from 'mongoose';

const ShowBook = () => {
  const [commodity, setCommodity] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:4444/commodities/${id}`)
      .then((response) => {
        setCommodity(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [])

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Item</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Item</span>
            <span>{commodity.name}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Quantity</span>
            <span>{commodity.quantity} {commodity.units}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Cost</span>
            <span>${commodity.cost}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Expiration Date</span>
            <span>{commodity.expiration}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Category</span>
            <span>{commodity.category}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
            <span>{new Date(commodity.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
            <span>{new Date(commodity.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowBook