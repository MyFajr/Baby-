const { Plugin, Modal, Notice } = require('obsidian');

const PALETTES = [
  {
    id: 'candy-pop', name: 'Candy Pop', mood: 'Яркая конфетная палитра',
    description: 'Кобальтовый английский, фиолетовая IPA и зелёный перевод.', defaultBackground: 'bg-08-reading-rose-cloud', defaultBlocks: 'soft',
    swatches: ['#2868d8', '#9251bd', '#16845e', '#ef6684', '#f0a33b'],
    roles: {
      en: '#2868d8', ipa: '#9251bd', translation: '#16845e', term: '#a23b83',
      definition: '#53627d', focus: '#e74e70', secondary: '#c27a18', soft: '#9555b5', heading: '#6540a2', ink: '#352a45'
    },
    dark: {
      en: '#8fc1ff', ipa: '#d4a4f2', translation: '#82ddb4', term: '#f0a5d7',
      definition: '#bdc1d6', focus: '#ff91aa', secondary: '#f2c078', soft: '#d1a2f0', heading: '#d0b3ff', ink: '#f0e8f7'
    },
    callouts: {
      rule: [48, 112, 210], example: [142, 82, 194], important: [228, 72, 112],
      tip: [31, 145, 103], warning: [209, 132, 34], question: [25, 151, 177],
      practice: [223, 111, 48], success: [28, 153, 102], info: [67, 111, 207],
      note: [119, 111, 151], quote: [194, 82, 143], abstract: [125, 83, 185]
    },
    darkCallouts: {
      rule: [112, 166, 255], example: [194, 146, 235], important: [255, 137, 169],
      tip: [105, 214, 170], warning: [247, 193, 112], question: [99, 211, 231],
      practice: [255, 164, 112], success: [103, 219, 163], info: [133, 171, 255],
      note: [185, 177, 215], quote: [241, 143, 203], abstract: [185, 149, 239]
    }
  },
  {
    id: 'ocean-breeze', name: 'Ocean Breeze', mood: 'Свежая морская палитра',
    description: 'Голубой английский, аметистовая IPA и бирюзовый перевод.', defaultBackground: 'bg-12-sea-glass', defaultBlocks: 'soft',
    swatches: ['#087eac', '#7854bb', '#13866e', '#e08b49', '#54b9c7'],
    roles: {
      en: '#087eac', ipa: '#7854bb', translation: '#13866e', term: '#197b89',
      definition: '#516c7b', focus: '#d46d3c', secondary: '#9b762d', soft: '#508da9', heading: '#145d82', ink: '#203a49'
    },
    dark: {
      en: '#7bd4ff', ipa: '#c3a7ff', translation: '#75dfbd', term: '#81d5dc',
      definition: '#b6cbd3', focus: '#ffad80', secondary: '#e4c27d', soft: '#8ec5df', heading: '#8dd8f3', ink: '#e4f3f7'
    },
    callouts: {
      rule: [28, 126, 171], example: [121, 86, 184], important: [210, 100, 63],
      tip: [28, 139, 112], warning: [203, 139, 55], question: [20, 151, 179],
      practice: [202, 113, 61], success: [29, 147, 105], info: [48, 118, 179],
      note: [93, 123, 139], quote: [172, 92, 143], abstract: [109, 91, 174]
    },
    darkCallouts: {
      rule: [105, 204, 241], example: [186, 157, 244], important: [255, 160, 126],
      tip: [101, 215, 186], warning: [238, 195, 117], question: [94, 219, 237],
      practice: [255, 169, 119], success: [100, 219, 177], info: [118, 186, 239],
      note: [167, 201, 214], quote: [226, 151, 207], abstract: [175, 157, 232]
    }
  },
  {
    id: 'royal-plum', name: 'Royal Plum', mood: 'Насыщенная благородная палитра',
    description: 'Сапфировый английский, сливовая IPA и нефритовый перевод.', defaultBackground: 'bg-14-wisteria-haze', defaultBlocks: 'outline',
    swatches: ['#3156a8', '#9a4f91', '#23836e', '#be7b35', '#7651b8'],
    roles: {
      en: '#3156a8', ipa: '#9a4f91', translation: '#23836e', term: '#8b467c',
      definition: '#5c5a70', focus: '#bd5d78', secondary: '#ad762c', soft: '#8562b5', heading: '#493c87', ink: '#30283e'
    },
    dark: {
      en: '#9bb8ff', ipa: '#e0a5d5', translation: '#8bd9c0', term: '#dc9acb',
      definition: '#c9bfd2', focus: '#f29bb5', secondary: '#e8c17f', soft: '#c6a4ec', heading: '#c5b4ff', ink: '#f1eaf6'
    },
    callouts: {
      rule: [61, 94, 174], example: [145, 79, 151], important: [191, 76, 112],
      tip: [38, 132, 108], warning: [187, 125, 49], question: [56, 129, 164],
      practice: [183, 102, 65], success: [37, 139, 103], info: [63, 100, 174],
      note: [112, 100, 136], quote: [178, 79, 132], abstract: [112, 76, 165]
    },
    darkCallouts: {
      rule: [139, 164, 242], example: [221, 148, 218], important: [245, 143, 174],
      tip: [100, 204, 170], warning: [239, 195, 117], question: [127, 197, 226],
      practice: [241, 158, 125], success: [104, 212, 171], info: [138, 166, 232],
      note: [190, 173, 207], quote: [232, 151, 198], abstract: [190, 155, 232]
    }
  }
];



const BASE_BLOCK_STYLE = {
  light: {
    backgroundOpacity: 0.13,
    borderWidth: 1,
    borderOpacity: 0.48,
    borderRadius: 12,
    paddingY: 9,
    paddingX: 10,
    gap: 8,
    titleWeight: 600,
    titleSize: 12.2,
    bodySize: 11.7,
    shadow: 'none'
  },
  dark: {
    backgroundOpacity: 0.18,
    borderWidth: 1,
    borderOpacity: 0.55,
    borderRadius: 12,
    paddingY: 9,
    paddingX: 10,
    gap: 8,
    titleWeight: 600,
    titleSize: 12.2,
    bodySize: 11.7,
    shadow: 'none'
  }
};

const BUILTIN_BLOCK_STYLES = [
  {
    id: 'soft',
    name: 'Мягкие цветные',
    description: 'Нежная заливка и спокойная рамка',
    category: 'Мягкие цветные',
    source: 'builtin',
    order: 0,
    base: 'soft',
    style: {
      light: { ...BASE_BLOCK_STYLE.light, backgroundOpacity: 0.13, borderOpacity: 0.48, borderRadius: 12 },
      dark:  { ...BASE_BLOCK_STYLE.dark,  backgroundOpacity: 0.18, borderOpacity: 0.55, borderRadius: 12 }
    },
    calloutOverrides: {},
    colors: { light: {}, dark: {} },
    previewCallouts: ['rule', 'example', 'important', 'tip', 'practice', 'success']
  },
  {
    id: 'rich',
    name: 'Насыщенные',
    description: 'Более заметная заливка и рамка',
    category: 'Насыщенные',
    source: 'builtin',
    order: 1,
    base: 'rich',
    style: {
      light: { ...BASE_BLOCK_STYLE.light, backgroundOpacity: 0.21, borderOpacity: 0.72, borderRadius: 10 },
      dark:  { ...BASE_BLOCK_STYLE.dark,  backgroundOpacity: 0.26, borderOpacity: 0.78, borderRadius: 10 }
    },
    calloutOverrides: {},
    colors: { light: {}, dark: {} },
    previewCallouts: ['rule', 'example', 'important', 'tip', 'practice', 'success']
  },
  {
    id: 'outline',
    name: 'Контурные',
    description: 'Почти прозрачный фон, выразительная рамка',
    category: 'Контурные',
    source: 'builtin',
    order: 2,
    base: 'outline',
    style: {
      light: { ...BASE_BLOCK_STYLE.light, backgroundOpacity: 0.045, borderOpacity: 0.82, borderRadius: 8, borderWidth: 1.5 },
      dark:  { ...BASE_BLOCK_STYLE.dark,  backgroundOpacity: 0.07,  borderOpacity: 0.88, borderRadius: 8, borderWidth: 1.5 }
    },
    calloutOverrides: {},
    colors: { light: {}, dark: {} },
    previewCallouts: ['rule', 'example', 'important', 'tip', 'practice', 'success']
  }
];

// Backward-compatible alias used throughout the old code
const BLOCK_STYLES = BUILTIN_BLOCK_STYLES;

const CALLOUTS = [
  ['rule', 'Правило'], ['example', 'Пример'], ['important', 'Важно'],
  ['tip', 'Подсказка'], ['warning', 'Предупреждение'], ['question', 'Вопрос'],
  ['practice', 'Практика'], ['success', 'Успех'], ['info', 'Информация'],
  ['note', 'Заметка'], ['quote', 'Цитата'], ['abstract', 'Кратко']
];

const BACKGROUNDS = [
  { id: 'bg-01-reading-ivory', label: '01 · Слоновая кость', group: 'Для чтения' },
  { id: 'bg-02-reading-parchment', label: '02 · Пергамент', group: 'Для чтения' },
  { id: 'bg-03-reading-linen', label: '03 · Натуральный лён', group: 'Для чтения' },
  { id: 'bg-04-reading-oatmilk', label: '04 · Овсяное молоко', group: 'Для чтения' },
  { id: 'bg-05-reading-mist', label: '05 · Туманный серый', group: 'Для чтения' },
  { id: 'bg-06-reading-sage', label: '06 · Шалфейный туман', group: 'Для чтения' },
  { id: 'bg-07-reading-powder-blue', label: '07 · Пудрово-голубой', group: 'Для чтения' },
  { id: 'bg-08-reading-rose-cloud', label: '08 · Розовое облако', group: 'Для чтения' },
  { id: 'bg-09-reading-lavender', label: '09 · Лавандовая бумага', group: 'Для чтения' },
  { id: 'bg-10-reading-sand', label: '10 · Мягкий песок', group: 'Для чтения' },
  { id: 'bg-11-pearl-glow', label: '11 · Жемчужное сияние', group: 'Мягкие градиенты' },
  { id: 'bg-12-sea-glass', label: '12 · Морское стекло', group: 'Мягкие градиенты' },
  { id: 'bg-13-blush-silk', label: '13 · Шёлковый румянец', group: 'Мягкие градиенты' },
  { id: 'bg-14-wisteria-haze', label: '14 · Глициниевая дымка', group: 'Мягкие градиенты' },
  { id: 'bg-15-glacier', label: '15 · Ледник', group: 'Мягкие градиенты' },
  { id: 'bg-16-matcha-cream', label: '16 · Матча со сливками', group: 'Мягкие градиенты' },
  { id: 'bg-17-apricot-haze', label: '17 · Абрикосовая дымка', group: 'Мягкие градиенты' },
  { id: 'bg-18-blue-hour', label: '18 · Синий час', group: 'Мягкие градиенты' },
  { id: 'bg-19-rich-midnight', label: '19 · Полночные чернила', group: 'Тёмные фоны' },
  { id: 'bg-20-rich-navy', label: '20 · Глубокий navy', group: 'Тёмные фоны' },
  { id: 'bg-21-rich-forest', label: '21 · Ночной лес', group: 'Тёмные фоны' },
  { id: 'bg-22-rich-emerald', label: '22 · Изумрудный бархат', group: 'Тёмные фоны' },
  { id: 'bg-23-rich-plum', label: '23 · Сливовый бархат', group: 'Тёмные фоны' },
  { id: 'bg-24-rich-burgundy', label: '24 · Бордовый нуар', group: 'Тёмные фоны' },
  { id: 'bg-25-rich-cocoa', label: '25 · Какао-бархат', group: 'Тёмные фоны' },
  { id: 'bg-26-rich-slate', label: '26 · Графитовый сланец', group: 'Тёмные фоны' },
  { id: 'bg-27-terracotta-wash', label: '27 · Терракотовая вуаль', group: 'Выразительные фоны' },
  { id: 'bg-28-saffron-cream', label: '28 · Шафрановые сливки', group: 'Выразительные фоны' },
  { id: 'bg-29-cobalt-dusk', label: '29 · Кобальтовые сумерки', group: 'Выразительные фоны' },
  { id: 'bg-30-deep-lagoon', label: '30 · Глубокая лагуна', group: 'Выразительные фоны' }
];

