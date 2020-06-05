import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  state = {
    toggled: false
  }

  toggleImg = () => this.setState({ toggled: !this.state.toggled })

  render() {
    // const {abilities, height, id, moves, name, sprites, stats, types, weight} = this.props
    const {name, sprites, hp, id} = this.props

    return (
      <Card onClick={this.toggleImg}>
        <div>
          <button onClick={(e) => {
            e.stopPropagation()
            this.props.handleDelete(id)
          }}>X</button>
          <div className="image">
            <img src={!this.state.toggled ? sprites.front: sprites.back} alt={name} />
          </div>
          <div className="content">
            <div className="header">{name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {hp}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard