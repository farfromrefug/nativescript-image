import { booleanConverter, Color, Property, View } from '@nativescript/core/ui/core/view';
import * as observableModule from '@nativescript/core/data/observable';
import { isAndroid, isIOS } from '@nativescript/core/platform';
import { ImageSource } from '@nativescript/core/image-source/image-source';
import { ImageAsset } from '@nativescript/core/image-asset/image-asset';

export enum CLogTypes {
    info,
    warning,
    error
}

export let debug = false;
export function setDebug(value: boolean) {
    debug = value;
}

export const CLog = (type: CLogTypes = 0, ...args) => {
    if (debug) {
        if (type === 0) {
            // Info
            console.log('[nativescript-image]', ...args);
        } else if (type === 1) {
            // Warning
            console.warn('[nativescript-image]', ...args);
        } else if (type === 2) {
            console.error('[nativescript-image]', ...args);
        }
    }
};

export type Transition = 'fade' | 'curlUp';

export enum ScaleType {
    None = 'none',
    Fill = 'fill',
    AspectFill = 'aspectFill',
    AspectFit = 'aspectFit',
    Center = 'center',
    CenterCrop = 'centerCrop',
    CenterInside = 'centerInside',
    FitCenter = 'fitCenter',
    FitEnd = 'fitEnd',
    FitStart = 'fitStart',
    FitXY = 'fitXY',
    FocusCrop = 'focusCrop'
}

export interface AnimatedImage {
    start(): void;
    stop(): void;
    isRunning(): boolean;
}

export interface ImageInfo {
    getHeight(): number;
    getWidth(): number;
}

export interface ImageError {
    getMessage(): string;
    getErrorType(): string;
    toString(): string;
}

export interface ImagePipelineConfigSetting {
    isDownsampleEnabled?: boolean;
}

export class EventData implements observableModule.EventData {
    private _eventName: string;
    private _object: any;

    get eventName(): string {
        return this._eventName;
    }

    set eventName(value: string) {
        this._eventName = value;
    }

    get object(): any {
        return this._object;
    }

    set object(value: any) {
        this._object = value;
    }
}
export type Stretch = 'none' | 'fill' | 'aspectFill' | 'aspectFit';

export class ImageBase extends View {
    public static finalImageSetEvent: string = 'finalImageSet';
    public static failureEvent: string = 'failure';
    public static intermediateImageFailedEvent: string = 'intermediateImageFailed';
    public static intermediateImageSetEvent: string = 'intermediateImageSet';
    public static releaseEvent: string = 'release';
    public static submitEvent: string = 'submit';

    public src: string | ImageSource | ImageAsset;
    public lowerResSrc: string;
    public placeholderImageUri: string;
    public failureImageUri: string;
    public stretch: ScaleType;
    public fadeDuration: number;
    public backgroundUri: string;
    public progressiveRenderingEnabled: boolean;
    public localThumbnailPreviewsEnabled: boolean;
    public showProgressBar: boolean;
    public progressBarColor: string;
    public roundAsCircle: boolean;
    public roundBottomRight: boolean;
    public roundTopLeft: boolean;
    public roundTopRight: boolean;
    public roundBottomLeft: boolean;
    public roundedCornerRadius: number;
    public blurRadius: number;
    public blurDownSampling: number;
    public autoPlayAnimations: boolean;
    public tapToRetryEnabled: boolean;
    public aspectRatio: number;
    public decodeWidth: number;
    public decodeHeight: number;
    alwaysFade: boolean;
    noCache: boolean
    // fade: boolean;
    tintColor: Color;
    // transition: Transition;

    public readonly isLoading: boolean;

