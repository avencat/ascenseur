import type {
  Game, PlayedCard,
  Player,
  PlayerCard,
  Round,
  RoundTurn,
} from '../../interfaces'

export enum GAME_ACTION_TYPES {
  CARD_PLAYED = 'CARD_PLAYED',
  INIT_GAME = 'INIT_GAME',
  JOIN_GAME = 'JOIN_GAME',
  LIST_GAMES = 'LIST_GAMES',
  GAME_FULL = 'GAME_FULL',
  GAME_INIT = 'GAME_INIT',
  GAME_JOINED = 'GAME_JOINED',
  GAMES_LIST = 'GAMES_LIST',
  PLAY_CARD = 'PLAY_CARD',
  SET_BET = 'SET_BET',
  SET_BET_FOR_PLAYER = 'SET_BET_FOR_PLAYER',
  SET_GAME = 'SET_GAME',
  SET_GAME_ROUND = 'SET_GAME_ROUND',
  SET_GAME_WITH_GAME_ID = 'SET_GAME_WITH_GAME_ID',
  SET_HAND = 'SET_HAND',
  SET_PLAYER = 'SET_PLAYER',
  SET_PLAYERS = 'SET_PLAYERS',
  SET_SCORE = 'SET_SCORE',
  SET_TURN = 'SET_TURN',
  SET_TURN_WINNER = 'SET_TURN_WINNER',
  SHOULD_PLAY_CARD = 'SHOULD_PLAY_CARD',
  SHOULD_SET_BET = 'SHOULD_SET_BET'
}

export const cardPlayed = (card: PlayedCard) => ({
  data: { card },
  type: GAME_ACTION_TYPES.CARD_PLAYED
})

export const gameFull = (gameId: string) => ({
  data: { gameId },
  type: GAME_ACTION_TYPES.GAME_FULL
})

export const gameInit = (game: Game) => ({
  data: { game },
  type: GAME_ACTION_TYPES.GAME_INIT
})

export const gameJoined = ({
  gameId,
  player
}: {
  gameId: string
  player: Player
}) => ({
  data: { gameId, player },
  type: GAME_ACTION_TYPES.GAME_JOINED
})

export const gamesList = (games: Game[]) => ({
  data: { games },
  type: GAME_ACTION_TYPES.GAMES_LIST
})

export const initGame = ({
  name,
  nbPlayers
}: {
  name: string
  nbPlayers: number
}) => ({
  data: { name, nbPlayers },
  type: GAME_ACTION_TYPES.INIT_GAME
})

export const joinGame = (game: string, name: string) => ({
  data: { game, name },
  type: GAME_ACTION_TYPES.JOIN_GAME
})

export const listGames = () => ({
  type: GAME_ACTION_TYPES.LIST_GAMES
})

export const playCard = (cardId: string) => ({
  data: { cardId },
  type: GAME_ACTION_TYPES.PLAY_CARD
})

export const setBet = (bet: number) => ({
  data: { bet },
  type: GAME_ACTION_TYPES.SET_BET
})

export const setBetForPlayer = ({
  bet,
  player
}: {
  bet: number
  player: Player
}) => ({
  data: { bet, player: player?._id },
  type: GAME_ACTION_TYPES.SET_BET_FOR_PLAYER
})

export const setHand = (cards: PlayerCard[]) => ({
  data: { cards },
  type: GAME_ACTION_TYPES.SET_HAND
})

export const setGame = (game: Game) => ({
  data: { game },
  type: GAME_ACTION_TYPES.SET_GAME
})

export const setGameRound = (round: Round) => ({
  data: { round },
  type: GAME_ACTION_TYPES.SET_GAME_ROUND
})

export const setGameWithGameId = (gameId: string) => ({
  data: { gameId },
  type: GAME_ACTION_TYPES.SET_GAME_WITH_GAME_ID
})

export const setPlayer = (player: Player) => ({
  data: { player },
  type: GAME_ACTION_TYPES.SET_PLAYER
})

export const setPlayers = (players: Player[]) => ({
  data: { players },
  type: GAME_ACTION_TYPES.SET_PLAYERS
})

export const setScore = ({
  player,
  score
}: {
  player: string
  score: number
}) => ({
  data: { player, score },
  type: GAME_ACTION_TYPES.SET_SCORE
})

export const setTurn = (turn: RoundTurn) => ({
  data: { turn },
  type: GAME_ACTION_TYPES.SET_TURN
})

export const setTurnWinner = (player: Player) => ({
  data: { player },
  type: GAME_ACTION_TYPES.SET_TURN_WINNER
})

export const shouldPlayCard = ({
  player
}: { player: Player }) => ({
  data: { player },
  type: GAME_ACTION_TYPES.SHOULD_PLAY_CARD
})

export const shouldSetBet = ({
  player
}: { player: Player }) => ({
  data: { player },
  type: GAME_ACTION_TYPES.SHOULD_SET_BET
})
