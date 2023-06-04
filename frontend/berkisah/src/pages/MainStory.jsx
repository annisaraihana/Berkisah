import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Loader from "../components/nav/Loader";

function MainStory() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [content, setContent] = React.useState(null);
  const [image, setImage] = React.useState([]);
  const [sequence, setSequence] = React.useState([]);
  const [customChoice, setCustomChoice] = React.useState(null)

  function generateIntro() {
    if (content == null) axios.post(`${import.meta.env.VITE_BASE_URL}/generate/intro`, {
      prompt: "Ada seorang raja"
    }).then((response) => {
      setContent(response.data);
      generateImage();
    });
  }
  
  function generateImage() {
    axios.post(`${import.meta.env.VITE_BASE_URL}/generate/image`, {
      positive_prompt: content.story,
      negative_prompt: "nsfw creepy",
      artstyle_keyword: "fantasy",
      width: 512,
      height: 512
    }).then((response) => {
      setImage(response.data);
      setIsLoading(false);
    })
  }

  async function generateStory(selectedchoice, currentsequence) {
     await axios.post(`${import.meta.env.VITE_BASE_URL}/generate/story`, {
      choice: selectedchoice,
      sequence: currentsequence,
    }).then((response) => {
      setContent(response.data);
      console.log(response.data)
      generateImage();
      setIsLoading(false);
    })
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
  
  if (!content) return <Loader/>

  return (
    <div>
      {isLoading ? <Loader/> : (<>
      <div className='grid grid-cols-3 items-center'>
        <div>
          <img onClick={() => handleBack()} className="cursor-pointer aspect-square w-6" src={'src/assets/back-icon.svg'}></img>
        </div>
        <h2 className='flex justify-center text-kuning mb-2'>Cerita</h2>
        <div className='grid grid-flow-col justify-end gap-6 items-center'>
          <img className="aspect-square w-6" src={'src/assets/save-icon.svg'}></img>
          <div>
            <Link to={"/"}>
              <img className="aspect-square w-6" src={'src/assets/home-icon.svg'}></img>
            </Link>
          </div>
          <div>
            <Link to={"/settings"}>
              <img className="aspect-square w-6" src={'src/assets/settings-icon.svg'}></img>
            </Link>
          </div>
        </div>
      </div>
      
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <img className="aspect-[5/4] item-center w-full object-cover rounded-lg shadow-lg" src={`data:image/jpeg;base64,${image[0]}`}></img>
          <div className='grid grid-flow-row'>
          <p className='text-justify'>{content.story}</p>
            {content.choices.map((choice) => {
            return (
              <button onClick={() => handleClick(content.story, choice) + setIsLoading(true)}>{choice}</button>)
              })}
            
            <div className='flex flex-flow-col gap-3 items-center mt-1.5'>
              <input 
                type='text'
                placeholder='atau ketikkan satu kalimat cerita lanjutan yang diinginkan'
                className='w-full h-full text-hitam text-center bg-kuning rounded-lg border-2 border-[#A37C04] placeholder-[#A37C04]'
                onChange={(e) => setCustomChoice(e.target.value)}>
              </input>
              <button onClick={() => handleClick(content.story, customChoice) + setIsLoading(true)} className='h-full'>Submit</button>
            </div>
          </div>      
        </div>
        </>
        )}
    </div>
  )
}

export default MainStory