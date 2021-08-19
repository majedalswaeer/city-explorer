import React from 'react'
import SoloMovie from './soloMovie'

export class Movies extends React.Component {
    render() {
        return (
            <div>
                <SoloMovie poster_path={this.props.poster_path} original_title={this.props.original_title} overview={this.props.overview} vote_average={this.props.vote_average} popularity={this.props.popularity} release_date={this.props.release_date} />
            </div>
        )
    }
}

export default Movies;
