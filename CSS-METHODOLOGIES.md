# CSS Methodologies - Comparativa y Guía

Este documento explica tres metodologías de modularización CSS aplicadas al portfolio. Cada una ofrece ventajas diferentes para organizar y escalar hojas de estilo.

---

## 📋 Tabla Comparativa

| Aspecto | BEM | OOCSS | SMACSS |
|--------|-----|-------|--------|
| **Enfoque** | Nomenclatura clara | Objetos reutilizables | Arquitectura modular |
| **Complejidad Nombre** | Alta (bloque__elem--mod) | Media (objeto + skin) | Baja (prefijos simples) |
| **Reutilización** | Mediante herencia | Composición de objetos | Módulos independientes |
| **Escalabilidad** | Muy buena | Excelente | Excelente |
| **Curva aprendizaje** | Media-Alta | Media | Baja |
| **Mejor para** | Equipos grandes | Proyectos con muchos componentes | Equipos pequeños-medianos |

---

## 1. BEM (Block, Element, Modifier)

### Concepto
BEM es una **convención de nomenclatura** que hace el CSS muy predecible y fácil de mantener.

### Estructura: `.bloque__elemento--modificador`

```
.nav { }                    ← BLOQUE (componente independiente)
.nav__logo { }              ← ELEMENTO (parte del bloque)
.nav__link { }              ← ELEMENTO
.nav__link:hover { }        ← ESTADO DEL ELEMENTO
.nav__link--active { }      ← MODIFICADOR (variación)
```

### Características

✅ **Ventajas:**
- Nomenclatura consistente y predecible
- Fácil de mantener en equipos grandes
- No hay especificidad conflictiva
- Código autodocumentado

❌ **Desventajas:**
- Nombres muy largos
- Repetición de código CSS
- Menos flexibilidad para reutilizar

### Ejemplo Práctico

```css
/* BLOQUE */
.portfolio {
    padding: 0;
    margin-top: 60px;
}

/* ELEMENTOS */
.portfolio__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

.portfolio__item {
    position: relative;
    aspect-ratio: 1;
    overflow: hidden;
}

.portfolio__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.3s ease;
}

/* MODIFICADORES */
.portfolio__item--architecture {
    grid-column: span 1;
}

/* ESTADO */
.portfolio__item:hover .portfolio__image {
    transform: scale(1.02);
}

.portfolio__overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    transition: all 0.3s ease;
}

.portfolio__item:hover .portfolio__overlay {
    opacity: 1;
}
```

### Cuándo usar BEM
- ✓ Proyectos medianos a grandes
- ✓ Equipos con múltiples desarrolladores
- ✓ Diseño systems complejos
- ✓ Cuando necesitas evitar conflictos de especificidad

---

## 2. OOCSS (Object-Oriented CSS)

### Concepto
OOCSS trata CSS como **objetos reutilizables** que combinan estructura y apariencia.

### Principios Clave
1. **Separar estructura de apariencia**
   - Estructura: layout, display, posicionamiento
   - Apariencia (skin): colores, bordes, sombras

2. **Separar contenedor de contenido**
   - Los estilos no deben depender de dónde estén

### Estructura: `.objeto` + `.skin--variacion`

```css
.card { }                   ← Estructura base (reutilizable)
.card--service { }          ← Variación / skin específica
.card--portfolio { }        ← Otra variación
```

### Ejemplo Práctico

```css
/* OBJETO BASE - Estructura */
.card {
    position: relative;
    transition: all 0.4s ease;
    overflow: hidden;
}

.card__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.3s ease;
}

.card:hover .card__image {
    transform: scale(1.02);
}

/* SKIN/VARIACIÓN 1 - Portfolio */
.card--portfolio {
    aspect-ratio: 1;
}

/* SKIN/VARIACIÓN 2 - Service */
.card--service {
    text-align: center;
    padding: 2.5rem 2rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.card--service:hover {
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    transform: translateY(-10px);
}

/* OBJETO OVERLAY - Separado de contenedor */
.overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    transition: all 0.3s ease;
}

.overlay--gradient-bottom {
    background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 100%);
}

.card:hover .overlay {
    opacity: 1;
}

/* OBJETO GRID - Separado de contexto */
.grid {
    display: grid;
    gap: 0;
}

.grid--columns-2 {
    grid-template-columns: repeat(2, 1fr);
}

.grid--columns-auto {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.grid__item {
    position: relative;
}
```

