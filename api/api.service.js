const BASE_API = "https://6713e68b690bf212c76024a1.mockapi.io/apiLista";

export async function fecthDataFromAPI() {
  const response = await fetch(BASE_API + "/articles");
  return await response.json();
}
