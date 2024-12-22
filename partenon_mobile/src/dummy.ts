import museum from "views/Museum/models/museum";
import listOfMuseums from "views/Home/models/listOfMuseums";
import shortMuseum from "views/Home/models/shortMuseum";

//Este archivo contiene varios datos para mostrar como reemplazo de lo que enviaría el servidor.
//Como la aplicación (backend) no está instalada en un servidor público, es más difícil
//poner a prueba la funcionalidad de la API en la aplicación móvil (front), 
//por lo tanto se facilitan aquí respuestas ficticias del servidor.

const museo1DePinturas: museum = {
    name: "Museo de pinturas virtual",
    description: "Este museo se creó para probar la funcionalidad de la aplicación Partenón. Contie algunas de las pinturas más famosas en la historia.",
    expositions: [{
        name: "Guernica",
        category: "Pintura de historia",
        description: "Guernica es un cuadro de Pablo Picasso, pintado en París entre los meses de mayo y junio de 1937, cuyo título alude al bombardeo de Guernica, ocurrido el 26 de abril de dicho año, durante la guerra civil española."
    },
    {
        name: "La Gioconda",
        category: "Retrato pictórico",
        description: "El retrato de Lisa Gherardini, esposa de Francesco del Giocondo, más conocido como La Gioconda o Monna Lisa, es una obra pictórica del polímata renacentista italiano Leonardo da Vinci. Fue adquirida por el rey Francisco I de Francia a comienzos del siglo XVI y desde entonces es propiedad del Estado francés."
    },
    {
        name: "La noche estrellada",
        category: "Pintura del paisaje",
        description: "La noche estrellada es un óleo sobre lienzo del pintor postimpresionista neerlandés Vincent van Gogh. Pintado en junio de 1889, representa la vista desde la ventana orientada al este de su habitación de asilo en Saint-Rémy-de-Provence, justo antes del amanecer, con la adición de un pueblo imaginario."
    },
    {
        name: "Las meninas",
        category: "Retrato, Pintura de historia, Escena de género",
        description: "Las meninas o La familia de Felipe IV se considera la obra maestra del pintor del Siglo de Oro español Diego Velázquez. Acabado en 1656, según Antonio Palomino, fecha unánimemente aceptada por la crítica, corresponde al último periodo estilístico del artista, el de plena madurez."
    },
    {
        name: "El nacimiento de Venus",
        category: "Pintura de historia",
        description: "El nacimiento de Venus es un cuadro realizado por el pintor renacentista Sandro Botticelli, una de las obras cumbre del maestro florentino y del Quattrocento italiano. Está ejecutado al temple sobre lienzo y mide 278,5 cm de ancho por 172,5 cm de alto."
    }]
}


const museo2DeEsculturas: museum = {
    name: "Museo de esculturas virtual E.P.E.T. 4",
    description: "Este museo se creó para probar la funcionalidad de la aplicación Partenón. Contie algunas de las esculturas más famosas en la historia.",
    expositions: [{
        name: "La Piedad",
        category: "Escultura cristiana",
        description: "La Piedad es una escultura realizada en mármol por Miguel Ángel entre 1498 y 1500 para San Pedro del Vaticano, que aún hoy conserva su emplazamiento original. Representa a una juvenil Virgen María sosteniendo en su regazo a Cristo, descendido muerto de la cruz."
    },
    {
        name: "Venus de Milo",
        category: "Escultura griega",
        description: "Quizás la Venus de Milo sea la escultura griega más famosa del mundo. Se la conoce también con el nombre de Afrodita de Milos y debe su nombre a la isla griega donde se encontró semienterrada en 1820. Esta escultura es una de las mejores representaciones del período helenístico, caracterizada por la falta de los dos brazos."
    },
    {
        name: "Gran Esfinge de Guiza",
        category: "Escultura egipcia",
        description: "La Gran Esfinge de Guiza es una monumental escultura que se encuentra situada junto a las pirámides de Egipto en la ribera occidental del río Nilo, en la ciudad de Guiza. No solo está considerada una de las esculturas más famosas del mundo sino también la escultura monolítica más grande, mide 57 metros de longitud y 20 metros de altura, y la estatua monumental más antigua del planeta. Se estima que fue esculpida en el siglo XXVI a.c, formando parte del complejo funerario del rey, durante la dinastía IV de Egipto."
    },
    {
        name: "El David",
        category: "Escultura cristiana",
        description: "El David es una escultura de mármol blanco de 5,17 metros de altura y 5572 kilogramos de masa, realizada por Miguel Ángel Buonarroti entre 1501 y 1504 por encargo de la Opera del Duomo de la catedral de Santa María del Fiore de Florencia."
    },
    {
        name: "Cristo Redentor",
        category: "Estatua",
        description: "El Cristo Redentor o Cristo del Corcovado es una estatua art déco de Jesús de Nazaret con los brazos abiertos mostrando a la ciudad de Río de Janeiro, Brasil. La estatua tiene una altura de 38 metros sobre un pedestal de 8 metros."
    }]
}


