## 52°North JavaScript Sensor Web Client

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

### Used Libraries

* [bootstrap 3.1.1](https://github.com/twbs/bootstrap)
* [jquery 1.10.2](https://jquery.com/)
* [bootstrap-datetimepicker](http://www.malot.fr/bootstrap-datetimepicker/)
* [jquery XDomainRequest 1.0.3](https://github.com/MoonScript/jQuery-ajaxTransport-XDomainRequest)
* [flot chart 0.8.2](http://www.flotcharts.org/)
* [gritter 1.7.4](https://github.com/jboesch/Gritter)
* [total-storage 1.1.2](https://github.com/Upstatement/jquery-total-storage)
* [leaflet 0.7.1](http://leafletjs.com/)
* [moment 2.9.0](http://momentjs.com/)
* [mustache](https://mustache.github.com/)
* [qr 1.1.2](https://github.com/neocotic/qr.js)
* [respond](https://github.com/scottjehl/Respond)

### Contacts

Take a look at the documentation: http://52north.github.io/js-sensorweb-client/
For questions and comments please contact [Jan Schulte](mailto:j.schulte@52north.org)
