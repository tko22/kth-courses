
const getAvgRating = (ratings) => {
  const ret = Math.round(((ratings.reduce((accumulator, x) => accumulator + x, 0)) / ratings.length) * 100) / 100
  return isNaN(ret) ? "DNE" : ret
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export {
  getAvgRating,
  timeout
}


