import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const baseURL = 'http://127.0.0.1:5173/api';

function MainStory() {
  const [content, setContent] = React.useState(null);
  const [sequence, setSequence] = React.useState([]);

  let img = 'src/assets/dummy.png'
  
  function generateIntro() {
    if (content == null) axios.post(`${baseURL}/generate/intro`, {
      prompt: "Ada seorang raja"
    }).then((response) => {
      setContent(response.data);
    });
  }
  
  function generateStory(selectedchoice, currentsequence) {
    axios.post(`${baseURL}/generate/story`, {
      choice: selectedchoice,
      sequence: currentsequence,
    }).then((response) => {
      setContent(response.data);
      console.log(response.data)
    });
    console.log(currentsequence)
  }
  
  function handleClick(story, choice) {
    setSequence(sequence.concat(story))
    generateStory(choice, sequence)
  }

  function handleBack() {
      var last = sequence.pop()
      setSequence(sequence)
      generateStory(last, sequence)
  }

  generateIntro()
  
  if (!content) return "Internal Server Error"

  return (
    <>
      <div class='grid grid-cols-3 items-center'>
        <div>
          <img onClick={() => handleBack()} class="cursor-pointer aspect-square w-6" src={'src/assets/back-icon.svg'}></img>
        </div>
        <h2 className='flex justify-center text-kuning mb-2'>Cerita</h2>
        <div class='grid grid-flow-col justify-end gap-6 items-center'>
          <img class="aspect-square w-6" src={'src/assets/save-icon.svg'}></img>
          <div>
            <Link to={"/"}>
              <img class="aspect-square w-6" src={'src/assets/home-icon.svg'}></img>
            </Link>
          </div>
          <div>
            <Link to={"/settings"}>
              <img class="aspect-square w-6" src={'src/assets/settings-icon.svg'}></img>
            </Link>
          </div>
        </div>
      </div>
      
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <img class="aspect-[3/2] w-full object-cover rounded shadow-lg" src={img}></img>
        <div class='grid grid-flow-row'>
        <p class='text-justify'>{content.story}</p>
          {content.choices.map((choice) => {
          return (
            <button onClick={() => handleClick(content.story, choice)}>{choice}</button>)
            })}
          <div class='flex flex-flow-col gap-3 items-center mt-1.5'>
            <input type='text' placeholder='atau ketikkan satu kalimat cerita lanjutan yang diinginkan' className='w-full h-full text-hitam text-center bg-kuning rounded-lg border-2 border-[#A37C04] placeholder-[#A37C04]'></input>
            <button class='h-full'>Submit</button>
          </div>
        </div>      
        </div>
    </>
  )
}

export default MainStory