const museo3DeLenguajes: museum = {
    name: "Museo de lenguajes virtual E.P.E.T. 4",
    description: "Este museo se creó para probar la funcionalidad de la aplicación Partenón. Contie algunos de los lenguajes de programación más famosos.",
    expositions: [{
        name: "Python",
        category: "Machine Learning",
        description: "Python es uno de los lenguajes de programación más usados actualmente y su uso sigue creciendo. Posee unas características muy potentes: es de código abierto, tiene una sintaxis sencilla y es fácil de entender, por lo que ahorra tiempo y recursos. Python es un lenguaje versátil que puede tener múltiples aplicaciones. Una de ellas, es la Inteligencia Artificial, gracias a bibliotecas como Keras o TensorFlow."
    },
    {
        name: "Java",
        category: "OOP",
        description: "Java es un lenguaje de propósito general, orientado a objetos y diseñado para tener las dependencias de implementación mínimas posibles. Con Java se pueden crear aplicaciones y procesos en múltiples dispositivos, por lo que es una muy buena opción si te preguntas qué lenguaje de programación aprender en 2022. Su ámbito de aplicación es muy amplio, por lo que permite crear software para dispositivos móviles, terminales de venta, IoT, además de páginas web."
    },
    {
        name: "C#",
        category: "Microsoft :(",
        description: "C# es otro de los mejores lenguajes de programación. Fue creado por Microsoft y está presente en entornos empresariales, como instituciones gubernamentales, entidades bancarias o médicas, entre otros. Aunque más allá de este tipo de aplicaciones, tiene también usos muy versátiles como el IoT, desarrollo de videojuegos, web o aplicaciones móviles…"
    },
    {
        name: "C++",
        category: "Lenguaje eficiente",
        description: "C++ se caracteriza por ser extremadamente rápido y estable, lo que lo sitúa como uno de los mejores lenguajes de programación y, por tanto, también uno de los lenguajes de programación más usados. Además, proporciona STL (biblioteca de plantillas estándar), es decir, un conjunto de bibliotecas listas para usar para diferentes estructuras de datos, operaciones aritméticas y algoritmos. El soporte de estas bibliotecas y la velocidad del lenguaje lo convierten en una opción muy popular entre la comunidad comercial de HFT (High Frecuency Trading)."
    },
    {
        name: "JavaScript",
        category: "Scripts",
        description: "JavaScript es uno de los lenguajes de programación más usados para crear páginas web dinámicas. Permite a los programadores implementar funciones complejas en las páginas web para añadirles más interactividad. Una página dinámica es aquella que incorpora efectos, como texto que aparece y desaparece, animaciones, acciones que se activan al pulsar botones y ventanas con mensajes de aviso al usuario."
    }]
}


