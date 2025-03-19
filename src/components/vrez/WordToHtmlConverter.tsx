'use client';
import { useState } from 'react';

interface HtmlElement {
	tag: string;
	classes?: string[];
	attributes?: { [key: string]: any };
	text?: string;
	children?: HtmlElement[];
}

export const WordToHtmlConverter = () => {
	const [inputHtml, setInputHtml] = useState('');
	console.log(parseHtmlToStructure(inputHtml).map(cleanHtmlElement));
	return (
		<div>
			<div className=''>
				<div>
					<h2>Введите текст из Word:</h2>
					<div
						contentEditable={true}
						onInput={e => {
							setInputHtml(e.currentTarget.innerHTML);
						}}
					/>
				</div>
				<div>
					<h2>Результат в HTML:</h2>
					<div className='html-output'>
						{structureToHtml(
							parseHtmlToStructure(inputHtml)
								.map(cleanHtmlElement)
								.filter(el => !!el)
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

function parseHtmlToStructure(htmlString: string): HtmlElement[] {
	const parser = new DOMParser();
	const doc = parser.parseFromString(htmlString, 'text/html');
	const result: HtmlElement[] = [];

	// Рекурсивная функция для обхода DOM
	const parseNode = (node: Node): HtmlElement | null => {
		// Игнорируем текстовые узлы, которые содержат только пробелы
		if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim() === '') {
			return null;
		}

		// Обрабатываем текстовые узлы
		if (node.nodeType === Node.TEXT_NODE) {
			return {
				tag: 'text',
				text: node.textContent?.trim() || '',
			};
		}

		// Обрабатываем элементные узлы
		if (node.nodeType === Node.ELEMENT_NODE) {
			const element = node as HTMLElement;
			const attributes: { [key: string]: string | object } = {};

			// Собираем атрибуты
			for (const attr of element.attributes) {
				attributes[attr.name] = attr.value;
			}

			// Преобразуем style в объект
			if (attributes.style) {
				const styleString = attributes.style as string;
				const styleObject: { [key: string]: string } = {};

				styleString.split(';').forEach(style => {
					const [key, value] = style.split(':').map(s => s.trim());
					if (key && value) {
						styleObject[key] = value;
					}
				});

				attributes.style = styleObject;
			}

			// Собираем классы
			const classes = Array.from(element.classList);

			// Рекурсивно обрабатываем дочерние элементы
			const children: HtmlElement[] = [];
			for (const childNode of element.childNodes) {
				const parsedChild = parseNode(childNode);
				if (parsedChild) {
					children.push(parsedChild);
				}
			}

			return {
				tag: element.tagName.toLowerCase(),
				classes: classes.length > 0 ? classes : undefined,
				attributes: Object.keys(attributes).length > 0 ? attributes : undefined,
				text: children.length === 0 ? element.textContent?.trim() : undefined,
				children: children.length > 0 ? children : undefined,
			};
		}

		return null;
	};

	// Обрабатываем все дочерние элементы корневого узла
	for (const node of doc.body.childNodes) {
		const parsedNode = parseNode(node);
		if (parsedNode) {
			result.push(parsedNode);
		}
	}

	return result;
}

function structureToHtml(elements: HtmlElement[]): string {
	// Рекурсивная функция для генерации HTML
	const generateHtml = (element: HtmlElement): string => {
		// Обрабатываем текстовые узлы
		if (element.tag === 'text') {
			return element.text || '';
		}

		// Создаем открывающий тег
		let tag = `<${element.tag}`;

		// Добавляем атрибуты (только src и href)
		if (element.attributes) {
			for (const [key, value] of Object.entries(element.attributes)) {
				if (key === 'src' || key === 'href') {
					tag += ` ${key}="${value}"`;
				}
			}
		}

		// Преобразуем style из объекта в строку
		if (
			element.attributes?.style &&
			typeof element.attributes.style === 'object'
		) {
			const styleObject = element.attributes.style as { [key: string]: string };
			const styleString = Object.entries(styleObject)
				.map(([key, value]) => `${key}:${value}`)
				.join(';');
			tag += ` style="${styleString}"`;
		}

		tag += '>';

		// Добавляем текст, если он есть
		if (element.text) {
			tag += element.text;
		}

		// Рекурсивно добавляем дочерние элементы
		if (element.children) {
			for (const child of element.children) {
				tag += generateHtml(child);
			}
		}

		// Закрываем тег
		tag += `</${element.tag}>`;

		return tag;
	};

	// Генерируем HTML для всех элементов
	let html = '';
	for (const element of elements) {
		html += generateHtml(element);
	}

	return html;
}
function cleanHtmlElement(element: HtmlElement): HtmlElement | null {
	if (
		(!element.children || element.children.length == 0) &&
		(element.text == '' || !element.text)
	) {
		return null;
	}
	// Удаляем классы
	delete element.classes;

	// Оставляем только атрибуты src и href
	if (element.attributes) {
		const cleanedAttributes: { [key: string]: string } = {};
		if (element.attributes.src) {
			cleanedAttributes.src = element.attributes.src;
		}
		if (element.attributes.href) {
			cleanedAttributes.href = element.attributes.href;
		}

		if (element.attributes.style) {
			cleanedAttributes.style = element.attributes.style;
		}
		element.attributes = cleanedAttributes;
	}

	// Преобразуем style из строки в объект
	if (element.attributes?.style) {
		const styleString: Record<string, string> = element.attributes.style;
		const newStyle: any = {};

		Object.entries(styleString).forEach(([k, v]) => {
			if (k.trim() == 'font-size') {
				newStyle[k] = v;
			}
		});

		element.attributes.style = newStyle;
	}

	// Рекурсивно очищаем дочерние элементы
	if (element.children) {
		element.children = element.children
			.map(cleanHtmlElement)
			.filter(el => !!el);
	}

	if (element.children) {
		if (element.children.length == 1) {
			if (element.children[0].tag == 'span') {
				const tag = element.tag;
				element = element.children[0];
				element.tag = tag;
			} else if (element.tag == 'div' && element.children[0].tag == 'p') {
				element = element.children[0];
			} else if (element.tag == 'li' && element.children[0].tag == 'p') {
				const tag = element.tag;
				element = element.children[0];
				element.tag = tag;
			} else if (element.tag == 'div' && element.children[0].tag == 'ol') {
				element = element.children[0];
			} else if (element.tag == 'div' && element.children[0].tag == 'li') {
				element = element.children[0];
			} else if (element.tag == 'div' && element.children[0].tag == 'h1') {
				element = element.children[0];
			} else if (element.tag == 'div' && element.children[0].tag == 'h2') {
				element = element.children[0];
			} else if (element.tag == 'div' && element.children[0].tag == 'h3') {
				element = element.children[0];
			} else if (element.tag == 'div' && element.children[0].tag == 'h4') {
				element = element.children[0];
			} else if (element.tag == 'div' && element.children[0].tag == 'h5') {
				element = element.children[0];
			}
		}
	}

	if (element.children && element.children.length > 1) {
		for (let i = 0; i < element.children.length; i++) {
			let lastIndexList = i;
			const currentElement = element.children[i];
			if (currentElement.tag == 'ol') {
				for (let j = i + 1; j < element.children.length; j++) {
					if (element.children[j].tag == 'ol') {
						lastIndexList = j;
					} else {
						break;
					}
				}
			} else if (currentElement.tag == 'ul') {
				for (let j = i + 1; j < element.children.length; j++) {
					if (element.children[j].tag == 'ul') {
						lastIndexList = j;
					} else {
						break;
					}
				}
			}

			if (i != lastIndexList) {
				const lists = element.children[i];
				const listElements = element.children.splice(i, lastIndexList, lists);
				element.children[i].children = listElements;
			}
		}
	}

	if (
		element.tag == 'p' &&
		element.attributes &&
		element.attributes.style['font-size']
	) {
		const fontSize: number = parseInt(element.attributes.style['font-size']);
		if (fontSize >= 18) {
			element.tag = 'h1';
		} else if (fontSize >= 16) {
			element.tag = 'h2';
		} else if (fontSize >= 14) {
			element.tag = 'h3';
		} else if (fontSize >= 12) {
			element.tag = 'h4';
		} else if (fontSize >= 10) {
			element.tag = 'h5';
		}
		element.attributes = {};
	}

	return element;
}
