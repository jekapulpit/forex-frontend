import React from 'react';

const ForexItem = props => {
    return (
        <div className="vallet-item">
            <p style={{color: props.item.changeStatusColor}}>{props.item.ticker} - {props.item.bid}</p>
        </div>
    )
};

export default ForexItem;
