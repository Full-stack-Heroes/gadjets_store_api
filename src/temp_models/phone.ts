/* eslint-disable quotes */
import { Phone } from '../types/phone';
import data from '../utils/temp_data.json';

export function getProductsOnPage(
  pageNumber: number,
  pageSize: number
): Phone[] {
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return data.slice(startIndex, endIndex);
}
