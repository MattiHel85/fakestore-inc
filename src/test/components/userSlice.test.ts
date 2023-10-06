import userSlice, { fetchUsers, registerUser, initialState } from "../../redux/slices/userSlice"
import { User } from "../../types/User"

describe('userSlice', () => {
  it('should handle fetchUsers.pending', () => {
    const state = userSlice(initialState, fetchUsers.pending)
    expect(state.users).toEqual([])
    expect(state.loading).toBe(true)
    expect(state.error).toBeNull()
  });

  it('should handle fetchUsers.fulfilled', () => {
    const mockUsers: User[] = [{ id: 1, name: 'User 1', email: 'user1@example.com', password: 'password123', role: 'admin' }]
    const action = fetchUsers.fulfilled(mockUsers, '', undefined, '')
    const state = userSlice(initialState, action)

    expect(state.users).toEqual(mockUsers)
    expect(state.loading).toBe(false)
    expect(state.error).toBeNull()
  });

  it('should handle fetchUsers.rejected', () => {
    const error = new Error('Rejected')
    const action = fetchUsers.rejected(error, '', undefined, '')
    const state = userSlice(initialState, action)
    expect(state.users).toEqual([])
    expect(state.loading).toBe(false)
    expect(state.error).toBe('Rejected')
  });

  it('should handle registerUser.pending', () => {
    const state = userSlice(initialState, registerUser.pending)
    expect(state.loading).toBe(true)
    expect(state.error).toBeNull()
  });

  it('should handle registerUser.fulfilled', () => {
    const mockUser: User = { id: 1, name: 'User 1', email: 'user1@example.com', password: 'password123', role: 'admin' }
    const action = registerUser.fulfilled(mockUser, '', mockUser)

    const state = userSlice(initialState, action)
    expect(state.users).toEqual([mockUser])
    expect(state.loading).toBe(false)
    expect(state.error).toBeNull()
  });

  it('should handle registerUser.rejected', () => {
    const mockUser: User = { id: 1, name: 'User 1', email: 'user1@example.com', password: 'password123', role: 'admin' }
    const error = new Error('Registration Failed')
    const action = registerUser.rejected(error, '', mockUser)
    const state = userSlice(initialState, action)
    expect(state.users).toEqual([])
    expect(state.loading).toBe(false)
    expect(state.error).toBe('Registration Failed')
  });
});
