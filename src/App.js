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
      dataforcoun: "",
      showList: false,
      mapUrlll: ``,
      //class07
      wData: [],
    }
  }


  getlocation = async (e) => {
    e.preventDefault();

    await this.setState({
      dataforcoun: e.target.cityy.value,
    })
    let url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.dataforcoun}&format=json`;

    let weatherUrl = `${process.env.REACT_APP_SERVER_LINK}/retriveData?cityName=${this.state.dataforcoun}`
    try {

      let sendData = await axios.get(url);
      let getWeatherData = await axios.get(weatherUrl);
      console.log(getWeatherData)

      await this.setState({
        citydata: sendData.data[0],
        wData: getWeatherData.data,
        showList: true,
        errormsg: false,

      })
    } catch (error) {
      await this.setState({
        citydata: '',
        showList: false,
        errormsg: true
      })
    }
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
                <Form.Control name='cityy' placeholder="Seattle, Paris or Amman" />
              </Form.Group>
              <Button type='submit'>Explore!</Button>
            </Form>
          </div>


          {this.state.showList && (<p> <ListGroup style={{ paddingLeft: '50ch', display: 'flex', marginInline: '10ch', color: 'red', justifyContent: 'space-evenly' }} >
            <ListGroup.Item style={{ padding: '2ch' }} variant="info">City Name:{this.state.citydata.display_name}</ListGroup.Item>
            <ListGroup.Item style={{ padding: '2ch' }} variant="info">Lat:{this.state.citydata.lat}</ListGroup.Item>
            <ListGroup.Item style={{ padding: '2ch' }} variant="info">Lon:{this.state.citydata.lon}</ListGroup.Item>
          </ListGroup> </p>)}

          {this.state.showList && this.state.wData.data.map((element,i) => {
            return (<ListGroup style={{ paddingLeft: '50ch', display: 'flex', marginInline: '10ch', color: 'red', justifyContent: 'space-evenly' }} >
              <ListGroup.Item  style={{ padding: '2ch' }} variant="info">Date : {element.datetime}</ListGroup.Item>
              <ListGroup.Item  style={{ padding: '2ch' }} variant="info">description : {element.weather.description}</ListGroup.Item>
              <ListGroup.Item  style={{ padding: '2ch' }} variant="info">Max Temprature : {element.app_max_temp}</ListGroup.Item>
              <ListGroup.Item  style={{ padding: '2ch' }} variant="info">Min Temprature : {element.app_min_temp}</ListGroup.Item>
            </ListGroup>
            )
          })}

          {this.state.showList && (<div className='img'> <Image
            src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.citydata.lat},${this.state.citydata.lon}&zoom=18`}
            roundedCircle
          /></div>)}
          {this.state.errormsg && (<h2 style={{ color: 'red' }} >Something went wrong, check your code ! </h2>)}
        </>
      </div>
    )
  }
}

export default App;
