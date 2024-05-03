import React from 'react'
import Template from './Template'
import about from '../img/news2.png'
import news from '../img/news.png'
import Typed from 'typed.js';


function About() {
  return (
    <div>
      <Template first={'Developed'} third={"By"
      } second={"Aakash Prajapati"} img={about} img2={news} />


    </div>
  )
}
export default About;
