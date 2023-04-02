import '../App.css'

function Home() {

  return (
    <div className='flex justify-center items-center min-h-screen min-w-full'>
      <div className='flex relative'>
        <div className='z-40 static p-10 bg-[#EFEFEF] rounded-2xl overflow-hidden shadow-xl'>
          <div className="grid grid-cols-2 items-center justify-center">
            <div className='flex justify-center items-center'>
              <img src='src\assets\aset home.png' className='w-1/2 mr-8'></img>
            </div>
            <div className='mb-20'>
              <div className='items-center justify-end pb-3 flex'>
                <p className='text-hitam mr-5'>Masuk</p>
                <button className="relative w-8 h-8 bg-purple-50 rounded-full flex justify-center items-center text-center p-5 shadow-xl">
              </button>
              </div>
              <h2 className='flex items-start mt-20 text-hitam'>Berkisah</h2>
              <p className='flex items-start mb-4 text-hitam'>Rangkai kisahmu di sini!</p>
              
              <button className='flex w-full'>
                Cerita Baru
              </button>
              <button class="flex w-full">
                Lanjutkan Cerita
              </button>
              <button class="flex w-full">
                Pengaturan
              </button>
            </div>
          </div>
        </div>

        <div className='absolute min-w-full min-h-full p-10 bg-[#D0D0D0] rounded-2xl rotate-2'>
        </div>
      </div>
    </div>
  )
}

export default Home
