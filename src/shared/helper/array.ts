type SortOrder = 'asc' | 'desc';
type CompareFn<T> = (a: T, b: T) => number;
/**
 * Сортирует массив или объект по указанным свойствам.
 * @param obj Объект или массив для сортировки.
 * @param sortBy Свойства, по которым нужно сортировать.
 * @param order Порядок сортировки ('asc' или 'desc').
 * @returns Отсортированный объект или массив.
 */
export function deepSortByProperties<T>(
	obj: T,
	sortBy: Required<T>,
	order: SortOrder = 'asc'
): T {
	if (Array.isArray(obj)) {
		return obj
			.map(item => deepSortByProperties(item as any, sortBy as any, order))
			.sort((a, b) => {
				if (sortBy) {
					for (const key of sortBy as unknown as Array<any>) {
						if (a[key] !== b[key]) {
							const compareResult =
								a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0;
							return order === 'asc' ? compareResult : -compareResult;
						}
					}
					return 0;
				} else {
					const aString = JSON.stringify(a);
					const bString = JSON.stringify(b);
					return order === 'asc'
						? aString.localeCompare(bString)
						: bString.localeCompare(aString);
				}
			}) as T;
	} else if (typeof obj === 'object' && obj !== null) {
		const sortedObj: { [key: string]: any } = {};
		Object.keys(obj)
			.sort()
			.forEach(key => {
				sortedObj[key] = deepSortByProperties(
					(obj as any)[key],
					sortBy as any,
					order
				);
			});
		return sortedObj as T;
	}
	return obj;
}

/**
 * Сортирует массив или объект с использованием пользовательской функции сравнения.
 * @param obj Объект или массив для сортировки.
 * @param compareFn Функция сравнения.
 * @param order Порядок сортировки ('asc' или 'desc').
 * @returns Отсортированный объект или массив.
 */
export function deepSortByFunction<T>(
	obj: T,
	compareFn: CompareFn<T>,
	order: SortOrder = 'asc'
): T {
	if (Array.isArray(obj)) {
		return obj
			.map(item => deepSortByFunction(item as any, compareFn, order))
			.sort((a, b) => {
				return order === 'asc' ? compareFn(a, b) : -compareFn(a, b);
			}) as T;
	} else if (typeof obj === 'object' && obj !== null) {
		const sortedObj: { [key: string]: any } = {};
		Object.keys(obj)
			.sort()
			.forEach(key => {
				sortedObj[key] = deepSortByFunction(
					(obj as any)[key],
					compareFn,
					order
				);
			});
		return sortedObj as T;
	}
	return obj;
}
export const groupBy = <T, K extends keyof any>(
	list: T[],
	getKey: (item: T) => K
) =>
	list.reduce((previous, currentItem) => {
		const group = getKey(currentItem);
		if (!previous[group]) previous[group] = [];
		previous[group].push(currentItem);
		return previous;
	}, {} as Record<K, T[]>);
