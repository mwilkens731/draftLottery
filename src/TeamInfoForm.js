import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';

const options= [
  {
    label: 8,
    value: 8
  },{
    label: 9,
    value: 9
  },{
    label: 10,
    value: 10
  },{
    label: 11,
    value: 11
  },{
    label: 12,
    value: 12
  },{
    label: 13,
    value: 13
  },{
    label: 14,
    value: 14
  }
];

const defaultBallsByStanding = [250,199,156,119,88,63,43,28,17,11,8,7,6,5];

class TeamInfoForm extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.populateTable = this.populateTable.bind(this);
    this.handleTeamNameChange = this.handleTeamNameChange.bind(this);
    this.handleBallsChange = this.handleBallsChange.bind(this);
    this.submitTeamInfo = this.submitTeamInfo.bind(this);
    this.clone = this.clone.bind(this);
    this.state = {
      numTeams: 12,
      teamInfo: []
    };
  }

  componentDidMount(){
    this.handleChange({value: this.state.numTeams});
  }

  clone (object) {
    return JSON.parse(JSON.stringify(object));
  }

  handleChange(e) {
    if (e.value !== this.state.numTeams || this.state.teamInfo.length === 0){
      let teamInfo = [];
      for (let i = 0; i < e.value; i++){
        let thisTeam = {
          balls: defaultBallsByStanding[e.value - (i+1)],
          teamName: `Team ${i+1}`,
          finalStanding: i + 1
        };
        teamInfo.push(thisTeam);
      }
      this.setState({
        numTeams: e.value,
        teamInfo: teamInfo
      });
    }
  }

  handleTeamNameChange(e) {
    let teamInfo = this.clone(this.state.teamInfo);
    teamInfo[e.target.getAttribute('data-row')].teamName = e.target.value;
    this.setState({
      teamInfo: teamInfo
    });
  }

  handleBallsChange(e) {
    let teamInfo = this.clone(this.state.teamInfo);
    teamInfo[e.target.getAttribute('data-row')].balls = parseInt(e.target.value);
    this.setState({
      teamInfo: teamInfo
    });
  }

  populateTable() {
    let jsx = [];
    for (let i = 0; i < this.state.teamInfo.length; i++) {
      jsx.push(
        <tr>
            <th scope='row'>{this.state.teamInfo[i].finalStanding}</th>
            <td><input data-row={i} type='text' value={this.state.teamInfo[i].teamName} onChange={this.handleTeamNameChange}/></td>
            <td><input data-row={i} type='number' value={this.state.teamInfo[i].balls} onChange={this.handleBallsChange}/></td>
        </tr>
      );
    }
    return (<tbody>{jsx}</tbody>);
  }

  submitTeamInfo(){
    this.props.submitTeamInfo(this.state.teamInfo);
  }

  render() {
    return (
      <div>
        <div className='row pb-4'>
          <h5 className='col-12 text-center'>Enter last year&apos;s standings, tweak lottery settings, and click Submit</h5>
        </div>
        <div className='row pb-4'>
          <label htmlFor='numTeamsDropdown' className='col-4 col-md-2 offset-md-3'>Number of Teams:</label>
          <ReactSelect name='numTeamsDropdown' className='col-4 col-md-2' options={options} selected={this.state.numTeams} defaultValue={{label: 12, value: 12}} onChange={this.handleChange} />
          <div className='col-4 col-md-2'><button type='button' className='btn btn-primary float-right' onClick={this.submitTeamInfo}>Submit</button></div>
        </div>
        <div className='row'>
          <table className='table col-12 col-md-6 offset-md-3'>
            <thead>
              <tr>
                <th scope='col'>Standings</th>
                <th scope='col'>Team Name</th>
                <th scope='col'>Lottery Balls</th>
              </tr>
            </thead>
            {this.populateTable()}
          </table>
        </div>
      </div>
    );
  }
}

TeamInfoForm.propTypes = {
  submitTeamInfo: PropTypes.func
};

export default TeamInfoForm;
