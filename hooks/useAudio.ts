import { setAudioModeAsync, useAudioPlayer, useAudioPlayerStatus, type AudioSource } from 'expo-audio';
import { useEffect } from 'react';

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

  useEffect(() => {
    // 配置音频模式（可选）
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: false,
      allowsRecording: false,
      interruptionMode: 'duckOthers',
      shouldRouteThroughEarpiece: false,
    }).catch(() => {});
  }, []);

  // 应用循环与音量等选项
  useEffect(() => {
    if (!player) return;
    if (typeof options.isLooping === 'boolean') player.loop = options.isLooping;
    if (typeof options.volume === 'number') player.volume = options.volume;
  }, [player, options.isLooping, options.volume]);

  // 根据 shouldPlay 自动播放/暂停
  useEffect(() => {
    if (!player || !status?.isLoaded) return;
    if (options.shouldPlay) {
      player.play();
    } else if (options.shouldPlay === false && status.playing) {
      player.pause();
    }
  }, [player, status?.isLoaded, status?.playing, options.shouldPlay]);

  const play = () => {
    if (player) player.play();
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
    if (status?.playing) player.pause(); else player.play();
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
