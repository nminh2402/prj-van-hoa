import Sound from 'react-native-sound';

// Cho phép phát âm thanh ở chế độ im lặng của iOS
Sound.setCategory('Playback');

export class AudioService {
  private static soundInstance: Sound | null = null;
  private static currentUrl: string | null = null;

  static playAudio(
    url: string,
    onComplete?: () => void,
    onError?: (error: any) => void
  ) {
    this.stopAudio();

    this.soundInstance = new Sound(url, '', error => {
      if (error) {
        console.error('Lỗi nạp audio:', error);
        onError?.(error);
        return;
      }
      this.currentUrl = url;
      this.soundInstance?.play(success => {
        if (success) {
          onComplete?.();
        } else {
          console.warn('Phát audio bị gián đoạn');
        }
      });
    });
  }

  static pauseAudio() {
    if (this.soundInstance) {
      this.soundInstance.pause();
    }
  }

  static resumeAudio() {
    if (this.soundInstance) {
      this.soundInstance.play();
    }
  }

  static stopAudio() {
    if (this.soundInstance) {
      this.soundInstance.stop(() => {
        this.soundInstance?.release();
        this.soundInstance = null;
        this.currentUrl = null;
      });
    }
  }
}
