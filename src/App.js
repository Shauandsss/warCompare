import './App.css';
import Graphic from './components/graphic'
import TableReact from './components/table'
import Compare from './components/compare'

import jsonData from './data/global firepower 2022 wide.json'


function App() {
  return (
    <div className="App">
						<Graphic data={jsonData}></Graphic>
						<TableReact data={jsonData} ></TableReact>
            <Compare data={jsonData}></Compare>
    </div>
  );
}

export default App;
