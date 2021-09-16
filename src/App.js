import TaskForm from "./Components/TaskForm";
import './App.css'
import { TodoContextProvider } from "./Components/Context/Context";
import MainPage from "./Components/MainPage";
import {BrowserRouter,Route,Switch} from 'react-router-dom'
function App() {
  return (
    <div className="app">
      <div className=' container pt-3'>
      <TodoContextProvider>
        <h2 className='text-center mb-4'>Todo App</h2>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component = {MainPage} />
            <Route path='/addTask' component = {TaskForm} />
            <Route path='/editTask/:id' component = {TaskForm} />
          </Switch>
        </BrowserRouter>
      </TodoContextProvider>
      </div>
    </div>
  );
}

export default App;
