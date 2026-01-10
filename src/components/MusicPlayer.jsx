import SilentErrorBoundary from '../SilentErrorBoundary'; 
import React, { useState, useRef, useEffect } from 'react';

const MusicPlayer = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showVolumeControl, setShowVolumeControl] = useState(false); 
  const songs = [
    { name: "Lexi Next - Bullish (Original Mix)", file: "/songs/Lexi Next - Bullish (Original Mix).mp3" },
    { name: "Lexi Next - C.T.O. (Original Mix)", file: "/songs/Lexi Next - C.T.O. (Original Mix).mp3" },
    { name: "Lexi Next - More Grind (Hard Trap Version)", file: "/songs/Lexi Next - More Grind (Hard Trap Version).mp3" },
    { name: "Lexi Next - What's FUD (Original Mix)", file: "/songs/Lexi Next - What's FUD (Original Mix).mp3" },
    { name: "Lexi Next - RETARDIO (Original Mix)", file: "/songs/Lexi Next - RETARDIO (Original Mix).mp3" },
    { name: "Lexi Next - FEETH (Can't Sleep) (DnB Version)", file: "/songs/Lexi Next - FEETH (Can't Sleep) (DnB Version).mp3" },
    { name: "Lexi Next - Dubai Investors (Original)", file: "/songs/Lexi Next - Dubai Investors (Original).mp3" },
    { name: "Lexi Next - Another Day (Original Mix)", file: "/songs/Lexi Next - Another Day (Original Mix).mp3" },
    { name: "Lexi Next - Beam Me Up (Original Mix)", file: "/songs/Lexi Next - Beam Me Up (Original Mix).mp3" },
    { name: "Lexi Next - Moons of Jupiter (Original Mix)", file: "/songs/Lexi Next - Moons of Jupiter (Original Mix).mp3" },
    { name: "Lexi Next - Work for Your Bags (Original Mix)", file: "/songs/Lexi Next - Work for Your Bags (Original Mix).mp3" },
  ];
 
  const handleSongEnd = () => {
    try {
      setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    } catch {}
  };

  const playAudio = async () => {
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {}
  };

  const pauseAudio = () => {
    try {
      audioRef.current.pause();
      setIsPlaying(false);
    } catch {}
  };

  const togglePlayPause = () => {
    try {
      if (isPlaying) {
        pauseAudio();
      } else {
        playAudio();
      }
    } catch {}
  };

  const nextSong = () => {
    try {
      setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    } catch {}
  };

  const previousSong = () => {
    try {
      setCurrentSongIndex((prevIndex) =>
        prevIndex === 0 ? songs.length - 1 : prevIndex - 1
      );
    } catch {}
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleVolumeControl = () => {
    setShowVolumeControl((prev) => !prev);
  };

  useEffect(() => {
    try {
      if (isPlaying) {
        playAudio();
      }
    } catch {}
  }, [currentSongIndex]);

  useEffect(() => {
    try {
      const enableAudioOnInteraction = () => {
        playAudio();
        window.removeEventListener('click', enableAudioOnInteraction);
        window.removeEventListener('scroll', enableAudioOnInteraction);
      };
      window.addEventListener('click', enableAudioOnInteraction);
      window.addEventListener('scroll', enableAudioOnInteraction);
      return () => {
        window.removeEventListener('click', enableAudioOnInteraction);
        window.removeEventListener('scroll', enableAudioOnInteraction);
      };
    } catch {}
  }, []);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  try {
    return (
      <SilentErrorBoundary>
        <div className="music-player">
          <div className="music-controls">
            {/*
            <button className="prev-song" onClick={previousSong} >
              ⏮️
            </button>
            }
            <button className="play-stop-toggle" onClick={togglePlayPause} style={{ filter: "invert()" }}>
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            */}
              <button className="next-song" onClick={nextSong}>
              ⏭️
            </button>
            <button
              className="volume-toggle"
              onClick={toggleVolumeControl}
            >
              🔊
            </button>
          </div>

          {showVolumeControl && (
            <div className="volume-slider">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                style={{ writingMode: "bt-lr" }} // Vertikaler Regler
              />
            </div>
          )}

          <audio
            ref={audioRef}
            src={songs[currentSongIndex].file}
            onEnded={handleSongEnd}
          />
        </div>
      </SilentErrorBoundary>
    );
  } catch {}
};

export default MusicPlayer;