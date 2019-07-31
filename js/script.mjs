import R from 'ramda';

const x = {
    coinsNumber: 0,
    amountRemaining: 33
}

const nominals = [25, 10, 5, 1]

const answer = R.reduce(
    (acc, nominal) => {
        const nominalCoins = Math.floor(acc.amountRemaining / nominal)
        return nominalCoins > 0
        ? {
            coinsNumber: acc.coinsNumber + nominalCoins,
            amountRemaining: acc.amountRemaining - nominalCoins * nominal
        }
        : acc
    },
    x,
    nominals
)
