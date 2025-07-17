/**
 * @file src/model/menu-item.ts
 * @description Defines the structure of a menu item used in the application.
 * Each menu item can have a label, a route to navigate to, and optionally a submenu.
 *
 * @typedef {Object} MenuItem
 * @property {string} label - The text displayed for the menu item or a I18N translation key.
 * @property {string} to - The route path that the menu item links to.
 * @property {MenuItem[]} [subMenu] - An optional array of sub-menu items,
 *                                    allowing for nested navigation.
 */
export interface MenuItem {
  label: string;
  to?: string;
  subMenu?: MenuItem[]        // router link path
}
