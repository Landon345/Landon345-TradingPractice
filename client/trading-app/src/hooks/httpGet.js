import React, {useEffect, useState} from 'react';


const useHttpGet = (url, dependencies, message) => {
    const [fetchedData, setFetchedData] = useState([]);

    useEffect(()=>{
        fetchTable();
    }, dependencies)
    const fetchTable = async () => {
        const data = await fetch(
            url, {
            method: 'get'
            }
        );
        const jsonData = await data.json();
        setFetchedData(jsonData);
        console.log(fetchedData);
        console.log(message);
    }


    return [fetchedData];

}
export default useHttpGet;