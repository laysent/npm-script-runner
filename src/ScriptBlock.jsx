import React from 'react';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const outputStyle = {
  backgroundColor: '#000',
  whiteSpace: 'pre',
  overflowY: 'scroll',
  maxHeight: 400,
};

export default class ScriptBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false, flags: props.flags };
  }

  componentWillUpdate(nextProps) {
    if (this.props.flags !== nextProps.flags) this.setState({ flags: nextProps.flags });
  }

  handleExpandChange = (expanded) => {
    this.setState({ expanded });
  }

  handleToggle = (event, toggle) => {
    this.setState({ expanded: toggle });
  }

  handleFlagChange = (event) => {
    this.setState({ flags: event.target.value });
  }

  render() {
    return (
      <Card
        expanded={this.state.expanded}
        onExpandChange={this.handleExpandChange}
        style={{ width: 400 }}
      >
        <CardTitle title={this.props.command} />
        <CardText>
          <Toggle
            toggled={this.state.expanded}
            onToggle={this.handleToggle}
            labelPosition="right"
            label="Advanced area"
          />
        </CardText>
        {!this.props.stdout && !this.props.stderr &&
          <CardText expandable>No Data</CardText>
        }
        {this.props.stdout && (
          <CardText expandable style={Object.assign({ color: '#fff' }, outputStyle)}>
            {this.props.stdout}
          </CardText>
        )}
        {this.props.stderr && (
          <CardText expandable style={Object.assign({ color: '#f00' }, outputStyle)}>
            {this.props.stderr}
          </CardText>
        )}
        <CardText expandable>
          <TextField
            hintText="Flags"
            floatingLabelText="Additional flags passed in"
            onChange={this.handleFlagChange}
            value={this.state.flags}
          />
        </CardText>
        <CardActions>
          {!this.props.isRunning &&
            <RaisedButton
              label="Start"
              primary
              style={{}}
              onClick={() => {
                this.props.onStart(this.props.id, this.state.flags);
                this.setState({ expanded: true });
              }}
            />
          }
          {this.props.isRunning &&
            <RaisedButton
              label="Terminate"
              secondary
              style={{}}
              onClick={() => this.props.onTerminate(this.props.id)}
            />
          }
          <RaisedButton label="Clear Console" onClick={() => this.props.onClear(this.props.id)} />
        </CardActions>
      </Card>
    );
  }
}

ScriptBlock.propTypes = {
  id: React.PropTypes.string.isRequired,
  command: React.PropTypes.string.isRequired,
  stderr: React.PropTypes.string.isRequired,
  stdout: React.PropTypes.string.isRequired,
  flags: React.PropTypes.string.isRequired,
  isRunning: React.PropTypes.bool,
  onStart: React.PropTypes.func.isRequired,
  onTerminate: React.PropTypes.func.isRequired,
  onClear: React.PropTypes.func.isRequired,
};

ScriptBlock.defaultProps = {
  exitCode: 0,
  isRunning: false,
};
