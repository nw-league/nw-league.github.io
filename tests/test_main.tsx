import { getCompanies } from '../src/services/companiesdbservice'

const c = await getCompanies();
console.log(c);
