import {
  CacheKey,
  Deserializer,
  JsonProperty,
  ObjectMapper,
  Serializer,
} from "json-object-mapper";

import { Selector } from "./selector";
import { mapObject } from "map-anything";
import { Projects, ProjectTypes } from ".prisma/client";
import { ProjectDTO } from "./DTOtypes";

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

  @JsonProperty()
  public description?: string = undefined;

  @JsonProperty()
  public link?: string = undefined;

  @JsonProperty()
  public country?: string = undefined;

  @JsonProperty()
  public photos?: string[] = undefined;

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
      if (typeof prop === "string") {
        return prop.trim();
      }
      return prop;
    });
  }
}

type MappedProject = {
  [x: string]: string | string[] | number | ProjectTypes | null;
};

export const toProject = (input: MappedProject) => {
  return new ProjectMapper().create(input).toJSON<ProjectDTO>();
};
