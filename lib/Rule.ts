export interface Rule {
  description: string;
  conditions: Condition[];
  transformation: Transformation;
}

export interface Condition {
  lastLetters: number;
  value: string;
  length: number;
  relation: string;
}

export interface Transformation {
  lastLetters: number;
  type: TransformationTypes;
  with: string;
}

export enum TransformationTypes {
  replace = "replace",
  append = "append",
}