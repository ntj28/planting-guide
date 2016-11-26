/*import { Meteor } from 'meteor/meteor';
import fs from 'fs';
import path from 'path';
import csvParse from 'csv-parse'; */

Meteor.startup(() => {
	// code to run on server at startup

	/*let parser = csvParse({delimiter: ';'}, (err, data) =>{

		let dateArray =[]
		let rainfallArray =[]
		let dataArray =[]
		let index = 0

		
		for (let i=1; i<data.length; i++){
			//console.log(data[i+1]);
			//dataArray = data[1][0].split(',')
			//console.log( data[i][0].split(','))
			dataArray = data[i][0].split(',')
			let date  = new Date(dataArray[0])
			let dateFormatted =date.toISOString().slice(0,10).replace(/-/g,"-"); 
			dateArray.push(dateFormatted)
			rainfallArray.push(dataArray[19])

			//console.log(dataArray[0])
			 
			//console.log(dataArray[1])
			//index ++
			//console.log(i);
			//console.log(data[1][0].split(','));


		}
		console.log(dateArray)
		console.log(rainfallArray)
		




        //console.log(data[1][0]);
        //console.log(data[1]);
        //console.log(data[2]);
        //console.log(data);
        //console.log(data[1][0].split(','));
		
	});

	let csvFile = path.resolve(process.cwd(), '../../../../data/uploads/save.csv');

	fs
		.createReadStream(csvFile)
		.pipe(parser); */
});
 


