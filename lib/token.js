// Cherche le token aux deux endroits
export const getToken = () =>
	localStorage.getItem("token") ?? sessionStorage.getItem("token");

// remember = true → localStorage, sinon sessionStorage
export const setToken = (token, remember) => {
	removeToken(); // évite d'avoir le token aux deux endroits
	(remember ? localStorage : sessionStorage).setItem("token", token);
};

export const removeToken = () => {
	localStorage.removeItem("token");
	sessionStorage.removeItem("token");
};
