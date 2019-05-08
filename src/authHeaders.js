import { getParsedHeaders } from './persistHeaders'

export default ({ storage, storageKey } = {}) =>
  getParsedHeaders({ storage, storageKey })
