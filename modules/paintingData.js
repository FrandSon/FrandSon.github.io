export const paintingData = [];

const wallHeight = 40;
const centerWallHeight = 25;
const centerWallWidth = 60;

// Configs
const mainPaintingHeight = wallHeight * 0.7; // 28
const mainPaintingWidth = mainPaintingHeight * 1.2; // ~33.6
const centerPaintingHeight = centerWallHeight * 0.8; // 20

// Ancho ajustado para ocupar el 40% del muro central
const centerPaintingWidth = centerWallWidth * 0.4; // 24

const mainY = 13;

// Base de datos de las obras extraída del documento (16 items)
// Nota: Las imágenes deben guardarse en la carpeta 'artworks' como '1.jpg', '2.jpg', ..., '16.jpg'
const artworks = [
  // 1. Fuego (Front Wall 1)
  {
    imgSrc: 'artworks/1.jpg',
    info: {
      title: 'Control del Fuego por Fricción',
      artist: 'Culturas Prehistóricas',
      year: '7000-4000 a.C.',
      description: 'El descubrimiento del fuego generado intencionalmente representa uno de los mayores ejemplos de aprendizaje mediante ensayo y error de la humanidad. Investigaciones arqueológicas confirman que los primeros homínidos solo conservaban fuegos naturales (rayos, erupciones) hace 400,000-1.5 millones de años, pero la generación artificial mediante fricción o percusión surgió mucho más tarde. Los primeros métodos de fricción requirieron miles de años de experimentación con diferentes tipos de madera (seca vs. verde), velocidades de rotación, y técnicas de presión. Los primeros intentos generaban chispas inútiles o simples abrasiones. La clave fue descubrir que ciertas combinaciones específicas——madera dura girando sobre madera blanda con cavidad, con tinder apropiado (hongos, corteza fina)——producían brasas. Este "fracaso milenario" de elección incorrecta de materiales y técnica eventualmente dio paso a una tecnología que revolucionó la supervivencia humana, permitiendo cocinar alimentos, crear herramientas cerámicas, y protegerse de depredadores.'
    }
  },
  // 2. Alquimia (Front Wall 2)
  {
    imgSrc: 'artworks/2.png',
    info: {
      title: 'Alquimia Transmutativa',
      artist: 'Alquimistas Medievales',
      year: 'Siglos II-XVIII d.C.',
      description: 'Históricamente verificado: alquimistas dedicaron siglos a buscar la "piedra filosofal" para convertir metales básicos en oro. Este fracaso sistemático nunca logró su objetivo principal, pero generó hallazgos colaterales fundamentales. Al mezclar y calentar minerales al azar, descubrieron propiedades químicas básicas: destilación, sublimación, y separación de compuestos. Un texto taoísta del siglo IX documenta cómo alquimistas quemaron sus laboratorios al mezclar sulfuro, salitre y carbón buscando inmortalidad——fracaso que creó la pólvora. Aunque la transmutación nuclear de plomo en oro fue finalmente lograda en el CERN (2025) mediante colisionadores de hadrones, la alquimia medieval fracasó en su propósito económico pero fundó la química experimental. Los alquimistas desarrollaron los primeris conceptos de reacciones químicas, catalizadores y pureza de materiales.'
    }
  },
  // 3. Canales Hohokam (Front Wall 3)
  {
    imgSrc: 'artworks/3.jpeg',
    info: {
      title: 'Canales Hohokam',
      artist: 'Pueblo Hohokam',
      year: '450-1450 d.C.',
      description: 'Arqueológicamente confirmado: el colapso de diques simples en el río Salt llevó a los Hohokam a desarrollar un sistema de canales con pendientes de solo 0.0010-0.0015 (0.06-0.09 grados), una precisión hidráulica impresionante para evitar erosión. Los primeros intentos con canales rectos y embaulles rudimentarios fallaban durante inundaciones, rompiendo y sedimentando. La solución fue crear canales principales con gradientes mínimos, compuertas de piedra en cruces estratégicos, y un sistema de ramificaciones de 3 niveles (principal, secundario, lateral) que distribuían agua a 110,000 acres. Este fracaso inicial de ingeniería básica evolucionó en la red de irrigación más compleja de la América precolombiana. La precisión del 0.1 grado mencionada es documentada en estudios hidráulicos modernos que recrean sus sistemas, demostrando que cualquier pendiente mayor causaba erosión catastrófica en el suelo desértico.'
    }
  },
  // 4. Longships Vikingos (Back Wall 1)
  {
    imgSrc: 'artworks/4.jpg',
    info: {
      title: 'Longships Vikingos',
      artist: 'Escandinavos Vikingos',
      year: 'Siglos VIII-XI d.C.',
      description: 'Completamente verificado por hallazgos arqueológicos: los primeros barcos vikingos con construcción smooth-hull (casco liso de tablones unidos) se partían en el Atlántico porque carecían de flexibilidad torsional. Los primeros intentos con clavos de hierro rectos y tablones ajustados sin superposición resultaban en cascos rígidos que se fracturaban frente a olas de tormenta. El fracaso llevó a desarrollar la técnica "clinker-built" (solapado), donde cada tabla (strake) se superpone a la inferior con clavos de 3 pulgadas, creando un casco que se flexiona como un muelle. Este "error" de diseño inicial se convirtió en la clave del éxito: el barco absorbía impactos, tenía menor peso (ahorrando madera), y permitía reparaciones rápidas en el mar. Los longships construidos con esta técnica lograron viajar de Noruega a Groenlandia con solo 30-40 tripulantes, un logro imposible con diseños rígidos previos.'
    }
  },
  // 5. Chinampas (Back Wall 2)
  {
    imgSrc: 'artworks/5.jpg',
    info: {
      title: 'Chinampas Aztecas',
      artist: 'Cultura Azteca',
      year: 'Siglos XII-XVI d.C.',
      description: 'Confirmado por fuentes etnohistóricas y arqueológicas: los aztecas fracasaron repetidamente al intentar cultivar en tierras pantanosas del lago Texcoco, donde las inundaciones estacionales destruían cosechas. Los primeros intentos de diques de tierra pura colapsaban por saturación. La solución fue crear islas flotantes artificiales (chinampas) ancladas con raíces de sauce (Salix spp.) y ahuejotes (Taxodium), que fijaban el sedimento. Este "fracaso" agrícola se convirtió en el sistema más productivo de Mesoamérica: cada chinampa rendía 4 cosechas anuales (vs. 1-2 en tierra firme), alimentando a Tenochtitlán (200,000 habitantes). La clave fue el error inicial: al ver que los diques simples se desmoronaban, observaron que las raíces de árboles riparios naturalmente estabilizaban las orillas, aplicando esta biotécnica a escala masiva.'
    }
  },
  // 6. Pólvora (Back Wall 3)
  {
    imgSrc: 'artworks/6.jpg',
    info: {
      title: 'La Pólvora',
      artist: 'Alquimistas Taoístas',
      year: 'Dinastía Tang, ~850 d.C.',
      description: 'Textos chinos como Zhenyuan miaodao yaolüe (siglo IX) documentan este fracaso épico: alquimistas mezclaban 75% nitrato de potasio (salitre), 15% carbón, 10% azufre buscando el "elixir de inmortalidad". La mezcla, llamada huoyo ("medicina de fuego"), no prolongó la vida sino que quemó manos, rostros e incluso destruyó laboratorios completos. El "error" de buscar vida eterna creó la primera explosión química controlada. El Wujing zongyao (1044 d.C.) registra el primer uso militar: lanzallamas y cohetes. Este fracaso alquímico transformó la guerra global durante mil años. Curiosamente, la proporción "óptima" descubierta por accidente (75-15-10) sigue siendo la fórmula estándar hoy. Los alquimistas no obtuvieron inmortalidad, pero su fracaso permitió explosivos que cambiaron la historia de la humanidad.'
    }
  },
  // 7. Ornitóptero (Left Wall 1)
  {
    imgSrc: 'artworks/7.jpg',
    info: {
      title: 'El Ornitóptero',
      artist: 'Leonardo da Vinci',
      year: '~1485-1510 d.C.',
      description: 'Confirmado por los Codex Forster y Codex Atlanticus: Leonardo diseñó más de 500 páginas de estudios de vuelo de aves, concluyendo que el humano no tiene la potencia muscular necesaria. Su ornitóptero usaba palancas de mano y pedales de pie para batir alas membranosas, pero calculó que un hombre promedio necesita 3.5 caballos de vapor (2,600 watts) solo para despegar, mientras músculos humanos máximos producen 400 watts sostenidos. Este "fracaso mecánico" fue revolucionario: demostró mediante biomecánica cuantitativa (cálculo de momento de inercia, resistencia alar) que el vuelo humano alado era imposible sin motor. Su error fue conceptual (intentar imitar aves vs. usar aerodinámica fija), pero sus dibujos perdidos durante 300 años inspiraron el desarrollo de aerodinámica moderna. Curiosamente, el ornitóptero de Leonardo nunca se construyó (él mismo abandonó el proyecto), pero su análisis de que "el peso corporal supera la potencia muscular" fue el primer estudio científico de viabilidad de vuelo, desviando esfuerzos hacia globos y planeadores.'
    }
  },
  // 8. Mecanismo de Anticitera (Left Wall 2)
  {
    imgSrc: 'artworks/8.jpg',
    info: {
      title: 'Mecanismo de Anticitera',
      artist: 'Grecia Antigua',
      year: '~200-87 a.C.',
      description: 'Verificado por tomografía computarizada (2005): este mecanismo de 37 engranajes de bronce fue tan complejo que, tras hundirse el barco romano que lo transportaba (~60 a.C.), la humanidad perdió la capacidad tecnológica de fabricar algo similar por 1,500 años. Inscripciones griegas revelan que calculaba eclipses, posiciones lunares, y ciclos olímpicos con precisión. El "fracaso" fue tectónico (naufragio) y cultural: el conocimiento helicenístico se perdió porque romanos no valoraron la mecánica celeste, y la manufactura de engranajes de este nivel (con dientes triangulares, no cuadrados) requería talleres especializados desaparecidos. Cuando Jacopo de\' Dondi construyó el primer reloj astronómico europeo (1364 d.C.), usó engranajes similares sin saber que ya existían. El mecanismo no fue "olvidado" sino que su tecnología fue ininteligible para generaciones posteriores. Hoy es considerado el primer computador analógico, y su existencia demuestra que el progreso no es lineal: una catástrofe puede borrar avances que tardarán milenios en recuperarse.'
    }
  },
  // 9. Motor de Vapor de Herón (Left Wall 3)
  {
    imgSrc: 'artworks/9.jpg',
    info: {
      title: 'La Eolípila',
      artist: 'Herón de Alejandría',
      year: '10-70 d.C.',
      description: 'Históricamente confirmado por Pneumatica de Herón: la eolípila fue un motor de reacción de vapor que giraba una esfera hueca mediante chorros de vapor. Sin embargo, fue conceptualmente un fracaso tecnológico porque produjo menos de 1 caballo de vapor, requería esclavos para alimentar el fuego constantemente, y generaba menos trabajo que el mismo esclavo. Los griegos no carecían de necesidad: minas de plata en Laurion usaban 30,000 esclavos en bombas de agua, pero la eolípila era ineficiente energéticamente (10% vs. 80% de una máquina de vapor industrial). El "fracaso" fue su incapacidad de convertirse en herramienta práctica: carecía de cilindro, pistón, y sistemas de condensación que solo desarrollaron 1,600 años después (Newcomen, 1698). La sociedad de esclavos no fue la única barrera: la metalurgia no permitía calderas de presión, y la ausencia de usinas de carbón hacía insostenible el combustible. Ironía: el invento más famoso de Herón fue un juguete que demostró la fuerza del vapor pero jamás será usado para trabajo útil en su época.'
    }
  },
  // 10. Hermanos Wright (Right Wall 1)
  {
    imgSrc: 'artworks/10.jpg',
    info: {
      title: 'Hermanos Wright',
      artist: 'Wilbur y Orville Wright',
      year: '1900-1903',
      description: 'Documentado en diarios de vuelo y el National Soaring Museum: sus primeros 5 planeadores (1900-1902) fueron fracasos catastróficos. El 1900 generó solo 1/3 del lift calculado; el 1901 fue peor, cubriendo apenas 120 metros. Wilbur declaró: "no volaremos en mil años". El fracaso clave fue usar datos aerodinámicos defectuosos de Lilienthal (que sobreestimaba lift en 50%). En lugar de rendirse, construyeron un túnel de viento (primero en historia para diseño de aviones) y probaron 200 perfiles alares. Descubrieron que el control del equilibrio (torque en ejes de yaw, pitch, roll) era más crítico que la potencia. Su planeador 1902 logró 622 pies y 26 segundos mediante warping alar (control de alerones). La ironía: el motor de 12 HP que diseñaron para el Flyer 1903 era menos potente que motores de competidores (Samuel Langley usó 50 HP), pero su control le permitió volar 12 segundos. El fracaso inicial forjó la ingeniería aeronáutica moderna: entender que el vuelo requiere control dinámico, no solo empuje. Sus 1,000 vuelos fracasados en planeadores fueron la base del éxito.'
    }
  },
  // 11. Dinamita (Right Wall 2)
  {
    imgSrc: 'artworks/11.jpg',
    info: {
      title: 'Dinamita',
      artist: 'Alfred Nobel',
      year: '1864-1867',
      description: 'Confirmado por biografías oficiales del Nobel Prize Committee y el Live Science: el 3 de septiembre de 1864, una explosión de nitroglicerina en Heleneborg, Suecia, mató a Emil Nobel (hermano menor, 20 años) y a 4 trabajadores más. Tragedia que fue punto de inflexión: Alfred Nobel no abandonó, sino que intensificó experimentos para "domesticar" el explosivo. El nitroglicerino puro era demasiado sensible (explota con temperatura, impacto, fricción). En 1867, después de 3 años y cientos de fracasos (incluyendo explosiones que mataron 15 personas en San Francisco), Nobel mezcló nitroglicerina con tierra de diatomeas (kieselguhr), creando una pasta estable en forma de barras. El fracaso original era la inestabilidad; el éxito fue la absorción inerte que reducía sensibilidad sin perder potencia. Ironía: la dinamita "segura" fue patentada como "dynamite" (del griego dunamis = poder) y revolucionó minería, construcción del Canal de Panamá, pero también guerra. Alfred Nobel, horrorizado al leer su obituario prematuro ("el mercader de la muerte"), creó los Premios Nobel para redimir su legado. El fracaso familiar se convirtió en el explosivo más lucrativo del siglo XIX, generando 355 patentes y una fortuna de $250 millones (en dólares actuales). La lección: un error fatal puede catalizar innovación de seguridad crucial.'
    }
  },
  // 12. Telescopio Hubble (Right Wall 3)
  {
    imgSrc: 'artworks/12.jpg',
    info: {
      title: 'Telescopio Hubble',
      artist: 'NASA',
      year: '1990-1993',
      description: 'Verificado por NASA Hubble Space Telescope Optical Systems Failure Report (1990): al lanzar Hubble, se descubrió que su espejo primario de 2.4 metros tenía aberración esférica porque estaba demasiado plano en el borde por 2,200 nanómetros (0.000086"). El error fue causado por un null corrector (dispositivo de prueba) con una lente desplazada 1.3 mm - un error de fabricación que nadie verificó. Resultado: imágenes borrosas, perdiendo 2/3 de la resolución. El fracaso de 2,000 millones de dólares fue catastrófico para NASA. Sin embargo, el error fue cuantificable y predecible, lo que permitió diseñar COSTAR (Corrective Optics Space Telescope Axial Replacement) - un conjunto de 10 espejos del tamaño de monedas que actuaban como "anteojos" para el telescopio. En la Misión Servicio 1 (1993), astronautas instalaron COSTAR y la nueva cámara WFPC2. El fracaso se convirtió en triunfo: las imágenes corregidas fueron mejores que las planeadas originalmente porque el espejo era "consistentemente" defectuoso, permitiendo corrección óptica perfecta. Hubble capturó 1.5 millones de observaciones, ganó un Nobel (2011, por aceleración cósmica), y revolucionó astronomía. La lección: un fracaso medible y entendido es reparable, y a veces supera las expectativas originales. COSTAR fue retirado en 2009; Hubble sigue operando 34 años después.'
    }
  },
  // 13. Rayos X (Center 1)
  {
    imgSrc: 'artworks/13.jpg',
    info: {
      title: 'Rayos X',
      artist: 'Wilhelm Conrad Röntgen',
      year: '1895',
      description: 'Röntgen documentó el descubrimiento en Sitzungsberichte der Würzburger Physik.-medic. Gesellschaft (1895): investigaba rayos catódicos en un tubo Crookes cubierto con cartón negro para bloquear luz visible. Notó que una pantalla de platinocianuro de bario a 2 metros fluorescía verde aun con el tubo tapado. El "fracaso" fue que sus protecciones no funcionaban: la pantalla no debía brillar. En lugar de atribuirlo a error experimental, Röntgen aisló el fenómeno durante 8 semanas secretas, probando bloques de madera, libros y finalmente la mano de su mujer Bertha, capturando la primera radiografía (sombra de huesos). Llamó "X-Strahlen" (radios desconocidas). La "falla" de protocolo (pantalla brillando) revolucionó medicina en 6 meses: para 1896, hospitales europeos usaban rayos X para localizar balas. Ironía: Röntgen no patentó la invención (ganó el primer Nobel de Física 1901) pero murió en bancarrota por inversiones de guerra. Los rayos X también causaron cáncer (muertes tempranas de radiólogos) por uso irrestricto (hasta en probadores de zapatos en 1940), una sombra del éxito. La lección: una anomalía experimental (pantalla que brilla) debe investigarse, no descartarse. El "error" de Röntgen creó toda la imagenología médica moderna (CT, MRI derivaron de su trabajo).'
    }
  },
  // 14. Mars Climate Orbiter (Center 2)
  {
    imgSrc: 'artworks/14.jpg',
    info: {
      title: 'Mars Climate Orbiter',
      artist: 'NASA / Lockheed Martin',
      year: '1998-1999',
      description: 'Confirmado por NASA Mars Climate Orbiter Mishap Investigation Board Report (1999): el orbiter se incineró en la atmósfera marciana porque calculó trayectoria incorrecta. La causa fue un error de conversión unidades: el software de navegación de Lockheed envió datos de empuje en libras-segundos (sistema imperial), pero el software de la NASA JPL esperaba newton-segundos (métrico). La diferencia de factor 4.45 parecía insignificante inicialmente, pero tras 10+ maniobras de desaturación (necesarias por tener un solo panel solar), el error se compuso hasta que el orbiter voló a 57 km de altitud (vs. 226 km planeados), donde la fricción atmosférica lo destruyó. El fracaso fue cultural, no solo técnico: ingenieros de JPL habían notificado anomalías en trayectoria, pero gerentes desestimaron alertas por presupuesto y cronograma. El costo: $327 millones ($125M nave + $200M misión). La lección: la comunicación entre equipos es tan vital como la ingeniería. NASA implementó después protocolos NASA-STD-8739.9 para forzar verificación de unidades. El error más caro por confundir libras con kilogramos demostró que en ingeniería de misión crítica, no hay detalle pequeño. Es el ejemplo paradigmático de cómo el fracaso de estándares destruye éxito técnico.'
    }
  },
  // 15. Barcos Tortuga (Center 3)
  {
    imgSrc: 'artworks/15.jpg',
    info: {
      title: 'Barcos de Guerra de Tortuga',
      artist: 'Almirante Yi Sun-sin',
      year: '1592-1598 d.C.',
      description: 'Documentado en Nanjung Ilgi (diarios de guerra de Yi): los Kobukson (barcos tortuga) fueron ingeniosos pero fracasaron estratégicamente por diseño defectuoso. Construidos con cubiertas de madera reforzadas con clavos y cañones emergentes, eran invulnerables a bordas y flechas, pero su casco pesado (requiriendo 100+ remeros) los hacía demasiado lentos para mar abierto (5 nudos vs. 8 de barcos japoneses). Solo funcionaron en aguas costeras protegidas. El fracaso fue que tras la invasión japonesa (1592-1598), Corea abandonó el diseño porque: 1) requería mantenimiento constante de la madera en agua dulce (pudría en mar), 2) su velocidad limitaba persecución y retirada, 3) el costo de producción (cada barco usaba 10,000 clavos de hierro) era insostenible. El diseño "exitoso" en la batalla de Hansan (1592) fue una excepción táctica, no estratégica. Los barcos tortuga fueron tecnología obsoleta frente a navíos de vela cuadrada más rápidos. Su lección: una innovación militar brillante puede fracasar si no es económica ni logísticamente sostenible, un principio válido para startups tecnológicas hoy.'
    }
  },
  // 16. Sistema Decimal (Center 4)
  {
    imgSrc: 'artworks/16.jpg',
    info: {
      title: 'Sistema Decimal',
      artist: 'Brahmagupta (India)',
      year: 'Siglo VII d.C.',
      description: 'Brahmagupta en Brahmasphutasiddhanta (628 d.C.) documentó el cero como número, pero la necesidad surgió del fracaso de sistemas complejos como el romano. Los números romanos (I, V, X, L) no tenían placeholder para el vacío, haciendo cálculos complejos imposibles. La tabla de multiplicación romana requiere memorizar 100 combinaciones vs. 45 con decimales. Los comerciantes indios usando ábaco necesitaban representar "nada" en una columna. Este "fracaso" de los sistemas aditivos (sin posicionalidad) llevó a la invención del círculo (sunya = vacío) como número con propiedades algebraicas: a + 0 = a, a - a = 0. Brahmagupta definió reglas para suma/resta con cero, aunque erroneamente pensó que a ÷ 0 = 0 (error corregido 400 años después). El sistema decimal indio, llevado al mundo islámico por al-Khwarizmi (s. IX), tardó 600 años en adoptarse en Europa por resistencia cultural. El "fracaso" de cálculo romano era tan grande que universidades medievales ejecutaban a estudiantes con nota cero; el cero indio salvó vidas y creó matemática moderna.'
    }
  }
];

