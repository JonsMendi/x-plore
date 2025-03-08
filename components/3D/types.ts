export interface TreeProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
}

export interface ThunderProps {
  thunderAudioRefs: React.MutableRefObject<HTMLAudioElement[]>;
  isAudioPlaying: boolean;
}
