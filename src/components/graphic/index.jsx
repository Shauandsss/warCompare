import './graphic.css'
import { ResponsiveBar } from '@nivo/bar'
import { useEffect, useState } from 'react'

export default function HomePage ( props ) {

    const [data, setData] = useState([])

    useEffect(() => {       
        let DataOrganized = []
        for (let x = 0; x < 20; x++) {
        DataOrganized.push(props.data[x])
        }

        setData(DataOrganized.map((key) => {
            return {country: key['country'], people: key['Active Personnel']}
        }))
    }, [])


    return (
        <div style={{width: '100vw', height: '25vh'}} >
            {data.length > 0 && <ResponsiveBar
                data={data}
                keys={["people"]}
                indexBy="country"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.4}
                valueScale={{ type: "linear" }}
                colors="#3182CE"
                animate={true}
                enableLabel={false}
                axisTop={null}
                axisRight={null}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "people",
                    legendPosition: "middle",
                    legendOffset: -40
                }}
                />}
        </div>
    )
}