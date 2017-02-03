import React from 'react';
import ScriptBlock from './ScriptBlock';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount() {
    this.socket = io();
    this.socket.on('update', (state) => {
      this.setState(state);
    });
  }

  onStart = (key, flags) => {
    this.socket.emit('run', { key, flags });
  }

  onTerminate = (key) => {
    this.socket.emit('terminate', { key });
  }

  onClear = (key) => {
    this.socket.emit('clear', { key });
  }

  render() {
    return (
      <div>
        {Object.keys(this.state).map(key => (
          <ScriptBlock
            {...(this.state[key])}
            id={this.state[key].key}
            onStart={this.onStart}
            onTerminate={this.onTerminate}
            onClear={this.onClear}
          />
        ))}
      </div>
    );
  }
}

export default App;
