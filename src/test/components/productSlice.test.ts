import { 
    ProductData, 
    AddProductData 
} from "../../types/Product";

import productSlice, { 
    fetchProducts, 
    fetchProductById,  
    createProduct,
    updateProduct,
    deleteProduct,
    initialState,
} from "../../redux/slices/productSlice";

describe('product reducer', () => {

    it('should handle fetchProducts.pending', () => {
        const state = productSlice(initialState, fetchProducts.pending)
        expect(state.loading).toBe(true);
        expect(state.error).toBeNull()
    })

    it('it should handle fetchProducts.fulfilled', () => {

        const mockProducts = [
            {
                id: 1,
                title: 'Product 1',
                price: 10,
                description: 'Description for Product 1',
                images: ['image1.jpg', 'image2.jpg'],
                creationAt: '2023-09-20T10:00:00Z',
                updatedAt: '2023-09-20T10:00:00Z',
                category: {
                  id: 1,
                  name: 'Category 1',
                  image: 'category1.jpg',
                  creationAt: '2023-09-20T10:00:00Z',
                  updatedAt: '2023-09-20T10:00:00Z',
                },
            }
        ];
        
        const action = fetchProducts.fulfilled(mockProducts, '', undefined, '');

        const state = productSlice(initialState, action)

        expect(state.loading).toBe(false);
        expect(state.products).toEqual(mockProducts)
        expect(state.error).toBeNull()
    })

    it('should handle fetchProducts.rejected', () => {

        const error = new Error('Rejected')

        const state = productSlice(initialState, fetchProducts.rejected(error, ''))

        expect(state.loading).toBe(false);
        expect(state.products).toEqual([])
        expect(state.error).toBe('Rejected')
    })

    it('should handle fetchProductsById.pending', () => {
        const state = productSlice(initialState, fetchProductById.pending)
        expect(state.loading).toBe(true);
        expect(state.error).toBeNull()
    })

    it('it should handle fetchProductById.fulfilled', () => {

        const mockProduct = 
        [
            {
                id: 1,
                title: 'Product 1',
                price: 10,
                description: 'Description for Product 1',
                images: ['image1.jpg', 'image2.jpg'],
                creationAt: '2023-09-20T10:00:00Z',
                updatedAt: '2023-09-20T10:00:00Z',
                category: {
                  id: 1,
                  name: 'Category 1',
                  image: 'category1.jpg',
                  creationAt: '2023-09-20T10:00:00Z',
                  updatedAt: '2023-09-20T10:00:00Z',
                },
            }
        ];
        
        const action = fetchProducts.fulfilled(mockProduct, '', undefined, '');

        const state = productSlice(initialState, action)

        expect(state.loading).toBe(false);
        expect(state.products).toEqual(mockProduct)
        expect(state.error).toBeNull()
    })

    it('should handle fetchProductById.rejected', () => {

        const error = new Error('Rejected')
        const mockProductId = 13
        
        const state = productSlice(initialState, fetchProductById.rejected(error, '', mockProductId, undefined))

        expect(state.loading).toBe(false);
        expect(state.products).toEqual([])
        expect(state.error).toBe('Rejected')
    })

    it('should handle createProduct.pending', () => {

        const state = productSlice(initialState, createProduct.pending)

        expect(state.loading).toBe(true);
        expect(state.error).toBeNull()
    })

    it('it should handle createProduct.fulfilled', () => {

        const mockProduct =         
            {
                id: 1,
                title: 'Product 1',
                price: 10,
                description: 'Description for Product 1',
                images: ['image1.jpg', 'image2.jpg'],
                creationAt: '2023-09-20T10:00:00Z',
                updatedAt: '2023-09-20T10:00:00Z',
                category: {
                  id: 1,
                  name: 'Category 1',
                  image: 'category1.jpg',
                  creationAt: '2023-09-20T10:00:00Z',
                  updatedAt: '2023-09-20T10:00:00Z',
                },
            }
        ;
        
        const mockAddProductData: AddProductData = {
            title: 'Product 1',
            description: 'Description for Product 1',
            price: 10,
            images: ['image1.jpg', 'image2.jpg'],
            categoryId: 1
        }

        const action = createProduct.fulfilled(mockProduct, '', mockAddProductData, '' );

        const state = productSlice(initialState, action)

        expect(state.loading).toBe(false);
        expect(state.products.slice(-1)).toEqual([mockProduct])
        expect(state.error).toBeNull()
    })

    it('should handle createProduct.rejected', () => {

        const error = new Error('Rejected')

        const mockAddProductData: AddProductData = {
            title: 'Product 1',
            description: 'Description for Product 1',
            price: 10,
            images: ['image1.jpg', 'image2.jpg'],
            categoryId: 1
        }

        const state = productSlice(initialState, createProduct.rejected(error, '', mockAddProductData))

        expect(state.loading).toBe(false);
        expect(state.products).toEqual([])
        expect(state.error).toBe('Rejected')
    })

    it('should handle updateProduct.pending', () => {

        const state = productSlice(initialState, updateProduct.pending)

        expect(state.loading).toBe(true);
        expect(state.error).toBeNull()
    })

    it('it should handle updateProduct.fulfilled', () => {

        const mockProduct =       
            {
                id: 1,
                title: 'Product 1',
                price: 10,
                description: 'Description for Product 1',
                images: ['image1.jpg', 'image2.jpg'],
                creationAt: '2023-09-20T10:00:00Z',
                updatedAt: '2023-09-20T10:00:00Z',
                category: {
                  id: 1,
                  name: 'Category 1',
                  image: 'category1.jpg',
                  creationAt: '2023-09-20T10:00:00Z',
                  updatedAt: '2023-09-20T10:00:00Z',
                },
            };

        const mockAddProductData: AddProductData = {
            title: 'Product 1',
            description: 'Description for Product 1',
            price: 10,
            images: ['image1.jpg', 'image2.jpg'],
            categoryId: 1
        }

        const createAction = createProduct.fulfilled(mockProduct, '', mockAddProductData, '' );

        const state = productSlice(initialState, createAction)

        const mockUpdateProductData: ProductData = {
            id: 1,
            title: 'Product 100',
            description: 'Description for Product 1',
            price: 10,
            images: ['image1.jpg', 'image2.jpg'],
            categoryId: 1
        }
        
        createProduct(mockAddProductData)
            
        const action = updateProduct.fulfilled(mockProduct, '', mockUpdateProductData, '');

        productSlice(initialState, action)

        const index = state.products.findIndex((product) => product.id === mockProduct.id)

        expect(state.loading).toBe(false);
        expect(state.products[index].id).toEqual(mockProduct.id)
        expect(state.error).toBeNull()
    })

    it('should handle updateProduct.rejected', () => {

        const mockProduct = {
            id: 1,
            title: 'Product 1',
            price: 10,
            description: 'Description for Product 1',
            images: ['image1.jpg', 'image2.jpg'],
            creationAt: '2023-09-20T10:00:00Z',
            updatedAt: '2023-09-20T10:00:00Z',
            category: {
              id: 1,
              name: 'Category 1',
              image: 'category1.jpg',
              creationAt: '2023-09-20T10:00:00Z',
              updatedAt: '2023-09-20T10:00:00Z',
            },
        };

        const mockAddProductData: AddProductData = {
            title: 'Product 1',
            description: 'Description for Product 1',
            price: 10,
            images: ['image1.jpg', 'image2.jpg'],
            categoryId: 1
        }

        const createAction = createProduct.fulfilled(mockProduct, '', mockAddProductData, '' );

        const state = productSlice(initialState, createAction)

        const mockUpdateProductData: ProductData = {
            id: 1,
            title: 'Product 100',
            description: 'Description for Product 1',
            price: 10,
            images: ['image1.jpg', 'image2.jpg'],
            categoryId: 1
        }

        createProduct(mockAddProductData)

        const action = updateProduct.fulfilled(mockProduct, '', mockUpdateProductData, '');

        productSlice(initialState, action)

        const index = state.products.findIndex((product) => product.id === mockProduct.id)

        expect(state.loading).toBe(false);
        expect(state.products[index].id).toEqual(mockProduct.id)
        expect(state.error).toBeNull()
    })

    it('should handle deleteProduct.pending', () => {

            const state = productSlice(initialState, deleteProduct.pending)
            
            expect(state.loading).toBe(true);
            expect(state.error).toBeNull()
        })

    it('it should handle deleteProduct.fulfilled', () => {

        const mockProduct =       
            {
                id: 1,
                title: 'Product 1',
                price: 10,
                description: 'Description for Product 1',
                images: ['image1.jpg', 'image2.jpg'],
                creationAt: '2023-09-20T10:00:00Z',
                updatedAt: '2023-09-20T10:00:00Z',
                category: {
                  id: 1,
                  name: 'Category 1',
                  image: 'category1.jpg',
                  creationAt: '2023-09-20T10:00:00Z',
                  updatedAt: '2023-09-20T10:00:00Z',
                },
            };

        const mockAddProductData: AddProductData = {
            title: 'Product 1',
            description: 'Description for Product 1',
            price: 10,
            images: ['image1.jpg', 'image2.jpg'],
            categoryId: 1
        }        
        
        const mockProductId = 1
        const createProductAction = createProduct.fulfilled(mockProduct, '', mockAddProductData, '' );        
        const state = productSlice(initialState, createProductAction);

        const deleteProductAction = deleteProduct.fulfilled(mockProductId, '', 200)
        const stateAfterDelete = productSlice(state, deleteProductAction)
        
        expect(state.loading).toBe(false)
        expect(state.products.slice(-1)).toEqual([mockProduct])
        expect(state.error).toBeNull()

        expect(stateAfterDelete.loading).toBe(false)
        expect(stateAfterDelete.products).toEqual([])
        expect(stateAfterDelete.error).toBeNull()
    })

    it('should handle deleteProduct.rejected', () => {

        const error = new Error('Rejected')
        const mockProductId = 13
        
        const state = productSlice(initialState, fetchProductById.rejected(error, '', mockProductId, undefined))

        expect(state.loading).toBe(false);
        expect(state.products).toEqual([])
        expect(state.error).toBe('Rejected')
    })
})