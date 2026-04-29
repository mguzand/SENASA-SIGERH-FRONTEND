export function destroyPrimeOverlays() {
  document
    .querySelectorAll('.p-menu-overlay, .p-overlaypanel, .p-connected-overlay')
    .forEach((el) => el.remove());
}
