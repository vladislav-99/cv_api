import { JsonProperty, ObjectMapper } from "json-object-mapper";

export abstract class Selector {
  public id?: number = undefined;

  abstract create(input: any): any;

  public toJSON<T>(): T {
    return JSON.parse(<string>ObjectMapper.serialize(this));
  }
}
