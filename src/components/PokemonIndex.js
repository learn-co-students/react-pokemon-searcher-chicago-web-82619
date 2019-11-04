import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {
  constructor() {
    super()

    this.state = {
      pokemons: [],
      searchTerm: ''
    }
  }

  addPokemon = (pokemon) => {
    const pokemons = this.state.pokemons
    this.setState({pokemons: [...pokemons, pokemon]})
  }

  componentDidMount() {
    fetch('http://localhost:3000/pokemon')
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          pokemons: data
        })
      })
  }

  handleSearchChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    }) 
  }

  filterPokemons = () => {
    return this.state.searchTerm.length ? 
      this.state.pokemons.filter(pokemon => pokemon.name.includes(this.state.searchTerm)) :
      this.state.pokemons
  }

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm addPokemon={this.addPokemon}/>
        <br />
        <Search onSearchChange={this.handleSearchChange} showNoResults={false}/>
        <br />
        <PokemonCollection pokemons={this.filterPokemons()}/>
      </div>
    )
  }
}

export default PokemonPage
