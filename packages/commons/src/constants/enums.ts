export enum ImageJobType {
  REMOVE_BACKGROUND = "REMOVE_BACKGROUND",
  RESIZE = "RESIZE",
  UPSCALE = "UPSCALE",
  CONVERT = "CONVERT",
  OCR = "OCR",
}

export enum JobStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export enum UserRoles {
  ADMIN = "ADMIN",
  User = "USER",
}
