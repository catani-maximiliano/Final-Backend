const {faker} = require("@faker-js/faker")
/**faker-js es una biblioteca de generación de datos falsos que puede ser utilizada en aplicaciones de 
 * pruebas, ejemplos, y cualquier otra aplicación que requiera datos de prueba. La biblioteca proporciona 
 * una amplia gama de funciones para generar nombres, direcciones, números de teléfono, correos electrónicos, 
 * fechas, etc. Al importar el módulo y asignarlo a la constante faker, podemos usar las funciones proporcionadas 
 * por la biblioteca para generar datos falsos en nuestro código. */

faker.locale = "es";

/**
La función createMock genera un array de objetos simulando un conjunto de productos ficticios. 
La cantidad de productos que se desean crear se define con el parámetro number.

Para cada producto se generan las siguientes propiedades utilizando la librería Faker:

id: identificador numérico único.
title: nombre del producto.
description: descripción del producto.
price: precio del producto.
thumbail: imagen del producto.
code: código numérico del producto.
stock: cantidad disponible en inventario.
status: estado del producto (true: disponible, false: no disponible).
category: categoría del producto.
Cada propiedad del objeto producto es simulada por Faker para obtener valores aleatorios y realistas. */
const createMock = (number) => {

    const products = [];

    for(let i=0; i<number; i++){
        const product = {
            id: i+1,
            title: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            thumbail: faker.image.abstract(),
            code: faker.datatype.number(),
            stock: faker.datatype.number(),
            status: true,
            category: faker.commerce.product()
        }

        products.push(product);
    };

    return products;
}

module.exports = createMock;