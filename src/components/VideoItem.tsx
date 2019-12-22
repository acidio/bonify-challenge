import React from 'react';

import './VideoItem.css';

const videoUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;

const VideoItem = ({
  id: { videoId },
  snippet: {
    title,
    thumbnails: {
      default: { url }
    }
  }
}: any) => (
  <a
    href={videoUrl(videoId)}
    key={videoId}
    target="_blank"
    rel="noopener noreferrer"
    className="video-item"
  >
    <div className="title">{title}</div>
    <img className="thumbnail" src={url} height={90} width={120} alt={title} />
  </a>
);

export default VideoItem;
