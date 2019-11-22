import React from 'react';

class ForexElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            forexItems: [],
            apiWorker: null
        }
    }

    componentDidMount() {
        this.setState({
            apiWorker: setInterval(this.getData, 1000)
        })
    }

    getData = () => {
        return fetch('https://financialmodelingprep.com/api/v3/forex')
            .then((response) => { return response.json()} )
            .then((data) => {
                this.setState({
                    forexItems: data.forexList
                })
            })
    };

    componentWillUnmount() {
        clearInterval(this.state.apiWorker)
        this.setState({
            apiWorker: null
        })
    }

    render() {
        let forexItems = this.state.forexItems.map((item) => {
            return <p key={item.ticker}>{item.bid}</p>
        });

        return (
            <div className="vallet-list">
                {forexItems}
            </div>
        )
    }
}

export default ForexElement;
