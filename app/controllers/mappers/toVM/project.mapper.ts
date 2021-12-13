import {
  CacheKey,
  Deserializer,
  JsonIgnore,
  JsonProperty,
  ObjectMapper,
  Serializer,
} from "json-object-mapper";

import { Selector } from "./selector";
import { mapObject } from "map-anything";
import { Projects, ProjectTypes, Technologies } from "@prisma/client";
import { ProjectViewModelType, ProjectVM } from "./viewModels/project.model";

@CacheKey("ProjectTypeEnumSerializerDeserializer")
class TechnologyDTOsEnumSerializerDeserializer
  implements Deserializer, Serializer
{
  deserialize = (value: ProjectTypes): ProjectTypes => {
    return ProjectTypes[value];
  };

  serialize = (value: ProjectTypes): string => {
    return '"' + ProjectTypes[value] + '"';
  };
}

export class ProjectMapper extends Selector {
  @JsonProperty()
  public name?: string = undefined;

  @JsonIgnore()
  public description?: string = undefined;

  @JsonIgnore()
  public link?: string = undefined;

  @JsonProperty()
  public country: string | null = null;

  @JsonProperty()
  public photos: string[] | null = null;

  @JsonProperty()
  public technologies: string[] | null = null;

  @JsonProperty({
    type: ProjectTypes,
    serializer: TechnologyDTOsEnumSerializerDeserializer,
    deserializer: TechnologyDTOsEnumSerializerDeserializer,
  })
  public type?: ProjectTypes = undefined;

  create(input: MappedProject): ProjectMapper {
    const mapped: Partial<Projects> = this._map(input);
    return ObjectMapper.deserialize(ProjectMapper, mapped);
  }

  _map(input: MappedProject) {
    return mapObject(input, (prop, propName) => {
      if (propName === "id") {
        return Number(prop);
      }
      if (propName === "technologies") {
        return (prop as Technologies[]).map((t) => t.name);
      }
      if (typeof prop === "string") {
        return prop.trim();
      }
      return prop;
    });
  }
}

type MappedProject = {
  [x: string]:
    | string
    | string[]
    | number
    | ProjectTypes
    | null
    | Technologies[];
};

export const toProjectVM = (input: MappedProject) => {
  return new ProjectMapper().create(input).toJSON<ProjectVM>();
};
