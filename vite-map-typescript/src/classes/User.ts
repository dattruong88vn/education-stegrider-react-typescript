import { faker } from "@faker-js/faker";
import { type Mappable } from "./Map";

export class User implements Mappable {
  name: string;
  location: {
    lat: number;
    long: number;
  };

  constructor() {
    this.name = faker.name.firstName();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      long: parseFloat(faker.address.longitude()),
    };
  }

  markerContent(): string {
    return `
        <div>
          <h1>Hi ${this.name}</h1>
        <div>
      `;
  }
}
