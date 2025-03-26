export const generateOrderCode = (number: number): string => {
  const code = `OD${String(number).padStart(8,'0')}`;
  // Thêm số 0 vào đầu cho đủ 8 chữ số .padStart(8,'0')
  return code;
}

export const generateTourCode = (number: number): string => {
  const code = `TOUR${String(number).padStart(6,'0')}`;
  // Thêm số 0 vào đầu cho đủ 8 chữ số .padStart(8,'0')
  return code;
}