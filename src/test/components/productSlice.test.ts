import { productsApi } from "../../api/productsApi";
import { ProductData, AddProductData } from "../../types/Product";

describe('productsApi', () => {

  let existingProductId: number;
  let existingCategoryId: number;

  beforeAll(async () => {

    const products = await productsApi.fetchProductsApi();
    existingProductId = products.length > 0 ? products[0].id : 1;

    const categories = await productsApi.fetchCategoriesApi();
    existingCategoryId = categories.length > 0 ? categories[0].id : 1;

  });

  it('should fetch all products', async () => {

    const products = await productsApi.fetchProductsApi();

    expect(products).toBeInstanceOf(Array);
    expect(products.length).toBeGreaterThan(0);

  });

  it('should fetch a single product by ID', async () => {

    const product = await productsApi.fetchProductByIdApi(existingProductId);

    expect(product).toBeInstanceOf(Object);
    expect(product.id).toEqual(existingProductId);

  });

  it('should create a new product', async () => {

    const newProduct: AddProductData = {
      title: 'New Product',
      description: 'This is a new product.',
      price: 10,
      images: ['https://example.com/new-product.jpg'],
      categoryId: existingCategoryId, 
    };
  
    const product = await productsApi.createProductApi(newProduct);
  
    expect(product).toBeInstanceOf(Object);
    expect(product.title).toEqual(newProduct.title);
    expect(product.description).toEqual(newProduct.description);
    expect(product.price).toEqual(newProduct.price);
    expect(product.images).toEqual(newProduct.images);
    expect(product.category.id).toEqual(existingCategoryId); 

  });

  it('should update an existing product', async () => {

    const updatedProduct: ProductData = {
      id: existingProductId,
      title: 'Updated Product',
      description: 'This is an updated product.',
      price: 20,
      images: ['https://example.com/updated-product.jpg'],
      categoryId: existingCategoryId, 
    };

    const product = await productsApi.updateProductApi(updatedProduct);

    expect(product).toBeInstanceOf(Object);
    expect(product.id).toEqual(existingProductId);
    expect(product.title).toEqual(updatedProduct.title);
    expect(product.description).toEqual(updatedProduct.description);
    expect(product.price).toEqual(updatedProduct.price);
    expect(product.images).toEqual(updatedProduct.images);
    expect(product.category.id).toEqual(existingCategoryId); 

  });

  it('should delete an existing product', async () => {

    const productId  = await productsApi.deleteProductApi(existingProductId);  
    const checkDeletedProduct = await productsApi.fetchProductByIdApi(existingProductId);

    expect(productId).toBe(existingProductId);
    expect(checkDeletedProduct.title).toBeUndefined();

  });  

});