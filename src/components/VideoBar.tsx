import React from 'react';

import { Videos } from '../App';
import VideoItem from './VideoItem';

import './VideoBar.css';

interface Props {
  videos: Videos[];
  currentIndex: number;
}

const VideoBar: React.FC<Props> = ({ videos, currentIndex }) => {
  const videosToShow = videos.length > 0 ? videos[currentIndex].items : null;

  if (!videosToShow) {
    return (
      <div className="no-locations">
        Click on the map to find the latest videos of the clicked location.
      </div>
    );
  }

  if (videosToShow.length === 0) {
    return (
      <div className="no-locations">There are no videos in this location.</div>
    );
  }

  return (
    <div id="videos-container">
      {videosToShow && videosToShow.map(VideoItem)}
    </div>
  );
};

export default VideoBar;
