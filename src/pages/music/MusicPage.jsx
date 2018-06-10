import React, { Component } from 'react';

import AudioPlayer from 'react-cl-audio-player';
import { Button } from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


class MusicPage extends Component {

    state = {
        musicList : [{
            id: 1,
            url: 'http://freemusicdownloads.world/wp-content/uploads/2017/05/The-Chainsmokers-Coldplay-Something-Just-Like-This-Lyric.mp3',
            name: "Coldplay - Something Just Like This",
            artist: {
                name: 'Something Just Like This',
                song: 'Coldplay'
              }
        }, 
        {
            id: 2,
            url: 'https://s3-eu-west-1.amazonaws.com/react-soundplayer-examples/ksmtk-reborn-edit.mp3',
            name: 'KSMTK - Reborn',
            artist: {
              name: 'KSMTK',
              song: 'Reborn'
            }
          },
          {
            id: 3,
            url: 'https://www.mfiles.co.uk/mp3-downloads/chopin-nocturne-op9-no2.mp3',
            name: 'Chopin - Nocturne',
            artist: {
              name: 'Chopin',
              song: 'Nocturne'
            }
          }],
        selectedSong: {},
        playlist: [],
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

    componentWillReceiveProps = () => {
    }

    audioPLayer = (props) => {
        if (this.state.playlist.length > 0) {
            return(
                <AudioPlayer
                            songs={props}
                            autoplay
                        />
            )
        }
    }
    addButton = () => {
        return(
            <Button color="success" onClick={() => this.addMusic()}>+</Button>
        )
    }
    removeButton = () => {
        return(
            <Button color="danger" onClick={() => this.removeMusic()}>-</Button>
        )
    }
    onRowMouseOver = (row) => {
        console.log(row);
        this.setState({ selectedSong: row });
    }
    addMusic = () => {
        let newPlaylist = this.state.playlist.slice();
        // Gicve random ID
        let selectedSong = {...this.state.selectedSong};
        selectedSong.id = Math.random().toString(36).substr(2, 9);
        newPlaylist.push(selectedSong);
        this.setState({ playlist: newPlaylist })
    }
    removeMusic = () => {
        let newPlaylist = this.state.playlist.slice();
        let i = 0;
        for (i = 0; i < newPlaylist.length; i++) { 
            if (newPlaylist[i].id === this.state.selectedSong.id) {
                newPlaylist.splice(i,1);
            }
        }
        this.setState({ playlist: newPlaylist});
    }
    render() {
        const options = {
            onRowMouseOver: this.onRowMouseOver,
        };
        return (
            <div>
                <h2>liste musique : </h2>
                <BootstrapTable data={this.state.musicList} version='4' options={ options } keyField='id'>
                    <TableHeaderColumn dataField='name'>Nom</TableHeaderColumn>
                    <TableHeaderColumn dataFormat={this.addButton}>Action</TableHeaderColumn>
                </BootstrapTable>

                <h2>PLaylist</h2>
                <BootstrapTable data={this.state.playlist} version='4' options={ options } keyField='id'>
                    <TableHeaderColumn dataField='name'>Nom</TableHeaderColumn>
                    <TableHeaderColumn dataFormat={this.removeButton}>Action</TableHeaderColumn>
                </BootstrapTable>

                {/* FIXME: Reload when state change  */}
                {/* {this.state.playlist.length > 0 &&
                    <AudioPlayer
                        songs={this.state.playlist}
                        autoplay
                    />
                } */}
                {this.audioPLayer(this.state.playlist)}
                
            </div>
        );
    }
}

export default MusicPage;