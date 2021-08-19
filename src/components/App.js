import React from 'react'
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import './App.css'
import WeatherBit from './weatherBit';
import Movies from './movies';

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
      //class08
      moviesData:[],
    }
  }


  getlocation = async (e) => {
    e.preventDefault();

    await this.setState({
      dataforcoun: e.target.cityy.value,
    })
    //**LINKS **/

    let url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.dataforcoun}&format=json`;

    let weatherBitUrl = `${process.env.REACT_APP_SERVER_LINK}/getWeatherBitData?sQuery=${this.state.dataforcoun}`

    let moviesUrl = `${process.env.REACT_APP_SERVER_LINK}/movies?sQuery=${this.state.dataforcoun}`
    //_____________________________________________________________________________________________________________________

    try {

      //**GET DATA FROM LINKS**/

      let sendData = await axios.get(url);

      let getWeatherBitData = await axios.get(weatherBitUrl);

      let getMoviesData = await axios.get(moviesUrl);


      //_____________________________________________________________________________________________________________________

      await this.setState({
        citydata: sendData.data[0],
        wData: getWeatherBitData,
        moviesData:getMoviesData.data, 
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
            <Form style={{ width: '100%' }} onSubmit={this.getlocation}>
              <Form.Group className="mb-3" controlId="formtext">
                <Form.Label>City Name</Form.Label>
                <Form.Control name='cityy' placeholder="Seattle, Paris or Amman" />
              </Form.Group>
              <Button type='submit'>Explore!</Button>
            </Form>
          </div>


          {this.state.showList && (<p> <ListGroup style={{ fontSize:'2ch',fontWeight:'bolder' ,paddingLeft: '45ch', display: 'flex', marginInline: '10ch', color: 'red', fontFamily: 'monospace', flexDirection: 'row'}} >
            <ListGroup.Item style={{ padding: '2ch' }} variant="info">City Name:{this.state.citydata.display_name}</ListGroup.Item>
            <ListGroup.Item style={{ padding: '2ch' }} variant="info">Lat:{this.state.citydata.lat}</ListGroup.Item>
            <ListGroup.Item style={{ padding: '2ch' }} variant="info">Lon:{this.state.citydata.lon}</ListGroup.Item>
          </ListGroup> </p>)}

          

          {this.state.showList && this.state.wData.data.map((element, idx) => {
            return (
              <WeatherBit
                key={idx}
                datetime={element.datetime}
                description={element.description}
                low_temp={element.low_temp}
                max_temp={element.max_temp}
              />
            )
          })}

          {this.state.showList && (<div className='img'>
            <h2 style={{ textAlign: 'center' }}>Map for {this.state.dataforcoun}</h2>
            <Image 
              src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.citydata.lat},${this.state.citydata.lon}&zoom=17`}
              roundedCircle
            />

          </div>)}

          {this.state.showList && this.state.moviesData.map((element, idx) => {
            return (
              <Movies
                key={idx}
                poster_path={element.poster_path}
                original_title={element.original_title}
                overview={element.overview}
                vote_average={element.vote_average}
                popularity={element.popularity}
                release_date={element.release_date}
              />
              )
            })}

          {this.state.errormsg && (<h2 style={{ color: 'red' }} >Something went wrong, check your code ! </h2>)}
        </>
      </div>
    )
  }
}

export default App;