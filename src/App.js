
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Produto from './pages/Produto.js' ;

function App() {

return (

<Router>
    <Routes>
    <Route path="/produtos" element={<Produto />}/>
    </Routes>
</Router>
);
}

export default App;
