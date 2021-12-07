import { JsonProperty, ObjectMapper } from "json-object-mapper";
import { Selector } from "./selector";
import { mapObject } from "map-anything";

export type UserType = Pick<
  UserMapper,
  "id" | "name" | "description" | "photo" | "sphere"
>;

export class UserMapper extends Selector {
  @JsonProperty()
  public name?: string = undefined;

  @JsonProperty()
  public description?: string = undefined;

  @JsonProperty()
  public photo?: string = undefined;

  @JsonProperty()
  public sphere?: string = undefined;

  create(input: any): UserMapper {
    return ObjectMapper.deserialize(UserMapper, input);
  }
}

export const toUser = (input: any) => {
  const mappedInput = mapObject(input, (prop, propName) => {
    if (propName === "id") {
      return Number(prop);
    }
    if (typeof prop === "string") {
      return prop.trim();
    }
    return prop;
  });

  console.log(mappedInput);
  return new UserMapper().create(mappedInput).toJSON<UserType>();
};
