import { stringToHTML } from "../../utils/to-html";
import { $Q, $Qll } from "../../utils/query-selector";
import { btnAddToCart } from "./cart";
import { barProgress } from "./cart-bar-progress";
import { createSlider } from "../../components/slider-component";

/**
 * Update cart items section in sidecart
 * @param {string} str - String HTML of section rendeirng
 */
export const updateCartItems = (str) => {
  $Qll(".cartitems-js").forEach((element) => {
    console.log("updateCartItems");
    const elementRef = element;
    elementRef.innerHTML = $Q("#cart-items", stringToHTML(str)).outerHTML;
  });
};

/**
 * Update checkout button section in sidecart
 * @param {string} str - String HTML of section rendeirng
 */
export const updateCartbutton = (str) => {
  console.log("updateCartbutton");
  const inputBarProgress = $Q("#progress-bar-data", stringToHTML(str));
  const checkoutBtnAPI = $Q("#cart-checkout-js", stringToHTML(str));
  const domBtnContainer = $Qll("#container-footer-js");

  barProgress(inputBarProgress);

  if (checkoutBtnAPI) {
    domBtnContainer.forEach((element) => {
      const elementRef = element;
      elementRef.innerHTML = checkoutBtnAPI.outerHTML;
    });

    return;
  }

  domBtnContainer.forEach((element) => {
    const elementRef = element;
    elementRef.innerHTML = "";
  });
};

/**
 * Chance all input value only cart page
 *
 * @param {String} id - Variant id item cart
 * @param {String} quantity - Quantity variant by item cart
 */
export const updateQuantity = (id, quantity) => {
  console.log("updateQuantity");
  $Qll(`.item-cart-js[id="${id}"]`).forEach((element) => {
    const elementRef = element;
    elementRef.value = quantity;
  });
};

/**
 * Update price item for each item in cart items section
 * @param {string} str - String HTML of section rendeirng
 * @param {number} id - Product ID
 */
export const updatePriceItem = (str, id) => {
  console.log("updatePriceItem");
  const { dataset, outerText } = $Q(`#price-${id}`, stringToHTML(str));

  $Qll(`.price-${id}`).forEach((element) => {
    const elementRef = element;
    elementRef.innerHTML = outerText;
  });

  updateQuantity(id, dataset.quantity);
};

/**
 * Update total price in cart page
 * @param {string} str - String HTML of section rendeirng
 */
export const updatetotalPrice = (str) => {
  console.log("updatetotalPrice");
  if (!$Q(".cartpage-footer")) return;
  if (!$Q("#total-price", stringToHTML(str))) {
    $Q(".cartpage-footer").style.display = "none";
    return;
  }

  if ($Q(".cartpage-footer__info--price") != null) {
    $Q(".cartpage-footer__info--price").innerHTML = $Q(
      "#total-price",
      stringToHTML(str)
    ).outerText;
  }
};

/**
 * Update upsell section in sidecart
 * @param {string} str - String HTML of section rendeirng
 */
export const updateUpsell = (str) => {
  console.log("updateUpsell");
  if (!$Q("#upsell-js")) return;

  $Q("#upsell-js").innerHTML = $Q(
    "#cart-upsell-slider",
    stringToHTML(str)
  ).outerHTML;

  createSlider($Q(".slider-js.swiperElsidecart"));
  btnAddToCart(".add-product-cart-upsell");
};
