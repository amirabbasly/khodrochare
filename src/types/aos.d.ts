declare module "aos" {
  type AosOptions = {
    duration?: number;
    startEvent?: string;
    disableMutationObserver?: boolean;
    throttleDelay?: number;
    easing?: string;
    once?: boolean;
    offset?: number;
    disable?: boolean | (() => boolean);
  };

  const AOS: {
    init(options?: AosOptions): void;
    refresh(): void;
    refreshHard(): void;
  };

  export default AOS;
}
