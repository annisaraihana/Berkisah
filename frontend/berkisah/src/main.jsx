import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './pages/App'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'
import Continue from './pages/Continue';
import MainStory from './pages/MainStory';
import NewStory from './pages/NewStory';
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import { useContext, createContext, useState } from "react";

const TokenContext = createContext(null)
const PromptContext = createContext(null)
export {TokenContext, PromptContext}

export function Main() {
  const [token, setToken] = useState(null)
  const [prompt, setPrompt] = useState("Pada zaman dahulu, hiduplah")
  return (
    <TokenContext.Provider value={{token, setToken}}>
      <PromptContext.Provider value={{prompt, setPrompt}}>
                                      <BrowserRouter>
                                      <ToastContainer/>
                                        <Routes>
                                          <Route path='*' element={<NotFound/>}/>
                                          <Route path="/" element={<App />}/>
                                          <Route path='/main' element={<MainStory />}/>
                                          <Route path='/continue' element={<Continue/>}/>
                                          <Route path='/settings' element={<Settings/>}/>
                                          <Route path='/newstory' element={<NewStory/>}/>
                                          <Route path="/login" element={<Login/>}/>
                                          <Route path="/register" element={<Register/>}/>
                                        </Routes>
                                      </BrowserRouter>
      </PromptContext.Provider>                                
    </TokenContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);
