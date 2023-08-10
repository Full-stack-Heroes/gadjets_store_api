export const convertToBytes = (capacity: string): number => {
  const unitMap: { [key: string]: number } = {
    TB: 1024 * 1024 * 1024 * 1024,
    GB: 1024 * 1024 * 1024,
    MB: 1024 * 1024,
    // Add more units if needed
  };

  const [, value, unit] = capacity.match(/(\d+)\s*(\w+)/) || [];
  if (unit && value) {
    return parseInt(value, 10) * unitMap[unit];
  }
  return 0;
};
