import { DataType } from "./types";

export function getDataTypeDimension(t: DataType): number {
  switch (t) {
    case DataType.Bool:
    case DataType.Double:
    case DataType.Int:
      return 1;
      
    case DataType.Vec2:
      return 2;

    case DataType.Vec3:
      return 3;

    case DataType.Vec4:
      return 4;
  }
}