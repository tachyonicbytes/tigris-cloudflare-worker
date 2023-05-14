import {
  Field,
  PrimaryKey,
  TigrisCollection,
  TigrisDataTypes,
} from "@tigrisdata/core";

export class ProductAttributes {
  @Field()
  name: string;

  @Field()
  value: string;
}

@TigrisCollection("catalog")
export class Catalog {
  @PrimaryKey(TigrisDataTypes.INT64, { order: 1, autoGenerate: true })
  id?: string;

  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  brand: string;

  @Field(TigrisDataTypes.INT32)
  popularity: number;

  @Field({ elements: ProductAttributes })
  attributes: Array<ProductAttributes>;
}