const LIBRARY_FOLDER = '.obsidian/english-study-design-studio';
const LIBRARY_PATH = `${LIBRARY_FOLDER}/user-library.json`;
const LIBRARY_SCHEMA = 2;
const ROLE_KEYS = ['en', 'ipa', 'translation', 'term', 'definition', 'focus', 'secondary', 'soft', 'heading', 'ink'];
const CALLOUT_KEYS = CALLOUTS.map(([key]) => key);

const DEFAULT_CATEGORIES = {
  palettes: [
    { id: 'standard', name: 'Стандартные', order: 0, protected: true },
    { id: 'mine', name: 'Мои палитры', order: 99, protected: true }
  ],
  backgrounds: [
    { id: 'reading', name: 'Для чтения', order: 0, protected: true },
    { id: 'gradients', name: 'Мягкие градиенты', order: 1, protected: true },
    { id: 'dark', name: 'Тёмные фоны', order: 2, protected: true },
    { id: 'expressive', name: 'Выразительные фоны', order: 3, protected: true },
    { id: 'mine', name: 'Мои фоны', order: 99, protected: true }
  ],
  blockStyles: [
    { id: 'soft', name: 'Мягкие цветные', order: 0, protected: true },
    { id: 'rich', name: 'Насыщенные', order: 1, protected: true },
    { id: 'outline', name: 'Контурные', order: 2, protected: true },
    { id: 'mine', name: 'Мои стили', order: 99, protected: true }
  ]
};

const DEFAULT_LIBRARY = {
  schemaVersion: LIBRARY_SCHEMA,
  palettes: [],
  backgrounds: [],
  blockStyles: [],
  categories: JSON.parse(JSON.stringify(DEFAULT_CATEGORIES)),
  favorites: [],
  recent: []
};

function ensureLibraryShape(data) {
  const lib = { ...JSON.parse(JSON.stringify(DEFAULT_LIBRARY)), ...(data || {}) };
  lib.schemaVersion = LIBRARY_SCHEMA;
  ['palettes', 'backgrounds', 'blockStyles', 'favorites', 'recent'].forEach(key => {
    if (!Array.isArray(lib[key])) lib[key] = [];
  });
  if (!lib.categories || typeof lib.categories !== 'object') {
    lib.categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
  }
  ['palettes', 'backgrounds', 'blockStyles'].forEach(kind => {
    if (!Array.isArray(lib.categories[kind]) || !lib.categories[kind].length) {
      lib.categories[kind] = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES[kind]));
    }
  });
  return lib;
}

function normalizeClasses(value) {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  if (typeof value === 'string') return value.split(/[\s,]+/).filter(Boolean);
  return [];
}

function slugify(value) {
  return String(value || 'custom').toLowerCase().trim()
    .replace(/[^a-z0-9а-яё]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/[а-яё]/g, ch => ({ а:'a', б:'b', в:'v', г:'g', д:'d', е:'e', ё:'e', ж:'zh', з:'z', и:'i', й:'i', к:'k', л:'l', м:'m', н:'n', о:'o', п:'p', р:'r', с:'s', т:'t', у:'u', ф:'f', х:'h', ц:'ts', ч:'ch', ш:'sh', щ:'shch', ъ:'', ы:'y', ь:'', э:'e', ю:'yu', я:'ya' }[ch] || ''))
    .slice(0, 48) || 'custom';
}

function isHexColor(value) {
  return typeof value === 'string' && /^#[0-9a-f]{3,8}$/i.test(value);
}

function rgbValue(value) {
  if (Array.isArray(value) && value.length === 3 && value.every(n => Number.isFinite(n) && n >= 0 && n <= 255)) return value.join(', ');
  if (isHexColor(value)) {
    let hex = value.slice(1);
    if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
    if (hex.length >= 6) return [parseInt(hex.slice(0,2),16), parseInt(hex.slice(2,4),16), parseInt(hex.slice(4,6),16)].join(', ');
  }
  return '120, 120, 120';
}

function colorToHex(value) {
  if (Array.isArray(value) && value.length === 3 && value.every(n => Number.isFinite(n) && n >= 0 && n <= 255)) {
    return `#${value.map(n => Math.round(n).toString(16).padStart(2, '0')).join('')}`;
  }
  if (isHexColor(value)) {
    let hex = value.slice(1).toLowerCase();
    if (hex.length === 3) hex = hex.split('').map(ch => ch + ch).join('');
    if (hex.length >= 6) return `#${hex.slice(0, 6)}`;
  }
  return '#787878';
}