const museo4DeDinosaurios: museum = {
    name: "Museo de dinosaurios virtual E.P.E.T. 4",
    description: "Este museo se creó para probar la funcionalidad de la aplicación Partenón. Contie algunos de los dinosaurios más famosos.",
    expositions: [{
        name: "Tiranousaurio Rex",
        category: "Bípedos predadores",
        description: "El Tiranousaurio Rex (Tyrannosaurus rex) cuyo nombre significa Reptil Tirano, vivió durante el periodo Cretácico tardío. Medía de 10 a 14 metros de longitud y pesaba entre cuatro y siete toneladas (su cráneo medía apenas 1,5 metros de largo). Era uno de los carnívoros más feroces y también de los más temidos. A pesar de su tamaño, muchos paleontólogos creen que podría correr eficientemente detrás de una presa y, ciertamente, superar a un humano"
    },
    {
        name: "Triceratops",
        category: "Bípedo herbívoro",
        description: "El Triceratops (Triceratops horridus), cuyo nombre significa Horrible Cabeza con Tres Cuernos, vivió durante el periodo Cretácico tardío hace 66-68 millones de años. Los especímenes adultos podían medir entre 8 y 9 metros de largo y 3 metros de alto, con una masa corporal de entre 6.000-12.000 kilos. Con su colosal tamaño, este dinosaurio se alimentaba de plantas duras y ricas en fibra. Fue el mayor de los dinosaurios cornudos de esta etapa. Los primeros fósiles conocidos de un Triceratops se encontraron cerca de Denver, Colorado en 1887."
    },
    {
        name: "Diplodocus",
        category: "Bípedo cuellilargo",
        description: "El Diplodocus (Diplodocus longus) cuyo nombre significa 'doble haz', hace referencia a los huesos de forma extraña que se encuentran en la cola del Diplodocus (que contenía alrededor de 80 vértebras). El extremo de su cola era tan delgado que le permitía usarla como un látigo para defenderse de los depredadores. Este dinosaurio vivió en un área que ahora es el oeste de América del Norte al final del período Jurásico, hace unos 150 millones de años. Parece que podía medir hasta 35 metros y pesar alrededor de 10 a 15 toneladas de peso. Vivió durante el periodo Jurásico tardío. Se trataba de un dinosaurio herbívoro que se alimentaba de hojas y frutos de árboles altos y arbustos, así como helechos y equisetos que crecían a nivel del suelo."
    },
    {
        name: "Velociraptor",
        category: "Raptores",
        description: "El Velociraptor (Velociraptor mongoliensis), cuyo nombre significa 'ladrón veloz', era de tamaño pequeño (aproximadamente 1,8 metros de longitud y apenas 15 kilogramos), más inteligente que la mayoría de los dinosaurios y un corredor rápido gracias a sus dos patas traseras. De hecho, podía alcanzar hasta 65 kilómetros por hora, lo que le venía de perlas para cazar presas, pues era carnívoro (su presa favorita pudo ser el protoceratops). Vivió durante el periodo Cretácico tardío y cazaba en grupo."
    },
    {
        name: "Estegosaurio",
        category: "Bípedo blindado",
        description: "Nadie sabe por qué el estegosaurio (que se traduce como 'lagarto cubierto') tenía placas tan distintivas que en promedio medían 60 centímetros de alto y de ancho. De promedio, medía alrededor de 9 metros de largo y 4 metros de alto y pesaba dos toneladas como máximo. Algunos creen que las placas puntiagudas de este dinosaurio podrían haber sido de colores brillantes y podrían moverse, y las puntas en la cola podrían haber sido horizontales en lugar de verticales, lo que ayudaría a alejar a los depredadores. El estegosaurio vivió en las llanuras de lo que es ahora Norteamérica hace unos 150 millones de años. Era un dinosaurio herbívoro de finales del período Jurásico."
    }]
}



