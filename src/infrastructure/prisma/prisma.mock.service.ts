export const PrismaMockFactory = () => {
  users: {
    create: jest.fn();
    findMany: jest.fn();
    findUnique: jest.fn();
    update: jest.fn();
    // delete: jest.fn()
  }
};