function safeCssBackground(value) {
  if (typeof value !== 'string' || value.length > 300) return false;
  if (/[;{}<>]|url\s*\(|expression\s*\(/i.test(value)) return false;
  return /^#[0-9a-f]{3,8}$/i.test(value) || /^(linear|radial)-gradient\([a-z0-9\s#%,.%()-]+\)$/i.test(value);
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function makePaletteCss(palette) {
  const cls = `esds-palette-${palette.id}`;
  const selectors = [
    `.markdown-preview-view.esds-note.${cls}`,
    `.markdown-source-view.esds-note.${cls}`,
    `.esds-preview.${cls}`
  ].join(',');
  const roleVars = ROLE_KEYS.map(key => `--esds-${key}: ${isHexColor(palette.roles[key]) ? palette.roles[key] : '#777777'};`).join(' ');
  const calloutVars = CALLOUT_KEYS.map(key => `--esds-callout-${key}: ${rgbValue(palette.callouts[key])};`).join(' ');
  const darkRoleVars = ROLE_KEYS.map(key => `--esds-${key}: ${isHexColor(palette.dark && palette.dark[key]) ? palette.dark[key] : (isHexColor(palette.roles[key]) ? palette.roles[key] : '#dddddd')};`).join(' ');
  const darkCalloutVars = CALLOUT_KEYS.map(key => `--esds-callout-${key}: ${rgbValue((palette.darkCallouts || palette.callouts)[key])};`).join(' ');
  const darkSelectors = selectors.split(',').map(selector => `body.theme-dark ${selector}`).join(',');
  return `${selectors}{${roleVars} ${calloutVars}} ${darkSelectors}{${darkRoleVars} ${darkCalloutVars}}`;
}

function mergeStyleProps(base, override) {
  return { ...(base || {}), ...(override || {}) };
}

function stylePropsToVars(props) {
  if (!props) return '';
  const parts = [];
  if (props.backgroundOpacity != null) parts.push(`--esds-block-opacity:${props.backgroundOpacity}`);
  if (props.borderOpacity != null) parts.push(`--esds-block-border-opacity:${props.borderOpacity}`);
  if (props.borderRadius != null) parts.push(`--esds-block-radius:${props.borderRadius}px`);
  if (props.borderWidth != null) parts.push(`--esds-block-border-width:${props.borderWidth}px`);
  if (props.paddingY != null) parts.push(`--esds-block-padding-y:${props.paddingY}px`);
  if (props.paddingX != null) parts.push(`--esds-block-padding-x:${props.paddingX}px`);
  if (props.gap != null) parts.push(`--esds-block-gap:${props.gap}px`);
  if (props.titleWeight != null) parts.push(`--esds-block-title-weight:${props.titleWeight}`);
  if (props.titleSize != null) parts.push(`--esds-block-title-size:${props.titleSize}px`);
  if (props.bodySize != null) parts.push(`--esds-block-body-size:${props.bodySize}px`);
  return parts.join(';');
}

function makeBlockStyleCss(style) {
  if (!style || !style.id || style.source === 'builtin') return '';
  const cls = `esds-blocks-${style.id}`;
  const lightBase = mergeStyleProps(BASE_BLOCK_STYLE.light, (style.style && style.style.light) || {});
  const darkBase = mergeStyleProps(BASE_BLOCK_STYLE.dark, (style.style && style.style.dark) || {});
  const lightVars = stylePropsToVars(lightBase);
  const darkVars = stylePropsToVars(darkBase);

  let css = `
.markdown-preview-view.esds-note.${cls} .callout,
.markdown-source-view.esds-note.${cls} .callout,
.esds-preview.${cls} { ${lightVars} }
body.theme-dark .markdown-preview-view.esds-note.${cls} .callout,
body.theme-dark .markdown-source-view.esds-note.${cls} .callout,
body.theme-dark .esds-preview.${cls} { ${darkVars} }
`;

  // Per-callout overrides
  const overrides = style.calloutOverrides || {};
  Object.keys(overrides).forEach(type => {
    const ov = overrides[type] || {};
    const lightOv = mergeStyleProps(lightBase, ov.light || {});
    const darkOv = mergeStyleProps(darkBase, ov.dark || {});
    const lVars = stylePropsToVars(lightOv);
    const dVars = stylePropsToVars(darkOv);
    if (lVars) {
      css += `.markdown-preview-view.esds-note.${cls} .callout[data-callout="${type}"],.esds-preview.${cls} .esds-callout-${type},.esds-preview.${cls} .esds-demo-callout.esds-callout-${type}{${lVars}}\n`;
    }
    if (dVars) {
      css += `body.theme-dark .markdown-preview-view.esds-note.${cls} .callout[data-callout="${type}"],body.theme-dark .esds-preview.${cls} .esds-callout-${type},body.theme-dark .esds-preview.${cls} .esds-demo-callout.esds-callout-${type}{${dVars}}\n`;
    }
  });

  // Color overrides (on top of palette)
  const colors = style.colors || {};
  const lightColors = colors.light || {};
  const darkColors = colors.dark || {};
  const lightColorVars = Object.keys(lightColors).filter(k => Array.isArray(lightColors[k]) || isHexColor(lightColors[k]))
    .map(k => `--esds-callout-${k}:${rgbValue(lightColors[k])}`).join(';');
  const darkColorVars = Object.keys(darkColors).filter(k => Array.isArray(darkColors[k]) || isHexColor(darkColors[k]))
    .map(k => `--esds-callout-${k}:${rgbValue(darkColors[k])}`).join(';');
  if (lightColorVars) {
    css += `.markdown-preview-view.esds-note.${cls},.markdown-source-view.esds-note.${cls},.esds-preview.${cls}{${lightColorVars}}\n`;
  }
  if (darkColorVars) {
    css += `body.theme-dark .markdown-preview-view.esds-note.${cls},body.theme-dark .markdown-source-view.esds-note.${cls},body.theme-dark .esds-preview.${cls}{${darkColorVars}}\n`;
  }

  return css;
}

function normalizeBlockStyle(raw) {
  const base = BUILTIN_BLOCK_STYLES.find(b => b.id === (raw.base || 'soft')) || BUILTIN_BLOCK_STYLES[0];
  const style = {
    id: raw.id || `user-blocks-${slugify(raw.name || 'style')}-${Date.now().toString(36).slice(-4)}`,
    name: raw.name || 'Пользовательский стиль',
    description: raw.description || '',
    category: raw.category || 'Мои стили',
    source: raw.source || 'user',
    order: typeof raw.order === 'number' ? raw.order : 50,
    base: raw.base || base.id,
    style: {
      light: mergeStyleProps(base.style.light, (raw.style && raw.style.light) || {}),
      dark:  mergeStyleProps(base.style.dark,  (raw.style && raw.style.dark)  || {})
    },
    calloutOverrides: raw.calloutOverrides && typeof raw.calloutOverrides === 'object' ? raw.calloutOverrides : {},
    colors: {
      light: (raw.colors && raw.colors.light) || {},
      dark:  (raw.colors && raw.colors.dark)  || {}
    },
    previewCallouts: Array.isArray(raw.previewCallouts) && raw.previewCallouts.length
      ? raw.previewCallouts
      : ['rule', 'example', 'important', 'tip', 'practice', 'success']
  };
  return style;
}

class PreviewModal extends Modal {
  constructor(app, studio) { super(app); this.studio = studio; }
  onOpen() {
    this.modalEl.addClass('esds-preview-modal');
    this.contentEl.addClass('esds-preview-modal-content');
    this.render();
  }
  onClose() { this.contentEl.empty(); }
  render() {
    const p = this.studio.selectedPalette;
    const b = this.studio.selectedBackground;
    const block = this.studio.selectedBlocks;
    const root = this.contentEl; root.empty();

    const header = root.createDiv({ cls: 'esds-header esds-preview-modal-header' });
    const title = header.createDiv({ cls: 'esds-heading-wrap' });
    title.createEl('h2', { text: 'Предпросмотр оформления' });
    title.createEl('p', { text: `${p.name} · ${b.label || b.name} · ${block.name}` });

    const preview = root.createDiv({ cls: `esds-preview ${p.id} esds-palette-${p.id} ${b.id} esds-blocks-${block.id}` });
    this.studio.renderPreview(preview);

    const actions = root.createDiv({ cls: 'esds-preview-actions' });
    const apply = actions.createEl('button', { cls: 'esds-button esds-primary esds-btn-teal', text: '✓ Применить', attr: { type: 'button' } });
    apply.addEventListener('click', async () => {
      apply.disabled = true;
      const ok = await this.studio.applySelected();
      if (ok) { this.close(); this.studio.close(); }
      else apply.disabled = false;
    });

    const cancel = actions.createEl('button', { cls: 'esds-button esds-btn-quiet', text: 'Закрыть', attr: { type: 'button' } });
    cancel.addEventListener('click', () => this.close());

    const alreadyFavorite = this.studio.isFavorite();
    const fav = actions.createEl('button', { cls: 'esds-button esds-btn-coral', text: alreadyFavorite ? '★ В избранном' : '☆ В избранное', attr: { type: 'button' } });
    if (alreadyFavorite) fav.addClass('is-saved');
    fav.addEventListener('click', async () => {
      const added = await this.studio.addFavorite();
      fav.setText(added ? '★ В избранном' : '★ Уже в избранном');
      fav.addClass('is-saved');
    });
  }
}

class PaletteBuilderModal extends Modal {
  constructor(app, studio) { super(app); this.studio = studio; this.base = clone(studio.selectedPalette); this.inputs = {}; }
  onOpen() { this.modalEl.addClass('esds-builder-modal'); this.contentEl.addClass('esds-builder-content'); this.render(); }
  onClose() { this.contentEl.empty(); }
  render() {
    const root = this.contentEl; root.empty();
    const header = root.createDiv({ cls: 'esds-header esds-builder-header' });
    const back = header.createEl('button', { cls: 'esds-button esds-btn-quiet esds-back-button esds-builder-back-button', attr: { type: 'button', 'aria-label': 'Назад' } });
    back.createSpan({ cls: 'esds-back-arrow', text: '‹' }); back.createSpan({ cls: 'esds-back-label', text: 'Назад' });
    back.addEventListener('click', () => this.close());
    const h = header.createDiv({ cls: 'esds-heading-wrap' }); h.createEl('h2', { text: 'Создать свою палитру' }); h.createEl('p', { text: 'Новая палитра создаётся на основе выбранной. Встроенная палитра не изменяется.' });
    const body = root.createDiv({ cls: 'esds-builder-body' });
    this.nameInput = body.createEl('input', { cls: 'esds-text-input', attr: { type: 'text', placeholder: 'Название палитры' } });
    this.nameInput.value = `${this.base.name} — моя версия`;
    const swatches = body.createDiv({ cls: 'esds-color-grid' });
    const labels = { en:'Английский', ipa:'IPA', translation:'Перевод', term:'Термины', definition:'Определения', focus:'Главный акцент', secondary:'Второй акцент', soft:'Мягкий акцент', heading:'Заголовки', ink:'Основной текст' };
    ROLE_KEYS.forEach(key => {
      const field = swatches.createDiv({ cls: 'esds-color-field' });
      field.createEl('label', { text: labels[key] });
      const input = field.createEl('input', { attr: { type: 'color', value: this.base.roles[key] } });
      input.value = this.base.roles[key]; this.inputs[key] = input;
    });
    const actions = root.createDiv({ cls: 'esds-preview-actions' });
    const save = actions.createEl('button', { cls: 'esds-button esds-primary esds-btn-teal', text: '✓ Сохранить палитру' });
    save.addEventListener('click', async () => {
      const name = this.nameInput.value.trim();
      if (!name) { new Notice('Введи название палитры.'); return; }
      const palette = clone(this.base);
      palette.name = name; palette.mood = 'Пользовательская палитра'; palette.description = 'Создана в English Study Design Studio.';
      palette.id = `user-${slugify(name)}-${Date.now().toString(36).slice(-4)}`;
      palette.defaultBackground = this.studio.selectedBackground.id;
      palette.defaultBlocks = this.studio.selectedBlocks.id;
      ROLE_KEYS.forEach(key => { palette.roles[key] = this.inputs[key].value; });
      palette.swatches = [palette.roles.en, palette.roles.ipa, palette.roles.translation, palette.roles.term, palette.roles.focus];
      palette.source = 'user';
      this.studio.plugin.userData.palettes.push(palette);
      await this.studio.plugin.saveUserLibrary();
      this.studio.plugin.refreshGeneratedStyles();
      this.studio.selectedPalette = palette;
      this.studio.selectedBackground = this.studio.findBackground(palette.defaultBackground) || BACKGROUNDS[0];
      this.studio.selectedBlocks = this.studio.findBlockStyle(palette.defaultBlocks) || BUILTIN_BLOCK_STYLES[0];
      this.studio.backgroundOverridden = false;
      this.studio.activeView = 'studio';
      this.studio.activeSection = 'palette';
      this.studio.render();
      this.close();
      new Notice(`Палитра «${name}» добавлена в «Мои палитры».`);
    });
  }
}

class BackgroundBuilderModal extends Modal {
  constructor(app, studio) { super(app); this.studio = studio; }
  onOpen() { this.modalEl.addClass('esds-builder-modal'); this.contentEl.addClass('esds-builder-content'); this.render(); }
  onClose() { this.contentEl.empty(); }
  render() {
    const root = this.contentEl; root.empty();
    const header = root.createDiv({ cls: 'esds-header esds-builder-header' });
    const back = header.createEl('button', { cls: 'esds-button esds-btn-quiet esds-back-button esds-builder-back-button', attr: { type: 'button', 'aria-label': 'Назад' } });
    back.createSpan({ cls: 'esds-back-arrow', text: '‹' }); back.createSpan({ cls: 'esds-back-label', text: 'Назад' });
    back.addEventListener('click', () => this.close());
    const h = header.createDiv({ cls: 'esds-heading-wrap' }); h.createEl('h2', { text: 'Создать свой фон' }); h.createEl('p', { text: 'Создай простой градиент из двух цветов.' });
    const body = root.createDiv({ cls: 'esds-builder-body' });
    body.createEl('label', { text: 'Название фона' });
    const name = body.createEl('input', { cls: 'esds-text-input', attr: { type: 'text', placeholder: 'Например, Mint Paper' } });
    const colors = body.createDiv({ cls: 'esds-color-grid esds-background-colors' });
    const c1f = colors.createDiv({ cls: 'esds-color-field' }); c1f.createEl('label', { text: 'Первый цвет' }); const c1 = c1f.createEl('input', { attr: { type: 'color', value: '#e8f1ed' } });
    const c2f = colors.createDiv({ cls: 'esds-color-field' }); c2f.createEl('label', { text: 'Второй цвет' }); const c2 = c2f.createEl('input', { attr: { type: 'color', value: '#d6e6df' } });
    const preview = body.createDiv({ cls: 'esds-custom-bg-preview' });
    const update = () => { preview.style.background = `linear-gradient(135deg, ${c1.value} 0%, ${c2.value} 100%)`; };
    c1.addEventListener('input', update); c2.addEventListener('input', update); update();
    const actions = root.createDiv({ cls: 'esds-preview-actions' });
    const save = actions.createEl('button', { cls: 'esds-button esds-primary esds-btn-teal', text: '✓ Сохранить фон' });
    save.addEventListener('click', async () => {
      const label = name.value.trim(); if (!label) { new Notice('Введи название фона.'); return; }
      const id = `bg-custom-${slugify(label)}-${Date.now().toString(36).slice(-4)}`;
      const background = { id, name: label, label, group: 'Мои фоны', light: `linear-gradient(135deg, ${c1.value} 0%, ${c2.value} 100%)`, dark: 'linear-gradient(135deg, #292d35 0%, #20242d 100%)', textColor: '#302d31', darkTextColor: '#e9eaf0', source: 'user' };
      this.studio.plugin.userData.backgrounds.push(background);
      await this.studio.plugin.saveUserLibrary(); this.studio.plugin.refreshGeneratedStyles();
      this.studio.selectedBackground = background; this.studio.backgroundOverridden = true;
      this.studio.activeView = 'studio'; this.studio.activeSection = 'background';
      this.studio.render(); this.close();
      new Notice(`Фон «${label}» добавлен в «Мои фоны».`);
    });
  }
}

class BlockStyleBuilderModal extends Modal {
  constructor(app, studio, existing) {
    super(app);
    this.studio = studio;
    this.existing = existing || null;
    this.draft = existing ? clone(existing) : normalizeBlockStyle({
      name: '',
      category: 'Мои стили',
      base: 'soft',
      source: 'user'
    });
    this.themeMode = 'light'; // light | dark
    this.activeCallout = null;
  }
  onOpen() {
    this.modalEl.addClass('esds-builder-modal');
    this.contentEl.addClass('esds-builder-content esds-block-style-builder');
    this.render();
  }
  onClose() { this.contentEl.empty(); }

  getCurrentProps() {
    const mode = this.themeMode;
    const base = this.draft.style[mode] || {};
    if (this.activeCallout && this.draft.calloutOverrides[this.activeCallout]) {
      return mergeStyleProps(base, this.draft.calloutOverrides[this.activeCallout][mode] || {});
    }
    return base;
  }

  setProp(key, value) {
    const mode = this.themeMode;
    if (this.activeCallout) {
      if (!this.draft.calloutOverrides[this.activeCallout]) this.draft.calloutOverrides[this.activeCallout] = { light: {}, dark: {} };
      if (!this.draft.calloutOverrides[this.activeCallout][mode]) this.draft.calloutOverrides[this.activeCallout][mode] = {};
      this.draft.calloutOverrides[this.activeCallout][mode][key] = value;
    } else {
      if (!this.draft.style[mode]) this.draft.style[mode] = {};
      this.draft.style[mode][key] = value;
    }
  }

  render() {
    const root = this.contentEl;
    root.empty();

    const header = root.createDiv({ cls: 'esds-header esds-builder-header' });
    const back = header.createEl('button', { cls: 'esds-button esds-btn-quiet esds-back-button esds-builder-back-button', attr: { type: 'button', 'aria-label': 'Назад' } });
    back.createSpan({ cls: 'esds-back-arrow', text: '‹' });
    back.createSpan({ cls: 'esds-back-label', text: 'Назад' });
    back.addEventListener('click', () => this.close());
    const h = header.createDiv({ cls: 'esds-heading-wrap' });
    h.createEl('h2', { text: this.existing ? 'Редактировать стиль блоков' : 'Создать стиль блоков' });
    h.createEl('p', { text: 'Общие настройки + переопределения для отдельных callout-ов. Light и Dark отдельно.' });

    const body = root.createDiv({ cls: 'esds-builder-body' });

    // Name + category + base
    body.createEl('label', { text: 'Название' });
    const nameInput = body.createEl('input', { cls: 'esds-text-input', attr: { type: 'text', placeholder: 'Например, Акварельный мягкий' } });
    nameInput.value = this.draft.name || '';
    nameInput.addEventListener('input', () => { this.draft.name = nameInput.value; });

    body.createEl('label', { text: 'Категория' });
    const catRow = body.createDiv({ cls: 'esds-category-row' });
    const catSelect = catRow.createEl('select', { cls: 'esds-select' });
    const cats = this.studio.getCategories('blockStyles');
    cats.forEach(c => {
      const opt = catSelect.createEl('option', { text: c.name, attr: { value: c.name } });
      if (c.name === this.draft.category) opt.selected = true;
    });
    catSelect.addEventListener('change', () => { this.draft.category = catSelect.value; });
    const newCatBtn = catRow.createEl('button', { cls: 'esds-button esds-btn-quiet', text: '+ Новая', attr: { type: 'button' } });
    newCatBtn.addEventListener('click', async () => {
      const name = prompt('Название новой категории:');
      if (!name || !name.trim()) return;
      const list = this.studio.plugin.userData.categories.blockStyles;
      if (list.some(c => c.name === name.trim())) { new Notice('Такая категория уже есть.'); return; }
      list.push({ id: slugify(name.trim()), name: name.trim(), order: list.length, protected: false });
      await this.studio.plugin.saveUserLibrary();
      this.draft.category = name.trim();
      this.render();
    });

    body.createEl('label', { text: 'Базовый стиль' });
    const baseSelect = body.createEl('select', { cls: 'esds-select' });
    [['soft', 'Мягкие цветные'], ['rich', 'Насыщенные'], ['outline', 'Контурные']].forEach(([id, label]) => {
      const opt = baseSelect.createEl('option', { text: label, attr: { value: id } });
      if (id === this.draft.base) opt.selected = true;
    });
    baseSelect.addEventListener('change', () => {
      this.draft.base = baseSelect.value;
      const base = BUILTIN_BLOCK_STYLES.find(b => b.id === this.draft.base) || BUILTIN_BLOCK_STYLES[0];
      this.draft.style = {
        light: mergeStyleProps(base.style.light, this.draft.style.light || {}),
        dark: mergeStyleProps(base.style.dark, this.draft.style.dark || {})
      };
      this.render();
    });

    // Theme toggle
    const themeToggle = body.createDiv({ cls: 'esds-theme-toggle' });
    const lightBtn = themeToggle.createEl('button', { cls: `esds-button ${this.themeMode === 'light' ? 'esds-primary' : 'esds-btn-quiet'}`, text: 'Light', attr: { type: 'button' } });
    const darkBtn = themeToggle.createEl('button', { cls: `esds-button ${this.themeMode === 'dark' ? 'esds-primary' : 'esds-btn-quiet'}`, text: 'Dark', attr: { type: 'button' } });
    lightBtn.addEventListener('click', () => { this.themeMode = 'light'; this.render(); });
    darkBtn.addEventListener('click', () => { this.themeMode = 'dark'; this.render(); });

    // Callout target
    body.createEl('label', { text: 'Применить настройки к' });
    const targetRow = body.createDiv({ cls: 'esds-callout-target-row' });
    const allBtn = targetRow.createEl('button', {
      cls: `esds-button ${!this.activeCallout ? 'esds-primary' : 'esds-btn-quiet'}`,
      text: 'Всем',
      attr: { type: 'button' }
    });
    allBtn.addEventListener('click', () => { this.activeCallout = null; this.render(); });
    CALLOUTS.slice(0, 6).forEach(([key, label]) => {
      const btn = targetRow.createEl('button', {
        cls: `esds-button ${this.activeCallout === key ? 'esds-primary' : 'esds-btn-quiet'}`,
        text: label,
        attr: { type: 'button' }
      });
      btn.addEventListener('click', () => { this.activeCallout = key; this.render(); });
    });

    // Props sliders
    const props = this.getCurrentProps();
    const fields = body.createDiv({ cls: 'esds-style-props' });
    const addSlider = (label, key, min, max, step) => {
      const field = fields.createDiv({ cls: 'esds-prop-field' });
      field.createEl('label', { text: `${label}: ${props[key] != null ? props[key] : '—'}` });
      const input = field.createEl('input', {
        attr: { type: 'range', min: String(min), max: String(max), step: String(step), value: String(props[key] != null ? props[key] : min) }
      });
      input.addEventListener('input', () => {
        const val = key.includes('Opacity') || key === 'backgroundOpacity' || key === 'borderOpacity'
          ? parseFloat(input.value)
          : parseFloat(input.value);
        this.setProp(key, val);
        this.render();
      });
    };
    addSlider('Прозрачность заливки', 'backgroundOpacity', 0, 0.5, 0.005);
    addSlider('Прозрачность рамки', 'borderOpacity', 0, 1, 0.01);
    addSlider('Толщина рамки (px)', 'borderWidth', 0, 4, 0.5);
    addSlider('Скругление (px)', 'borderRadius', 0, 24, 1);
    addSlider('Отступ Y (px)', 'paddingY', 4, 24, 1);
    addSlider('Отступ X (px)', 'paddingX', 4, 28, 1);

    // Live preview
    const previewWrap = body.createDiv({ cls: 'esds-block-builder-preview' });
    previewWrap.createEl('strong', { text: 'Живой предпросмотр' });
    const preview = previewWrap.createDiv({
      cls: `esds-preview esds-template-live-preview esds-blocks-${this.draft.id || 'draft'} ${this.studio.selectedPalette.id} esds-palette-${this.studio.selectedPalette.id} ${this.studio.selectedBackground.id}`
    });
    // Apply draft style vars inline for instant feedback
    const modeProps = this.draft.style[this.themeMode] || {};
    preview.style.setProperty('--esds-block-opacity', modeProps.backgroundOpacity);
    preview.style.setProperty('--esds-block-border-opacity', modeProps.borderOpacity);
    preview.style.setProperty('--esds-block-radius', (modeProps.borderRadius || 12) + 'px');
    preview.style.setProperty('--esds-block-border-width', (modeProps.borderWidth || 1) + 'px');
    this.studio.setPreviewTheme(preview, this.studio.selectedPalette, this.studio.selectedBackground, this.draft);
    this.studio.renderBlockGallery(preview, this.draft.previewCallouts);

    // Color overrides — full grid for main callouts (per theme mode)
    body.createEl('label', { text: `Цвета callout (${this.themeMode === 'dark' ? 'тёмная' : 'светлая'} тема) — поверх палитры` });
    const colorGrid = body.createDiv({ cls: 'esds-callout-color-grid' });
    if (!this.draft.colors[this.themeMode]) this.draft.colors[this.themeMode] = {};
    const modeColors = this.draft.colors[this.themeMode];
    CALLOUTS.slice(0, 6).forEach(([key, label]) => {
      const cell = colorGrid.createDiv({ cls: 'esds-callout-color-cell' });
      cell.createEl('span', { text: label, cls: 'esds-callout-color-label' });
      const current = modeColors[key];
      let hexVal = '#5a7dc8';
      if (typeof current === 'string' && isHexColor(current)) hexVal = current;
      else if (Array.isArray(current) && current.length >= 3) hexVal = colorToHex(current);
      const input = cell.createEl('input', { attr: { type: 'color', value: hexVal } });
      input.addEventListener('input', () => {
        this.draft.colors[this.themeMode][key] = input.value;
      });
      const clear = cell.createEl('button', { cls: 'esds-icon-btn', text: '×', attr: { type: 'button', title: 'Сбросить' } });
      clear.addEventListener('click', () => {
        delete this.draft.colors[this.themeMode][key];
        this.render();
      });
    });

    const actions = root.createDiv({ cls: 'esds-preview-actions' });
    const save = actions.createEl('button', { cls: 'esds-button esds-primary esds-btn-teal', text: this.existing ? '✓ Сохранить изменения' : '✓ Сохранить стиль' });
    save.addEventListener('click', async () => {
      const name = (this.draft.name || '').trim();
      if (!name) { new Notice('Введи название стиля.'); return; }
      this.draft.name = name;
      this.draft.source = 'user';
      if (!this.draft.id || this.draft.id.startsWith('user-blocks-') === false && !this.existing) {
        this.draft.id = `user-blocks-${slugify(name)}-${Date.now().toString(36).slice(-4)}`;
      }
      const list = this.studio.plugin.userData.blockStyles;
      if (this.existing) {
        const idx = list.findIndex(s => s.id === this.existing.id);
        if (idx >= 0) list[idx] = normalizeBlockStyle(this.draft);
        else list.push(normalizeBlockStyle(this.draft));
      } else {
        list.push(normalizeBlockStyle(this.draft));
      }
      await this.studio.plugin.saveUserLibrary();
      this.studio.plugin.refreshGeneratedStyles();
      this.studio.selectedBlocks = this.studio.findBlockStyle(this.draft.id) || normalizeBlockStyle(this.draft);
      this.studio.activeView = 'studio';
      this.studio.activeSection = 'blocks';
      this.studio.render();
      this.close();
      new Notice(`Стиль «${name}» сохранён.`);
    });
  }
}

class CategoryManagerModal extends Modal {
  constructor(app, studio, kind) {
    super(app);
    this.studio = studio;
    this.kind = kind; // 'palettes' | 'backgrounds' | 'blockStyles'
  }
  onOpen() {
    this.modalEl.addClass('esds-builder-modal');
    this.contentEl.addClass('esds-builder-content');
    this.render();
  }
  onClose() { this.contentEl.empty(); }
  render() {
    const root = this.contentEl;
    root.empty();
    const titles = { palettes: 'Категории палитр', backgrounds: 'Категории фонов', blockStyles: 'Категории стилей блоков' };
    const header = root.createDiv({ cls: 'esds-header esds-builder-header' });
    const back = header.createEl('button', { cls: 'esds-button esds-btn-quiet esds-back-button', attr: { type: 'button' } });
    back.createSpan({ cls: 'esds-back-arrow', text: '‹' });
    back.createSpan({ cls: 'esds-back-label', text: 'Назад' });
    back.addEventListener('click', () => this.close());
    const h = header.createDiv({ cls: 'esds-heading-wrap' });
    h.createEl('h2', { text: titles[this.kind] || 'Категории' });

    const body = root.createDiv({ cls: 'esds-builder-body' });
    const list = this.studio.plugin.userData.categories[this.kind] || [];
    list.sort((a, b) => (a.order || 0) - (b.order || 0));

    list.forEach((cat, index) => {
      const row = body.createDiv({ cls: 'esds-category-manage-row' });
      row.createEl('strong', { text: cat.name });
      if (cat.protected) {
        row.createEl('span', { cls: 'esds-badge-protected', text: 'системная' });
      } else {
        const rename = row.createEl('button', { cls: 'esds-button esds-btn-quiet', text: 'Переименовать', attr: { type: 'button' } });
        rename.addEventListener('click', async () => {
          const name = prompt('Новое название:', cat.name);
          if (!name || !name.trim()) return;
          cat.name = name.trim();
          await this.studio.plugin.saveUserLibrary();
          this.render();
        });
        const del = row.createEl('button', { cls: 'esds-button esds-btn-outline-coral', text: 'Удалить', attr: { type: 'button' } });
        del.addEventListener('click', async () => {
          if (!confirm(`Удалить категорию «${cat.name}»? Элементы останутся, но без этой категории.`)) return;
          this.studio.plugin.userData.categories[this.kind] = list.filter(c => c.id !== cat.id);
          await this.studio.plugin.saveUserLibrary();
          this.render();
        });
      }
      if (index > 0) {
        const up = row.createEl('button', { cls: 'esds-button esds-btn-quiet', text: '↑', attr: { type: 'button' } });
        up.addEventListener('click', async () => {
          const tmp = list[index - 1].order;
          list[index - 1].order = list[index].order;
          list[index].order = tmp;
          await this.studio.plugin.saveUserLibrary();
          this.render();
        });
      }
    });

    const add = body.createEl('button', { cls: 'esds-button esds-btn-teal', text: '＋ Новая категория', attr: { type: 'button' } });
    add.addEventListener('click', async () => {
      const name = prompt('Название категории:');
      if (!name || !name.trim()) return;
      if (list.some(c => c.name === name.trim())) { new Notice('Уже существует.'); return; }
      list.push({ id: slugify(name.trim()), name: name.trim(), order: list.length + 10, protected: false });
      await this.studio.plugin.saveUserLibrary();
      this.render();
    });
  }
}

class DesignStudioModal extends Modal {
  constructor(app, plugin) {
    super(app); this.plugin = plugin;
    this.selectedPalette = PALETTES[0];
    this.selectedBackground = BACKGROUNDS.find(b => b.id === PALETTES[0].defaultBackground) || BACKGROUNDS[0];
    this.selectedBlocks = BUILTIN_BLOCK_STYLES.find(item => item.id === PALETTES[0].defaultBlocks) || BUILTIN_BLOCK_STYLES[0];
    this.activeSection = 'palette'; this.activeView = 'studio'; this.advancedOpen = false; this.searchText = ''; this.searchGroup = 'Все'; this.backgroundOverridden = false;
    this._lastRenderedView = null;
    this.readCurrentSelection();
  }
  allPalettes() { return [...PALETTES, ...(this.plugin.userData.palettes || [])]; }
  allBackgrounds() { return [...BACKGROUNDS, ...(this.plugin.userData.backgrounds || [])]; }
  allBlockStyles() {
    const user = (this.plugin.userData.blockStyles || []).map(normalizeBlockStyle);
    return [...BUILTIN_BLOCK_STYLES, ...user];
  }
  findPalette(id) { return this.allPalettes().find(item => item.id === id); }
  findBackground(id) { return this.allBackgrounds().find(item => item.id === id); }
  findBlockStyle(id) { return this.allBlockStyles().find(item => item.id === id); }
  getCategories(kind) {
    const list = (this.plugin.userData.categories && this.plugin.userData.categories[kind]) || DEFAULT_CATEGORIES[kind] || [];
    return [...list].sort((a, b) => (a.order || 0) - (b.order || 0));
  }
  readCurrentSelection() {
    const file = this.app.workspace.getActiveFile(); if (!file) return;
    const fm = this.app.metadataCache.getFileCache(file)?.frontmatter; if (!fm) return;
    const classes = normalizeClasses(fm.cssclasses);
    const pClass = classes.find(item => item.startsWith('esds-palette-'));
    const pId = pClass ? pClass.replace(/^esds-palette-/, '') : null;
    const p = pId ? this.findPalette(pId) : null;
    if (p) this.selectedPalette = p;
    const bgClass = classes.find(item => this.findBackground(item));
    const bg = bgClass ? this.findBackground(bgClass) : null;
    if (bg) this.selectedBackground = bg;
    else if (p) this.selectedBackground = this.findBackground(p.defaultBackground) || BACKGROUNDS[0];
    this.backgroundOverridden = !!(p && bg && bg.id !== p.defaultBackground);
    const blockClass = classes.find(item => item.startsWith('esds-blocks-'));
    const blockId = blockClass ? blockClass.replace(/^esds-blocks-/, '') : null;
    const block = blockId ? this.findBlockStyle(blockId) : null;
    this.selectedBlocks = block || (p ? this.findBlockStyle(p.defaultBlocks) : null) || BUILTIN_BLOCK_STYLES[0];
  }
  onOpen() { this.modalEl.addClass('esds-main-modal'); this.contentEl.addClass('esds-main-content'); this.render(); }
  onClose() { this.contentEl.empty(); }
  section(root, id, title, subtitle, icon) {
    const isOpen = this.activeSection === id;
    const wrap = root.createDiv({ cls: `esds-accordion esds-section-${id}${isOpen ? ' is-open' : ''}` });
    const header = wrap.createEl('button', {
      cls: 'esds-accordion-trigger',
      attr: { type: 'button', 'aria-expanded': isOpen ? 'true' : 'false' }
    });
    header.createSpan({ cls: 'esds-accordion-icon', text: isOpen ? '▾' : (icon || '›') });
    const labels = header.createDiv({ cls: 'esds-accordion-labels' });
    labels.createEl('strong', { text: title });
    if (subtitle) labels.createEl('small', { text: subtitle });
    header.addEventListener('click', () => {
      this.activeSection = this.activeSection === id ? '' : id;
      this.render();
    });
    const body = wrap.createDiv({ cls: 'esds-accordion-body' });
    if (!isOpen) body.style.display = 'none';
    return { wrap, body: isOpen ? body : null };
  }
  render() {
    const root = this.contentEl;
    const sameView = this._lastRenderedView === this.activeView;
    const previousScrollTop = sameView ? (root.querySelector('.esds-main-scroll')?.scrollTop || 0) : 0;
    root.empty();
    if (this.activeView !== 'studio') {
      this.renderSubView();
      const subScroll = root.querySelector('.esds-main-scroll');
      if (subScroll) subScroll.scrollTop = previousScrollTop;
      this._lastRenderedView = this.activeView;
      return;
    }

    const scroll = root.createDiv({ cls: 'esds-main-scroll' });
    const summary = scroll.createDiv({ cls: 'esds-current-summary esds-summary-card' });
    summary.createEl('span', { text: `Текущая тема: ${this.selectedPalette.name}` });

    const quick = scroll.createDiv({ cls: 'esds-quick-actions' });
    const random = quick.createEl('button', { cls: 'esds-button esds-btn-amber', text: '✦ Случайное сочетание', attr: { type: 'button' } });
    random.addEventListener('click', () => this.randomize());

    const shortcuts = scroll.createDiv({ cls: 'esds-library-shortcuts' });
    const lastPalette = (this.plugin.userData.palettes || []).slice(-1)[0];
    const lastAdded = shortcuts.createEl('button', { cls: 'esds-button esds-btn-violet', text: lastPalette ? `✦ Последняя палитра: ${lastPalette.name}` : '＋ Создать палитру', attr: { type: 'button' } });
    lastAdded.addEventListener('click', () => {
      if (lastPalette) this.selectPalette(lastPalette);
      else { this.activeView = 'library'; this.render(); }
    });

    const favorites = shortcuts.createEl('button', { cls: 'esds-button esds-btn-coral', text: `★ Избранное (${(this.plugin.userData.favorites || []).length})`, attr: { type: 'button' } });
    favorites.addEventListener('click', () => { this.activeView = 'favorites'; this.render(); });
    const recent = shortcuts.createEl('button', { cls: 'esds-button esds-btn-cyan', text: `◷ Недавние (${(this.plugin.userData.recent || []).length})`, attr: { type: 'button' } });
    recent.addEventListener('click', () => { this.activeView = 'recent'; this.render(); });
    const library = shortcuts.createEl('button', { cls: 'esds-button esds-btn-teal', text: `▣ Моя библиотека`, attr: { type: 'button' } });
    library.addEventListener('click', () => { this.activeView = 'library'; this.render(); });

    const palette = this.section(scroll, 'palette', 'Общая палитра', 'Меняет текст, фон и блоки сразу', '◉');
    if (palette.body) this.renderPaletteSection(palette.body);
    const background = this.section(scroll, 'background', 'Фон заметки', 'Можно заменить отдельно, не меняя палитру', '▧');
    if (background.body) this.renderBackgroundSection(background.body);
    const blocks = this.section(scroll, 'blocks', 'Стиль блоков', 'Переопределить стиль блоков выбранной палитры', '▤');
    if (blocks.body) this.renderBlocksSection(blocks.body);

    const actions = root.createDiv({ cls: 'esds-main-footer' });
    const reset = actions.createEl('button', { cls: 'esds-button esds-btn-amber esds-footer-default', text: '↺ По умолчанию', attr: { type: 'button' } });
    reset.addEventListener('click', () => this.resetDraft());
    const remove = actions.createEl('button', { cls: 'esds-button esds-danger esds-btn-outline-coral', text: 'Убрать оформление', attr: { type: 'button' } });
    remove.addEventListener('click', () => this.removeDesign());

    scroll.scrollTop = previousScrollTop;
    this._lastRenderedView = this.activeView;
  }
  renderSubView() {
    const root = this.contentEl;
    const scroll = root.createDiv({ cls: 'esds-main-scroll esds-subview-scroll' });
    const header = scroll.createDiv({ cls: 'esds-header esds-subview-header' });
    const back = header.createEl('button', { cls: 'esds-button esds-btn-quiet esds-back-button', attr: { type: 'button', 'aria-label': 'Назад' } });
    back.createSpan({ cls: 'esds-back-arrow', text: '‹' });
    back.createSpan({ cls: 'esds-back-label', text: 'Назад' });
    back.addEventListener('click', () => { this.activeView = 'studio'; this.render(); });
    const heading = header.createDiv({ cls: 'esds-heading-wrap' });
    if (this.activeView === 'favorites') {
      heading.createEl('h2', { text: 'Избранное' });
      heading.createEl('p', { text: 'Сохранённые сочетания палитры, фона и блоков.' });
      this.renderComboList(scroll, this.plugin.userData.favorites || [], true);
    } else if (this.activeView === 'recent') {
      heading.createEl('h2', { text: 'Недавние' });
      heading.createEl('p', { text: 'Последние применённые оформления.' });
      this.renderComboList(scroll, this.plugin.userData.recent || [], false);
    } else {
      heading.createEl('h2', { text: 'Моя библиотека' });
      heading.createEl('p', { text: 'Твои палитры, фоны и инструменты управления коллекцией.' });
      this.renderLibraryView(scroll);
    }
  }
  renderComboThumbnail(parent, combo) {
    const palette = this.findPalette(combo.paletteId) || PALETTES[0];
    const background = this.findBackground(combo.backgroundId) || this.findBackground(palette.defaultBackground) || BACKGROUNDS[0];
    const blocks = this.findBlockStyle(combo.blocksId) || this.findBlockStyle(palette.defaultBlocks) || BUILTIN_BLOCK_STYLES[0];
    const thumb = parent.createDiv({ cls: `esds-combo-thumb esds-preview ${palette.id} esds-palette-${palette.id} ${background.id} esds-blocks-${blocks.id}` });
    const note = thumb.createDiv({ cls: 'esds-combo-thumb-note' });
    note.createEl('strong', { cls: 'esds-combo-thumb-heading', text: 'English' });
    note.createEl('span', { cls: 'esds-combo-thumb-en', text: 'I would like to…' });
    note.createEl('small', { cls: 'esds-combo-thumb-ipa', text: '/aɪd laɪk tə/' });
    note.createDiv({ cls: `esds-combo-thumb-block esds-block-demo-${blocks.id}` });
    return thumb;
  }
  renderComboList(parent, combos, allowDelete) {
    if (!combos.length) {
      const empty = parent.createDiv({ cls: 'esds-empty-panel' });
      empty.createEl('strong', { text: allowDelete ? 'Пока нет избранных сочетаний' : 'История пока пуста' });
      empty.createEl('p', { text: allowDelete ? 'Добавляй понравившиеся варианты в избранное из окна предпросмотра.' : 'После применения оформления оно автоматически появится здесь.' });
      return;
    }
    const list = parent.createDiv({ cls: 'esds-combo-list' });
    combos.forEach((combo, index) => {
      const card = list.createDiv({ cls: 'esds-combo-card esds-combo-card-clickable', attr: { role: 'button', tabindex: '0', 'aria-label': `Открыть предпросмотр: ${combo.label || 'Оформление'}` } });
      this.renderComboThumbnail(card, combo);
      const info = card.createDiv({ cls: 'esds-combo-info' });
      info.createEl('strong', { text: combo.label || 'Оформление' });
      const palette = this.findPalette(combo.paletteId) || PALETTES[0];
      const background = this.findBackground(combo.backgroundId);
      const blocks = this.findBlockStyle(combo.blocksId);
      info.createEl('small', { text: `${palette.name} · ${background ? (background.label || background.name) : 'Фон'} · ${blocks ? blocks.name : 'Блоки'}` });
      const openPreview = () => this.loadCombo(combo);
      card.addEventListener('click', event => { if (event.target.closest('button')) return; openPreview(); });
      card.addEventListener('keydown', event => {
        if (event.target !== card) return;
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openPreview(); }
      });
      if (allowDelete) {
        const actions = card.createDiv({ cls: 'esds-combo-actions' });
        const remove = actions.createEl('button', { cls: 'esds-button esds-btn-outline-coral', text: 'Убрать', attr: { type: 'button' } });
        remove.addEventListener('click', async event => {
          event.stopPropagation();
          this.plugin.userData.favorites.splice(index, 1);
          await this.plugin.saveUserLibrary();
          this.render();
        });
      }
    });
  }
  renderLibraryView(parent) {
    const palettes = this.plugin.userData.palettes || [];
    const backgrounds = this.plugin.userData.backgrounds || [];

    const copySection = parent.createDiv({ cls: 'esds-subsection esds-library-section esds-library-copy-section' });
    copySection.createEl('h3', { text: 'Быстрое копирование' });
    copySection.createEl('p', { cls: 'esds-section-note', text: 'Скопируй классы отдельно или готовый блок свойств для заметки.' });
    const copyActions = copySection.createDiv({ cls: 'esds-library-copy-actions' });
    const copyClasses = copyActions.createEl('button', { cls: 'esds-button esds-btn-violet', text: '⧉ Копировать CSS-классы', attr: { type: 'button' } });
    copyClasses.addEventListener('click', () => this.copyClassNames());
    const copyProperties = copyActions.createEl('button', { cls: 'esds-button esds-btn-cyan', text: '▤ Копировать свойства', attr: { type: 'button' } });
    copyProperties.addEventListener('click', () => this.copyProperties());

    const paletteSection = parent.createDiv({ cls: 'esds-subsection esds-library-section' });
    paletteSection.createEl('h3', { text: `Мои палитры (${palettes.length})` });
    if (palettes.length) {
      const grid = paletteSection.createDiv({ cls: 'esds-palette-grid' });
      palettes.forEach(palette => this.renderPaletteCard(grid, palette));
    } else paletteSection.createEl('p', { cls: 'esds-empty', text: 'Пользовательских палитр пока нет.' });

    const backgroundSection = parent.createDiv({ cls: 'esds-subsection esds-library-section' });
    backgroundSection.createEl('h3', { text: `Мои фоны (${backgrounds.length})` });
    if (backgrounds.length) {
      const list = backgroundSection.createDiv({ cls: 'esds-user-background-list' });
      backgrounds.forEach(bg => {
        const row = list.createDiv({ cls: 'esds-user-background-row' });
        const swatch = row.createDiv({ cls: 'esds-user-background-swatch' });
        swatch.style.background = document.body.classList.contains('theme-dark') ? (bg.dark || bg.light) : bg.light;
        const name = row.createEl('strong', { text: bg.label || bg.name });
        const choose = row.createEl('button', { cls: 'esds-button esds-btn-cyan', text: 'Выбрать', attr: { type: 'button' } });
        choose.addEventListener('click', () => this.selectBackground(bg));
      });
    } else backgroundSection.createEl('p', { cls: 'esds-empty', text: 'Пользовательских фонов пока нет.' });

    const tools = parent.createDiv({ cls: 'esds-subsection esds-library-section' });
    tools.createEl('h3', { text: 'Создание и перенос' });
    const actions = tools.createDiv({ cls: 'esds-library-actions esds-library-tool-grid' });
    const createPalette = actions.createEl('button', { cls: 'esds-button esds-btn-violet', text: '+ Создать палитру', attr: { type: 'button' } });
    createPalette.addEventListener('click', () => new PaletteBuilderModal(this.app, this).open());
    const createBackground = actions.createEl('button', { cls: 'esds-button esds-btn-lime', text: '+ Создать фон', attr: { type: 'button' } });
    createBackground.addEventListener('click', () => new BackgroundBuilderModal(this.app, this).open());
    const createBlocks = actions.createEl('button', { cls: 'esds-button esds-btn-violet', text: '+ Создать стиль блоков', attr: { type: 'button' } });
    createBlocks.addEventListener('click', () => new BlockStyleBuilderModal(this.app, this).open());
    const importPalette = actions.createEl('button', { cls: 'esds-button esds-btn-cyan', text: '⇧ Импорт палитры', attr: { type: 'button' } });
    importPalette.addEventListener('click', () => this.pickJson('palette'));
    const importBackground = actions.createEl('button', { cls: 'esds-button esds-btn-cyan', text: '⇧ Импорт фона', attr: { type: 'button' } });
    importBackground.addEventListener('click', () => this.pickJson('background'));
    const importBlocks = actions.createEl('button', { cls: 'esds-button esds-btn-cyan', text: '⇧ Импорт стиля блоков', attr: { type: 'button' } });
    importBlocks.addEventListener('click', () => this.pickJson('blockStyle'));
    const exportPalette = actions.createEl('button', { cls: 'esds-button esds-btn-teal', text: '⇩ Экспорт палитры', attr: { type: 'button' } });
    exportPalette.addEventListener('click', () => this.exportItem('palette'));
    const exportBackground = actions.createEl('button', { cls: 'esds-button esds-btn-teal', text: '⇩ Экспорт фона', attr: { type: 'button' } });
    exportBackground.addEventListener('click', () => this.exportItem('background'));
    const exportBlocks = actions.createEl('button', { cls: 'esds-button esds-btn-teal', text: '⇩ Экспорт стиля блоков', attr: { type: 'button' } });
    exportBlocks.addEventListener('click', () => this.exportItem('blockStyle'));
    const backup = actions.createEl('button', { cls: 'esds-button esds-btn-amber', text: '♧ Резервная копия', attr: { type: 'button' } });
    backup.addEventListener('click', () => this.plugin.exportLibrary());

    const advanced = parent.createDiv({ cls: 'esds-subsection esds-advanced-tools' });
    const toggle = advanced.createEl('button', { cls: 'esds-advanced-toggle', text: `${this.advancedOpen ? '⌄' : '›'} Дополнительно`, attr: { type: 'button', 'aria-expanded': this.advancedOpen ? 'true' : 'false' } });
    toggle.addEventListener('click', () => { this.advancedOpen = !this.advancedOpen; this.render(); });
    if (this.advancedOpen) {
      const details = advanced.createDiv({ cls: 'esds-advanced-content' });
      details.createEl('p', { cls: 'esds-path-note', text: 'Пользовательская библиотека хранится отдельно от кода плагина: .obsidian/english-study-design-studio/user-library.json. При обновлении плагина эти данные сохраняются.' });
    }
  }
  paletteSwatches(palette) {
    const darkMode = document.body.classList.contains('theme-dark');
    const roleKeys = [
      ['en', 'Английский'], ['ipa', 'Транскрипция'], ['translation', 'Перевод'],
      ['term', 'Термин'], ['focus', 'Акцент'], ['secondary', 'Второй акцент']
    ];
    return roleKeys.map(([key, label]) => ({
      label,
      color: colorToHex((darkMode && palette.dark && palette.dark[key]) || (palette.roles && palette.roles[key]))
    }));
  }
  renderPaletteSection(parent) {
    const built = parent.createDiv({ cls: 'esds-template-list esds-palette-template-list' });
    const builtHeading = built.createDiv({ cls: 'esds-template-group-caption' });
    builtHeading.createEl('strong', { text: 'Стандартные палитры' });
    const builtGrid = built.createDiv({ cls: 'esds-template-card-list' });
    PALETTES.forEach(p => this.renderPaletteCard(builtGrid, p));

    const mine = this.plugin.userData.palettes || [];
    const mineHeading = parent.createDiv({ cls: 'esds-template-group-caption esds-user-template-caption' });
    mineHeading.createEl('strong', { text: `Мои палитры (${mine.length})` });
    if (mine.length) {
      const grid = parent.createDiv({ cls: 'esds-template-card-list' });
      mine.forEach(p => this.renderPaletteCard(grid, p));
    } else {
      parent.createEl('p', { cls: 'esds-empty', text: 'Пока нет пользовательских палитр. Создай свою в разделе «Моя библиотека».' });
    }
  }
  renderPaletteCard(parent, p) {
    const selected = p.id === this.selectedPalette.id;
    const bg = this.findBackground(p.defaultBackground) || this.selectedBackground || BACKGROUNDS[0];
    const block = this.findBlockStyle(p.defaultBlocks) || BUILTIN_BLOCK_STYLES[0];
    // div not button — Android WebView clips nested content inside <button>
    const card = parent.createDiv({
      cls: `esds-template-card esds-palette-template-card${selected ? ' is-selected' : ''}`,
      attr: { role: 'button', tabindex: '0', 'aria-pressed': selected ? 'true' : 'false', 'aria-label': `${p.name}${selected ? ', выбрана' : ''}` }
    });
    const heading = card.createDiv({ cls: 'esds-template-card-heading' });
    heading.createEl('strong', { text: p.name });
    if (selected) heading.createSpan({ cls: 'esds-template-check is-visible', text: '✓' });

    const live = card.createDiv({
      cls: `esds-palette-rich-sample esds-inline-theme ${p.id} esds-palette-${p.id} ${bg.id} esds-blocks-${block.id}`
    });
    this.setPreviewTheme(live, p, bg, block);
    live.removeClass('esds-preview');

    const sample = live.createDiv({ cls: 'esds-rich-sample' });
    sample.createEl('div', { cls: 'esds-rich-title', text: 'Would like to' });
    sample.createEl('div', { cls: 'esds-role esds-en', text: 'I would like to learn English.' });
    sample.createEl('div', { cls: 'esds-role esds-ipa', text: '/aɪd laɪk tə lɜːrn ˈɪŋɡlɪʃ/' });
    sample.createEl('div', { cls: 'esds-role esds-translation', text: 'Я хотел бы учить английский.' });
    const mini = sample.createDiv({ cls: 'esds-rich-mini-callout esds-demo-callout esds-callout-example' });
    mini.createEl('strong', { text: 'Пример' });
    mini.createEl('span', { text: 'I’d like to try.' });

    const activate = () => this.selectPalette(p);
    card.addEventListener('click', activate);
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); } });
  }
  renderBackgroundSection(parent) {
    parent.createEl('p', { cls: 'esds-section-note', text: 'Каждый фон показан сразу на примере заметки. Цвета текста и стиль блоков берутся из выбранной палитры.' });
    const search = parent.createEl('input', { cls: 'esds-text-input esds-bg-search', attr: { type: 'search', placeholder: 'Поиск фона по названию…' } }); search.value = this.searchText;
    const categories = ['Все', ...new Set(this.allBackgrounds().map(bg => bg.group || 'Мои фоны'))];
    const groupSelect = parent.createEl('select', { cls: 'esds-text-input esds-bg-filter' }); categories.forEach(cat => groupSelect.createEl('option', { text: cat, attr: { value: cat } })); groupSelect.value = this.searchGroup;
    const grid = parent.createDiv({ cls: 'esds-background-grid esds-background-template-grid' });
    const draw = () => {
      grid.empty();
      const filtered = this.allBackgrounds().filter(bg => (this.searchGroup === 'Все' || (bg.group || 'Мои фоны') === this.searchGroup) && `${bg.label || bg.name} ${bg.group || ''}`.toLowerCase().includes(this.searchText.toLowerCase()));
      filtered.forEach(bg => {
        const isSelected = this.selectedBackground.id === bg.id;
        const card = grid.createEl('button', { cls: `esds-bg-card esds-background-template-card${isSelected ? ' is-selected' : ''}`, attr: { type: 'button', 'aria-pressed': isSelected ? 'true' : 'false' } });
        const thumb = card.createDiv({ cls: `esds-bg-thumb esds-preview esds-background-live-preview ${this.selectedPalette.id} esds-palette-${this.selectedPalette.id} ${bg.id} esds-blocks-${this.selectedBlocks.id}` });
        this.setPreviewTheme(thumb, this.selectedPalette, bg, this.selectedBlocks);
        this.renderBackgroundSampleNote(thumb);
        const info = card.createDiv({ cls: 'esds-bg-template-info' });
        info.createEl('span', { text: bg.label || bg.name });
        if (bg.group) info.createEl('small', { text: bg.group });
        if (isSelected) info.createSpan({ cls: 'esds-card-check esds-bg-check', text: '✓', attr: { 'aria-label': 'Выбранный фон' } });
        card.addEventListener('click', () => this.selectBackground(bg));
      });
      if (!filtered.length) grid.createEl('p', { cls: 'esds-empty', text: 'Фоны не найдены.' });
    };
    search.addEventListener('input', () => { this.searchText = search.value; draw(); });
    groupSelect.addEventListener('change', () => { this.searchGroup = groupSelect.value; draw(); });
    draw();
  }
  renderBackgroundSample(container) {
    const sample = container.createDiv({ cls: 'esds-background-sample' });
    sample.createEl('strong', { cls: 'esds-en', text: 'English Study' });
    sample.createEl('span', { cls: 'esds-ipa', text: '/ˈɪŋɡlɪʃ/' });
    sample.createEl('span', { cls: 'esds-translation', text: 'Изучение английского' });
    const line = sample.createDiv({ cls: 'esds-background-sample-line' });
    line.style.background = 'var(--esds-heading, var(--text-accent))';
  }
  renderBlocksSection(parent) {
    parent.createEl('p', { cls: 'esds-section-note', text: 'Каждый стиль — со своим живым образцом. У своих: ↑↓ сортировка и меню ⋯ (редактировать / дублировать / экспорт / удалить).' });

    const toolbar = parent.createDiv({ cls: 'esds-block-toolbar' });
    const createBtn = toolbar.createEl('button', { cls: 'esds-button esds-btn-teal', text: '＋ Создать стиль блоков', attr: { type: 'button' } });
    createBtn.addEventListener('click', () => new BlockStyleBuilderModal(this.app, this).open());
    const catBtn = toolbar.createEl('button', { cls: 'esds-button esds-btn-quiet', text: 'Категории…', attr: { type: 'button' } });
    catBtn.addEventListener('click', () => this.openCategoryManager('blockStyles'));

    const allStyles = this.allBlockStyles().slice().sort((a, b) => (a.order || 0) - (b.order || 0));
    const categories = this.getCategories('blockStyles');
    const list = parent.createDiv({ cls: 'esds-block-template-list' });

    const byCategory = new Map();
    allStyles.forEach(style => {
      const catName = style.category || 'Мои стили';
      if (!byCategory.has(catName)) byCategory.set(catName, []);
      byCategory.get(catName).push(style);
    });

    const orderedNames = [];
    categories.forEach(c => { if (byCategory.has(c.name)) orderedNames.push(c.name); });
    byCategory.forEach((_, name) => { if (!orderedNames.includes(name)) orderedNames.push(name); });

    orderedNames.forEach(catName => {
      const styles = byCategory.get(catName) || [];
      styles.forEach((block, indexInCat) => {
        const isSelected = this.selectedBlocks && this.selectedBlocks.id === block.id;
        const group = list.createDiv({ cls: 'esds-block-template-group' });

        // Clear header ABOVE the card — name only, no overlay
        const label = group.createDiv({ cls: 'esds-block-style-divider' });
        label.createSpan({ cls: 'esds-block-style-name', text: block.name });
        if (block.source === 'user') {
          label.createSpan({ cls: 'esds-badge-custom', text: 'Custom' });
          const controls = label.createDiv({ cls: 'esds-block-style-controls' });
          if (indexInCat > 0) {
            const up = controls.createEl('button', { cls: 'esds-icon-btn', text: '↑', attr: { type: 'button', title: 'Выше' } });
            up.addEventListener('click', async (e) => { e.stopPropagation(); await this.reorderBlockStyle(block.id, -1); });
          }
          if (indexInCat < styles.length - 1) {
            const down = controls.createEl('button', { cls: 'esds-icon-btn', text: '↓', attr: { type: 'button', title: 'Ниже' } });
            down.addEventListener('click', async (e) => { e.stopPropagation(); await this.reorderBlockStyle(block.id, 1); });
          }
          const menu = controls.createEl('button', { cls: 'esds-icon-btn esds-more-btn', text: '⋯', attr: { type: 'button', title: 'Действия' } });
          menu.addEventListener('click', (e) => { e.stopPropagation(); this.openBlockStyleMenu(block, menu); });
        }

        // div not button — Android clips nested grids inside <button>
        const card = group.createDiv({
          cls: `esds-block-template-card${isSelected ? ' is-selected' : ''}`,
          attr: { role: 'button', tabindex: '0', 'aria-pressed': isSelected ? 'true' : 'false', 'aria-label': `Выбрать стиль «${block.name}»` }
        });
        if (isSelected) card.createSpan({ cls: 'esds-card-selected-badge', text: '✓' });

        const preview = card.createDiv({
          cls: `esds-block-style-preview esds-inline-theme ${this.selectedPalette.id} esds-palette-${this.selectedPalette.id} ${this.selectedBackground.id} esds-blocks-${block.id}`
        });
        this.setPreviewTheme(preview, this.selectedPalette, this.selectedBackground, block);
        preview.removeClass('esds-preview');
        this.renderBlockGallery(preview, block.previewCallouts || ['rule', 'example', 'important', 'tip', 'practice', 'success']);

        const activate = () => {
          this.selectedBlocks = block;
          this.activeView = 'studio';
          this.render();
        };
        card.addEventListener('click', activate);
        card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); } });
      });
    });
  }

  async reorderBlockStyle(id, direction) {
    const list = this.plugin.userData.blockStyles || [];
    // Work on sorted view within same category
    const style = list.find(s => s.id === id);
    if (!style) return;
    const cat = style.category || 'Мои стили';
    const sameCat = list.filter(s => (s.category || 'Мои стили') === cat).sort((a, b) => (a.order || 0) - (b.order || 0));
    const idx = sameCat.findIndex(s => s.id === id);
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= sameCat.length) return;
    const other = sameCat[targetIdx];
    const tmp = style.order != null ? style.order : idx;
    style.order = other.order != null ? other.order : targetIdx;
    other.order = tmp;
    await this.plugin.saveUserLibrary();
    this.render();
  }

  openBlockStyleMenu(block, anchorEl) {
    const existing = document.querySelector('.esds-style-menu-popover');
    if (existing) existing.remove();

    const pop = document.body.createDiv({ cls: 'esds-style-menu-popover' });
    const rect = anchorEl.getBoundingClientRect();
    pop.style.position = 'fixed';
    pop.style.top = `${Math.min(rect.bottom + 4, window.innerHeight - 180)}px`;
    pop.style.left = `${Math.max(8, Math.min(rect.left - 60, window.innerWidth - 190))}px`;
    pop.style.zIndex = '10000';

    const addItem = (text, cls, fn) => {
      const btn = pop.createEl('button', { cls: `esds-menu-item ${cls || ''}`, text, attr: { type: 'button' } });
      btn.addEventListener('click', () => { pop.remove(); fn(); });
    };

    addItem('✎ Редактировать', '', () => new BlockStyleBuilderModal(this.app, this, block).open());
    addItem('⧉ Дублировать', '', async () => {
      const copy = normalizeBlockStyle({
        ...clone(block),
        id: undefined,
        name: `${block.name} (копия)`,
        source: 'user',
        order: (block.order || 50) + 1
      });
      this.plugin.userData.blockStyles.push(copy);
      await this.plugin.saveUserLibrary();
      this.plugin.refreshGeneratedStyles();
      this.render();
      new Notice(`Создана копия «${copy.name}».`);
    });
    addItem('⇩ Экспорт', '', async () => {
      const prev = this.selectedBlocks;
      this.selectedBlocks = block;
      await this.exportItem('blockStyle');
      this.selectedBlocks = prev;
    });
    addItem('✕ Удалить', 'esds-menu-danger', async () => {
      if (!confirm(`Удалить стиль «${block.name}»?`)) return;
      this.plugin.userData.blockStyles = (this.plugin.userData.blockStyles || []).filter(s => s.id !== block.id);
      if (this.selectedBlocks && this.selectedBlocks.id === block.id) this.selectedBlocks = BUILTIN_BLOCK_STYLES[0];
      await this.plugin.saveUserLibrary();
      this.plugin.refreshGeneratedStyles();
      this.render();
      new Notice('Стиль удалён.');
    });

    const close = (ev) => {
      if (!pop.contains(ev.target) && ev.target !== anchorEl) {
        pop.remove();
        document.removeEventListener('pointerdown', close, true);
      }
    };
    setTimeout(() => document.addEventListener('pointerdown', close, true), 0);
  }

  openCategoryManager(kind) {
    new CategoryManagerModal(this.app, this, kind).open();
  }
  selectPalette(p) {
    this.selectedPalette = p;
    this.selectedBackground = this.findBackground(p.defaultBackground) || BACKGROUNDS[0];
    this.selectedBlocks = this.findBlockStyle(p.defaultBlocks) || BUILTIN_BLOCK_STYLES[0];
    this.backgroundOverridden = false;
    this.activeView = 'studio'; this.activeSection = 'palette'; this.render();
  }
  selectBackground(bg) {
    this.selectedBackground = bg;
    this.backgroundOverridden = bg.id !== this.selectedPalette.defaultBackground;
    this.activeView = 'studio'; this.activeSection = 'background'; this.render();
  }
  openPreview() { new PreviewModal(this.app, this).open(); }
  randomize() {
    const palettes = this.allPalettes(); const p = palettes[Math.floor(Math.random()*palettes.length)];
    this.selectedPalette = p; this.selectedBackground = this.findBackground(p.defaultBackground) || BACKGROUNDS[0];
    this.selectedBlocks = this.findBlockStyle(p.defaultBlocks) || BUILTIN_BLOCK_STYLES[0];
    this.backgroundOverridden = false; this.activeView = 'studio'; this.render();
  }
  resetDraft() {
    this.selectedPalette = PALETTES[0]; this.selectedBackground = this.findBackground(PALETTES[0].defaultBackground) || BACKGROUNDS[0];
    this.selectedBlocks = this.findBlockStyle(PALETTES[0].defaultBlocks) || BUILTIN_BLOCK_STYLES[0];
    this.backgroundOverridden = false; this.activeView = 'studio'; this.render();
  }
  loadCombo(combo) {
    const p = this.findPalette(combo.paletteId) || PALETTES[0]; this.selectedPalette = p;
    this.selectedBackground = this.findBackground(combo.backgroundId) || this.findBackground(p.defaultBackground) || BACKGROUNDS[0];
    this.selectedBlocks = this.findBlockStyle(combo.blocksId) || this.findBlockStyle(p.defaultBlocks) || BUILTIN_BLOCK_STYLES[0];
    this.backgroundOverridden = this.selectedBackground.id !== p.defaultBackground; this.activeView = 'studio'; this.render(); this.openPreview();
  }
  setPreviewTheme(container, palette, background, block) {
    container.addClass('esds-inline-theme');
    container.addClass(palette.id);
    container.addClass(`esds-palette-${palette.id}`);
    container.addClass(background.id);
    container.addClass(`esds-blocks-${block.id}`);
    // Apply role colors inline so rich samples work without full stylesheet match
    const darkMode = document.body.classList.contains('theme-dark');
    const roles = darkMode && palette.dark ? palette.dark : palette.roles;
    if (roles) {
      ROLE_KEYS.forEach(key => {
        if (roles[key]) container.style.setProperty(`--esds-${key}`, roles[key]);
      });
    }
    const callouts = darkMode && palette.darkCallouts ? palette.darkCallouts : palette.callouts;
    if (callouts) {
      CALLOUT_KEYS.forEach(key => {
        if (callouts[key]) container.style.setProperty(`--esds-callout-${key}`, rgbValue(callouts[key]));
      });
    }
    if (background && background.source === 'user') {
      const bgValue = darkMode ? (background.dark || background.light) : background.light;
      if (bgValue) container.style.setProperty('--note-background', bgValue);
      const fg = darkMode ? background.darkTextColor : background.textColor;
      if (fg) container.style.setProperty('--esds-bg-fg', fg);
    } else if (background) {
      // built-in backgrounds rely on CSS classes; ensure readable text
      container.style.setProperty('--esds-ink', roles && roles.ink ? roles.ink : '');
    }
  }
  renderMiniNote(container, includeCallouts = true) {
    const sample = container.createDiv({ cls: 'esds-sample-note esds-inline-sample-note' });
    sample.createEl('span', { cls: 'esds-kicker', text: 'ENGLISH · BEGINNER' });
    sample.createEl('h2', { text: 'Would like to' });
    const roles = sample.createDiv({ cls: 'esds-inline-role-list' });
    roles.createEl('p', { cls: 'esds-role esds-en', text: 'I would like to learn English.' });
    roles.createEl('p', { cls: 'esds-role esds-ipa', text: '/aɪd laɪk tə lɜːrn ˈɪŋɡlɪʃ/' });
    roles.createEl('p', { cls: 'esds-role esds-translation', text: 'Я хотел бы учить английский.' });
    const grammar = sample.createDiv({ cls: 'esds-preview-grammar' });
    grammar.createEl('strong', { cls: 'esds-term', text: 'would like to + глагол' });
    grammar.createEl('span', { cls: 'esds-definition', text: 'Вежливо выражаем желание.' });
    if (includeCallouts) this.renderBlockGallery(sample);
  }
  renderBackgroundSampleNote(container) {
    const sample = container.createDiv({ cls: 'esds-background-sample' });
    sample.createEl('strong', { cls: 'esds-en', text: 'English Study' });
    sample.createEl('span', { cls: 'esds-ipa', text: '/ˈɪŋɡlɪʃ/' });
    sample.createEl('span', { cls: 'esds-translation', text: 'Изучение английского' });
    const line = sample.createDiv({ cls: 'esds-background-sample-line' });
    line.style.background = 'var(--esds-heading, var(--text-accent))';
  }
  renderBlockGallery(container, calloutKeys) {
    const grid = container.createDiv({ cls: 'esds-example-grid esds-inline-example-grid esds-block-gallery-large' });
    const allExamples = {
      rule: ['rule', 'Правило', 'would like to + verb'],
      example: ['example', 'Пример', 'I’d like to learn English.'],
      important: ['important', 'Важно', 'После to — начальная форма глагола.'],
      tip: ['tip', 'Совет', 'Используй в вежливой речи.'],
      practice: ['practice', 'Практика', 'Составь своё предложение.'],
      success: ['success', 'Успех', 'Ты освоил конструкцию!'],
      warning: ['warning', 'Предупреждение', 'Не путай with и by.'],
      question: ['question', 'Вопрос', 'What would you like to do?'],
      info: ['info', 'Информация', 'Конструкция вежливая.'],
      note: ['note', 'Заметка', 'Запомни форму глагола.'],
      quote: ['quote', 'Цитата', 'I’d like to try.'],
      abstract: ['abstract', 'Кратко', 'would like to + V1']
    };
    const keys = Array.isArray(calloutKeys) && calloutKeys.length
      ? calloutKeys
      : ['rule', 'example', 'important', 'tip', 'practice', 'success'];
    keys.forEach(key => {
      const example = allExamples[key] || [key, key, '…'];
      this.makeCallout(grid, example[0], example[1], example[2]);
    });
  }
  renderPreview(container) {
    this.setPreviewTheme(container, this.selectedPalette, this.selectedBackground, this.selectedBlocks);
    this.renderMiniNote(container, true);
  }
  makeCallout(parent, type, title, body) {
    const box = parent.createDiv({ cls: `esds-demo-callout esds-callout-${type}` });
    box.createEl('strong', { text: title });
    box.createEl('p', { text: body });
  }
  getSelectedClasses() {
    return ['esds-note', `esds-palette-${this.selectedPalette.id}`, this.selectedBackground.id, `esds-blocks-${this.selectedBlocks.id}`];
  }
  isOwnedClass(name) {
    return name === 'esds-note' || name.startsWith('esds-palette-') || name.startsWith('esds-blocks-') ||
      BACKGROUNDS.some(bg => bg.id === name) || (this.plugin.userData.backgrounds || []).some(bg => bg.id === name);
  }
  async applySelected() {
    const file = this.app.workspace.getActiveFile();
    if (!file) { new Notice('Сначала открой учебную заметку.'); return false; }
    try {
      const selected = this.getSelectedClasses();
      await this.app.fileManager.processFrontMatter(file, fm => {
        const retained = normalizeClasses(fm.cssclasses).filter(name => !this.isOwnedClass(name));
        fm.cssclasses = [...new Set([...retained, ...selected])];
      });
      await this.recordRecent();
      new Notice(`Оформление применено: ${this.selectedPalette.name}.`);
      return true;
    } catch (error) { console.error('English Study Design Studio:', error); new Notice('Не удалось изменить cssclasses. Проверь доступ к заметке.'); return false; }
  }
  async recordRecent() {
    const combo = this.currentCombo();
    this.plugin.userData.recent = [combo, ...this.plugin.userData.recent.filter(x => x.key !== combo.key)].slice(0, 10);
    await this.plugin.saveUserLibrary();
  }
  currentCombo() {
    const bgName = this.selectedBackground.label || this.selectedBackground.name;
    return { key: `${this.selectedPalette.id}|${this.selectedBackground.id}|${this.selectedBlocks.id}`, label: `${this.selectedPalette.name} · ${bgName}`, paletteId: this.selectedPalette.id, backgroundId: this.selectedBackground.id, blocksId: this.selectedBlocks.id };
  }
  isFavorite() {
    const combo = this.currentCombo();
    return (this.plugin.userData.favorites || []).some(item => item.key === combo.key);
  }
  async addFavorite() {
    const combo = this.currentCombo();
    if (this.isFavorite()) return false;
    this.plugin.userData.favorites.unshift(combo);
    await this.plugin.saveUserLibrary();
    new Notice('Сочетание добавлено в избранное.');
    return true;
  }
  async copyClassNames() {
    const text = this.getSelectedClasses().join(' ');
    try { await navigator.clipboard.writeText(text); new Notice('CSS-классы скопированы.'); }
    catch (error) { console.error(error); new Notice('Не удалось открыть буфер обмена. Используй «Применить».'); }
  }
  async copyProperties() {
    const text = `cssclasses:\n${this.getSelectedClasses().map(item => `  - ${item}`).join('\n')}`;
    try { await navigator.clipboard.writeText(text); new Notice('Блок свойств скопирован.'); }
    catch (error) { console.error(error); new Notice('Не удалось открыть буфер обмена. Используй «Применить».'); }
  }
  async removeDesign() {
    const file = this.app.workspace.getActiveFile(); if (!file) { new Notice('Сначала открой заметку.'); return; }
    try {
      await this.app.fileManager.processFrontMatter(file, fm => {
        const retained = normalizeClasses(fm.cssclasses).filter(name => !this.isOwnedClass(name));
        if (retained.length) fm.cssclasses = retained; else delete fm.cssclasses;
      });
      new Notice('Оформление плагина удалено. Остальные cssclasses сохранены.');
    } catch (error) { console.error(error); new Notice('Не удалось удалить классы оформления.'); }
  }
  pickJson(kind) {
    const input = this.contentEl.createEl('input', { attr: { type: 'file', accept: '.json,application/json' } });
    input.style.display = 'none';
    input.addEventListener('change', async () => {
      const file = input.files && input.files[0]; if (!file) return;
      try { const raw = await file.text(); const data = JSON.parse(raw); await this.importJson(kind, data); }
      catch (error) { console.error(error); new Notice('Не удалось импортировать файл. Проверь формат JSON.'); }
      input.remove();
    });
    input.click();
  }
  async importJson(kind, data) {
    if (kind === 'palette') {
      let p = data.palette || data;
      const roles = p.roles || {};
      if (!p.name || !ROLE_KEYS.every(key => isHexColor(roles[key]))) throw new Error('Palette roles are missing or invalid');
      const palette = clone(p); palette.id = `user-${slugify(p.name)}-${Date.now().toString(36).slice(-4)}`; palette.source = 'user';
      palette.defaultBackground = this.findBackground(p.defaultBackground)?.id || PALETTES[0].defaultBackground;
      palette.defaultBlocks = this.findBlockStyle(p.defaultBlocks) ? p.defaultBlocks : 'soft';
      palette.dark = Object.fromEntries(ROLE_KEYS.map(key => [key, isHexColor(palette.dark && palette.dark[key]) ? palette.dark[key] : palette.roles[key]]));
      palette.callouts = palette.callouts || clone(PALETTES[0].callouts);
      palette.darkCallouts = palette.darkCallouts || clone(palette.callouts);
      palette.swatches = palette.swatches || ROLE_KEYS.slice(0,5).map(k => palette.roles[k]);
      if (p.category) palette.category = p.category;
      this.plugin.userData.palettes.push(palette); this.plugin.refreshGeneratedStyles();
      this.selectedPalette = palette; this.selectedBackground = this.findBackground(palette.defaultBackground); this.selectedBlocks = this.findBlockStyle(palette.defaultBlocks) || BUILTIN_BLOCK_STYLES[0]; this.backgroundOverridden = false;
    } else if (kind === 'background') {
      const b = data.background || data;
      if (!b.name && !b.label) throw new Error('Background name is required');
      if (!safeCssBackground(b.light) || !safeCssBackground(b.dark || b.light)) throw new Error('Unsafe or invalid CSS background');
      const label = b.name || b.label;
      const group = b.group || b.category || 'Мои фоны';
      const bg = { ...b, id: `bg-custom-${slugify(label)}-${Date.now().toString(36).slice(-4)}`, name: label, label, group, source: 'user', dark: b.dark || b.light, textColor: isHexColor(b.textColor) ? b.textColor : '#302d31', darkTextColor: isHexColor(b.darkTextColor) ? b.darkTextColor : '#e9eaf0' };
      this.plugin.userData.backgrounds.push(bg); this.plugin.refreshGeneratedStyles(); this.selectedBackground = bg; this.backgroundOverridden = true;
    } else if (kind === 'blockStyle' || kind === 'blocks') {
      const raw = data.blockStyle || data.style || data;
      const style = normalizeBlockStyle({ ...raw, source: 'user' });
      // Ask for category if missing
      if (!raw.category) style.category = 'Мои стили';
      this.plugin.userData.blockStyles.push(style);
      this.plugin.refreshGeneratedStyles();
      this.selectedBlocks = style;
    } else {
      throw new Error('Unknown import kind');
    }
    await this.plugin.saveUserLibrary();
    this.activeView = 'studio';
    this.activeSection = kind === 'palette' ? 'palette' : (kind === 'background' ? 'background' : 'blocks');
    this.render();
    new Notice('Оформление импортировано и добавлено в библиотеку.');
  }
  async exportItem(kind) {
    let item, payload;
    if (kind === 'palette') {
      item = this.selectedPalette;
      payload = { schemaVersion: 2, type: 'esds-palette', palette: item };
    } else if (kind === 'background') {
      item = this.selectedBackground;
      payload = { schemaVersion: 2, type: 'esds-background', background: item };
    } else {
      item = this.selectedBlocks;
      payload = { schemaVersion: 2, type: 'esds-block-style', blockStyle: item };
    }
    try {
      const adapter = this.app.vault.adapter;
      const folder = 'ESDS Exports';
      if (!(await adapter.exists(folder))) await adapter.mkdir(folder);
      const fileName = `${slugify(item.name || item.label || item.id)}-${Date.now()}.json`;
      const path = `${folder}/${fileName}`;
      await adapter.write(path, JSON.stringify(payload, null, 2));
      new Notice(`Экспорт сохранён в хранилище: ${path}`);
    } catch (error) { console.error(error); new Notice('Не удалось сохранить JSON-файл экспорта.'); }
  }
}

