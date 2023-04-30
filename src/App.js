import './App.css';
import AppDrawer from './Components/AppDrawer';
import { Provider } from 'react-redux';
import store from './Redux/store';

function App() {
  return (
    <Provider store={store}>
      <AppDrawer />
    </Provider>
  );
}

export default App;
