import React from 'react'
import Modal from 'react-modal'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  reactModalOverlay: {
    background: 'rgba(0, 0, 0, 0.5)',
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  reactModalContent: {
    width: '100%',
    maxWidth: 572,
    height: 600,
    position: 'relative',
    background: '#fff',
    borderRadius: 6,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },

  pokemonImage: {
    height: 128,
    width: 128,
    marginBottom: 12
  },

  pokemonMovesContainer: {
    width: '100%',
    overflowY: 'scroll',
  }
}))

Modal.setAppElement('#root')

export function PokemonModal({ isOpen, onRequestClose, pokemonClickedData }) {
  const classes = useStyles();

  return (
    <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName={classes.reactModalOverlay}
        className={classes.reactModalContent}
    >
      <h3>{pokemonClickedData.name?.toUpperCase()}</h3>

      <img className={classes.pokemonImage} src={pokemonClickedData.pokemonImg} alt="" />

      <p>Type: <strong>{pokemonClickedData.pokemonType}</strong></p>
      
      <div className={classes.pokemonMovesContainer}>
        <ul>
          {pokemonClickedData.pokemonMoves?.map(pokemonMove => (
            <li key={pokemonMove.move.name}>{pokemonMove.move.name}</li>
          ))}
        </ul>
      </div>
      
    </Modal>
  )
}