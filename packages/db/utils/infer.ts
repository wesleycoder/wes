export type InferNew<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>
