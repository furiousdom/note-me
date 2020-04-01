import api from './axios';

const url = {
  root: '/notes',
  resource: id => `${url.root}/${id}`
};

async function fetch() {
  const { data } = await api.get(url.root);
  return data.map(note => ({ ...note, createdAt: new Date(note.createdAt) }));
}

function create(data) {
  return api.post(url.root, data);
}

function remove(id) {
  return api.delete(url.resource(id));
}

export default { fetch, create, remove };
