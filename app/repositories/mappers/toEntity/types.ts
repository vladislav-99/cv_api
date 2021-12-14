import { Projects, Project_technologies, Technologies } from "@prisma/client";
import { mapPojectToEntity, mapUpdatedPojectToEntity } from "./project.mapper";

export type ProjectEntity = ReturnType<typeof mapPojectToEntity>;
export type ProjectUpdateEntity = ReturnType<typeof mapUpdatedPojectToEntity>;

export type ProjectWithTechnologiesEntity =
  | Projects & {
      project_technologies: { technology: Technologies }[];
    };

export type ProjectListElEntity =
  | Pick<Projects, "id" | "name" | "type" | "country"> & {
      project_technologies: { technology: Technologies }[];
    };
