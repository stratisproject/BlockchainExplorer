/**
 * Used as a base state that represents multiple entities that are loaded
 * */
export interface MultipleEntitiesState<T> {
    entities: T[],
    loaded,
    error: Error | string
}