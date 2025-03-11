import type { ThemeConfig } from 'antd';

export const antTheme: ThemeConfig = {
	token: {
		fontSize: 14,
		colorText: 'var(--foreground)', // Основной цвет текста
		colorBgBase: 'var(--background)', // Основной цвет фона
		colorPrimary: 'var(--primary)', // Основной цвет (акцент)
		colorBorder: 'var(--foreground)', // Цвет границ
		colorPrimaryBorder: 'var(--primary)', // Цвет границ для primary-элементов
		colorPrimaryBorderHover: 'var(--primary)', // Цвет границ при наведении для primary-элементов
		colorIcon: 'var(--foreground)', // Цвет иконок
		colorFill: 'var(--foreground)', // Цвет заливки
		colorIconHover: 'var(--primary)', // Цвет иконок при наведении
		colorBorderBg: 'var(--foreground)', // Цвет фона границ
		colorLink: 'var(--primary)', // Цвет ссылок
		colorLinkHover: 'var(--primary)', // Цвет ссылок при наведении
		colorLinkActive: 'var(--primary)', // Цвет активных ссылок
		colorTextBase: 'var(--foreground)', // Базовый цвет текста
		colorBgContainer: 'var(--background)', // Цвет фона контейнеров
		colorBgLayout: 'var(--background)', // Цвет фона макета
	},
	components: {
		Button: {
			colorPrimary: 'var(--primary)', // Цвет primary-кнопок
			colorPrimaryHover: 'var(--primary)', // Цвет primary-кнопок при наведении
			colorPrimaryActive: 'var(--primary)', // Цвет primary-кнопок при активации
		},
		Menu: {
			colorItemBg: 'var(--background)', // Цвет фона пунктов меню
			colorItemText: 'var(--foreground)', // Цвет текста пунктов меню
			colorItemTextHover: 'var(--primary)', // Цвет текста пунктов меню при наведении
			colorItemBgHover: 'var(--background)', // Цвет фона пунктов меню при наведении
		},
		Input: {
			colorBgContainer: 'var(--background)', // Цвет фона input
			colorBorder: 'var(--foreground)', // Цвет границы input
			colorText: 'var(--foreground)', // Цвет текста input
			colorTextPlaceholder: 'var(--foreground)', // Цвет placeholder
		},
	},
};
