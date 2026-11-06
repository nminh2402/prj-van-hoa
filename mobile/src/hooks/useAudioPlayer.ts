import { useState, useCallback } from 'react';
import { AudioService } from '../services/audioService';

export const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<{ title: string; url: string } | null>(null);

  const play = useCallback((title: string, url: string) => {
    setCurrentTrack({ title, url });
    setIsPlaying(true);
    AudioService.playAudio(
      url,
      () => setIsPlaying(false),
      () => setIsPlaying(false)
    );
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      AudioService.pauseAudio();
      setIsPlaying(false);
    } else {
      AudioService.resumeAudio();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const stop = useCallback(() => {
    AudioService.stopAudio();
    setIsPlaying(false);
    setCurrentTrack(null);
  }, []);

  return {
    isPlaying,
    currentTrack,
    play,
    togglePlay,
    stop,
  };
};
