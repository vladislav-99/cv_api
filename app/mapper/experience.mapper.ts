import { JsonProperty, ObjectMapper } from "json-object-mapper";
import { Selector } from "./selector";
import { mapObject } from "map-anything";

export type ExperienceType = Pick<ExperienceMapper, "id" | "name">;

export class ExperienceMapper extends Selector {
  @JsonProperty()
  public name: string = "";

  create(input: any): ExperienceMapper {
    return ObjectMapper.deserialize(ExperienceMapper, input);
  }
}

export const toExperience = (input: any) => {
  const mappedInput = mapObject(input, (prop, propName) => {
    if (propName === "id") {
      return Number(prop);
    }
    if (typeof prop === "string") {
      return prop.trim();
    }
    return prop;
  });

  return new ExperienceMapper().create(mappedInput).toJSON<ExperienceType>();
};
