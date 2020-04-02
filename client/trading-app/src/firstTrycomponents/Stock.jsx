import React from 'react';

function Stock(props){
    const {name, price_bought_at, price_now} = props.userStock;
    return(
        <React.Fragment>

            <div>{name}</div>
            <div>{price_bought_at}</div>
            <div>{price_now}</div>
            <div>{}</div>
            <div>{}</div>
        </React.Fragment>
    );
}

export default Stock;