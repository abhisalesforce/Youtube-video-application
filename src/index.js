import _ from 'lodash';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
//AIzaSyAEpX7FMcCYRkNa2BYrPIPvO6BAP_z7C2g
import VideoList from './components/video_list';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/searchbar';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyCKp0uycAVyEdXkO1Ql5OiA7z1CL6VTB4M';


class App extends Component {
  constructor(props){
  super(props);

  this.state = {
    videos : [] ,
  selectedVideo: null
};

this.videoSearch('surfboards');
}

videoSearch(term){

    YTSearch({key: API_KEY, term: term} , (videos) => {
    this.setState({
      videos : videos,
     selectedVideo : videos[0]
     });
    });
    }



  render(){


        const videoSearch = _.debounce((term) => { this.videoSearch(term) } , 300);

        return (

  <div>
  <SearchBar onSearchTermChange={term => this.videoSearch(term)} />
  <VideoDetail video ={this.state.selectedVideo}/>
  <VideoList
  onVideoSelect = {selectedVideo => this.setState({selectedVideo})}
  videos = {this.state.videos} />
  </div>
);

}
}

ReactDom.render(<App />, document.querySelector('.container'));
