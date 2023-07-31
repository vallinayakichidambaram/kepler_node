const { parse } = require('csv-parse');
const  fs  = require('fs');

const results = [];

function isHabitable(planet) {
    //Column name in quotes
    return planet['koi_disposition'] == 'CONFIRMED' && planet ['koi_insol'] > 0.36
        && planet['koi_insol'] < 1.11 && planet['koi_prad'] < 1.6;
}
//ReadStream reads the data in raw form - bits and bytes
fs.createReadStream ('kepler_data.csv')
//Take in the byte stream and parse it into JavaScript Object
    .pipe(parse({
        comment: "#",
        columns: true
    }))
    .on ('data', (data) => {
        if(isHabitable(data)){
            results.push(data)
        }
    })
    .on('error', (err) => {
        console.log(err)
    })
    .on('end', () => {
        results.map((planet) => {
            console.log(`${planet['kepid']} - ${planet['kepler_name']}`)
        })
       console.log(`${results.length} habitable planets found!`)
    });