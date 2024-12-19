import { z } from "zod";

export const zImageResizeJobParams = z.object({
  targetWidth: z.number(),
  targetHeight: z.number(),
});

export const zImageUpscaleJobParams = z.object({
  targetResolution: z.string(),
});

export const zImageConvertJobParams = z.object({
  targetFormat: z.string(),
});

export const zImageRemoveBackgroundJobParams = z.object({
  temp: z.string(),
});

export const zImageOCRJobParams = z.object({
  targetLanguage: z.string(),
});

export const zImageJobParams = z.union([
  zImageResizeJobParams,
  zImageUpscaleJobParams,
  zImageConvertJobParams,
  zImageRemoveBackgroundJobParams,
  zImageOCRJobParams,
]);
