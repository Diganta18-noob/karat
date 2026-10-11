export const products = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1, title: `Product ${i + 1}`, category: i % 2 ? 'audio' : 'phones',
  price: 10.5 + i, discountPercentage: 5, description: `Description for product ${i + 1}`,
  thumbnail: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="80"><rect width="120" height="80" fill="lightblue"/><text x="10" y="45">Product</text></svg>')
}));
export const initialUsers = [
  { id: 1, name: 'Alice', birthDate: '1995-06-15', officeId: 'a' },
  { id: 2, name: 'Bob', birthDate: '2000-01-01', officeId: 'b' },
  { id: 3, name: 'Charlie', birthDate: '2002-03-12', officeId: 'a' },
  { id: 4, name: 'Dina', birthDate: '1999-12-31', officeId: 'b' },
];
export const offices = [{id:'a', name:'Bengaluru'}, {id:'b', name:'Hyderabad'}];