### Composición en HTML

```html
<!-- Reutilizar .card base con diferentes skins -->
<article class="card card--portfolio">
    <img class="card__image" src="..." alt="...">
    <div class="overlay overlay--gradient-bottom">
        <!-- contenido -->
    </div>
</article>

<div class="card card--service">
    <h3>Título Servicio</h3>
    <p>Descripción</p>
</div>
```

### Ventajas y Desventajas

✅ **Ventajas:**
- Máxima reutilización de código
- Componentes altamente componibles
- Reduce duplicación CSS
- Muy flexible

❌ **Desventajas:**
- Requiere más HTML (múltiples clases)
- Puede ser menos intuitivo que BEM
- Requiere disciplina para mantener separación

### Cuándo usar OOCSS
- ✓ Proyectos grandes con muchos componentes
- ✓ Design systems con variaciones
- ✓ Cuando necesitas máxima reutilización
- ✓ Código que cambia frecuentemente

---

## 3. SMACSS (Scalable and Modular Architecture)

### Concepto
SMACSS **organiza CSS en categorías** para escalar y mantener mejor.

### 5 Categorías Principales

#### 1. **BASE** - Estilos por defecto
```css
/* Resets, valores por defecto de HTML */
* { margin: 0; padding: 0; }
body { font-family: 'Helvetica', sans-serif; }
h1, h2 { font-weight: 300; }
a { text-decoration: none; }
```

#### 2. **LAYOUT** - Estructura de página
```css
/* Prefijo: .l- */
.l-header { }
.l-portfolio { }
.l-services { }
.l-footer { }
```

#### 3. **MODULE** - Componentes reutilizables
```css
/* Sin prefijo, nombres descriptivos */
.nav { }
.gallery { }
.service-card { }
.contact { }
```

#### 4. **STATE** - Cambios de estado
```css
/* Prefijo: .is- */
.is-visible { }
.is-active { }
.is-hidden { }
.is-loaded { }
.is-disabled { }
```

#### 5. **THEME** - Apariencia visual
```css
/* Variables de tema, colores, tipografía */
:root {
    --color-primary: #000000;
    --font-family: 'Helvetica', sans-serif;
}
```

### Ejemplo Práctico Completo

```css
/* BASE */
body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
}

a { transition: all 0.3s ease; }

/* LAYOUT */
.l-header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
}

.l-portfolio {
    padding: 0;
    margin-top: 60px;
}

.l-services {
    padding: 8rem 4rem;
    max-width: 1400px;
    margin: 0 auto;
}

/* MODULE: Navegación */
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-logo {
    font-size: 1.5rem;
    letter-spacing: 3px;
}

.nav-list {
    display: flex;
    gap: 3rem;
}

.nav-item {
    font-size: 0.9rem;
    letter-spacing: 2px;
    text-transform: uppercase;
}

/* MODULE: Gallery */
.gallery {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

.gallery-item {
    position: relative;
    aspect-ratio: 1;
    overflow: hidden;
}

.gallery-image {
    width: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.gallery-item:hover .gallery-image {
    transform: scale(1.02);
}

/* STATE */
.is-visible {
    opacity: 1;
    transform: translateY(0);
}

.is-active {
    opacity: 0.6;
}

.is-hidden {
    display: none;
}

/* THEME */
:root {
    --color-bg: #000000;
    --color-text: #FFFFFF;
    --color-border: rgba(255, 255, 255, 0.1);
}

body {
    background-color: var(--color-bg);
    color: var(--color-text);
}
```

