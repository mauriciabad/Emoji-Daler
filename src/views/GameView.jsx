import React, { useContext } from 'react';
import HeaderFooter from '../components/HeaderFooter';
import useStyles from './GameViewStyles';
import { GameContext } from '../contexts/GameContext';
import { GameDispatchContext } from '../contexts/GameContext';
import { Paper, Button, Typography, IconButton } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';


function getGameURL({seed, orderedCards}){
  const params = new URLSearchParams();
  params.append('seed', seed);
  params.append('cards', JSON.stringify(orderedCards));
  return `${process.env.REACT_APP_DOMAIN}/game/join?${params.toString()}`;
}

export default function GameView() {
  const classes = useStyles();
  const game = useContext(GameContext);
  const dispatchGame = useContext(GameDispatchContext);

  function shareJoinURL() {
    if(navigator.share){
      navigator.share({title: 'Game invitation', url: getGameURL(game)})
    }else {
      if(navigator.clipboard) {
        navigator.clipboard.writeText(getGameURL(game))
      }
    }
  }

  function handleNextRoundClick() {
    dispatchGame({type: 'nextRound'})
  }
  function handlePrevRoundClick() {
    dispatchGame({type: 'prevRound'})
  }

  return (
    <HeaderFooter className={classes.root}>
      <div className={classes.roundButtons}>
        <IconButton onClick={handlePrevRoundClick}><NavigateBeforeIcon /></IconButton>
        <Typography variant="h3" className={classes.roundButtonsTitle}>Round {game.round}</Typography>
        <IconButton onClick={handleNextRoundClick}><NavigateNextIcon /></IconButton>
      </div>

      <Paper>
        <ul>
          <li><b>Player: </b> {game.player}</li>
          <li><b>Cards: </b> {game.orderedCards.join(' ')}</li>
        </ul>
      </Paper>

      <Paper className={classes.mainCard}>{game.card}</Paper>
      
      <div className={classes.shareButton}>
        <Button variant="contained" color="primary" onClick={shareJoinURL}>Share</Button>
      </div>
    </HeaderFooter>
  );
}
