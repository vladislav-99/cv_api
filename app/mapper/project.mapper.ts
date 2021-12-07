import {
  CacheKey,
  Deserializer,
  JsonProperty,
  ObjectMapper,
  Serializer,
} from "json-object-mapper";
import { Selector } from "./selector";
import { mapObject } from "map-anything";
import { ProjectTypes } from ".prisma/client";

export type ProjectType = Pick<
  ProjectMapper,
  "id" | "name" | "description" | "link" | "country" | "type"
>;

@CacheKey("ProjectTypeEnumSerializerDeserializer")
class TechnologyTypesEnumSerializerDeserializer
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
    serializer: TechnologyTypesEnumSerializerDeserializer,
    deserializer: TechnologyTypesEnumSerializerDeserializer,
  })
  public type?: ProjectTypes = undefined;

  create(input: any): ProjectMapper {
    return ObjectMapper.deserialize(ProjectMapper, input);
  }
}

export const toProject = (input: any) => {
  const mappedInput = mapObject(input, (prop, propName) => {
    if (propName === "id") {
      return Number(prop);
    }
    if (typeof prop === "string") {
      return prop.trim();
    }
    return prop;
  });

  return new ProjectMapper().create(mappedInput).toJSON<ProjectType>();
};
