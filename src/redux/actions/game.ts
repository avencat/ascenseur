export enum GAME_ACTION_TYPES {
  INIT_GAME = 'INIT_GAME'
}

export const initGame = ({ nbPlayers }: { nbPlayers: number}) => ({
  data: { nbPlayers },
  type: GAME_ACTION_TYPES.INIT_GAME
})
