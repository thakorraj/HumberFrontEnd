import React from 'react';
import axios from 'axios';

class Outlook extends React.Component{
    state = {
        product: ''
    };

    componentDidMount() {
        console.log("Idhar");
        axios.get('http://localhost:4000/')
            .then(response => {
                this.setState({
                    product: response.data
                    
                });
                console.log(response.data)

            });

    }

    render() {

        if (this.state.product) {
            window.location.href = this.state.product;
        }


        return(
            <div>

            </div>
        )
    }
}

export default Outlook;