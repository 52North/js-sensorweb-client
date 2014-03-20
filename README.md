## 52°North JavaScript SOS Client

This client consumes instances of the [timeseries-api](https://github.com/52north/timeseries-api). By requesting the REST interface it gets stations and regarding timeseries.

### Build the client

To build the client as war file:
```
mvn clean install
```
To build a minified version, use the profile 'minify'
```
mvn clean install -P minify
```

### Contacts

For questions and comments please contact [Jan Schulte](mailto:j.schulte@52north.org)
