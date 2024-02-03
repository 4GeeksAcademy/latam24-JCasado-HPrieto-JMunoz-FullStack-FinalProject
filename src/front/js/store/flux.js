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
			
					console.log("Youve been logged out");

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
			}
		}
	};
};

export default getState;
