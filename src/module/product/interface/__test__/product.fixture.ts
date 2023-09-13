const productCreate = {
  id: 1,
  title: 'title-create',
  description: 'description-create',
  image: 'image-create',
  category: 'category-create',
  price: 200,
  stock: 20,
  options: 'options-create',
  createdAt: undefined,
  updatedAt: undefined,
};

export const productUpdate = {
  id: 2,
  title: 'newTitle',
  description: 'newDescription',
  image: 'newImage',
  category: 'newCategory',
  price: 10,
  stock: 10,
  options: 'newOptions',
};

const productToUpdate = {
  id: 2,
  title: 'void',
  description: 'void',
  image: 'void',
  category: 'void',
  price: 0,
  stock: 0,
  options: 'void',
  createdAt: undefined,
  updatedAt: undefined,
};

export const productFixture = [productCreate, productToUpdate];
