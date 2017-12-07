# GTFS Viewer

[GTFS Viewer](http://www.gtfsviewer.xyz) is a single page application that displays transit information using the [General Transit Feed Specification (GTFS)](https://developers.google.com/transit/gtfs/). The information is retrieved from the [GTF Viewer API](https://github.com/kurtishouser/gtfs-viewer-api), a separate backend Node application utilizing PostgreSQL to store the GTFS data.

The application displays agency information, all associated routes and the actual paths representing each route. Hovering over a route name will highlight the path. Routes can be filtered by type (Tram, Bus, Cable Car), direction (Outbound, Inbound) and service (Weekdays, Saturday, Sunday). Currently, the filtering is specific to [San Francisco Muni](https://www.sfmta.com/muni) but this will change in the future to accommodate any valid GTFS information stored in the database.

### The Interface

![gtfs-viewer](https://user-images.githubusercontent.com/5109163/33690042-9c267cf2-da96-11e7-80a6-a7cbe0a64eb6.jpg)

### Tech Stack
**Frontend:**

React, Redux, Semantic UI React, D3

**Backend:**

Node, Express, PostgreSQL, Knex

**Deployment:**

The application was deployed to AWS and uses Elastic Beanstalk, EC2, S3, RDS and Route 53.
