import React from 'react'
import axios from 'axios';

// import Form from 'react-bootstrap/Form'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      citydata: {},
      dataforcoun: '',
      showList:false,
      searchCity:'',
    }
  }


  getlocation = async (e) => {
    

    e.preventDefault();

    
    await this.setState({
      dataforcoun: e.target.cityy.value 
    })
    let url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.dataforcoun}&format=json`;

    // send the endpoint to the third party API USING AXIOS
    let sendData = await axios.get(url);

    await this.setState({
      citydata: sendData.data[0],
      showList:true,

    })
  }


  render() {
    return(
      <div>
        <h1>City Explorer</h1>
        <form onSubmit={this.getlocation}>
          <input on type='text' name='cityy' placeholder='Type a City Name!'/>
          <button>submit</button>
        </form>
        {this.state.showList &&  <ul>
          <li>City Name:{this.state.citydata.display_name}</li>
          <li>Lat:{this.state.citydata.lat}</li>
          <li>Lon:{this.state.citydata.lon}</li>
        </ul>}
      </div>
    )
  }
}

export default App;

