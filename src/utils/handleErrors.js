export function handleErrors ({ error }) {
  console.log(error)
  if (error.code === 'P2025') {
    return { error: true, message: 'USER NOT FOUND', cause: error.meta.cause }
  }
  return { error: true, message: error.message }
}
