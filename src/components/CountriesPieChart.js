import ReactECharts from "echarts-for-react";
import {useEffect, useState} from "react";

function CountriesPieChart({personslist}) {

    const [persons, setPersons] = useState([]);

    useEffect(() => {
        setPersons(personslist);
    }, [personslist]);

    function convertToChartData(persons) {
        // group by country
        let counts = {};
        for (let i = 0; i < persons.length; i++) {
            let countryName = persons[i].country != null ? persons[i].country.name : null;
            counts[countryName] = counts[countryName] ? counts[countryName] + 1 : 1;
        }

        // create source data
        let sourceData = [];
        sourceData.push(['countries', 'X']);
        Object.keys(counts).forEach((country) => {
            sourceData.push([country, counts[country]]);
        });
        return sourceData;
    }

    function getSourceData() {
        return convertToChartData(persons);
    }

    function getOptions() {
        return {
            dataset: {
                source: getSourceData(),
            },
            xAxis: {type: 'category'},
            yAxis: {gridIndex: 0},
            series: [
                {
                    type: 'pie',
                    id: 'pie',
                    radius: '80%',
                    center: ['45%', '45%'],
                    emphasis: {
                        focus: 'self'
                    },
                    label: {
                        formatter: '{b}: {@X} people'
                    },
                    encode: {
                        itemName: 'countries',
                        value: 'X',
                        tooltip: 'X'
                    }
                }
            ]
        };
    }

    return (
        <ReactECharts
            option={getOptions()}
            notMerge={true}
            lazyUpdate={true}
            theme={"theme_name"}
            onChartReady={() => {}}
            onEvents={{}}
            style={{height: '800px', width: '45%', float: 'left', border: '0', marginTop: '20px'}}
        />
    );
}

export default CountriesPieChart;