const dummyListOfMuseums: shortMuseum[] = [
    {
        ID: 1,
        name: "Museo de pinturas virtual",
        description: "Este museo se creó para probar la funcionalidad de la aplicación Partenón. Contie algunas de las pinturas más famosas en la historia."
    },
    {
        ID: 2,
        name: "Museo de esculturas virtual E.P.E.T. 4",
        description: "Este museo se creó para probar la funcionalidad de la aplicación Partenón. Contie algunas de las esculturas más famosas en la historia."
    },
    {
        ID: 3,
        name: "Museo de lenguajes virtual E.P.E.T. 4",
        description: "Este museo se creó para probar la funcionalidad de la aplicación Partenón. Contie algunos de los lenguajes de programación más famosos."
    },
    {
        ID: 4,
        name: "Museo de dinosaurios virtual E.P.E.T. 4",
        description: "Este museo se creó para probar la funcionalidad de la aplicación Partenón. Contie algunos de los dinosaurios más famosos."
    },
    {
        ID: 1,
        name: "Museo de pinturas virtual",
        description: "Este museo se creó para probar la funcionalidad de la aplicación Partenón. Contie algunas de las pinturas más famosas en la historia."
    },
    {
        ID: 2,
        name: "Museo de esculturas virtual E.P.E.T. 4",
        description: "Este museo se creó para probar la funcionalidad de la aplicación Partenón. Contie algunas de las esculturas más famosas en la historia."
    },
    {
        ID: 3,
        name: "Museo de lenguajes virtual E.P.E.T. 4",
        description: "Este museo se creó para probar la funcionalidad de la aplicación Partenón. Contie algunos de los lenguajes de programación más famosos."
    },
    {
        ID: 4,
        name: "Museo de dinosaurios virtual E.P.E.T. 4",
        description: "Este museo se creó para probar la funcionalidad de la aplicación Partenón. Contie algunos de los dinosaurios más famosos."
    },
    {
        ID: 1,
        name: "Museo de pinturas virtual",
        description: "Este museo se creó para probar la funcionalidad de la aplicación Partenón. Contie algunas de las pinturas más famosas en la historia."
    },
    {
        ID: 2,
        name: "Museo de esculturas virtual E.P.E.T. 4",
        description: "Este museo se creó para probar la funcionalidad de la aplicación Partenón. Contie algunas de las esculturas más famosas en la historia."
    },
    {
        ID: 3,
        name: "Museo de lenguajes virtual E.P.E.T. 4",
        description: "Este museo se creó para probar la funcionalidad de la aplicación Partenón. Contie algunos de los lenguajes de programación más famosos."
    },
    {
        ID: 4,
        name: "Museo de dinosaurios virtual E.P.E.T. 4",
        description: "Este museo se creó para probar la funcionalidad de la aplicación Partenón. Contie algunos de los dinosaurios más famosos."
    },
    {
        ID: 1,
        name: "Museo de pinturas virtual",
        description: "Este museo se creó para probar la funcionalidad de la aplicación Partenón. Contie algunas de las pinturas más famosas en la historia."
    },
    {
        ID: 2,
        name: "Museo de esculturas virtual E.P.E.T. 4",
        description: "Este museo se creó para probar la funcionalidad de la aplicación Partenón. Contie algunas de las esculturas más famosas en la historia."
    },
    {
        ID: 3,
        name: "Museo de lenguajes virtual E.P.E.T. 4",
        description: "Este museo se creó para probar la funcionalidad de la aplicación Partenón. Contie algunos de los lenguajes de programación más famosos."
    }
]



export function getDummyListOfMuseums(page: number): listOfMuseums {
    return {museums: dummyListOfMuseums.slice(page===1?12:0, page===1?undefined:12), last: page===1, totalPages: 2}
}

export function getDummyMuseumByID(ID: number) {
    switch (ID) {
        case 1: return museo1DePinturas;
        case 2: return museo2DeEsculturas;
        case 3: return museo3DeLenguajes;
        case 4: return museo4DeDinosaurios;
    }
}
