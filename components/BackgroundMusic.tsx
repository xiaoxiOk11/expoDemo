import { useAudio } from '@/hooks/useAudio';
import { useEffect } from 'react';

interface BackgroundMusicProps {
  source: any;
  autoPlay?: boolean;
  volume?: number;
}

/**
 * 背景音乐组件 - 可在任何页面使用
 * 
 * 使用示例:
 * <BackgroundMusic source={require('@/assets/music.mp3')} autoPlay />
 */
export function BackgroundMusic({ source, autoPlay = true, volume = 0.5 }: BackgroundMusicProps) {
  const { play, stop, setVolume, isLoading } = useAudio(source, {
    shouldPlay: false, // 手动控制播放
    isLooping: true,
    volume,
  });

  useEffect(() => {
    if (!isLoading && autoPlay) {
      play();
    }
    
    // 组件卸载时自动停止
    return () => {
      stop();
    };
  }, [isLoading, autoPlay]);

  // 这是一个无UI组件，只负责音频播放
  return null;
}
