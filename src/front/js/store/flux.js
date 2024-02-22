
const API_URL = "https://curly-memory-4xwwq4xxjxqcjjrr-3001.app.github.dev/api";

const getState = ({ getStore, getActions, setStore }) => {

	return {

		store: {

			message: null,
			token: null,
			productlist: [],
			user: [],
			users: [],
			token: localStorage.getItem("token") || "",
			services: [],
			products: [],
			filterProducts: [],

		},


		actions: {


			// -----------------------------------------------------------------------------------------------------------------------------------------------	
			// Register / Login:


			makeLogin: async (userData) => {

				try {

					const requestConfig = {

						method: "POST",
						headers: {
							"Content-type": "application/json"
						},

						body: JSON.stringify(userData)
					}

					const response = await fetch(API_URL + "/login", requestConfig);

					if (response.status != 200) {

						console.log(response)

						return false
					}

					const data = await response.json()

					setStore({ token: data.token })

					console.log(data)

					return true
				}
				catch (error) {

					console.log(error)
				}
			},

			logOut: () => {

				try {

					setStore({ token: null });

					console.log("You have been logged out");

				} catch (error) {

					console.error("Error closing session:", error);
				}
			},

			newUser: async (newContactData) => {

				console.log(newContactData);

				try {

					const requestConfig = {

						method: "POST",
						headers: {
							"Content-type": "application/json"
						},

						body: JSON.stringify(newContactData)
					}

					const response = await fetch(API_URL + "/register", requestConfig);

					if (response.status != 201) {

						console.log("Error requesting. Code: ", response.status)

						return false
					}

					const body = await response.json()

					return body

				} catch (error) {

					console.log(error)
				}
			},

			getUsers: () => {

				fetch(process.env.BACKEND_URL + "/api/users", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${localStorage.getItem("token")}`
					}
				})
					.then(response => response.json())
					.then(response => {
						setStore({ users: response.data })

						console.log(response)
					})
					.catch(error => {

						console.error("Error:", error);
					});
			},


			getToken: () => {

				const store = getStore()

				if (localStorage.getItem("token")) {

					return localStorage.getItem("token");
				}
				return store.token;
			},



			// ---------------------------------------------------------------------------------------------------------------------------------------
			// Services / Products:


			getServices: async () => {

				const response = await fetch(process.env.BACKEND_URL + "/api/categories")

				const data = await response.json();

				setStore({

					services:data.categories
				})

			},


			getProducts: async (categoryId) => {

				const response = await fetch(process.env.BACKEND_URL + `/api/serviceCategories/${categoryId}`);

				const data = await response.json();

				return data;

			},


			// ---------------------------------------------------------------------------------------------------------------------------------------
			// Reviews (currently not being used):



			getReviews: () => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + "api/profile/reviews", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${localStorage.getItem("token")}`
					}
				})
					.then(response => response.json())
					.then((response) => {
						setStore({ reviews: response });

						console.log(response)
					})
			},

		}
	}
};



export default getState;
