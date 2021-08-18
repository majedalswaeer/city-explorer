import React from 'react';
import Card from 'react-bootstrap/Card'

export class WeatherBit extends React.Component {
    render() {
        return (
            <div>
                <Card style={{  paddingLeft: '50ch', display: 'flex', marginInline: '10ch', color: 'red', justifyContent: 'space-evenly'}}>
                    <br/> <br/><br/><br/><br/>
                    <Card.Body style={{  border:'red',paddingRight:'55ch' }}>
                    <hr></hr>
                        <Card.Title style={{textAlign:'center',color:'blue',marginInline: '10ch'}}>Date: {this.props.datetime}</Card.Title>
                        <Card.Title  style={{textAlign:'center'}}>Description: {this.props.description}</Card.Title>
                        <Card.Title  style={{textAlign:'center'}}>Min Temp: {this.props.low_temp}</Card.Title>
                        <Card.Title  style={{textAlign:'center'}}> Max Temp: {this.props.max_temp}</Card.Title>
                    </Card.Body>
                </Card>

            </div>
        )
    }
}

export default WeatherBit;
