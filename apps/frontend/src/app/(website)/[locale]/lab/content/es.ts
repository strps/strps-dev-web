import type { LabItemContent, LabSlug } from '../types';

/**
 * Spanish content for the four lab items — mirrors the shape of `en.ts`
 * (`Record<LabSlug, LabItemContent>`), so a missing item or field is a compile
 * error. Code/formula segments and proper nouns (Gray-Scott, WebGL, Three.js)
 * are left untranslated on purpose. See the note in `en.ts` about the
 * image-to-svg strategy registry being out of scope here.
 */
export const labContentEs: Record<LabSlug, LabItemContent> = {
  'svg-circles': {
    meta: {
      title: 'Círculos con paralaje | Galería | Cesar Jerez',
      description:
        'Una composición SVG que sigue el puntero, construida con resortes de motion/react. Anillos concéntricos con paralaje por capa y rotación independiente.',
    },
    card: {
      title: 'Círculos con paralaje',
      description:
        'Una composición SVG que sigue el puntero. Los anillos concéntricos se desplazan con un factor de paralaje por capa mientras cada uno contrarrota lentamente a su propio ritmo.',
      tags: ['SVG', 'Movimiento', 'Paralaje', 'Interactivo'],
    },
    hero: {
      categoryBadge: 'Experimento',
      techBadge: 'Interactivo',
      titleLead: 'Círculos con',
      titleHighlight: 'paralaje',
      lede: `Mueve el puntero. Cada anillo se desplaza con su propio factor de paralaje mientras contrarrota a su propio ritmo. El mismo componente anima los fondos de sección del resto del sitio.`,
      hint: `Mueve el cursor por la página para empujar el campo.`,
    },
    controls: {
      sliders: {
        circles: 'Círculos',
        stroke: 'Trazo',
        focal: 'Focal',
        maxR: 'R máx',
        dash: 'Guion',
      },
      motion: { spring: 'resorte', ease: 'suave', direct: 'directo' },
    },
    sections: [
      {
        heading: 'Cómo funciona',
        blocks: [
          {
            type: 'p',
            content: [
              `Un único par de valores de movimiento sigue al puntero. Cada anillo obtiene su centro multiplicando esos valores por un factor por capa — los anillos exteriores se mueven más que los interiores, lo que transmite la profundidad sin ninguna matemática 3D.`,
            ],
          },
          {
            type: 'p',
            content: [
              `La rotación es independiente: cada anillo elige una duración y una dirección aleatorias al montarse y gira sin fin. Los trazos son discontinuos y usan `,
              { code: 'pathLength="100"' },
              ` para que el patrón del guion se mantenga constante sin importar el radio.`,
            ],
          },
        ],
      },
      {
        heading: 'Modelo de perspectiva',
        blocks: [
          {
            type: 'p',
            content: [
              `El tamaño no se ajusta a mano anillo por anillo — surge de una fórmula de cámara estenopeica. Cada anillo se sitúa a una profundidad de mundo `,
              { code: 'd' },
              ` entre `,
              { code: 'focalLength' },
              ` (el más cercano) y `,
              { code: 'focalLength + worldDepth' },
              ` (el más lejano), y su radio proyectado es `,
              { code: '(focalLength · maxRadius) / d' },
              `.`,
            ],
          },
          {
            type: 'p',
            content: [`Esa única razón le da a toda la composición su "lente":`],
          },
          {
            type: 'ul',
            items: [
              [
                { strong: 'Distancia focal corta' },
                ` — gran angular. Los anillos cercanos dominan, los lejanos se encogen con fuerza. Mucha profundidad.`,
              ],
              [
                { strong: 'Distancia focal larga' },
                ` — teleobjetivo. Cercanos y lejanos se comprimen hacia el mismo tamaño. Más plano, más tranquilo.`,
              ],
            ],
          },
          {
            type: 'p',
            content: [
              `El paralaje sigue la misma razón: el factor de puntero de cada anillo es proporcional a su radio proyectado, así que los anillos cercanos se desplazan más que los lejanos de forma gratuita.`,
            ],
          },
        ],
      },
      {
        heading: 'Patrones de movimiento',
        blocks: [
          {
            type: 'p',
            content: [
              `El componente acepta una prop `,
              { code: 'motionPattern' },
              `. Tres estilos de seguimiento:`,
            ],
          },
          {
            type: 'ul',
            items: [
              [
                { strong: 'resorte' },
                ` — con rebote, el predeterminado. Se pasa un poco y se siente vivo.`,
              ],
              [
                { strong: 'suave' },
                ` — interpolación exponencial en cada fotograma. Más calmado, sin rebote.`,
              ],
              [
                { strong: 'directo' },
                ` — sin suavizado. Ágil, más nervioso, más fiel a la entrada.`,
              ],
            ],
          },
        ],
      },
    ],
    variants: {
      heading: 'Variantes',
      intro: [
        `El mismo componente, distintas lentes. Cada mosaico comparte la geometría — solo cambian `,
        { code: 'focalLength' },
        ` y el patrón de movimiento. Pasa el cursor por ellos para sentir el cambio de profundidad.`,
      ],
      tileLabels: ['Gran angular · Resorte', 'Estándar · Suave', 'Teleobjetivo · Directo'],
    },
  },

  'gray-scott': {
    meta: {
      title: 'Gray-Scott | Galería | Cesar Jerez',
      description:
        'Un campo de reacción-difusión de Gray-Scott interactivo que corre en la GPU con WebGL. Píntalo y desliza entre patrones de coral, laberinto y mitosis.',
    },
    card: {
      title: 'Gray-Scott',
      description:
        'Un campo de reacción-difusión en vivo corriendo en la GPU. Dos sustancias químicas virtuales se alimentan, reaccionan y se difunden en patrones de coral, laberinto y mitosis que puedes pintar.',
      tags: ['WebGL', 'Simulación', 'Generativo', 'Interactivo'],
    },
    hero: {
      categoryBadge: 'Experimento',
      techBadge: 'WebGL',
      titleLead: 'Gray-Scott',
      titleHighlight: 'Reacción-Difusión',
      lede: `Dos sustancias químicas virtuales se alimentan, reaccionan y se difunden por un campo que corre por completo en la GPU. Ajusta las tasas de aporte y retiro para deslizar entre corales, laberintos y células que se dividen.`,
      hint: `Haz clic y arrastra por el campo para pintar sustancia en él.`,
    },
    controls: {
      sliders: { feed: 'Aporte', kill: 'Retiro', diffA: 'Dif. A', diffB: 'Dif. B' },
      presets: {
        corals: 'corales',
        mitosis: 'mitosis',
        spots: 'puntos',
        maze: 'laberinto',
        worms: 'gusanos',
      },
    },
    sections: [
      {
        heading: 'La reacción',
        blocks: [
          {
            type: 'p',
            content: [
              `Gray-Scott modela dos sustancias químicas, `,
              { strong: 'A' },
              ` y `,
              { strong: 'B' },
              `, repartidas sobre una cuadrícula. A se aporta en todas partes; B se retira en todas partes. Donde se encuentran, la reacción `,
              { code: 'A + 2B → 3B' },
              ` convierte A en más B — un bucle autocatalítico que pelea constantemente contra los términos de aporte y retiro que intentan borrarlo.`,
            ],
          },
          { type: 'p', content: [`Cada celda se actualiza a partir de sus vecinas en cada paso:`] },
          {
            type: 'ul',
            items: [
              [{ code: `A' = A + (Dₐ∇²A − AB² + f·(1−A))·dt` }],
              [{ code: `B' = B + (D_b∇²B + AB² − (k+f)·B)·dt` }],
            ],
          },
          {
            type: 'p',
            content: [
              `Todo el zoológico de patrones vive en solo dos números — la tasa de aporte `,
              { code: 'f' },
              ` y la tasa de retiro `,
              { code: 'k' },
              `.`,
            ],
          },
        ],
      },
      {
        heading: 'Cómo funciona',
        blocks: [
          {
            type: 'p',
            content: [
              `El estado vive en una textura — A en el canal rojo, B en el verde. Cada paso renderiza un quad a pantalla completa a través de un fragment shader que lee las nueve vecinas de una celda, calcula el laplaciano y escribe el siguiente estado. Dos texturas hacen `,
              { strong: 'ping-pong' },
              `: se lee de una, se escribe en la otra, se intercambian y se repite.`,
            ],
          },
          {
            type: 'p',
            content: [
              `Un solo fotograma mostrado corre la simulación `,
              { strong: 'una docena de veces' },
              ` antes de dibujar — la dinámica necesita muchos pasos pequeños para verse fluida, y a la GPU le sobran. Cuando el dispositivo lo permite, el campo usa texturas de coma flotante de 16 bits para gradientes más limpios, y recurre a 8 bits cuando no.`,
            ],
          },
          {
            type: 'p',
            content: [
              `Pintar es solo otra escritura: mientras el puntero está presionado, el shader de simulación fija B en 1.0 dentro de un pequeño radio alrededor del cursor, y la reacción se encarga del resto.`,
            ],
          },
        ],
      },
      {
        heading: 'Ajustes',
        blocks: [
          {
            type: 'p',
            content: [
              `El aporte y el retiro delimitan bandas estrechas de comportamiento, y pequeños movimientos cruzan las fronteras entre regímenes completamente distintos:`,
            ],
          },
          {
            type: 'ul',
            items: [
              [{ strong: 'Corales' }, ` — frentes ramificados que crecen y llenan el espacio.`],
              [{ strong: 'Mitosis' }, ` — manchas que crecen, se estiran y se parten en dos.`],
              [{ strong: 'Puntos' }, ` — motas estables que se asientan en una retícula suelta.`],
              [{ strong: 'Laberinto' }, ` — muros sinuosos de laberinto que nunca terminan de cerrarse.`],
              [{ strong: 'Gusanos' }, ` — filamentos que se retuercen, derivan y se reconectan.`],
            ],
          },
        ],
      },
      {
        heading: 'Agradecimientos',
        topBorder: true,
        blocks: [
          {
            type: 'p',
            content: [
              `La matemática, la intuición de los parámetros y los valores de aporte/retiro de los ajustes vienen todos del maravilloso tutorial de Karl Sims, `,
              {
                link: 'Reaction-Diffusion Tutorial',
                href: 'https://www.karlsims.com/rd.html',
                external: true,
              },
              `. Si quieres entender de verdad lo que pasa aquí, léelo primero.`,
            ],
          },
        ],
      },
    ],
  },

  'reaction-sphere': {
    meta: {
      title: 'Reacción-difusión en una esfera | Galería | Cesar Jerez',
      description:
        'Una simulación de reacción-difusión de Gray-Scott corriendo sobre la superficie de una icoesfera con Three.js. Cada vértice reacciona y se difunde con sus vecinos de la malla en la GPU.',
    },
    card: {
      title: 'Esfera de reacción',
      description:
        'Reacción-difusión de Gray-Scott corriendo sobre la superficie de una icoesfera. Cada vértice reacciona y se difunde con sus vecinos de la malla en la GPU, en un 3D que puedes girar.',
      tags: ['WebGL', 'Three.js', 'Simulación', '3D'],
    },
    hero: {
      categoryBadge: 'Experimento',
      techBadge: 'Three.js',
      titleLead: 'Reacción-Difusión',
      titleHighlight: 'en una esfera',
      lede: `Las mismas dos sustancias químicas en pugna que en Gray-Scott, pero corriendo sobre la superficie de una icoesfera — cada vértice reacciona y se difunde con sus vecinos de la malla, todo en la GPU. Ajusta las tasas de aporte y retiro para deslizar entre corales, laberintos y células que se dividen.`,
      hint: `Arrastra para rotar la esfera.`,
    },
    controls: {
      sliders: { feed: 'Aporte', kill: 'Retiro', diffA: 'Dif. A', diffB: 'Dif. B' },
      presets: {
        corals: 'corales',
        mitosis: 'mitosis',
        spots: 'puntos',
        maze: 'laberinto',
        worms: 'gusanos',
      },
    },
    sections: [
      {
        heading: 'La reacción',
        blocks: [
          {
            type: 'p',
            content: [
              `Este es el mismo modelo de Gray-Scott que el `,
              { link: 'campo plano de reacción-difusión', href: '/lab/gray-scott' },
              `: dos sustancias químicas, `,
              { strong: 'A' },
              ` y `,
              { strong: 'B' },
              `. A se aporta en todas partes, B se retira en todas partes, y donde se encuentran la reacción `,
              { code: 'A + 2B → 3B' },
              ` convierte A en más B. Cada punto se actualiza a partir de sus vecinos en cada paso:`,
            ],
          },
          {
            type: 'ul',
            items: [
              [{ code: `A' = A + (Dₐ∇²A − AB² + f·(1−A))·dt` }],
              [{ code: `B' = B + (D_b∇²B + AB² − (k+f)·B)·dt` }],
            ],
          },
        ],
      },
      {
        heading: 'Corriéndolo sobre una esfera',
        blocks: [
          {
            type: 'p',
            content: [
              `En una cuadrícula plana el laplaciano `,
              { code: '∇²' },
              ` es fácil — cada celda tiene exactamente ocho vecinos en una caja 3×3 ordenada. Una esfera no tiene esa cuadrícula. En cambio, la superficie es una `,
              { strong: 'icoesfera' },
              `: un icosaedro subdividido cinco veces en ~10 000 vértices, cada uno conectado a `,
              { strong: 'seis' },
              ` vecinos — salvo las doce esquinas originales, que conservan solo cinco.`,
            ],
          },
          {
            type: 'p',
            content: [
              `Como el vecindario es irregular, el laplaciano se convierte en un `,
              { strong: 'operador paraguas' },
              `: el promedio de los vecinos de un vértice menos el propio vértice. Esa única definición sirve tanto para el caso de cinco como para el de seis vecinos, así que la matemática del campo plano se traslada casi sin cambios.`,
            ],
          },
        ],
      },
      {
        heading: 'Cómo funciona',
        blocks: [
          {
            type: 'p',
            content: [
              `La icoesfera y su adyacencia se `,
              { strong: 'precalculan una sola vez' },
              ` cuando carga la página. El estado A/B de cada vértice se empaca en un solo píxel de una textura de datos, y una segunda textura de búsqueda guarda un puntero a los vecinos de cada vértice. Cada paso renderiza esa textura de estado a través de un fragment shader que reúne los vecinos de un vértice, calcula el laplaciano paraguas y escribe el siguiente estado — dos texturas hacen `,
              { strong: 'ping-pong' },
              ` una docena de veces por fotograma mostrado.`,
            ],
          },
          {
            type: 'p',
            content: [
              `Para dibujar el resultado, el vertex shader de la esfera consulta el estado químico de cada vértice directamente de esa textura, lo colorea con la misma rampa de paleta que el campo plano y empuja la superficie hacia afuera donde la sustancia B es fuerte. Cuando el dispositivo las admite, las texturas de coma flotante de 16 bits mantienen limpios los gradientes.`,
            ],
          },
        ],
      },
      {
        heading: 'Agradecimientos',
        topBorder: true,
        blocks: [
          {
            type: 'p',
            content: [
              `La matemática, la intuición de los parámetros y los valores de aporte/retiro de los ajustes vienen todos del maravilloso tutorial de Karl Sims, `,
              {
                link: 'Reaction-Diffusion Tutorial',
                href: 'https://www.karlsims.com/rd.html',
                external: true,
              },
              `.`,
            ],
          },
        ],
      },
    ],
  },

  'image-to-svg': {
    meta: {
      title: 'Imagen a SVG | Galería | Cesar Jerez',
      description:
        'Convierte cualquier imagen en arte lineal vectorial en el navegador. La primera estrategia renderiza semitono geométrico clásico con rayado y rayado cruzado.',
    },
    card: {
      title: 'Imagen a SVG',
      description:
        'Convierte cualquier imagen en arte lineal vectorial. El primer conversor renderiza rayado y rayado cruzado al estilo grabado clásico, con más estrategias por venir.',
      tags: ['SVG', 'Imagen', 'Semitono', 'Interactivo'],
    },
    hero: {
      categoryBadge: 'Experimento',
      techBadge: 'SVG',
      titleLead: 'Imagen a',
      titleHighlight: 'SVG',
      lede: `Suelta cualquier imagen y mírala redibujada como arte lineal vectorial. El primer conversor renderiza rayado y rayado cruzado al estilo grabado clásico — los tonos más oscuros acumulan más líneas cruzadas.`,
      hint: `Arrastra una imagen a cualquier parte, o usa Subir en los controles.`,
    },
    sections: [
      {
        heading: 'De píxeles a trazos',
        blocks: [
          {
            type: 'p',
            content: [
              `Las imágenes ráster guardan el tono como brillo por píxel. Para redibujar ese tono solo con líneas, tomamos prestado un truco que grabadores e ilustradores a plumilla han usado durante siglos: el `,
              { strong: 'rayado' },
              `. Se trazan líneas paralelas donde la imagen es oscura, se deja el papel en blanco donde es clara, y el ojo reconstruye un gradiente continuo a partir de marcas discretas.`,
            ],
          },
          {
            type: 'p',
            content: [
              `Todo corre en tu navegador. La imagen subida se dibuja en un canvas, se reduce a una resolución de trabajo y se reduce a un único valor de luminancia por píxel. Ningún dato sale de la página.`,
            ],
          },
        ],
      },
      {
        heading: 'Capas de umbral y rayado cruzado',
        blocks: [
          {
            type: 'p',
            content: [
              `El tono se divide en un puñado de `,
              { strong: 'capas' },
              `, cada una con su propio umbral de oscuridad. Una capa dibuja un campo completo de líneas paralelas sobre la imagen, pero un trazo sobrevive solo donde el tono subyacente es más oscuro que el umbral de esa capa — así cada conjunto de líneas queda recortado a las regiones lo bastante oscuras como para merecerlo.`,
            ],
          },
          {
            type: 'p',
            content: [
              `Los píxeles más oscuros caen por debajo de todos los umbrales, así que reúnen trazos de todas las capas. Como las capas sucesivas alternan entre el ángulo base y un `,
              { strong: 'ángulo cruzado' },
              ` rotado (y desplazan su fase dentro del espaciado), las regiones oscuras se acumulan en un rayado cruzado denso mientras que las claras conservan a lo sumo un único conjunto disperso de líneas. El espaciado, el grosor, la cantidad de niveles, los ángulos y el contraste son todos controles en vivo.`,
            ],
          },
        ],
      },
      {
        heading: 'Hecho para crecer',
        blocks: [
          {
            type: 'p',
            content: [
              `El rayado es solo el primer conversor. Cada estrategia es una función pura de un búfer de tono preparado a un documento SVG, registrada tras una interfaz pequeña, así que el selector de los controles ya está listo para punteado, trazos de campo de flujo, tramado y lo que venga después — sin tocar el resto de la herramienta.`,
            ],
          },
        ],
      },
    ],
  },
};
