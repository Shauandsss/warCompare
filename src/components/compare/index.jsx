import './compare.css'
import React, { useEffect, useState } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function Compare ( props ) {

    const [dataCompare, setDataCompare] = useState([])

    useEffect(() => {       
        let DataOrganized = []
        for (let x = 0; x < 1; x++) {
            DataOrganized.push(props.data[x])
        }
        setDataCompare(DataOrganized)


        let columnsJson = []; let columnsCompare = [];
        let i = 0;
        columnsCompare.push(null);
        columnsCompare.push(null);
        columnsCompare.push(null);
        for (var key in props.data[0]) {
            if ((i > 0) /*&& (i < 5)*/) {
                columnsJson.push(key);
                if (i > 1)
                    columnsCompare.push(key);
            }
            i = i + 1;
        }
        setColumnsFinish(columnsJson);
        setColumnsCompare(columnsCompare);
    }, [])

    const [columnsFinish, setColumnsFinish] = useState([])
    const [columnsCompare, setColumnsCompare] = useState([])

    function Greater (items, field) {
        if(field != null){
            let fieldCompare = 0
            let keyCompared = ''
            for (let i=0; i < items.length; i++){
                if(items[i][field] >= fieldCompare){
                    fieldCompare = items[i][field]
                    keyCompared = items[i]['country_code'] 
                }
            }
            return keyCompared
        }
    }

    function changeTriggerAdd () {
        SetTriggerAddCountry(triggerAddCountry ? false : true)
        let sel = document.getElementById("Compare-Select");
        let text = sel.options[sel.selectedIndex].value
        let dataTemp = dataCompare
        dataTemp.push(props.data.find(t=>t.country === text))
        setDataCompare(dataTemp)
    }

    const [triggerAddCountry, SetTriggerAddCountry] = useState(false)
    const [triggerDeleteCountry, SetTriggerDeleteCountry] = useState(false)

    useEffect(() => {

    }, [triggerAddCountry,triggerDeleteCountry])

    function changeTriggerDelete(element) {
        SetTriggerDeleteCountry(triggerAddCountry ? false : true)
        let dataTemp = dataCompare
        dataTemp.splice(dataTemp.indexOf(props.data.find(t=>t.country === element)), 1)
        console.log(dataCompare)
        setDataCompare(dataTemp)
    }

    return (
        <div className='Compare'>
            <div id='' className='Compare-AddNewCountry'>
                <select id='Compare-Select' className='Compare-Select'>
                    
                    {props.data.map(item => {
                        return <option key={item['country']} value={item['country']}>{item['country']}</option>
                    })}
                </select>
                <AddBoxIcon onClick={changeTriggerAdd}/>
            </div>
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
                                    <DeleteOutlineIcon onClick={() => changeTriggerDelete(key['country'])}/>
                                </div> 
                                <div> 
                                    <img className='Compare-SideBySide-flag' src={'https://countryflagsapi.com/svg/' + key['country_code']}/> 
                                </div> 
                                {columnsFinish.length > 0 && columnsFinish.map(item => {
                                return <div> 
                                    {key[item]}
                                </div>  
                                })}
                            </div>     
                        
                )})}
            </div>
        </div>
    )
}