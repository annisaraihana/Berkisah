import './App.css'


let list_stories = [
  {
    id: 1,
    title: 'Bawang Merah dan Bawang Putih',
    description: 'Ini adalah cerita tentang bawang merah dan bawang putih',
    image: 'src/assets/dummy.png',
    prompt: '',
  },
  {
    id: 2,
    title: 'Cyberpunk 2045',
    description: 'Ini adalah cerita tentang cyberpunk',
    image: 'src/assets/dummy.png',
    prompt: '',
  },
  {
    id: 3,
    title: 'Tales of the Abyss',
    description: 'Ini adalah cerita tentang Tales of the Abyss',
    image: 'src/assets/dummy.png',
    prompt: '',
  },
]
function NewStory() {

  return (
    <div className='flex justify-center items-center min-h-[85vh] min-w-[85vw]'>
      <div className='grid grid-flow-row'>
        <h2 className='flex justify-center items-center text-kuning mb-10'>Pilih Cerita Baru</h2>

        <div className='grid grid-cols-1 sm:grid-cols-4 gap-4'>
          {list_stories.map((story) => {
            return (
              <div className="max-w-xs rounded-lg overflow-hidden border-2 border-[#000000] bg-[#1D1D1D] shadow-xl">
                <img className="aspect-[4/3] w-full object-cover rounded" src={story.image} alt="robot"></img>
                <div className="px-6 py-4">
                  <div className="text-2xl mb-2">{story.title}</div>
                  <p className="text-sm">
                    {story.description}
                  </p>
                </div>
              </div>)
          })}



        </div>
      </div>
    </div>
  )
}

export default NewStory
