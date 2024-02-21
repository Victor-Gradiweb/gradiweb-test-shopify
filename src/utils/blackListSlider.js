/* add class selectors or id, parents, of the slider you want to ignore.
note that it must be the parent closest to your slider.
These sliders will be ignored when loading general
sliders, or those you want to add via a click event. */

const parentSliderIgnore = ['#upsell-js', '.other']

// eslint-disable-next-line max-len
export const blackListSlider = (slider) => parentSliderIgnore.some((exception) => slider.closest(exception))
