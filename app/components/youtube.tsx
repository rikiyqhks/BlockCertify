'use client'

import React from 'react'
import Youtube from 'react-youtube'
import type { NextPage } from 'next'

const YoutubeMovie: NextPage = () => {
  const opts= {
    height: '200',
    width: '350',
  };
  return (
    <Youtube
      videoId='SSo_EIwHSd4'
      opts={opts}
    />
  );
}

export default YoutubeMovie