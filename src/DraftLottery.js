import React, { Component } from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';

const lastYearColumns = [
  {
    Header: 'Last Years\'s Results',
    columns: [
      {
        Header: 'Standings',
        id: 'finalStanding',
        accessor: 'finalStanding'
      },
      {
        Header: 'Team Name',
        accessor: 'teamName',
        minWidth: 200
      },
      {
        Header: 'Balls',
        accessor: 'balls'
      }
    ]
  }
];

const resultColummns = [
  {
    Header: 'Lottery Results',
    columns: [
      {
        Header: '#',
        id: 'spot',
        accessor: 'spot'
      },
      {
        Header: 'Team Name',
        id: 'teamName',
        accessor: 'teamName',
        minWidth: 200
      }
    ]
  }
];

const remainingTeams = [
  {
    Header: 'Remaining Teams',
    columns: [
      {
        Header: 'Team Name',
        id: 'teamName',
        accessor: 'teamName'
      },
      {
        Header: '% Chance of Next Pick',
        id: 'chance',
        accessor: 'chance'
      }
    ]
  }
];

class DraftLottery extends Component {
  constructor (props) {
    super(props);
    this.populateLottery = this.populateLottery.bind(this);
    this.populatePercentages = this.populatePercentages.bind(this);
    this.calculateTotalBalls = this.calculateTotalBalls.bind(this);
    this.draft = this.draft.bind(this);
    this.state = {
      lotteryResults: [],
      previousPick: {},
      lottery: [],
      teamsRemaining: []
    };
  }

  componentDidMount() {
    console.log('in', this.props.lotteryInfo);
    this.setState({
      lottery: this.populateLottery(this.props.lotteryInfo),
      teamsRemaining: this.populatePercentages(this.props.lotteryInfo, this.calculateTotalBalls(this.props.lotteryInfo))
    });
  }

  populateLottery (teamsRemaining) {
    let lottery = [];
    teamsRemaining.forEach((team) => {
      for (let i = 0; i < team.balls; i++) {
        lottery.push(team);
      }
    });
    return lottery;
  }

  populatePercentages (previousTeamsRemaining, totalBalls) {
    let newTeamsRemaining = [];
    previousTeamsRemaining.forEach((team) => {
      newTeamsRemaining.push(team);
      team.chance = Math.round((team.balls / totalBalls) * 100);
    });
    return newTeamsRemaining;
  }

  calculateTotalBalls (teamsRemaining) {
    let totalBalls = 0;
    teamsRemaining.forEach((team) => {
      totalBalls += team.balls;
    });
    return totalBalls;
  }

  draft () {
    if (this.state.teamsRemaining.length > 0) {
      let pick = this.state.lottery[Math.floor(Math.random() * Math.floor(this.state.lottery.length))];
      pick.spot = this.state.lotteryResults.length + 1;
      let newTeamsRemaining = [];
      this.state.teamsRemaining.forEach((team) => {
        if (team.teamName !== pick.teamName) {
          newTeamsRemaining.push(team);
        }
      });
      let newLottery = this.populateLottery(newTeamsRemaining);
      newTeamsRemaining = this.populatePercentages(newTeamsRemaining, this.calculateTotalBalls(newTeamsRemaining));
      let newLotteryResults = this.state.lotteryResults.slice(0, this.state.lotteryResults.length);
      newLotteryResults.push(pick);
      this.setState({
        lottery: newLottery,
        previousPick: pick,
        teamsRemaining: newTeamsRemaining,
        lotteryResults: newLotteryResults
      });
    }
  }

  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-4'>
            <ReactTable className='text-center -striped -highlight' defaultSorted={[{id: 'finalStanding', desc: true}]} data={this.props.lotteryInfo} columns={lastYearColumns} defaultPageSize={this.props.lotteryInfo.length} showPagination={false} />
          </div>
          <div className='col-4'>
            <ReactTable className='text-center -striped -highlight' data={this.state.lotteryResults} columns={resultColummns} defaultPageSize={this.props.lotteryInfo.length} showPagination={false} />
          </div>
          <div className='col-4'>
            <ReactTable className='text-center -striped -highlight' defaultSorted={[{id: 'chance', desc: true}]} data={this.state.teamsRemaining} columns={remainingTeams} defaultPageSize={this.state.teamsRemaining.length} showPagination={false} />
          </div>
        </div>
        <br /><br />
        <div className='row'>
          <div className='col-12 text-center'>
            <button type='button' className='btn btn-primary' onClick={this.draft}>Draft!</button>
          </div>
        </div>
        <br />
        <div className='row'>
          <div className='col-12 text-center'>
            {this.state.previousPick.teamName &&
            <span>{this.state.previousPick.teamName} won pick #{this.state.previousPick.spot}! They had a {this.state.previousPick.chance}% chance of winning it.</span>
          }
          </div>
        </div>
      </div>
    );
  }
}

DraftLottery.propTypes = {
  lotteryInfo: PropTypes.array
};

export default DraftLottery;
