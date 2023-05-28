import './App.css'

function NotFound() {

  return (
      <>
        <div className='px-40 grid grid-cols-2 items-center justify-center'>
          <div className='flex justify-center items-center'>
            <img src='src\assets\aset robot.svg' className='w-3/4'></img>
          </div>

          <div>
            <h2 className='text-kuning'>Maaf!</h2>
            <p className='text-3xl'>Error 404 Laman Tidak Ditemukan</p>
            <p className='mt-10'>Bila memerlukan bantuan, silakan hubungi kami <a className='text-kuning' href="https://wa.me/6282176615362" target="_blank">di sini</a>.</p>
          </div>


        </div>
      </>
  )
}

export default NotFound
