# Aplicación de los principios SOLID en el Backend

Este proyecto fue desarrollado en Node.js con Express, simulando una API RESTful para la gestión de productos. Se trabajó completamente en **memoria volátil**, utilizando un arreglo como estructura de datos central, sin persistencia en base de datos.

A continuación, se describe cómo se aplicaron los principios **SOLID** en el diseño del backend:

---

## 🟢 S — Single Responsibility Principle (SRP)

Cada archivo y módulo del sistema cumple **una única responsabilidad**:

- `productController.js`: Gestiona la lógica de negocio relacionada con los productos (crear, listar, buscar, eliminar, ordenar).
- `productRoutes.js`: Define las rutas de acceso a la API.
- `productStore.js`: Almacena los datos en memoria de forma temporal.
- `server.js`: Configura y lanza el servidor, integrando los demás módulos.

Esta separación hace que cada componente sea fácilmente modificable, sin afectar al resto del sistema.

---

## 🟠 O — Open/Closed Principle (OCP)

El sistema está **abierto a extensión pero cerrado a modificación**:

- Se puede agregar fácilmente una nueva forma de ordenamiento, validación o filtro (por ejemplo: buscar por rango de precios) sin modificar la lógica existente, simplemente extendiendo el controlador.

---

## 🔵 L — Liskov Substitution Principle (LSP)

Aunque el proyecto no usa clases hijas o polimorfismo, se respeta el principio en la forma de acceso a la estructura de datos:

- El módulo `productStore` podría ser reemplazado por otra implementación (por ejemplo, `Map`, `Set` o una conexión a base de datos) sin necesidad de cambiar la lógica del controlador, mientras se mantenga la misma interfaz (métodos como `.push()`, `.find()`, etc.).

---

## 🟣 I — Interface Segregation Principle (ISP)

En un entorno sin interfaces como tal (por ser JavaScript puro), se aplica este principio a través de la **división de responsabilidades**:

- Cada función del controlador cumple con una tarea específica y pequeña (por ejemplo, `getAllProducts`, `deleteProductById`, etc.), evitando obligar a una sola función a manejar múltiples casos o comportamientos innecesarios.

---

## ⚫ D — Dependency Inversion Principle (DIP)

Aunque no se utiliza un sistema de inyección de dependencias formal, se respeta el espíritu del principio:

- El controlador no depende directamente de cómo se almacena la información (`productStore.js`), solo interactúa con su interfaz básica (el arreglo). 
- En una versión más avanzada, este módulo podría reemplazarse por un servicio más complejo sin cambiar el resto del sistema.

---

## ✅ Conclusión

El proyecto aplica de forma clara y sencilla los principios SOLID, asegurando una estructura limpia, organizada y mantenible. Aunque se trata de un sistema pequeño y sin persistencia, se sientan las bases para un desarrollo escalable en el futuro.
