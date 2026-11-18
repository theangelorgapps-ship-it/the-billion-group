const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')

export function sitePath(path = '/') {
  if (/^(?:https?:)?\/\//.test(path)) return path

  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${basePath}${normalizedPath}` || '/'
}

export function isHomePath(pathname: string) {
  const normalizedPathname = pathname.replace(/\/+$/, '') || '/'
  return normalizedPathname === (basePath || '/')
}
