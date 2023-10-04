import 
    categorySlice, 
    { 
        fetchCategories, 
        fetchCategoryById, 
        initialState
    } 
from "../../redux/slices/categorySlice";

describe('categoryApi', () => {

    it('should handle fetchCategories.pending', () => {
        
        const state = categorySlice(initialState, fetchCategories.pending)

        expect(state.categories).toEqual([])
        expect(state.loading).toBe(true)
        expect(state.error).toBeNull()
    })

    it('should handle fetchCategories.fulfilled', () => {

        const mockCategories = [{id: 1, name: 'Mock Category', image: 'image.jpg'}]

        const action = fetchCategories.fulfilled(mockCategories, '', undefined, '')
        const state = categorySlice(initialState, action)

        expect(state.categories).toEqual(mockCategories)
        expect(state.loading).toBe(false)
        expect(state.error).toBeNull()
    })

    it('should handle fetchCategories.rejected', () => {

        const error = new Error('Rejected')

        const action = fetchCategories.rejected(error, '')
        const state = categorySlice(initialState, action)

        expect(state.categories).toEqual([])
        expect(state.loading).toBe(false)
        expect(state.error).toBe('Rejected')
    })

    it('should handle fetchCategoryById.pending', () => {
        
        const state = categorySlice(initialState, fetchCategoryById.pending)

        expect(state.loading).toBe(true)
        expect(state.error).toBeNull()
    })

    it('should handle fetchCategoryById.fulfilled', () => {

        const mockCategory = [{id: 1, name: 'Mock Category', image: 'image.jpg'}]
        const action = fetchCategories.fulfilled(mockCategory, '', undefined, '')
        const state = categorySlice(initialState, action)

        expect(state.categories).toEqual(mockCategory)
        expect(state.loading).toBe(false)
        expect(state.error).toBeNull()
    })

    it('should handle fetchCategoryById.rejected', () => {

        const error = new Error('Rejected')
        const mockCategoryId = 1
        const action = fetchCategoryById.rejected(error, '', mockCategoryId)
        const state = categorySlice(initialState, action)

        expect(state.categories).toEqual([])
        expect(state.loading).toBe(false)
        expect(state.error).toBe('Rejected')
    })
});