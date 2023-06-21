/**
 * Format a date object to 'YYYY-MM-DD' string format.
 * @param {Date} date - The date object to format.
 * @returns {string} The formatted date string.
 */
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
  
    return `${year}-${month}-${day}`;
  };
  
  /**
   * Get today's date and the date 30 days ago.
   * @returns {Object} An object containing the formatted dates.
   *   - today: The formatted today's date.
   *   - thirtyDaysAgo: The formatted date 30 days ago.
   */
  const checkDuration = () => {
    const today = new Date();
    const currentHour = today.getHours();
  
    // If the current hour is before or at 12 PM, consider it as the previous day.
    if (currentHour <= 12) {
      today.setDate(today.getDate() - 1);
    }
  
    const formattedToday = formatDate(today);
  
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    const formattedThirtyDaysAgo = formatDate(thirtyDaysAgo);
  
    return { today: formattedToday, thirtyDaysAgo: formattedThirtyDaysAgo };
  };
  
  
export default 
checkDuration
  ;