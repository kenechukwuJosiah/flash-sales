export const users = Array.from({ length: 5 }).map((_, i) => ({
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  password: `user${i + 1}123`,
  role: 'user',
  createdAt: new Date(),
  updatedAt: new Date(),
}));

export const products = Array.from({ length: 5 }).map((_, i) => ({
  name: `Product ${i + 1}`,
  totalUnits: 200,
  availableUnits: 200,
  saleStartTime: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000),
  saleEndTime: new Date(Date.now() + (i + 2) * 24 * 60 * 60 * 1000),
}));