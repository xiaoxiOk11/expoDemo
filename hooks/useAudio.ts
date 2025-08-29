import { setAudioModeAsync, useAudioPlayer, useAudioPlayerStatus, type AudioSource } from 'expo-audio';
import { useEffect, useRef } from 'react';

interface UseAudioOptions {
  shouldPlay?: boolean;
  isLooping?: boolean;
  volume?: number;
}
// useAudioPlayer
export function useAudio(source: AudioSource, options: UseAudioOptions = {}) {
  const player = useAudioPlayer(source);
  const status = useAudioPlayerStatus(player);

  const isLoading = !status?.isLoaded;
  const isPlaying = !!status?.playing;

  // 仅自动播放一次
  const hasAutoPlayedRef = useRef(false);
  useEffect(() => {
    // 配置音频模式（可选）
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: false,
      allowsRecording: false,
      interruptionMode: 'duckOthers',
      shouldRouteThroughEarpiece: false,
    }).catch(() => { });
  }, []);

  // 根据 shouldPlay 自动播放/暂停
  // 根据 shouldPlay 自动播放/暂停（仅自动一次，不覆盖手动暂停）
  useEffect(() => {
    if (!player || !status?.isLoaded) return;

    if (options.shouldPlay && !hasAutoPlayedRef.current) {
      player.play();
      hasAutoPlayedRef.current = true;
    }

    if (options.shouldPlay === false && status.playing) {
      player.pause();
    }
    return () => {
      if (!player) return;
      try { player.pause(); } catch {}
      try { player.remove?.(); } catch {}
    };
  }, [player, status?.isLoaded, options.shouldPlay]);


  const play = () => {
    if (player) {
      player.play();
    }
  };

  const pause = () => {
    if (player) player.pause();
  };

  const stop = async () => {
    if (!player) return;
    player.pause();
    await player.seekTo(0);
  };

  const toggle = () => {
    if (!player) return;

    if (status?.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  const setVolume = (volume: number) => {
    if (player) player.volume = volume;
  };

  const error: string | null = null;

  return {
    play,
    pause,
    stop,
    toggle,
    setVolume,
    isPlaying,
    isLoading,
    error,
  };
}
