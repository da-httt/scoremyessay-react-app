import './App.css';
import Main from './components/MainComponent';
import {BrowserRouter} from 'react-router-dom';
import 'antd/dist/antd.css';
function App() {
  return (
    <BrowserRouter>
    <div >
      <Main/>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
