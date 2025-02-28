/**
 * Formats a given date (string or Date object) into a readable format.
 * @param {Date|string} date - The date to format.
 * @returns {string} - The formatted date.
 */
export const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  
  /**
   * Converts a string into a URL-friendly slug.
   * @param {string} text - The text to slugify.
   * @returns {string} - The slugified text.
   */
  export const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")       // Replace spaces with -
      .replace(/[^\w\-]+/g, "")   // Remove all non-word chars
      .replace(/\-\-+/g, "-");    // Replace multiple - with single -
  };
  
  /**
   * Debounces a function by a given delay.
   * @param {Function} func - The function to debounce.
   * @param {number} wait - Delay in milliseconds.
   * @returns {Function} - The debounced function.
   */
  export const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };
  
  /**
   * Checks if a value is empty (null, undefined, or an empty string).
   * @param {*} value - The value to check.
   * @returns {boolean} - True if the value is empty.
   */
  export const isEmpty = (value) => {
    return value === undefined || value === null || value.toString().trim() === "";
  };
  