/**
 * build-icons.js
 * Виконує 2 завдання:
 * 1. Оптимізує всі SVG через SVGO (аналог SVGOMG)
 * 2. Збирає всі SVG в один symboldefs.svg (як IconMoon)
 */

import fs from "fs";
import path from "path";
import { optimize } from "svgo";

// === Налаштування ===
const SRC_DIR = "./svg";             // Папка з оригінальними SVG
const OUT_DIR = "./optimized-icons"; // Папка з результатами
const OUT_FILE = "./symboldefs.svg"; // Фінальний файл

// === Перевірка наявності SVG ===
if (!fs.existsSync(SRC_DIR)) {
    console.error(`❌ Папка ${SRC_DIR} не знайдена!`);
    process.exit(1);
}
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR);

// === Нормалізація імен файлів ===
function slugify(name) {
    const base = path.basename(name, ".svg");
    const normalized = base
        .normalize("NFD")
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .toLowerCase()
        .replace(/^-+|-+$/g, "");
    return normalized || "icon";
}

// === Конфігурація оптимізації (аналог SVGOMG) ===
const svgoConfig = {
    multipass: true,
    plugins: [
        {
            name: "preset-default",
            params: {
                overrides: {
                    cleanupIds: false,
                    removeViewBox: false,
                },
            },
        },
        "removeDimensions",
    ],
};

// === Основна логіка ===
const files = fs.readdirSync(SRC_DIR).filter(f => f.endsWith(".svg"));
let sprite = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none"><defs>\n`;

for (const file of files) {
    const srcPath = path.join(SRC_DIR, file);
    const raw = fs.readFileSync(srcPath, "utf8");

    // 1. Оптимізація SVG
    const optimized = optimize(raw, { path: srcPath, ...svgoConfig }).data;

    // 2. Прибираємо кольори, робимо currentColor
    const recolored = optimized
        .replace(/(fill|stroke)=["'](?!none)[^"']+["']/gi, '$1="currentColor"')
        .replace(/style="[^"]*"/gi, (m) =>
            m.replace(/(fill|stroke):([^;]+);?/gi, "$1:currentColor;")
        );

    // 3. Нове ім’я файлу
    const newName = slugify(file) + ".svg";
    const outPath = path.join(OUT_DIR, newName);
    fs.writeFileSync(outPath, recolored, "utf8");

    // 4. Вирізаємо вміст іконки без <svg> обгортки
    const inner = recolored
        .replace(/<\?xml[^>]*>/g, "")
        .replace(/<!DOCTYPE[^>]*>/g, "")
        .replace(/<svg[^>]*>/i, "")
        .replace(/<\/svg>/i, "");

    // 5. Додаємо до symboldefs.svg
    sprite += `  <symbol id="${slugify(file)}" viewBox="0 0 24 24">\n${inner}\n  </symbol>\n`;
    console.log(`✅ ${file} → ${newName}`);
}

sprite += "</defs></svg>";
fs.writeFileSync(OUT_FILE, sprite, "utf8");

console.log("\n🎉 Готово!");
console.log(`➡️ Оптимізовані SVG: ${OUT_DIR}`);
console.log(`➡️ Файл символів: ${OUT_FILE}`);
