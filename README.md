## 52°North JavaScript SOS Client

This client consumes instances of the [timeseries-api](https://github.com/52north/timeseries-api). By requesting the REST interface it gets stations and regarding timeseries.

### Build the client

To build the client as war file:
```
mvn clean install
```
To build a minified version, use the profile 'minify':
```
mvn clean install -P minify
```
To change the configuration, update the ```settings.js``` located in ```WebContent/js/models/``` to your needs. Do not remove any setting property, but provide empty lists if you remove all predefined values for a property.

### Contacts

Take a look at the documentation: http://52north.github.io/js-sensorweb-client/
For questions and comments please contact [Jan Schulte](mailto:j.schulte@52north.org)