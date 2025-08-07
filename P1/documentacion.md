# Aplicación de los principios SOLID en el servidor Backend

Este proyecto fue desarrollado en Node.js con Express, simulando una API RESTful para la gestión de productos. Se trabajó para el almacenamiento de datos en memoria volátil, utilizando un arreglo como estructura de datos central, sin persistencia en base de datos.

A continuación, se describe cómo se aplicaron los principios **SOLID** en el diseño del backend:

---

## S — Single Responsibility Principle (SRP)

Cada archivo y módulo del sistema cumple **una única responsabilidad**:

- `productController.js`: Gestiona la lógica de negocio relacionada con los productos (crear, listar, buscar, eliminar, ordenar).
- `productRoute.js`: Define las rutas de acceso(GET,POST,DELETE) a la API.
- `productDB.js`: Almacena los datos en memoria de forma temporal con la lista creada.
- `server.js`: Configura y lanza el servidor, integrando los demás módulos.

Esta separación hace que cada componente sea fácilmente modificable, sin afectar al resto del sistema.

### Ejemplo funcional

```js
const products = require('../data/productDB');

// Solo maneja la lógica de listar productos
const getAllProducts = (req, res) => {
  return res.json(products);
};

module.exports = { getAllProducts };
```

---

## O — Open/Closed Principle (OCP)

El sistema está **abierto a extensión pero cerrado a modificación**:

- Se puede agregar fácilmente una nueva forma de ordenamiento, validación o filtro (por ejemplo: buscar por rango de precios) sin modificar la lógica existente, simplemente extendiendo el controlador.
- El servidor puede extenderse a mas  metodos que se pueden usar desde el `productController.js` pero no puede modificarse el modo como  el enrutador `productRoute.js` llama a los metodos para poder ser utilizados, tomando en cuenta que ya es un orden y estructura establecida en el servidor de NodeJS.

### Ejemplo funcional

```js
// Clase base
class Shape {
  area() {
    throw new Error('Método area() debe ser implementado');
  }
}

// Clases concretas
class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  area() {
    return this.width * this.height;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  area() {
    return Math.PI * Math.pow(this.radius, 2);
  }
}

class Triangle extends Shape {
  constructor(base, height) {
    super();
    this.base = base;
    this.height = height;
  }
  area() {
    return (this.base * this.height) / 2;
  }
}


function printArea(shape) {
  console.log(`Área: ${shape.area()}`);
}

// Uso
const shapes = [
  new Rectangle(4, 5),
  new Circle(3),
  new Triangle(4, 6) 
];

shapes.forEach(shape => printArea(shape));
```
---

## L — Liskov Substitution Principle (LSP)

Aunque la practica actual no usa clases hijas o polimorfismo, se respeta el principio en la forma de acceso a la estructura de datos:

- El módulo `productDB` podría ser reemplazado por otra implementación como por ejemplo, `Map`, `Set` o una conexión a base de datos, en MongoDB como se hicieron pruebas anteriormente, sin necesidad de cambiar la lógica del controlador, mientras se mantenga la misma interfaz.

### Ejemplo funcional

```js
// alternativaProductDB.js
const productMap = new Map();
module.exports = {
  getAll: () => Array.from(productMap.values()),
  add: (product) => productMap.set(product.id, product),
};
```
---

## I — Interface Segregation Principle (ISP)

En un entorno sin interfaces como tal, esto se puede corregir utilizando TypeScript, se aplica este principio a través de la **división de responsabilidades**:

- Cada función del controlador cumple con una tarea específica y pequeña por ejemplo, `getAllProducts`, `deleteProductById`,que son funciones que sirven especificamente para una  tarea especifica, no se mezclan otros metodos y no dependen de otros metodos para que funcionen como tal, evitando obligar a una sola función a manejar múltiples casos o comportamientos innecesarios.

### Ejemplo funcional

```js

// Solo elimina un producto, no hace más
const deleteProductById = (req, res) => {
  const { id } = req.params;
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ message: 'No encontrado' });
  products.splice(index, 1);
  return res.json({ message: 'Eliminado' });
};
```

---

## D — Dependency Inversion Principle (DIP)

Aunque no se utiliza un sistema de inyección de dependencias formal, se respeta el espíritu del principio:

- El controlador no depende directamente de cómo se almacena la información en `productDB.js`, solo interactúa con su interfaz básica que es el arreglo. 
- En una versión más avanzada, este módulo podría reemplazarse por un servicio más complejo sin cambiar el resto del sistema, como utilizar un RDS para conexión con la nube o un contenedor en Docker con Redis para llevar un arreglo de registro de los productos.


### Ejemplo funcional

```js


let products = [];

const getAll = () => products;
const add = (product) => products.push(product);

module.exports = { getAll, add };

// controller.js
const products = require('../data/productDB');

const createProduct = (req, res) => {
  const newProduct = { id: Date.now().toString(), ...req.body };
  products.add(newProduct);
  res.status(201).json(newProduct);
};


```