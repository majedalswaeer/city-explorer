import React from 'react';

import WeatherBitDay from './weatherBitDay'

class WeatherBit extends React.Component {
    render() {
        return (
            <div>
                <WeatherBitDay
                datetime={this.props.datetime}
                description={this.props.description}
                low_temp={this.props.low_temp}
                max_temp={this.props.max_temp}  
                />
            </div>
        )
    }
}

export default WeatherBit;
