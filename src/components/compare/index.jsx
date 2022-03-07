import './compare.css'
import { useEffect, useState } from 'react'

export default function Compare ( props ) {

    const [dataCompare, setDataCompare] = useState([])

    useEffect(() => {       
        let DataOrganized = []
        for (let x = 0; x < 5; x++) {
            DataOrganized.push(props.data[x])
        }

        setDataCompare(DataOrganized)
    }, [])

    const [columnsFinish, setColumnsFinish] = useState([])
    const [columnsCompare, setColumnsCompare] = useState([])

    function Greater (items, field) {
        if(field != null){
            let fieldCompare = 0
            let keyCompared = ''
            for (let i=0; i < items.length; i++){
                if(items[i]['Active Personnel'] > fieldCompare){
                    fieldCompare = items[i][field]
                    keyCompared = items[i]['country_code'] 
                }
            }
            return keyCompared
        }
    }

    useEffect(() => {
        const createColumns = () => {
            let columnsJson=[]; let columnsCompare=[]
            let i = 0 
            columnsCompare.push(null)
            columnsCompare.push(null)
            columnsCompare.push(null)
            for (var key in props.data[0]) {
                if((i > 0) /*&& (i < 5)*/){
                    columnsJson.push(key)
                    if(i > 1)
                        columnsCompare.push(key)
                } 
                i = i + 1
            }
            setColumnsFinish(columnsJson)
            setColumnsCompare(columnsCompare)
        }
        createColumns();
    }, [])

    return (
        <div className='Compare'>
            <div className='Compare-SideBySide'>
                <div className='Compare-SideBySide-Item Compare-Header'>
                <div>
                    country
                </div>
                <div>
                    flag
                </div>
                {columnsFinish.map(item => {
                    return <div> 
                        {item}
                    </div>  
                                })  
                }
                </div>

                <div className='Compare-SideBySide-Item'>
                    {columnsCompare.map(item => {
                        return <div>
                            {Greater(dataCompare, item)}
                            </div>
                    })}
                </div>

                {dataCompare.map(key => {
                return (<div className='Compare-SideBySide-Item'> 
                            <div className='Compare-SideBySide-Item-PrimaryKey'> 
                                {key['country']}
                            </div> 
                            <div> 
                                <img className='Compare-SideBySide-flag' src={'https://countryflagsapi.com/svg/' + key['country_code']}/> 
                            </div> 
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