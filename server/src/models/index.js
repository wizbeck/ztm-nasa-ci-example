const { parse } = require('csv-parse');
const fs = require('fs');

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}
/**
 * we read the file as a stream
 * then pipe the output to the parse function which is also a (input/writeable) stream
 */
fs.createReadStream('kepler_data.csv')
  .pipe(parse({ // pipe output stream to input stream
    comment: "#",
    columns: true
  }))
  .on('data', (data) => {
    if(isHabitablePlanet(data)) {
      habitablePlanets.push(data);
    }
  })
  .on('error', (err) => {
    console.log(err);
  })
  .on('end', () => {
    console.log(habitablePlanets.map(planet => {
      return planet['kepler_name']
    }))
    console.log(`${habitablePlanets.length} habitable planets found!`);
  })