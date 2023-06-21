/**
 * Format a date object to 'YYYY-MM-DD' string format.
 * @param {Date} date - The date object to format.
 * @returns {string} The formatted date string.
 */
const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
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
    const previousDay = new Date(today);
    previousDay.setDate(previousDay.getDate() - (currentHour <= 12 ? 1 : 0));
  
    const formattedToday = formatDate(today);
    const formattedThirtyDaysAgo = formatDate(new Date(previousDay.getTime() - 30 * 24 * 60 * 60 * 1000));
    
    return { today: formattedToday, thirtyDaysAgo: formattedThirtyDaysAgo };
  };
  
  
  
export default 
checkDuration
  ;