// --- GENERACIÓN DE PINTURAS ---

// --- FRONT WALL (Z = -60) ---
// Artworks 0, 1, 2
for (let i = 0; i < 3; i++) {
  const art = artworks[i];
  paintingData.push({
    imgSrc: art.imgSrc,
    width: mainPaintingWidth,
    height: mainPaintingHeight,
    position: { x: -40 + i * 40, y: mainY, z: -59.5 },
    rotationY: 0,
    info: art.info
  });
}

// --- BACK WALL (Z = 60) ---
// Artworks 3, 4, 5
for (let i = 0; i < 3; i++) {
  const art = artworks[i + 3];
  paintingData.push({
    imgSrc: art.imgSrc,
    width: mainPaintingWidth,
    height: mainPaintingHeight,
    position: { x: -40 + i * 40, y: mainY, z: 59.5 },
    rotationY: Math.PI,
    info: art.info
  });
}

// --- LEFT WALL (X = -60) ---
// Artworks 6, 7, 8
for (let i = 0; i < 3; i++) {
  const art = artworks[i + 6];
  paintingData.push({
    imgSrc: art.imgSrc,
    width: mainPaintingWidth,
    height: mainPaintingHeight,
    position: { x: -59.5, y: mainY, z: -40 + i * 40 },
    rotationY: Math.PI / 2,
    info: art.info
  });
}

