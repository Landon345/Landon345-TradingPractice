import React, {useEffect, useState} from 'react';


const useHttpPost = (url, dependencies, message) => {
    const [fetchedData, setFetchedData] = useState([]);

    
    const response = await fetch(
        url, {
            method: 'POST',
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {"content-type":"application/json"},
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(newUser)
        });


    return [response];

}
export default useHttpPost;