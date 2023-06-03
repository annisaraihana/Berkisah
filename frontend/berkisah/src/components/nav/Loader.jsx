import { Link } from "react-router-dom";

function Loader() {
  let circleCommonClasses = 'sm:h-2.5 sm:w-2.5 h-2 w-2 bg-kuning rounded-full';

    return (
      <div className="fixed left-0 right-0">
        <div className="flex justify-center items-baseline">
        <h2 class="text-center text-white sm:text-5xl text-4xl mr-2 mb-2 animate-pulse">Loading</h2>
          <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
          <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
          <div className={`${circleCommonClasses} animate-bounce400`}></div>
        </div>
        <p class="text-center text-white animate-pulse">Mungkin memerlukan waktu beberapa detik, tetap di halaman ini.</p>
      </div>
    );
}

export default Loader;
