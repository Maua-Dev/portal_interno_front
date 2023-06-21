export class EntityError extends Error {
  constructor(message: string) {
    super('Field ' + message + ' is not valid')
  }
}

export class NoItemsFoundError extends Error {
  constructor(message: string) {
    super('No items found for this ' + message)
  }
}
