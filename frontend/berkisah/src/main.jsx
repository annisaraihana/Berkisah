import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './pages/App'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'
import Continue from './pages/Continue';
import NewStory from './pages/NewStory';
import './index.css'
import Login from "./pages/Login";

export function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NotFound/>}/>
        <Route path="/" element={<App />}/>
        <Route path='/continue' element={<Continue/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/newstory' element={<NewStory/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);
