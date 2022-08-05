import './App.css';
function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        Message
        <h3>{props.message}</h3>
      </header>
    </div>
  );
}
export default App;