### Estructura de carpetas recomendada
```
css/
├── base.css          (BASE - resets, estilos por defecto)
├── layout.css        (LAYOUT - estructura de página)
├── modules/
│   ├── nav.css
│   ├── gallery.css
│   ├── services.css
│   └── contact.css
├── state.css         (STATE - estados)
├── theme.css         (THEME - colores y tipografía)
└── main.css          (importa todos)
```

### Ventajas y Desventajas

✅ **Ventajas:**
- Estructura clara y organizada
- Fácil de escalar
- Nuevos desarrolladores entienden rápido
- Separación de responsabilidades
- Muy mantenible

❌ **Desventajas:**
- Requiere disciplina al organizar
- Puede ser excesivo para proyectos pequeños
- Requiere convención de nombres consistente

### Cuándo usar SMACSS
- ✓ Proyectos medianos a grandes
- ✓ Equipos con workflows definidos
- ✓ Códigos que crecen constantemente
- ✓ Cuando necesitas estructura clara

---

## 🎯 Comparación Visual

### Mismo componente con 3 metodologías:

#### BEM
```html
<nav class="nav nav--fixed nav--dark">
    <div class="nav__brand">LOGO</div>
    <ul class="nav__menu">
        <li class="nav__item">
            <a class="nav__link nav__link--active">Home</a>
        </li>
    </ul>
</nav>
```

#### OOCSS
```html
<nav class="nav nav--fixed nav--dark">
    <div class="nav__brand">LOGO</div>
    <ul class="menu menu--horizontal">
        <li class="menu__item">
            <a class="link link--primary is-active">Home</a>
        </li>
    </ul>
</nav>
```

#### SMACSS
```html
<header class="l-header">
    <nav class="nav is-fixed is-dark">
        <div class="nav-brand">LOGO</div>
        <ul class="nav-menu">
            <li class="nav-item">
                <a class="nav-link is-active">Home</a>
            </li>
        </ul>
    </nav>
</header>
```

---

## 📊 Decisión: Cuál elegir

### Usa **BEM** si:
- Trabajas en equipos grandes
- Necesitas máxima consistencia en nombres
- Prefieres evitar cascada CSS

### Usa **OOCSS** si:
- Tienes muchos componentes similares
- Necesitas máxima reutilización
- Estás construyendo un design system

### Usa **SMACSS** si:
- Prefieres estructura clara
- Trabajas en equipo pero no es enorme
- Quieres escalabilidad predecible

### Usa una **Combinación** si:
- Aplica BEM a componentes (módulos)
- Organiza como SMACSS (categorías)
- Usa OOCSS para objetos base
- *Esta es la práctica más común en la industria*

---

## 🚀 Ejemplo: Combo BEM + SMACSS + OOCSS

La mayoría de proyectos profesionales combinan las tres:

```css
/* SMACSS: Estructura de carpetas/organización */
/* BASE */
body { font-family: Helvetica; }

/* LAYOUT */
.l-header { position: fixed; }

/* MODULE: Usando BEM + OOCSS */
.card { /* objeto base */ }
.card__image { /* elemento */ }
.card--service { /* variación */ }

/* STATE: SMACSS */
.is-visible { opacity: 1; }
```

---

## 📝 Archivos de Referencia

Este proyecto incluye:
- **styles-bem.css** - Implementación con BEM
- **styles-oocss.css** - Implementación con OOCSS
- **styles-smacss.css** - Implementación con SMACSS

Compara cómo cada metodología organiza el mismo portfolio.

---

## 🎓 Conclusión

| Escala | Recomendación |
|--------|--------------|
| **Pequeño (< 2000 líneas)** | SMACSS o BEM básico |
| **Mediano (2000-10000 líneas)** | BEM + SMACSS combinados |
| **Grande (> 10000 líneas)** | SMACSS + OOCSS + BEM combinados |

**La realidad:** La mayoría de equipos profesionales combinan las tres metodologías según necesidad, priorizando **consistencia** sobre purismo.