// --- RIGHT WALL (X = 60) ---
// Artworks 9, 10, 11
for (let i = 0; i < 3; i++) {
  const art = artworks[i + 9];
  paintingData.push({
    imgSrc: art.imgSrc,
    width: mainPaintingWidth,
    height: mainPaintingHeight,
    position: { x: 59.5, y: mainY, z: -40 + i * 40 },
    rotationY: -Math.PI / 2,
    info: art.info
  });
}

// --- CENTER WALL (Z = 0) ---
// Artworks 12, 13, 14, 15

// Center Piece 1 (Izquierda Frente)
paintingData.push({
  imgSrc: artworks[12].imgSrc,
  width: centerPaintingWidth,
  height: centerPaintingHeight,
  position: { x: -15, y: 9, z: -1.2 },
  rotationY: Math.PI,
  info: artworks[12].info
});

// Center Piece 2 (Derecha Frente)
paintingData.push({
  imgSrc: artworks[13].imgSrc,
  width: centerPaintingWidth,
  height: centerPaintingHeight,
  position: { x: 15, y: 9, z: -1.2 },
  rotationY: Math.PI,
  info: artworks[13].info
});

// Center Piece 3 (Izquierda Atrás)
paintingData.push({
  imgSrc: artworks[14].imgSrc,
  width: centerPaintingWidth,
  height: centerPaintingHeight,
  position: { x: -15, y: 9, z: 1.2 },
  rotationY: 0,
  info: artworks[14].info
});

// Center Piece 4 (Derecha Atrás)
paintingData.push({
  imgSrc: artworks[15].imgSrc,
  width: centerPaintingWidth,
  height: centerPaintingHeight,
  position: { x: 15, y: 9, z: 1.2 },
  rotationY: 0,
  info: artworks[15].info
});
