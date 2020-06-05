import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
// import _ from 'lodash'
import axios from 'axios'
import Filter from './Filter'

class PokemonPage extends React.Component {
  state = {
    pokemons: [],
    searchTerm: '',
    filterBy: 'nosort'
  }

  handleSort = (e) => {
    this.setState({ filterBy: e.target.value })
  }

  handleSearchTerm = (e) => {
    console.log(e.target.value)
    this.setState({searchTerm: e.target.value})
  }

  handleClear = () => {
    this.setState({ searchTerm: '' })
  } 

  fetchPokemons = async () => {
    const pokemonsData = await axios.get('http://localhost:3000/pokemon')
    this.setState({ pokemons: pokemonsData.data })
  }

  
  handleAddNewPoke = (pokemon) => {
    axios.post('http://localhost:3000/pokemon', pokemon)
    .then(res => {if (res.status === 201) this.fetchPokemons()})
  }

  handleDelete = (id) => {
    axios.delete(`http://localhost:3000/pokemon/${id}`)
    .then(res=> {
      if (res.status === 200) {
        this.fetchPokemons()
      }
    })
  }
  
  componentDidMount = () => {
    this.fetchPokemons()
  }

  render() {
    let displayedPokemons = [...this.state.pokemons]

    displayedPokemons.map(pokemon => {
      const pokemonStats= [...pokemon.stats] 
      const hp = pokemonStats.find(stat => stat.name === 'hp')
      pokemon.hp = hp.value
      return null
    })

    displayedPokemons = displayedPokemons.filter(pokemon => {
      if(pokemon.name.search(this.state.searchTerm) > -1) return pokemon
      return null
    })

    if (this.state.filterBy === "name") {
      displayedPokemons = displayedPokemons.sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
    } else if (this.state.filterBy === "hp") {
      displayedPokemons = displayedPokemons.sort((a,b) => a.hp - b.hp)
    }

    console.log(this.state.filterBy)
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm handleAddNewPoke={this.handleAddNewPoke}/>
        <br />
        <Filter handleSort={this.handleSort}/>
        <div className="ui action input">
          <Search onSearchChange={(e) => this.handleSearchTerm(e)} showNoResults={false} value={this.state.searchTerm}/>
          <button className="ui blue basic button" onClick={this.handleClear}>Clear</button>
        </div>
        <br/>
        <br />
        <PokemonCollection pokemons={displayedPokemons} searchTerm={this.state.searchTerm} handleDelete={this.handleDelete}/>
      </div>
    )
  }
}

export default PokemonPage
