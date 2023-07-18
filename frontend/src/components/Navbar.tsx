import React from 'react'
import Logo from '../assets/logo.png'
const Navbar = () => {
    const time=new Date();
    let hours = time.getHours();
    let minutes: number | string = time.getMinutes();
    const day=time.toLocaleString('en-us', {  weekday: 'long' })
    const date=time.getDate();
    const month=time.toLocaleString('en-us', {  month: 'long' })
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+String(minutes) : minutes;
    const timeString = String(hours) + ':' + String(minutes) + ' ' + ampm+"•"+String(day)+","+String(month)+" "+String(date);
  return (
    <div className="flex pt-3 pl-3 items-center justify-between ">
        <div className="flex  w-48 justify-between border-2 hover:cursor-pointer ">
        <img  className="w-32" src={Logo} alt="logo" />
        <h1 className="pt-[3px] font-sans text-primary text-2xl ">Meet</h1>
        </div>
        <div className="flex "> 
            <p>{timeString}</p>
            <p>Icon 1</p>
            <p>Icon 1</p>
            <p>Icon 1</p>
            <p>Icon 1</p>
            <p>Profile</p>
        </div>
    </div>
  )
}

export default Navbar