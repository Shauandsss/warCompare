import './graphic.css'
import { ResponsiveBar } from '@nivo/bar'
import TableReact from '../table'

export default function HomePage ( props ) {

    let DataOrganized = []
    for (let x = 0; x < 10; x++) {
      DataOrganized.push(props.data[x])
    }

    const data = DataOrganized.map((key) => {
              return {country: key['country'], Active_Personnel: key['Active Personnel']}
          })
    console.log(data)


    return (
        <div >
        {data.length > 0 &&
        <div >
                <ResponsiveBar
                    data={data}
                    keys={["Active_Personnel"]}
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
                        legend: "Active_Personnel",
                        legendPosition: "middle",
                        legendOffset: -40
                    }}
                />
            </div>}


        </div>
    )
}