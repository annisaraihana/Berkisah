import './App.css'

function NotFound() {

  return (
      <>
        <div className='px-40 grid sm:grid-cols-2 items-center justify-center'>
          <div className='flex justify-center items-center'>
            <img src='src\assets\aset robot.svg' className='w-3/4'></img>
          </div>

          <div>
            <h2 className='text-kuning sm:text-5xl text-2xl'>Maaf!</h2>
            <p className='sm:text-3xl text-xl'>Error 404 Laman Tidak Ditemukan</p>
            <p className='sm:mt-10'>Kembali ke <a className='text-kuning' href="http://127.0.0.1:5173/">Halaman Utama</a>.</p>
          </div>


        </div>
      </>
  )
}

export default NotFound
