export enum GAME_ACTION_TYPES {
  INIT_GAME = 'INIT_GAME'
}

export const initGame = ({ nbPlayer }: { nbPlayer: number}) => ({
  data: { nbPlayer },
  type: GAME_ACTION_TYPES.INIT_GAME
})
