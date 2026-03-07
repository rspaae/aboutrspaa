declare module 'animejs' {
    interface AnimeParams {
        targets?: any;
        duration?: number | Function;
        delay?: number | Function;
        easing?: string;
        direction?: string;
        loop?: boolean | number;
        autoplay?: boolean;
        translateX?: any;
        translateY?: any;
        translateZ?: any;
        rotate?: any;
        rotateX?: any;
        rotateY?: any;
        rotateZ?: any;
        scale?: any;
        scaleX?: any;
        scaleY?: any;
        opacity?: any;
        d?: any;
        [key: string]: any;
    }

    interface AnimeInstance {
        play(): void;
        pause(): void;
        restart(): void;
        seek(time: number): void;
        reverse(): void;
        finished: Promise<void>;
    }

    interface AnimeStatic {
        (params: AnimeParams): AnimeInstance;
        stagger(value: number | string, options?: any): Function;
        random(min: number, max: number): number;
        timeline(params?: AnimeParams): any;
    }

    const anime: AnimeStatic;
    export default anime;
}
