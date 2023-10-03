import { Product, ProductData, AddProductData } from "../types/Product";
import { Category } from "../types/Category";

const fetchProductsApi = async () => {
    try {
        const res = await fetch('https://api.escuelajs.co/api/v1/products')
        const data = await res.json()
        return data as Product[]
    } catch (err) {
        throw err;
    }
  };
  
 const fetchProductByIdApi = async (productId: number) => {
    try {
        const res = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
        const data = await res.json()
        return data as Product
      } catch (err) {
          throw err;
      }
  };
  
  const createProductApi = async (newProduct: AddProductData) => {
    try { 
        const res = await fetch('https://api.escuelajs.co/api/v1/products', {
          method: 'POST',
          headers: {
            'Content-Type':'application/json',
          },
          body: JSON.stringify(newProduct), 
        })
        const data = await res.json();
        console.log(data)
        return data as Product;
      } catch (err) {
            throw err;
      }
  };
  
const updateProductApi = async (updatedProduct: ProductData) => {
    try { 
        const res = await fetch(`https://api.escuelajs.co/api/v1/products/${updatedProduct.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type':'application/json',
          },
          body: JSON.stringify(updatedProduct), 
        })
        const data = await res.json();
        console.log(data)
        return data as Product;
      } catch (err) {
            throw err;
      }
  };
  
  const deleteProductApi = async (productId: number) => {
    try {
        const res = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (res.status === 200) {
          const data = await res.json();
          if (data === true) {
            console.log(`Product with id of ${productId} successfully deleted.`);
            return productId; // Return the productId on success
          } else {
            console.error('Delete Product API Error:', data);
            throw new Error(`Failed to delete product with id of ${productId}`);
          }
        } else {
          console.error('Delete Product API Error:', res.statusText);
          throw new Error(`Failed to delete product with id of ${productId}`);
        }
      } catch (err) {
        console.error('Delete Product Error:', err);
        throw err;
      }
  };

  const fetchCategoriesApi = async () => {
    try {
        const res = await fetch('https://api.escuelajs.co/api/v1/categories')
        const data = await res.json()
        return data as Category[]
    } catch (err) {
        throw err;
    }
  };
  
  export const productsApi = {
    fetchProductsApi,
    fetchProductByIdApi,
    createProductApi,
    updateProductApi,
    deleteProductApi,
    fetchCategoriesApi
  } 