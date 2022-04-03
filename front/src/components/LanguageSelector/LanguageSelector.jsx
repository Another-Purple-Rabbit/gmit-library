import React from "react";
import './LanguageSelector.css';
import { useDispatch } from 'react-redux'
import { setLang } from "./languageSlice";

import tajfl from './pics/tajfl.png'
import rusfl from './pics/rusfl.png'
import engfl from './pics/engfl.png'

const LanguageSelector = () => { 
    const dispatch = useDispatch()
    
    const handleClick = (e) => {
        dispatch(setLang(e.target.alt));
    }
    
    return (
        <div className="wrapper">
            <img src={tajfl} alt='tj' onClick={handleClick}/>
            <img src={rusfl} alt='ru' onClick={handleClick}/>
            <img src={engfl} alt='en' onClick={handleClick}/>
        </div>
    )
}

export default LanguageSelector;