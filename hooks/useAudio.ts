import { Audio } from 'expo-av';
import { useEffect, useRef, useState } from 'react';

interface UseAudioOptions {
  shouldPlay?: boolean;
  isLooping?: boolean;
  volume?: number;
}

export function useAudio(source: any, options: UseAudioOptions = {}) {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadSound = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 设置音频模式
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
        });

        // 创建并加载音频
        const { sound } = await Audio.Sound.createAsync(
          source,
          {
            shouldPlay: options.shouldPlay ?? false,
            isLooping: options.isLooping ?? false,
            volume: options.volume ?? 1.0,
          },
          (status) => {
            if (isMounted && status.isLoaded) {
              setIsPlaying(status.isPlaying ?? false);
            }
          }
        );

        if (isMounted) {
          soundRef.current = sound;
          setIsLoading(false);
        } else {
          // 如果组件已卸载，立即清理
          await sound.unloadAsync();
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : '音频加载失败');
          setIsLoading(false);
        }
      }
    };

    loadSound();

    // 清理函数
    return () => {
      isMounted = false;
      if (soundRef.current) {
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    };
  }, [source]); // 只依赖 source，options 变化不重新加载

  const play = async () => {
    if (soundRef.current) {
      try {
        await soundRef.current.playAsync();
        setIsPlaying(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : '播放失败');
      }
    }
  };

  const pause = async () => {
    if (soundRef.current) {
      try {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : '暂停失败');
      }
    }
  };

  const stop = async () => {
    if (soundRef.current) {
      try {
        await soundRef.current.stopAsync();
        setIsPlaying(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : '停止失败');
      }
    }
  };

  const toggle = async () => {
    if (isPlaying) {
      await pause();
    } else {
      await play();
    }
  };

  const setVolume = async (volume: number) => {
    if (soundRef.current) {
      try {
        await soundRef.current.setVolumeAsync(volume);
      } catch (err) {
        setError(err instanceof Error ? err.message : '设置音量失败');
      }
    }
  };

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
