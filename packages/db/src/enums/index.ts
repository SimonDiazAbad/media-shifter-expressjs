import { JobStatus, UserRoles, ImageJobType } from "@media-shifter/commons";

export const imageJobTypeArray: [ImageJobType, ...ImageJobType[]] = [
  ImageJobType.OCR,
  ImageJobType.REMOVE_BACKGROUND,
  ImageJobType.RESIZE,
  ImageJobType.UPSCALE,
  ImageJobType.CONVERT,
];

export const jobStatusArray: [JobStatus, ...JobStatus[]] = [
  JobStatus.PENDING,
  JobStatus.IN_PROGRESS,
  JobStatus.COMPLETED,
  JobStatus.FAILED,
];

export const userRolesArray: [UserRoles, ...UserRoles[]] = [
  UserRoles.ADMIN,
  UserRoles.User,
];
