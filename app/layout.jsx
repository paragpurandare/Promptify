import "@styles/global.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
	title: "Promptify",
	description: "Find your Prompt and Start generating",
};

const RootLayout = ({ children }) => {
	return (
		<html lang="en">
			<body>
				<Provider>
					<div className="main">
						<div className="gradient" />
					</div>
					<div className="responsive-container">
						<main className="app">
							<Nav />
							{children}
						</main>
					</div>
				</Provider>
			</body>
		</html>
	);
};

export default RootLayout;
