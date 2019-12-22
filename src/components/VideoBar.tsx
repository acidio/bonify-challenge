import React from 'react';

import { Videos } from '../types';
import VideoItem from './VideoItem';

import './VideoBar.css';

interface Props {
  videos: Videos[];
}

const VideoBar: React.FC<Props> = ({ videos }) => (
  <div id="videos-container">{videos.map(VideoItem)}</div>
);

export default VideoBar;