module.exports = class EnglishStudyDesignStudio extends Plugin {
  async onload() {
    this.userData = ensureLibraryShape(null);
    await this.loadUserLibrary();
    this.refreshGeneratedStyles();
    this.addRibbonIcon('palette', 'English Study Design Studio', () => this.openStudio());
    this.addCommand({ id: 'open-design-studio', name: 'Open English Study Design Studio', callback: () => this.openStudio() });
    this.addCommand({ id: 'export-user-library', name: 'Export English Study Design Studio library', callback: () => this.exportLibrary() });
  }
  onunload() { if (this.generatedStyle) this.generatedStyle.remove(); }
  async loadUserLibrary() {
    try {
      const adapter = this.app.vault.adapter;
      if (!(await adapter.exists(LIBRARY_FOLDER))) await adapter.mkdir(LIBRARY_FOLDER);
      if (await adapter.exists(LIBRARY_PATH)) {
        const parsed = JSON.parse(await adapter.read(LIBRARY_PATH));
        if (parsed && typeof parsed === 'object') {
          this.userData = ensureLibraryShape(parsed);
        }
      } else {
        await this.saveUserLibrary();
      }
    } catch (error) {
      console.error('ESDS library load:', error);
      new Notice('Не удалось прочитать пользовательскую библиотеку.');
      this.userData = ensureLibraryShape(null);
    }
  }
  async saveUserLibrary() {
    try {
      const adapter = this.app.vault.adapter;
      if (!(await adapter.exists(LIBRARY_FOLDER))) await adapter.mkdir(LIBRARY_FOLDER);
      this.userData = ensureLibraryShape(this.userData);
      await adapter.write(LIBRARY_PATH, JSON.stringify(this.userData, null, 2));
    } catch (error) {
      console.error('ESDS library save:', error);
      new Notice('Не удалось сохранить пользовательскую библиотеку.');
    }
  }
  refreshGeneratedStyles() {
    if (this.generatedStyle) this.generatedStyle.remove();
    const style = document.createElement('style');
    style.id = 'esds-generated-user-styles';
    const palettes = (this.userData.palettes || [])
      .filter(p => /^user-[a-z0-9-]+$/.test(p.id || '') && p.roles && ROLE_KEYS.every(k => isHexColor(p.roles[k])))
      .map(makePaletteCss).join('\n');
    const backgrounds = (this.userData.backgrounds || [])
      .filter(bg => /^bg-custom-[a-z0-9-]+$/.test(bg.id || '') && safeCssBackground(bg.light) && safeCssBackground(bg.dark || bg.light))
      .map(bg => {
        const light = bg.light;
        const dark = bg.dark || bg.light;
        const fg = isHexColor(bg.textColor) ? bg.textColor : '#302d31';
        const darkFg = isHexColor(bg.darkTextColor) ? bg.darkTextColor : '#e9eaf0';
        return `.markdown-preview-view.${bg.id},.markdown-source-view.${bg.id}{--note-background:${light};--esds-bg-fg:${fg};}\nbody.theme-dark .markdown-preview-view.${bg.id},body.theme-dark .markdown-source-view.${bg.id}{--note-background:${dark};--esds-bg-fg:${darkFg};}\n.esds-preview.${bg.id}{--note-background:${light};}\nbody.theme-dark .esds-preview.${bg.id}{--note-background:${dark};}\n.markdown-preview-view.${bg.id},.markdown-source-view.${bg.id}{color:var(--esds-bg-fg);--text-normal:var(--esds-bg-fg);}\n.markdown-preview-view.${bg.id} h1,.markdown-preview-view.${bg.id} h2,.markdown-preview-view.${bg.id} h3{color:var(--esds-heading,var(--esds-bg-fg));}`;
      }).join('\n');
    const blockStyles = (this.userData.blockStyles || [])
      .map(normalizeBlockStyle)
      .map(makeBlockStyleCss)
      .join('\n');
    style.textContent = `${palettes}\n${backgrounds}\n${blockStyles}`;
    document.head.appendChild(style);
    this.generatedStyle = style;
  }
  openStudio() { new DesignStudioModal(this.app, this).open(); }
  async exportLibrary() {
    try {
      const adapter = this.app.vault.adapter;
      const folder = 'ESDS Exports';
      if (!(await adapter.exists(folder))) await adapter.mkdir(folder);
      await adapter.write(`${folder}/user-library-backup-${Date.now()}.json`, JSON.stringify(this.userData, null, 2));
      new Notice('Резервная копия пользовательской библиотеки сохранена в папке `ESDS Exports`.');
    } catch (error) {
      console.error(error);
      new Notice('Не удалось создать резервную копию библиотеки.');
    }
  }
};
