import './App.css'

function NewStory() {

  return (
    <div className='flex justify-center items-center min-h-screen min-w-full xl:w-screen'>
      <div className='grid grid-flow-row'>  
        <h2 className='flex justify-center items-center text-kuning mb-10'>Pilih Cerita Baru</h2>
        
        <div className='grid grid-cols-1 sm:grid-cols-4 gap-4'>
          <div class="max-w-sm rounded-lg overflow-hidden border-2 border-[#000000] bg-[#1D1D1D] shadow-xl">
            <img class="aspect-[4/3] w-full object-cover rounded" src="https://images.pexels.com/photos/12258042/pexels-photo-12258042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="robot"></img>
            <div class="px-6 py-4">
              <div class="text-2xl mb-2">Judul</div>
              <p class="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
              </p>
            </div>

            <div class="px-6 pt-4 pb-2">
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
            </div>
          </div>

          <div class="max-w-sm rounded-lg overflow-hidden border-2 border-[#000000] bg-[#1D1D1D] shadow-xl">
            <img class="aspect-[4/3] w-full object-cover rounded" src="https://images.pexels.com/photos/12258042/pexels-photo-12258042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="robot"></img>
            <div class="px-6 py-4">
              <div class="text-2xl mb-2">Judul</div>
              <p class="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
              </p>
            </div>
            
            <div class="px-6 pt-4 pb-2">
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewStory
