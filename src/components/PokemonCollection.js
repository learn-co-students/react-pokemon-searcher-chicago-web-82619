import React from 'react'
import PokemonCard from './PokemonCard'
import { Card } from 'semantic-ui-react'

class PokemonCollection extends React.Component {

  render() {
    return (
      <Card.Group itemsPerRow={6}>
        {this.props.pokemons.map((pokemon, id) => {
          return <PokemonCard key={id} {...pokemon} handleDelete={this.props.handleDelete}/>
        })}
      </Card.Group>
    )
  }
}

export default PokemonCollection
