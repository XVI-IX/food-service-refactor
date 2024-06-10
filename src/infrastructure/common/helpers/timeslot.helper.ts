import { envConfig } from 'src/infrastructure/config/environment.config';

interface Location {
  latitude: string;
  longitude: string;
}

// d = 2 * R * arcsin( sqrt( sin( (lat2 - lat1) * π/180 / 2 )^2 + cos( lat1 * π/180 ) * cos( lat2 * π/180 ) * sin( (lon2 - lon1) * π/180 / 2 )^2 ) )

export class TimeslotHelper {
  haversineDistance(
    centerPointLocation: Location,
    endPointLocation: Location,
  ): string {
    const earthRadius = envConfig.getEarthRadius();
    const partA =
      Math.pow(
        Math.sin(
          ((Number(endPointLocation.latitude) -
            Number(centerPointLocation.latitude)) *
            Math.PI) /
            180 /
            2,
        ),
        2,
      ) +
      Math.cos((Number(centerPointLocation.latitude) * Math.PI) / 180) *
        Math.cos((Number(endPointLocation.latitude) * Math.PI) / 180) *
        Math.sin(
          Math.pow(
            ((Number(endPointLocation.longitude) -
              Number(centerPointLocation.longitude)) *
              Math.PI) /
              180 /
              2,
            2,
          ),
        );

    const distance = 2 * earthRadius * Math.asin(partA);

    return String(distance);
  }
}
