import React from 'react'
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import './App.css'

// import Form from 'react-bootstrap/Form'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      citydata: {},
      dataforcoun: '',
      showList: false,
      searchCity: '',
      mapUrlll: ``,
    }
  }


  getlocation = async (e) => {
    e.preventDefault();

    await this.setState({
      dataforcoun: e.target.cityy.value
    })
    let url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.dataforcoun}&format=json`;

    let sendData = await axios.get(url);

    await this.setState({
      citydata: sendData.data[0],
      showList: true,

    })
  }


  render() {
    return (
      <div className='cont'>
        <>
          <h1>City Explorer</h1>
          <div className='form'>
          <Form onSubmit={this.getlocation}>
          <Form.Group className="mb-3" controlId="formtext">
            <Form.Label>City Name</Form.Label>
            <Form.Control name='cityy' placeholder="Type a City Name!" />
            </Form.Group>
            <Button type='submit'>Explore!</Button>
          </Form>
          </div>


          {this.state.showList &&(<p> <ListGroup style={{paddingLeft:'50ch',display: 'flex',marginInline:'10ch',color:'red', justifyContent:'space-evenly'}} >
            <ListGroup.Item style={{padding:'2ch'}}  variant="info">City Name:{this.state.citydata.display_name}</ListGroup.Item>
            <ListGroup.Item style={{padding:'2ch'}} variant="info">Lat:{this.state.citydata.lat}</ListGroup.Item>
            <ListGroup.Item style={{padding:'2ch'}} variant="info">Lon:{this.state.citydata.lon}</ListGroup.Item>
          </ListGroup> </p>)}
          {this.state.showList  && ( <div className='img'> <Image
              src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.citydata.lat},${this.state.citydata.lon}&zoom=18`} 
              rounded
            /></div>)}
        </>
      </div>
    )
  }
}

export default App;
