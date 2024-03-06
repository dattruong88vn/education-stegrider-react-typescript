import { faker } from "@faker-js/faker";
import { type Mappable } from "./Map";

export class Company implements Mappable {
  companyName: string;
  catchPhrase: string;
  location: { lat: number; long: number };

  constructor() {
    this.companyName = faker.company.name();
    this.catchPhrase = faker.company.catchPhrase();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      long: parseFloat(faker.address.longitude()),
    };
  }

  markerContent(): string {
    return `
        <div>
          <h1>Hi ${this.companyName}</h1>
        <div>
      `;
  }
}
