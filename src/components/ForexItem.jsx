import React from 'react';

const ForexItem = props => {
    return (
        <div onClick={() => props.changeSelectedHandler(props.index)} className="vallet-item">
            <p style={{color: props.item.changeStatusColor}}>{props.item.ticker} - {props.item.bid}</p>
        </div>
    )
};

export default ForexItem;
