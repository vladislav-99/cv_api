import {
  CacheKey,
  Deserializer,
  JsonProperty,
  ObjectMapper,
  Serializer,
} from "json-object-mapper";
import { Selector } from "./selector";
import { mapObject } from "map-anything";
import { TechnologyTypes } from "@prisma/client";

@CacheKey("TechnologyTypeEnumSerializerDeserializer")
class TechnologyTypesEnumSerializerDeserializer
  implements Deserializer, Serializer
{
  deserialize = (value: TechnologyTypes): TechnologyTypes => {
    return TechnologyTypes[value];
  };

  serialize = (value: TechnologyTypes): string => {
    return '"' + TechnologyTypes[value] + '"';
  };
}

export class TechnologyMapper extends Selector {
  @JsonProperty()
  public name?: string = undefined;

  @JsonProperty({
    type: TechnologyTypes,
    deserializer: TechnologyTypesEnumSerializerDeserializer,
    serializer: TechnologyTypesEnumSerializerDeserializer,
  })
  public type?: TechnologyTypes = undefined;

  create(input: any): TechnologyMapper {
    return ObjectMapper.deserialize(TechnologyMapper, input);
  }
}

export const toTechnology = (input: any) => {
  const mappedInput = mapObject(input, (prop, propName) => {
    if (propName === "id") {
      return Number(prop);
    }
    if (typeof prop === "string") {
      return prop.trim();
    }

    return prop;
  });
  return new TechnologyMapper().create(mappedInput).toJSON<TechnologyMapper>();
};
