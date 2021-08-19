import React from 'react'
import {Card, ListGroup,ListGroupItem } from 'react-bootstrap/'

class SoloMovie extends React.Component {
    render() {
        return (
            <div>
                <h1>Movie⏬</h1>
                <Card style={{border:'1px black solid',textAlign:'center'}}>
                    <Card.Img style={{width:'40%',height:'70ch',marginLeft:'-62ch'}}  src={this.props.poster_path} />
                    <Card.Body>
                        <Card.Title style={{fontWeight:'bolder'}} >Title: {this.props.original_title}</Card.Title>
                        <Card.Title>Over View📄: {this.props.overview}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>Avg Votes:  {this.props.vote_average}➕</ListGroupItem>
                        <ListGroupItem>Popularity: {this.props.popularity}📈</ListGroupItem>
                        <ListGroupItem>Release Date: {this.props.release_date}🗓️</ListGroupItem>
                    </ListGroup>
                </Card>
            </div>
        )
    }
}

export default SoloMovie
