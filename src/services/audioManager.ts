import { Audio } from 'expo-av';
import { Platform } from 'react-native';

class AudioManager {
  private static instance: AudioManager;
  private sounds: Map<string, Audio.Sound>;
  private backgroundMusic: Audio.Sound | null;
  private isMuted: boolean;
  private volume: number;

  private constructor() {
    this.sounds = new Map();
    this.backgroundMusic = null;
    this.isMuted = false;
    this.volume = 1.0;
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  public async loadSound(key: string, uri: string): Promise<void> {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: false }
      );
      this.sounds.set(key, sound);
    } catch (error) {
      console.error(`Error loading sound ${key}:`, error);
    }
  }

  public async playSound(key: string, loop: boolean = false): Promise<void> {
    if (this.isMuted) return;

    const sound = this.sounds.get(key);
    if (sound) {
      try {
        await sound.setIsLoopingAsync(loop);
        await sound.setVolumeAsync(this.volume);
        await sound.playAsync();
      } catch (error) {
        console.error(`Error playing sound ${key}:`, error);
      }
    }
  }

  public async stopSound(key: string): Promise<void> {
    const sound = this.sounds.get(key);
    if (sound) {
      try {
        await sound.stopAsync();
      } catch (error) {
        console.error(`Error stopping sound ${key}:`, error);
      }
    }
  }

  public async playBackgroundMusic(uri: string): Promise<void> {
    if (this.isMuted) return;

    try {
      // Stop current background music if playing
      if (this.backgroundMusic) {
        await this.backgroundMusic.stopAsync();
        await this.backgroundMusic.unloadAsync();
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true, isLooping: true }
      );
      await sound.setVolumeAsync(this.volume * 0.5); // Background music at half volume
      this.backgroundMusic = sound;
    } catch (error) {
      console.error('Error playing background music:', error);
    }
  }

  public async stopBackgroundMusic(): Promise<void> {
    if (this.backgroundMusic) {
      try {
        await this.backgroundMusic.stopAsync();
        await this.backgroundMusic.unloadAsync();
        this.backgroundMusic = null;
      } catch (error) {
        console.error('Error stopping background music:', error);
      }
    }
  }

  public setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
    this.updateAllVolumes();
  }

  public toggleMute(): void {
    this.isMuted = !this.isMuted;
    this.updateAllVolumes();
  }

  private async updateAllVolumes(): Promise<void> {
    const targetVolume = this.isMuted ? 0 : this.volume;
    
    // Update all sound effects
    for (const sound of this.sounds.values()) {
      try {
        await sound.setVolumeAsync(targetVolume);
      } catch (error) {
        console.error('Error updating sound volume:', error);
      }
    }

    // Update background music
    if (this.backgroundMusic) {
      try {
        await this.backgroundMusic.setVolumeAsync(targetVolume * 0.5);
      } catch (error) {
        console.error('Error updating background music volume:', error);
      }
    }
  }

  public async unloadAll(): Promise<void> {
    // Unload all sound effects
    for (const [key, sound] of this.sounds.entries()) {
      try {
        await sound.unloadAsync();
        this.sounds.delete(key);
      } catch (error) {
        console.error(`Error unloading sound ${key}:`, error);
      }
    }

    // Unload background music
    if (this.backgroundMusic) {
      try {
        await this.backgroundMusic.unloadAsync();
        this.backgroundMusic = null;
      } catch (error) {
        console.error('Error unloading background music:', error);
      }
    }
  }
}

export default AudioManager.getInstance();
