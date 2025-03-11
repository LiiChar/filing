import { create } from 'zustand';

// Тип для колбэка
type Callback = () => void;

// Тип для хранилища с дженериком для названий событий
type CallbackStore<EventName extends string> = {
	listeners: Record<EventName, Set<Callback>>; // Храним колбэки для каждого события
	addListener: (event: EventName, callback: Callback) => void; // Добавить колбэк для события
	removeListener: (event: EventName, callback: Callback) => void; // Удалить колбэк для события
	triggerEvent: (event: EventName) => void; // Вызвать все колбэки для события
};

// Функция для создания хранилища с динамическими типами
export const createCallbackStore = <EventName extends string>() => {
	return create<CallbackStore<EventName>>((set, get) => ({
		listeners: {} as Record<EventName, Set<Callback>>, // Инициализируем пустой объект

		// Добавляем колбэк для определённого события
		addListener: (event, callback) => {
			set(state => {
				const eventListeners = state.listeners[event] || new Set(); // Получаем Set для события
				eventListeners.add(callback); // Добавляем колбэк
				return {
					listeners: {
						...state.listeners,
						[event]: eventListeners, // Обновляем Set для события
					},
				};
			});
		},

		// Удаляем колбэк для определённого события
		removeListener: (event, callback) => {
			set(state => {
				const eventListeners = state.listeners[event];
				if (eventListeners) {
					const newListeners = new Set(eventListeners);
					newListeners.delete(callback); // Удаляем колбэк
					return {
						listeners: {
							...state.listeners,
							[event]: newListeners, // Обновляем Set для события
						},
					};
				}
				return state;
			});
		},

		// Вызываем все колбэки для определённого события
		triggerEvent: event => {
			const { listeners } = get();
			const eventListeners = listeners[event];
			if (eventListeners) {
				eventListeners.forEach(callback => callback()); // Выполняем каждый колбэк
			}
		},
	}));
};

// Определите типы для событий
type AppEvents = 'updateFileManager' | 'createModal';

// Создайте хранилище с типами событий
export const useListener = createCallbackStore<AppEvents>();
