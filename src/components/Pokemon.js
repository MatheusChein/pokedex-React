import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { useEffect } from 'react';


const useStyles = makeStyles(theme => ({
  pokemonContainer: {
    padding: 24,
    width: 400,
    height: 144,
    margin: 12,
    border: 'solid',
    borderWidth: 0.8,
    borderColor: '#dddddd',
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },

  pokemonImage: {
    height: 128,
    width: 128,
    marginBottom: 12
  }
}))

export function Pokemon({ name = '', url, handleOpenModal }) {
  const classes = useStyles();

  const [pokemonImg, setPokemonImg] = useState('')
  const [pokemonMoves, setPokemonMoves] = useState([])
  const [pokemonType, setPokemonType] = useState('')

  useEffect(() => {
    fetch(url).then(response => response.json())
    .then(data => {
      setPokemonImg(data.sprites.other.dream_world.front_default)
      setPokemonMoves(data.moves)
      setPokemonType(data.types[0].type.name)
    })
  }, [url]);

  return (
    <div className={classes.pokemonContainer} onClick={() => handleOpenModal({name, pokemonImg, pokemonMoves, pokemonType})}>
      <img className={classes.pokemonImage} src={pokemonImg} alt={name} />
      <span>{name.toUpperCase()}</span>
    </div>
  )
}