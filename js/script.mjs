import R from 'ramda';

const alive = [
	[1, 1],
	[1, 2],
	[2, 2],
	[2, 1],
	[21, 19],
	[19, 19],
	[20, 19],
	[20, 20],
	[20, 21],
	[21, 21],
	[22, 21]
]

const deltas = [
	[0, 1],
	[1, 1],
	[1, 0],
	[1, -1],
	[0, -1],
	[-1, -1],
	[-1, 0],
	[-1, 1]
]

const move = (point, delta) => [
	point[0] + delta[0],
	point[1] + delta[1]
]

const neighborhood = (point) =>
	R.uniq(R.flatten(R.map(R.curry(move)(point), deltas)))

const isAlive = (alive, point) => R.includes(alive, point)

const becomesAlive = (alive, point) => {
	const aliveNeighbors = R.length(R.filter(R.curry(isAlive)(alive), neighborhood(point)))

	return aliveNeighbors === 3 || aliveNeighbors === 2 && isAlive(alive, point)
}

const inclusiveNeighborhood = (point) => R.append(point, neighborhood(point))

const gameStep = (alive) =>
	R.filter(
		R.curry(isAlive)(alive),
		R.uniq(R.flatten(R.map(inclusiveNeighborhood, alive)))
	)

const displayRange = R.range(-20, 20)

const printMap = (alive) => {
	R.map(
		(rowIdx) => console.log(R.join(' ', R.map((colIdx) => isAlive(alive, [colIdx, rowIdx]) ? '#' : '.', displayRange))),
		displayRange
	)
}

R.reduce(
	(alive, roundNumber) => {
		console.log('-=-=-=-=-=-=-=-=- STEP', roundNumber, '-=-=-=-=-=-=-=-=-')
		const state = gameStep(alive)
		printMap(state)
		return state
	},
	alive,
	R.range(1, 5)
)
