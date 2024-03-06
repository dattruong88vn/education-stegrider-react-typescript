export interface Mappable {
  location: {
    lat: number;
    long: number;
  };
  markerContent(): string;
}

export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(ele: HTMLElement) {
    this.googleMap = new google.maps.Map(ele, {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0,
      },
    });
  }

  async addMarker(mappable: Mappable) {
    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      "marker"
    )) as google.maps.MarkerLibrary;

    const marker = new AdvancedMarkerElement({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.long,
      },
    });

    marker.addEventListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent(),
      });
      infoWindow.open(this.googleMap, marker);
    });
  }
}
