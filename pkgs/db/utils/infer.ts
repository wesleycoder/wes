export type KeysOfType<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T]
export type RequiredKeys<T> = Exclude<KeysOfType<T, Exclude<T[keyof T], undefined>>, undefined>
export type ExcludeOptionalProps<T> = Pick<T, RequiredKeys<T>>

export type InferNew<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>
