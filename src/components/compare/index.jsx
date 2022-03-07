import './compare.css'
import { useEffect, useState } from 'react'

export default function Compare ( props ) {

    const [dataCompare, setDataCompare] = useState([])

    useEffect(() => {       
        let DataOrganized = []
        for (let x = 0; x < 2; x++) {
            DataOrganized.push(props.data[x])
        }

        setDataCompare(DataOrganized)
    }, [])

    const [columnsFinish, setColumnsFinish] = useState([])

    useEffect(() => {
        const createColumns = () => {
            let columnsJson=[];
            let i = 0 
            for (var key in props.data[0]) {
                if((i > 0) /*&& (i < 5)*/){
                    columnsJson.push(key)
                } 
                i = i + 1
            }
            setColumnsFinish(columnsJson)

        }
        createColumns();
        console.log(columnsFinish)
    }, [])

    return (
        <div className='Compare'>

            <div className='Compare-SideBySide'>
                <div>
                    <div>
                        country
                    </div>
                {columnsFinish.map(item => {
                    return <div> 
                        {item}
                    </div>  
                                })  
                }
                </div>

                {dataCompare.map(key => {
                    return (<div className='Compare-SideBySide-Item'> 
                                <div> 
                                    {key['country']}
                                </div> 
                                <img className='Compare-SideBySide-flag' src={'https://countryflagsapi.com/svg/' + key['country_code']}/> 
                                {columnsFinish.map(item => {
                                return <div> 
                                    {key[item]}
                                </div>  
                                })
                                }
                            </div>     
                          
                )})}
            </div>
        </div>
    )
}