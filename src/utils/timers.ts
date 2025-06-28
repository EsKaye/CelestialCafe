import { debounce } from './helpers';

export class GameTimer {
  private startTime: number;
  private elapsedTime: number;
  private isRunning: boolean;
  private timerId: NodeJS.Timeout | null;
  private onTick: (elapsed: number) => void;

  constructor(onTick: (elapsed: number) => void) {
    this.startTime = 0;
    this.elapsedTime = 0;
    this.isRunning = false;
    this.timerId = null;
    this.onTick = debounce(onTick, 100); // Debounce to prevent too frequent updates
  }

  start(): void {
    if (!this.isRunning) {
      this.startTime = Date.now() - this.elapsedTime;
      this.isRunning = true;
      this.tick();
    }
  }

  pause(): void {
    if (this.isRunning) {
      this.isRunning = false;
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
    }
  }

  reset(): void {
    this.pause();
    this.elapsedTime = 0;
    this.onTick(0);
  }

  private tick(): void {
    if (!this.isRunning) return;

    this.elapsedTime = Date.now() - this.startTime;
    this.onTick(this.elapsedTime);
    
    this.timerId = setTimeout(() => this.tick(), 100);
  }

  getElapsedTime(): number {
    return this.elapsedTime;
  }

  isActive(): boolean {
    return this.isRunning;
  }
}

export class CustomerTimer {
  private maxWaitTime: number;
  private startTime: number;
  private onTimeout: () => void;
  private timerId: NodeJS.Timeout | null;

  constructor(maxWaitTime: number, onTimeout: () => void) {
    this.maxWaitTime = maxWaitTime;
    this.startTime = Date.now();
    this.onTimeout = onTimeout;
    this.timerId = null;
    this.start();
  }

  private start(): void {
    this.timerId = setTimeout(() => {
      this.onTimeout();
    }, this.maxWaitTime);
  }

  getRemainingTime(): number {
    const elapsed = Date.now() - this.startTime;
    return Math.max(0, this.maxWaitTime - elapsed);
  }

  getProgress(): number {
    return Math.min(1, (Date.now() - this.startTime) / this.maxWaitTime);
  }

  cancel(): void {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }
}

export class BrewTimer {
  private duration: number;
  private startTime: number;
  private onComplete: () => void;
  private timerId: NodeJS.Timeout | null;

  constructor(duration: number, onComplete: () => void) {
    this.duration = duration;
    this.startTime = Date.now();
    this.onComplete = onComplete;
    this.timerId = null;
    this.start();
  }

  private start(): void {
    this.timerId = setTimeout(() => {
      this.onComplete();
    }, this.duration);
  }

  getProgress(): number {
    return Math.min(1, (Date.now() - this.startTime) / this.duration);
  }

  cancel(): void {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }
}
