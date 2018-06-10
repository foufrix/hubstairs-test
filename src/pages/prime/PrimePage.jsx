import React, { Component } from 'react';
import { Button } from 'reactstrap';

class PrimePage extends Component {

    state = {
        primeArray: [],
        inputValue: '',
    }

    componentDidMount() {
        this.hydrateStateWithLocalStorage();
    
        // add event listener to save state to localStorage
        // when user leaves/refreshes the page
        window.addEventListener(
          "beforeunload",
          this.saveStateToLocalStorage.bind(this)
        );
    }
    
    componentWillUnmount() {
        window.removeEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );

        // saves if component has a chance to unmount
        this.saveStateToLocalStorage();
    }
    
    hydrateStateWithLocalStorage() {
    // for all items in state
        for (let key in this.state) {
            // if the key exists in localStorage
            if (localStorage.hasOwnProperty(key)) {
            // get the key's value from localStorage
            let value = localStorage.getItem(key);

            // parse the localStorage string and setState
            try {
                value = JSON.parse(value);
                this.setState({ [key]: value });
            } catch (e) {
                // handle empty string
                this.setState({ [key]: value });
            }
            }
        }
    }
    
    saveStateToLocalStorage() {
        // for every item in React state
        for (let key in this.state) {
            // save to localStorage
            localStorage.setItem(key, JSON.stringify(this.state[key]));
        }
    }

    isPrime = (num) => {
        for ( var i = 2; i < num; i++ ) {
            if ( num % i === 0 ) {
                return false;
            }
        }
        return true;
    }

    displayPrime = (n) => {
        let arr = [2];
        for ( var i = 3; arr.length < n; i+=2 ) {
            if ( this.isPrime(i) ) {
                arr.push(i);
            }
        }
        // return arr[n-1]
        console.log(arr[n-1]);
        this.state.primeArray.push(arr[n-1]);
        console.log(this.state.primeArray);
    }

    updateInputValue = (event) => {
        this.setState({ inputValue: event.target.value });
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="mx-auto">
                        <div>
                            <input placeholder="Prime number wanted" value={this.state.inputValue} onChange={event => this.updateInputValue(event)} />
                            <Button color="primary" onClick={() => this.displayPrime(this.state.inputValue)}>Calculate</Button>{' '}    
                        </div>
                        <div className="row">
                            <div className="mx-auto">
                                <div>Historique</div>
                                <div>
                                    {this.state.primeArray.map(((value, index) => <div key={index}>Essai {index},  valeur : {value}</div>))}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        );
    }
}

export default PrimePage;