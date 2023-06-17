/**bcrypt es una librería de encriptación de contraseñas. Se utiliza para almacenar de manera segura contraseñas
 *  en bases de datos, de modo que aunque un atacante acceda a la base de datos, no pueda obtener las contraseñas
 *  en texto plano. bcrypt utiliza una técnica de hash de contraseña que es resistente a la fuerza bruta y los ataques
 *  de diccionario. Además, es una librería popular y bien mantenida que ha sido ampliamente utilizada en proyectos de software. */
const bcrypt = require('bcrypt');

/**La función createHash utiliza la librería bcrypt para generar un hash seguro a partir de una contraseña. 
 * En primer lugar, genera un "salt", que es un valor aleatorio utilizado para agregar entropía adicional al hash, 
 * y luego utiliza este "salt" y la función bcrypt.hashSync para generar el hash a partir de la contraseña suministrada 
 * como argumento. El resultado es el hash de la contraseña, que se utiliza comúnmente para almacenar 
 * la contraseña de forma segura en una base de datos o en otro lugar. */
const createHash = password => {
    const salt = bcrypt.genSaltSync(10);
    const passwordHashed = bcrypt.hashSync(password, salt);

    return passwordHashed;
}

/**La función isValidPasswordMethod compara una contraseña en texto plano con una contraseña ya encriptada de un usuario. 
 * La función utiliza el método compareSync de la biblioteca bcrypt para comparar los hashes de las contraseñas y determinar
 *  si son iguales. Si los hashes son iguales, significa que la contraseña en texto plano proporcionada es válida y 
 * devuelve true. En caso contrario, devuelve false. */
const isValidPasswordMethod = (password, user) => {
    const isValid = bcrypt.compareSync(password, user.password);

    return isValid;
}

module.exports = {
    createHash, 
    isValidPasswordMethod
};