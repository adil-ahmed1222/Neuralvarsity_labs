export type DeploymentEnvironment = "production" | "staging" | "development";
export type DeploymentState = "success" | "building" | "failed" | "pending" | "cancelled";

export interface Deployment {
  id: string;
  projectId: string;
  projectName: string;
  environment: DeploymentEnvironment;
  url: string | null;
  provider: string;
  status: DeploymentState;
  commitHash: string | null;
  version: string | null;
  buildTime: number | null;
  deployedAt: string;
}

export interface DeploymentFilters {
  environment?: DeploymentEnvironment;
  status?: DeploymentState;
  projectId?: string;
}
