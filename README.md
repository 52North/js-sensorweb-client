## 52°North JavaScript SOS Client

This client consumes instances of the [timeseries-api](https://github.com/52north/timeseries-api). By requesting the REST interface it gets stations and regarding timeseries.

### Build the client

To build a minified version, change the following line in the `pom.xml`
```
<skipMinify>true</skipMinify>
```
and add the `min` postfix to the css and javascript imports in the index.html:
```
<link href="css/mswc.${project.version}.min.css" rel="stylesheet">
<script src="js/mswc.${project.version}.min.js"></script>
```
after that, you can simply build a war-file with
```
mvn clean install
```

### Contacts

For questions and comments please contact [Jan Schulte](mailto:j.schulte@52north.org)
