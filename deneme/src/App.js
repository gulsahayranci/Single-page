import React, {useState, useEffect} from 'react'
import './App.css';
import Button from '@mui/material/Button';
import {database, storage} from './Firebase-Config';
import {collection, addDocs, getDocs} from 'firebase/firestore';
import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage';

import  Anahat  from "./components/Anahat";
function App() {


  return (
     
    <>
     {/* Anahat */}

     <Anahat />
     
 
  
    </>
   
  );
}

export default App;
