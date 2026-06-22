const BASE_PATH = '/dataodssey';

export function withBasePath(path: string) {
  if (!path || path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }

  if (!BASE_PATH || path.startsWith(BASE_PATH) || path.startsWith('/_next')) {
    return path;
  }

  return `${BASE_PATH}${path.startsWith('/') ? '' : '/'}${path}`;
}
