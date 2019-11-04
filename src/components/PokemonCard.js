import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  
  state = {
    image: this.props.pokemon.sprites.front
  }

  pokemonHp = () => {
    return this.props.pokemon.stats.find(stat => stat.name === 'hp').value
  }
  
  handleClick = () => {
    const frontImage = this.props.pokemon.sprites.front;
    const backImage = this.props.pokemon.sprites.back;
    const newImage = this.state.image === frontImage ? backImage : frontImage;
    this.setState({image: newImage})
  }

  render() {
    return (
      <Card onClick={this.handleClick}>
        <div>
          <div className="image">
            <img src={this.state.image} alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">{this.props.pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.pokemonHp()} hp
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
