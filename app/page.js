"use client"

import React, { useState, useEffect } from "react";
import { doc, collection, addDoc, getDoc, querySnapshot, onSnapshot, query, deleteDoc } from "firebase/firestore"; 
import { db } from "./firebbase";

export default function Home() {
  const [items, setItems] = useState([
    // { name: "Coffee", price: 10 },
    // { name: "Movie", price: 20 },
    // { name: "candy", price: 30 },
  ]);

  const [newItem, setNewItems] = useState({name: '', price: ''})

  const [total, setTotal] = useState(0);

  // Add items to database

  const addItem = async (e) => {
    e.preventDefault();
    if(newItem.name !== '' && newItem.price !== ''){
      // setItems([...items, newItem])
      await addDoc(collection(db, "items"), {
        name: newItem.name.trim(),
        price: newItem.price,
      })
    }
    setNewItems({name: '', price: ''})
  }

  // Read items to database

  useEffect(()=>{
    const q = query(collection(db, 'items'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({...doc.data(), id: doc.id})
      });
      setItems(itemsArr);

      // Read Total from itemArr
      const calculateTotal = () => {
        const totalPrice = itemsArr.reduce(
          (sum, item) => sum + parseFloat(item.price),
          0
        );
        setTotal(totalPrice);
      };
      calculateTotal();
      return () => unsubscribe();
    })
  })

  // Delete items to database

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'items', id))
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex flex-col">
        <h1 className='text-4xl text-center'>Expense Tracker</h1>
        <div className='bg-gray-500 p-5 mt-8' >
          <form className='grid grid-cols-6 text-black items-center'>
            <input value={newItem.name} onChange={(e) => setNewItems({...newItem, name: e.target.value})} type='text' placeholder='Enter Expense' className='col-span-3 p-3 border' />
            <input value={newItem.price} onChange={(e) => setNewItems({...newItem, price: e.target.value})} type='number' placeholder='Enter $' className='col-span-2 p-3 mx-3' />
            <button onClick={addItem} type='submit' className='text-white bg-black hover:bg-slate-800 p-2 text-xl'>+</button>
          </form>
          <ul className="flex gap-3 flex-col mt-4">
            {items.map((item, id) => (
              <li key={id} className="w-full gap-2 flex justify-between text-xl bg-slate-800">
                <div className="flex justify-between w-full p-4">
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                </div>
                  <button 
                  onClick={()=>deleteItem(item.id)}
                  className="border-l-2 border-gray-700 px-10 hover:bg-slate-700">X</button>
              </li>
            ))}
          </ul>
          {items.length < 1 ? ('') : (
            <div className="flex justify-between pt-5 text-xl">
              <span>Total</span>
              <span>${total}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
