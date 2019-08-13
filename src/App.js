import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-table/react-table.css';
import DraftLottery from './DraftLottery';
import TeamInfoForm from './TeamInfoForm';

class App extends Component {
  constructor (props) {
    super(props);
    this.submitTeamInfo = this.submitTeamInfo.bind(this);
    this.state = {
      lotteryInfo: null
    };
  }

  submitTeamInfo (teamInfo) {
    this.setState ({ lotteryInfo: teamInfo });
  }

  render () {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <h1 className='col-12 jumbotron text-center'>
            Fantasy Draft Lottery
          </h1>
        </div>
        {!this.state.lotteryInfo &&
          <TeamInfoForm submitTeamInfo={this.submitTeamInfo} />
        }
        {this.state.lotteryInfo &&
          <DraftLottery lotteryInfo={this.state.lotteryInfo}/>
        }
      </div>
    );
  }
}



export default App;
