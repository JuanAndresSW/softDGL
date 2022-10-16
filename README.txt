#################################################################################
- Para ejecutar el Back-End es necesario contar con: 
	* AdoptOpenJDK 17
	* Maven 3
*RECOMENDACION*
Utilizar el IDE: IntelliJ IDEA Comunity Edition
Este contiene Maven integrado por lo tanto no seria necesaria su instalacion

Para hacerlo consola, debera tener definida las Variable JAVA_HOME 
Y el comando a ejecutar:
mvnw spring-boot:run -f pom.xml
(La consola en la ruta ...\Partenon\partenon-back)


#################################################################################
- Para la base de datos es necesari0 contar con:
	* MySQL 8
	* MySQL Work Bench (Opcional)
El esquema de la base de datos se encuentra en: 
	..\Partenon\partenon-back\data

Puede ejecutar el SQL desde consola o con MySQL WorkBench

*IMPORTANTE*
En el archivo application.yml (Archivo de configuracion del Back) 
	Que se en encuentra en la ruta: ..\Partenon\partenon-back\src\main\resources
Debera adaptar estos valores a los suyos:
	password: admin
(Contraseña de usuario Local de MySQL)
	url: jdbc:mysql://localhost:3306/partenon_db?useSSL=true&useTimezone=true
(En la URL verifique el puerto en este caso es "3306")
	username: root
(Nombre de usuario Local de MySQL)

#################################################################################
- Para el front-end es necesario contar con:
	* NodeJS 16
El frontend lo podes encontrar en: ...\Partenon\partenon-back\frontend

Primero debera instalar las dependencias, para esto desde la consola ejecute
 npm install
Y en caso de fallo:
 npm install -f

Una vez instaladas, podra ejecutar con:
npm start
#################################################################################
