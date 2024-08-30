import { JobStatus, UserRoles } from "@media-shifter/commons";

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
