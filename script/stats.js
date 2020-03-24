//Gets where to print content
const stats = document.querySelector('#stats')


const start = async () => {

    // Get json file
    const jsonres = await fetch(jsonfil);
    const json = await jsonres.json();

    // Makes data array
    let victims = json.features
    let weaponSum = victims.map(wep => wep.properties.weapon);

    //https://stackoverflow.com/questions/15052702/count-unique-elements-in-array-without-sorting
    //Counts apperances of array and sorts
    const uniqe = {};
    for (let i = 0; i < weaponSum.length; i++) {
        uniqe[weaponSum[i]] = 1 + (uniqe[weaponSum[i]] || 0);
    }

    const data = [];

    for(prop in uniqe) {
        data.push({
            name: prop,
            y: uniqe[prop],
        })
    }

    // Highcharts
    Highcharts.chart('stats', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Murder methods used by ' + json.name
        },
        tooltip: {
            pointFormat: '{series.name}: <br>{point.percentage:.1f} %<br>total: {point.y}'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>:<br>{point.percentage:.1f} %<br>total: {point.y}'
                }
            }
        },
        series: [{
            name: 'Uses',
            colorByPoint: true,
            data: data
        }]
    });
}

