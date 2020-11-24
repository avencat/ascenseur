import { GAME_ACTION_TYPES } from '../actions'
import { TURN_ACTION } from '../../constants/turn_action'
import {
  Game,
  PlayedCard,
  Player,
  PlayerCard,
  Reaction,
  Round,
  RoundTurn,
  SERVER_CARD_COLOR,
  StoreAction,
} from '../../interfaces'

export interface GameState {
  color?: SERVER_CARD_COLOR
  currentPlayerTurn?: Player
  finalRoundCount?: number
  game?: Game
  games: Game[]
  hand: PlayerCard[]
  playedCards: PlayedCard[]
  player?: Player
  players: Player[]
  round?: Round
  turn?: RoundTurn
  turnWinner?: Player
  turnAction: TURN_ACTION
  winner?: Player
}

const initialState: GameState = {
  games: [],
  hand: [],
  playedCards: [],
  players: [],
  turnAction: TURN_ACTION.BET
}

const reactions: Record<GAME_ACTION_TYPES, Reaction<GameState, GAME_ACTION_TYPES>> = {
  [GAME_ACTION_TYPES.CARD_PLAYED]: (state, { data }) => ({
    ...state,
    playedCards: [...state.playedCards, data.card]
  }),
  [GAME_ACTION_TYPES.END_GAME]: (state, { data }) => ({
    ...state,
    finalRoundCount: data.roundCount,
    winner: data.winner
  }),
  [GAME_ACTION_TYPES.GAME_FULL]: (state, { data }) => ({
    ...state,
    games: state.games.filter(game => game._id !== data.gameId)
  }),
  [GAME_ACTION_TYPES.GAME_INIT]: (state, { data }) => ({
    ...state,
    games: [...state.games, data.game]
  }),
  [GAME_ACTION_TYPES.GAME_JOINED]: (state, { data }) => {
    if (data?.gameId === state.game?._id && !state.players.find(player => player._id === data.player._id)) {
      return {
        ...state,
        players: [...state.players, data.player]
      }
    }
    return { ...state }
  },
  [GAME_ACTION_TYPES.GAMES_LIST]: (state, { data }) => ({
    ...state,
    games: data.games
  }),
  [GAME_ACTION_TYPES.INIT_GAME]: (state) => ({ ...state }),
  [GAME_ACTION_TYPES.JOIN_GAME]: (state) => ({ ...state }),
  [GAME_ACTION_TYPES.LIST_GAMES]: (state) => ({ ...state }),
  [GAME_ACTION_TYPES.PLAY_CARD]: (state, { data }) => ({
    ...state,
    hand: state.hand.filter(card => card._id !== data.cardId)
  }),
  [GAME_ACTION_TYPES.SET_BET]: (state, { data }) => ({
    ...state,
    player: state.player && {
      ...state.player,
      bet: data.bet as number
    },
    players: state.players.map(player => {
      if (player._id === state.player?._id) {
        return {
          ...player,
          bet: data.bet as number
        }
      }
      return player
    })
  }),
  [GAME_ACTION_TYPES.SET_BET_FOR_PLAYER]: (state, { data }) => ({
    ...state,
    players: state.players.map(player => {
      if (player._id === data.player) {
        return {
          ...player,
          bet: data.bet as number
        }
      }
      return player
    })
  }),
  [GAME_ACTION_TYPES.SET_CARD_COLOR]: (state, { data }) => ({
    ...state,
    color: data.color
  }),
  [GAME_ACTION_TYPES.SET_HAND]: (state, { data }) => ({
    ...state,
    hand: data.cards,
    playedCards: []
  }),
  [GAME_ACTION_TYPES.SET_GAME]: (state, { data }) => ({
    ...state,
    game: data?.game
  }),
  [GAME_ACTION_TYPES.SET_GAME_ROUND]: (state, { data }) => ({
    ...state,
    player: state.player && { ...state.player, bet: undefined, turnWon: 0 },
    players: state.players.map(player => ({ ...player, bet: undefined, turnWon: 0 })),
    round: data?.round
  }),
  [GAME_ACTION_TYPES.SET_GAME_WITH_GAME_ID]: (state, { data }) => ({
    ...state,
    game: state.games.find(game => game._id === data.gameId)
  }),
  [GAME_ACTION_TYPES.SET_PLAYER]: (state, { data }) => ({
    ...state,
    player: data?.player
  }),
  [GAME_ACTION_TYPES.SET_PLAYERS]: (state, { data }) => ({
    ...state,
    players: data?.players.map((player: Player) => ({ ...player, turnWon: 0 }))
  }),
  [GAME_ACTION_TYPES.SET_SCORE]: (state, { data }) => ({
    ...state,
    players: state.players.map(player => {
      if (player._id === data.player) {
        return {
          ...player,
          score: data.score
        }
      }
      return player
    })
  }),
  [GAME_ACTION_TYPES.SET_TURN]: (state, { data }) => ({
    ...state,
    turn: data.turn
  }),
  [GAME_ACTION_TYPES.SET_TURN_WINNER]: (state, { data }) => ({
    ...state,
    color: undefined,
    playedCards: [],
    players: state.players.map(player => {
      if (player._id === data.player._id) {
        return {
          ...player,
          turnWon: (player.turnWon || 0) + 1
        }
      }

      return player
    }),
    turnWinner: data.player
  }),
  [GAME_ACTION_TYPES.SHOULD_PLAY_CARD]: (state, { data }) => ({
    ...state,
    currentPlayerTurn: data.player,
    turnAction: TURN_ACTION.PLAY_CARD
  }),
  [GAME_ACTION_TYPES.SHOULD_SET_BET]: (state, { data }) => ({
    ...state,
    currentPlayerTurn: data.player,
    turnAction: TURN_ACTION.BET
  })
}

export const gameReducer = (prevState: GameState, action: StoreAction<GAME_ACTION_TYPES>): GameState => {
  const state = prevState || initialState

  if (action && reactions[action.type]) {
    return reactions[action.type](state, action)
  }

  return { ...state }
}
