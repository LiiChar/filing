export const setValueByPath = <T extends Record<string, any>>(
	obj: T,
	keys: Array<string | number>,
	value: any
): T => {
	if (!keys.length) {
		throw new Error('Path keys array cannot be empty');
	}

	// Создаем копию объекта, чтобы не мутировать исходный
	const newObj = { ...obj };

	// Рекурсивно проходим по объекту
	let current: any = newObj;
	for (let i = 0; i < keys.length - 1; i++) {
		const key = keys[i];

		// Если текущий уровень не существует, создаем пустой объект
		if (current[key] === undefined || current[key] === null) {
			current[key] = typeof keys[i + 1] === 'number' ? [] : {};
		}

		// Переходим на следующий уровень
		current = current[key];
	}

	// Устанавливаем значение на последнем уровне
	const lastKey = keys[keys.length - 1];
	current[lastKey] = value;

	return newObj;
};
