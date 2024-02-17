
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],

			token: null

		},

		productlist: [],
		user: [],
		users: [],
		token: localStorage.getItem("token") || "",
		services: [],
		products: [],
		filterProducts: [],

		actions: {

			makeLogin: async (userData) => {
				try {
					const API_URL = "https://super-waddle-9pjj6vpvvvwf9567-3001.app.github.dev/api/login";
					const requestConfig = {
						method: "POST",
						headers: {
							"Content-type": "application/json"
						},
						body: JSON.stringify(userData)
					}
					const response = await fetch(API_URL, requestConfig);

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
				try {
					const API_URL = "https://super-waddle-9pjj6vpvvvwf9567-3001.app.github.dev/api/register";
					const requestConfig = {
						method: "POST",
						headers: {
							"Content-type": "application/json"
						},
						body: JSON.stringify(newContactData)
					}
					const response = await fetch(API_URL, requestConfig);

					if (response.status != 201) {

						console.log("Error requesting. Code: ", response.status)

						return false
					}
					const body = await response.json()

					return true

				} catch (error) {

					console.log(error)
				}
			},

			// Use getActions to call a function within a fuction
			exampleFunction: () => {

				getActions().changeColor(0, "green");
			},

			getMessage: async () => {

				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves

					return data;

				} catch (error) {

					console.log("Error loading message from backend", error)
				}
			},

			changeColor: (index, color) => {

				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {

					if (i === index) elm.background = color;

					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},


			getServices: async () => {

				const response = await fetch(process.env.BACKEND_URL + `/api/services`)

				if (!response.ok) {

					throw new Error('Failed to fetch service menu');
				}

				const data = await response.json();

				console.log(data);

				setStore({ services: data });
			},


			getAllProducts: () => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + `api/products/ONSALE`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",

					}
				})
					.then(response => response.json())
					.then((response) => {
						setStore({ products: response });

						console.log(response)
					})
			},


			getUsers: () => {
				fetch(process.env.BACKEND_URL + "api/users", {
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


			getReviews: () => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + `api/profile/reviews`, {
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


			getFilters: () => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + `api/search-by/<filter>`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					}
				})
					.then(response => response.json())
					.then((response) => {

						setStore({ filters: response });

						console.log(response)
					})
			},
		}
	}
};


export default getState;
