// Web Audio Synthesized iOS-like Taptic Engine Click Sound & Device Vibration

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

export const toggleHapticSound = (enabled?: boolean) => {
  if (enabled !== undefined) {
    soundEnabled = enabled;
  } else {
    soundEnabled = !soundEnabled;
  }
  return soundEnabled;
};

export const isHapticSoundEnabled = () => soundEnabled;

export const playIphoneClick = (type: 'light' | 'medium' | 'heavy' = 'light') => {
  if (!soundEnabled || typeof window === 'undefined') return;

  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    const now = audioCtx.currentTime;

    // Pitch & Duration based on click type (iOS crisp tactile pop)
    if (type === 'light') {
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.012);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.012);
      osc.start(now);
      osc.stop(now + 0.012);
    } else if (type === 'medium') {
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(250, now + 0.018);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.018);
      osc.start(now);
      osc.stop(now + 0.018);
    } else {
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.025);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
      osc.start(now);
      osc.stop(now + 0.025);
    }

    osc.connect(gain);
    gain.connect(audioCtx.destination);
  } catch {
    // Ignore audio context errors gracefully
  }

  // Trigger mobile physical vibration if supported
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      const vibrateDuration = type === 'light' ? 6 : type === 'medium' ? 10 : 16;
      navigator.vibrate(vibrateDuration);
    } catch {
      // Ignore vibration errors
    }
  }
};