    public static srcProperty = new Property<ImageBase, string | ImageSource | ImageAsset>({ name: 'src' });
    public static lowerResSrcProperty = new Property<ImageBase, string>({ name: 'lowerResSrc' });
    public static placeholderImageUriProperty = new Property<ImageBase, string>({ name: 'placeholderImageUri' });
    public static failureImageUriProperty = new Property<ImageBase, string>({ name: 'failureImageUri' });
    public static stretchProperty = new Property<ImageBase, string>({ name: 'stretch' });
    public static backgroundUriProperty = new Property<ImageBase, string>({ name: 'backgroundUri' });
    public static progressiveRenderingEnabledProperty = new Property<ImageBase, boolean>({ name: 'progressiveRenderingEnabled', valueConverter: booleanConverter });
    public static localThumbnailPreviewsEnabledProperty = new Property<ImageBase, boolean>({ name: 'localThumbnailPreviewsEnabled', valueConverter: booleanConverter });
    public static showProgressBarProperty = new Property<ImageBase, boolean>({ name: 'showProgressBar', valueConverter: booleanConverter });
    public static progressBarColorProperty = new Property<ImageBase, string>({ name: 'progressBarColor', defaultValue: undefined });
    public static roundAsCircleProperty = new Property<ImageBase, boolean>({ name: 'roundAsCircle', valueConverter: booleanConverter, affectsLayout: isAndroid });
    public static roundTopLeftProperty = new Property<ImageBase, boolean>({ name: 'roundTopLeft', defaultValue: undefined, valueConverter: booleanConverter, affectsLayout: isAndroid });
    public static roundTopRightProperty = new Property<ImageBase, boolean>({ name: 'roundTopRight', valueConverter: booleanConverter, affectsLayout: isAndroid });
    public static roundBottomLeftProperty = new Property<ImageBase, boolean>({ name: 'roundBottomLeft', valueConverter: booleanConverter, affectsLayout: isAndroid });
    public static roundBottomRightProperty = new Property<ImageBase, boolean>({ name: 'roundBottomRight', valueConverter: booleanConverter, affectsLayout: isAndroid });
    public static roundedCornerRadiusProperty = new Property<ImageBase, number>({ name: 'roundedCornerRadius', valueConverter: v => parseFloat(v) });
    public static blurRadiusProperty = new Property<ImageBase, number>({ name: 'blurRadius', valueConverter: v => parseFloat(v) });
    public static blurDownSamplingProperty = new Property<ImageBase, number>({ name: 'blurDownSampling', valueConverter: v => parseFloat(v) });
    public static autoPlayAnimationsProperty = new Property<ImageBase, boolean>({ name: 'autoPlayAnimations', valueConverter: booleanConverter });
    public static tapToRetryEnabledProperty = new Property<ImageBase, boolean>({ name: 'tapToRetryEnabled', valueConverter: booleanConverter });
    public static aspectRatioProperty = new Property<ImageBase, number>({ name: 'aspectRatio', affectsLayout: true, valueConverter: v => parseFloat(v) });
    public static decodeWidthProperty = new Property<ImageBase, number>({ name: 'decodeWidth', valueConverter: v => parseFloat(v) });
    public static decodeHeightProperty = new Property<ImageBase, number>({ name: 'decodeHeight', valueConverter: v => parseFloat(v) });
    public static tintColorProperty = new Property<ImageBase, Color>({ name: 'tintColor' });
    public static alwaysFadeProperty = new Property<ImageBase, boolean>({ name: 'alwaysFade', valueConverter: booleanConverter, defaultValue: false });
    // public static fadeProperty = new Property<ImageBase, boolean>({ name: 'fade', valueConverter: booleanConverter });
    public static fadeDurationProperty = new Property<ImageBase, number>({ name: 'fadeDuration', valueConverter: v => parseFloat(v) });
    public static noCacheProperty = new Property<ImageBase, boolean>({ name: 'noCache', defaultValue:false, valueConverter: booleanConverter });

    protected handleImageProgress(value: number, totalSize?: number) {
        // console.log('handleImageProgress ', value, totalSize);
    }
}
ImageBase.srcProperty.register(ImageBase);
ImageBase.lowerResSrcProperty.register(ImageBase);
ImageBase.placeholderImageUriProperty.register(ImageBase);
ImageBase.failureImageUriProperty.register(ImageBase);
ImageBase.stretchProperty.register(ImageBase);
ImageBase.fadeDurationProperty.register(ImageBase);
ImageBase.backgroundUriProperty.register(ImageBase);
ImageBase.progressiveRenderingEnabledProperty.register(ImageBase);
ImageBase.localThumbnailPreviewsEnabledProperty.register(ImageBase);
ImageBase.showProgressBarProperty.register(ImageBase);
ImageBase.progressBarColorProperty.register(ImageBase);
ImageBase.roundAsCircleProperty.register(ImageBase);
ImageBase.roundTopLeftProperty.register(ImageBase);
ImageBase.roundTopRightProperty.register(ImageBase);
ImageBase.roundBottomLeftProperty.register(ImageBase);
ImageBase.roundBottomRightProperty.register(ImageBase);
ImageBase.roundedCornerRadiusProperty.register(ImageBase);
ImageBase.blurRadiusProperty.register(ImageBase);
ImageBase.blurDownSamplingProperty.register(ImageBase);
ImageBase.autoPlayAnimationsProperty.register(ImageBase);
ImageBase.tapToRetryEnabledProperty.register(ImageBase);
ImageBase.aspectRatioProperty.register(ImageBase);
ImageBase.decodeWidthProperty.register(ImageBase);
ImageBase.decodeHeightProperty.register(ImageBase);
ImageBase.alwaysFadeProperty.register(ImageBase);
ImageBase.noCacheProperty.register(ImageBase);
