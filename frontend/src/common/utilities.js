
const getAvgRating = (ratings) => {
  const ret = Math.round(((ratings.reduce((accumulator, x) => accumulator + x, 0)) / ratings.length) * 100) / 100
  return isNaN(ret) ? "DNE" : ret
}


export {
  getAvgRating
}