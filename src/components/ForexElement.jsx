import React from 'react';
import ForexItem from './ForexItem'
import ForexGraph from './ForexGraph'
import '../stylesheets/graphs.scss'

class ForexElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            forexItems: [],
            selectedItem: {
                statistics: []
            },
            apiWorker: null
        }
    }

    componentDidMount() {
        this.getData(true)
            .then(() => {
                this.setState({
                    apiWorker: setInterval(this.getData, 1000),
                    selectedItem: this.state.forexItems[0]
                })
            });
    }

    forexItemPresenter = (item, firstCall = false) => {
        return {
            ...item,
            changeStatusColor: (firstCall ? 'white' : this.changeStatus(item)),
            statistics: (firstCall ? [] : this.previousVallet(item.ticker).statistics.concat({ x: Date.now(), y: item.bid }))
        }
    };

    changeStatus = (item) => {
        let currentBid = parseFloat(item.bid);
        let previousBid = this.previousBid(item.ticker);
        if (currentBid > previousBid)
            return 'green';
        else if (currentBid < previousBid)
            return 'red';
        else
            return 'black';
    };

    previousVallet = (ticker) => {
        return this.state.forexItems.find((stateItem) => {return ticker === stateItem.ticker})
    };

    previousBid = (ticker) => {
        return this.previousVallet(ticker).bid;
    };

    getData = (firstCall = false) => {
        return fetch('https://financialmodelingprep.com/api/v3/forex')
            .then((response) => { return response.json()} )
            .then((data) => {
                this.setState({
                    forexItems: data.forexList.map((forexItem) => {
                        return this.forexItemPresenter(forexItem, firstCall)
                    }),
                });
            })
    };

    componentWillUnmount() {
        clearInterval(this.state.apiWorker);
        this.setState({
            apiWorker: null
        })
    }

    render() {
        let forexItems = this.state.forexItems.map((item) => {
            return <ForexItem item={item} key={item.ticker} />
        });

        return (
            <React.Fragment>
                <div className="vallet-list">
                    {forexItems}
                </div>
                <ForexGraph stats={this.state.selectedItem.statistics} />
            </React.Fragment>
        )
    }
}

export default ForexElement;
