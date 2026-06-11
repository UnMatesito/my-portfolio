import useSound from "use-sound";

export function useClickSound(path: string) {
  const [play] = useSound(path);
  return {
    play,
    playThenNavigate: (navigateFn: () => void, delay = 600) => {
      play();
      setTimeout(navigateFn, delay);
    },
  };
}
