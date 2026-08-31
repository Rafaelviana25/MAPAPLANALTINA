/**
 * Types and interfaces for the 3D Image Viewer
 */

export type Language = "pt" | "en";

export type ViewMode = "plane" | "cube" | "cylinder" | "sphere" | "sequence";

export interface ImageAdjustment {
  brightness: number; // 0 to 200%
  contrast: number; // 0 to 200%
  saturation: number; // 0 to 200%
  hueRotate: number; // 0 to 360deg
  grayscale: number; // 0 to 100%
  sepia: number; // 0 to 100%
  blur: number; // 0 to 20px
  invert: number; // 0 to 100%
}

export interface TransformState {
  rotateX: number; // X-axis rotation (degrees)
  rotateY: number; // Y-axis rotation (degrees)
  rotateZ: number; // Z-axis rotation (degrees)
  zoom: number; // Scale factor (percentage, e.g., 100)
  panX: number; // Pan X coordinate (px)
  panY: number; // Pan Y coordinate (px)
  flipH: boolean; // Horizontal flip
  flipV: boolean; // Vertical flip
}

export interface PresetImage {
  id: string;
  namePt: string;
  nameEn: string;
  url: string;
  category: "texture" | "art" | "object" | "diagram";
}

export interface SequencePreset {
  id: string;
  namePt: string;
  nameEn: string;
  framesCount: number;
  type: "watch" | "shoe" | "car" | "globe" | "camera";
}

export interface Translations {
  title: string;
  subtitle: string;
  uploadBtn: string;
  dragDropText: string;
  or: string;
  webcamBtn: string;
  presetsTitle: string;
  modeTitle: string;
  modePlane: string;
  modeCube: string;
  modeCylinder: string;
  modeSphere: string;
  modeSequence: string;
  adjustmentsTitle: string;
  brightness: string;
  contrast: string;
  saturation: string;
  hueRotate: string;
  grayscale: string;
  sepia: string;
  blur: string;
  invert: string;
  resetAdjustments: string;
  resetAll: string;
  transformsTitle: string;
  rotationX: string;
  rotationY: string;
  rotationZ: string;
  zoom: string;
  quickAngles: string;
  front: string;
  back: string;
  top: string;
  bottom: string;
  left: string;
  right: string;
  isometric: string;
  lightingTitle: string;
  enableLight: string;
  lightIntensity: string;
  lightColor: string;
  anaglyphTitle: string;
  enableAnaglyph: string;
  instructionDrag: string;
  instructionScroll: string;
  instructionPan: string;
  cameraActive: string;
  captureBtn: string;
  cancelBtn: string;
  sequenceControl: string;
  sequenceDragInstruction: string;
  unsupportedWebcam: string;
  noImage: string;
}
