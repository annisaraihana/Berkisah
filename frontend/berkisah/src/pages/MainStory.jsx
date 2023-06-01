import './App.css'
import { Link } from 'react-router-dom'

let story = 
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    image: 'src/assets/dummy.png',
    choices: ['Alur 1', 'Alur 2', 'Alur 3'],
  }
  
function MainStory() {

  return (
    <>
      <div class='flex justify-between'>
        <h2 className='flex justify-center text-kuning mb-2'>Cerita</h2>
        <div class='grid grid-flow-col gap-6'>
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
        <img class="aspect-[3/2] w-full object-cover rounded shadow-lg" src={story.image}></img>
        <div class='grid grid-flow-row'>
        <p class='text-justify'>{story.text}</p>
          {story.choices.map((choice) => {
          return (
            <button>{choice}</button>)
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
