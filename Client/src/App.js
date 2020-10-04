import React from 'react';
import WeatherBanner from './components/WeatherBanner'
import styles from './App.module.css'
import TodoList from './components/TodoList'

function App() {
  return (
    <div className={styles.App}>
      <WeatherBanner/>
      <TodoList/>
    </div>
  );
}

export default App;
