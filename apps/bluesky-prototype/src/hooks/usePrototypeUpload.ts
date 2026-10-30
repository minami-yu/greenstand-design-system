import { useCallback, useEffect, useRef, useState } from 'react';
import { useNetworkState } from 'expo-network';
import type { UploadInterruption } from '../components/upload/UploadInterruptionSheet';

const UPLOAD_DURATION_MS = 7000;
export function usePrototypeUpload() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [interruption, setInterruption] = useState<UploadInterruption | null>(null);
  const network = useNetworkState();
  const offline = network.isConnected === false || network.isInternetReachable === false;
  const elapsed = useRef(0);
  const startedAt = useRef<number | undefined>(undefined);
  const uploaded = progress >= 1;
  const pause = useCallback((reason: UploadInterruption) => {
    if (startedAt.current === undefined) return;
    elapsed.current = Math.min(UPLOAD_DURATION_MS, elapsed.current + Date.now() - startedAt.current);
    startedAt.current = undefined;
    setProgress(elapsed.current / UPLOAD_DURATION_MS);
    setRunning(false);
    if (elapsed.current >= UPLOAD_DURATION_MS) setShowCompletion(true);
    else setInterruption(reason);
  }, []);
  useEffect(() => {
    if (offline && running) pause('offline');
  }, [offline, running, pause]);
  useEffect(() => {
    if (!running) return;
    const tick = () => {
      if (startedAt.current === undefined) return;
      const duration = elapsed.current + Date.now() - (startedAt.current ?? Date.now());
      setProgress(Math.min(1, duration / UPLOAD_DURATION_MS));
      if (duration >= UPLOAD_DURATION_MS) {
        elapsed.current = UPLOAD_DURATION_MS;
        startedAt.current = undefined;
        setRunning(false);
        setShowCompletion(true);
      }
    };
    const timer = setInterval(tick, 50);
    return () => clearInterval(timer);
  }, [running]);
  return {
    offline, progress, running, uploaded, showCompletion, interruption,
    dismissCompletion: () => setShowCompletion(false),
    dismissInterruption: () => setInterruption(null),
    start: () => {
      if (startedAt.current !== undefined || uploaded) return;
      if (offline) {
        setInterruption('offline');
        return;
      }
      setInterruption(null);
      startedAt.current = Date.now();
      setRunning(true);
    },
    stop: () => pause('stopped'),
    reset: () => {
      startedAt.current = undefined;
      elapsed.current = 0;
      setProgress(0);
      setRunning(false);
      setShowCompletion(false);
      setInterruption(null);
    }
  };
}
