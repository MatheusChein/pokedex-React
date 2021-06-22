import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';

import { Pokemon } from './Pokemon';
import { PokemonModal } from './PokemonModal'

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  fullWidth: {
    width: '100%',
  },
  table: {
    display: 'flex',
    flexWrap: 'wrap',
  }
}));

function MainContent() {
  const classes = useStyles();

  const [pokemons, setPokemons] = useState([]);
  
  useEffect(() => {
    const pokemonsURL = 'https://pokeapi.co/api/v2/pokemon?limit=151';

    fetch(pokemonsURL).then(response => response.json())
    .then(data => {
      setPokemons(data.results)
    })
  }, [])

  const [isPokemonModalOpen, setIsPokemonModalOpen] = useState(false);
  const [pokemonClickedData, setPokemonClickedData] = useState('')

  function handleOpenModal(pokemonData) {
    setIsPokemonModalOpen(true)
    setPokemonClickedData(pokemonData)
  }

  function handleCloseModal() {
    setIsPokemonModalOpen(false)
  }

  return (
    <main className={classes.fullWidth}>
      <PokemonModal
        isOpen={isPokemonModalOpen}
        onRequestClose={handleCloseModal}
        pokemonClickedData={pokemonClickedData}
      />
      <div className={classes.toolbar} />
      <div className={classes.title}>
        <Typography variant='h6'>Pokedex</Typography>
      </div>
      <div className={classes.content}>
        <Typography paragraph>
        <Grid className={classes.table}>
          {pokemons.map(pokemon => (
            <Pokemon 
              key={pokemon.name}
              name={pokemon.name} 
              url={pokemon.url} 
              handleOpenModal={handleOpenModal} 
            />
          ))}
        </Grid>
        </Typography>
      </div>
    </main>
  );
}

export default MainContent;