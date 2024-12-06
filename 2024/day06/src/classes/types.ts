export type Direction = 'left' | 'right' | 'up' | 'down'
export type Coordinate = {x: number, y: number}
export type HitTestResult = 'obstable' | 'tile' | 'outofbounds'
export type TileType = 'floor' | 'obstacle' | 'guard'
export type WalkResult = 'rotate' | 'move' | 'finish'