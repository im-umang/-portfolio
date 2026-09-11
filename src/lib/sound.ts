// High-fidelity synthesized UI sound system using Web Audio API
// Zero external mp3/wav files required, zero latency, runs entirely in-browser.

class SoundManager {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;
  private isUnlocked: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_sound_enabled');
      // Default to true if not set
      this.enabled = saved === null ? true : saved === 'true';

      // Auto-unlock AudioContext on first user gesture anywhere
      const unlockAudio = () => {
        this.unlock();
        window.removeEventListener('pointerdown', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
      };

      window.addEventListener('pointerdown', unlockAudio, { passive: true });
      window.addEventListener('keydown', unlockAudio, { passive: true });
      window.addEventListener('touchstart', unlockAudio, { passive: true });

      // Global delegation: Ensure EVERY interactive element plays sound
      window.addEventListener(
        'click',
        (e) => {
          if (!this.enabled) return;
          const target = (e.target as HTMLElement | null)?.closest(
            'button, a, [role="button"], input[type="submit"], select, summary, .cursor-pointer, [data-sound]'
          );
          if (target) {
            if (target.getAttribute('data-no-sound') === 'true') return;
            const soundType = target.getAttribute('data-sound');
            if (soundType === 'pop') {
              this.playPop();
            } else {
              this.playClick();
            }
          }
        },
        { capture: true, passive: true }
      );
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public unlock() {
    try {
      this.initCtx();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.isUnlocked = true;
    } catch {
      // AudioContext unavailable
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_sound_enabled', String(this.enabled));
    }
    if (this.enabled) {
      this.unlock();
      this.playPop();
    }
    return this.enabled;
  }

  // Crisp mechanical tactile micro-tick (clicks, button presses, nav items)
  public playClick() {
    if (!this.enabled) return;
    try {
      this.unlock();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Sharp frequency drop creates a pleasant physical click sensation
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.045);

      // Audible gain level (0.16) with fast exponential decay
      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // AudioContext restricted
    }
  }

  // Smooth buoyant bubble pop (modals, dialog toggles, agent messages)
  public playPop() {
    if (!this.enabled) return;
    try {
      this.unlock();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(840, now + 0.07);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.075);
    } catch {
      // AudioContext restricted
    }
  }

  // Harmonic chime for achievements, successes, and message deliveries
  public playChime() {
    if (!this.enabled) return;
    try {
      this.unlock();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      [587.33, 880].forEach((freq, index) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = now + index * 0.08;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.18, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.16);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.18);
      });
    } catch {
      // AudioContext restricted
    }
  }
}

export const sound = new SoundManager();
