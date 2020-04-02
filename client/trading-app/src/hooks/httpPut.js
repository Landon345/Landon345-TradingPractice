import React, {useEffect, useState} from 'react';


const useHttpPut = (url, body, message) => {
    const [response, setResponse] = useState([]);

    useEffect(()=>{
        fetchTable();
    }, body)
    const fetchTable = async () => {
    const updateThis = body;
    const myResponse = await fetch(
        url, {
            method: 'Put',
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {"content-type":"application/json"},
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(updateThis)
        });
        const jsonData = await myResponse.json();
        setResponse(jsonData);
        console.log(response);
        console.log(message);
    }


    return [response];

}
export default useHttpPut;